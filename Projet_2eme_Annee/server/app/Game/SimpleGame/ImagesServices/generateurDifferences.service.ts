import { injectable } from "inversify";
import * as path from "path";
import "reflect-metadata";
import { PixelBW } from "./PixelBW";
import { PixelsAnalysis } from "./PixelsAnalysis.service";
import { PixelsManipulations } from "./PixelsManipulations.service";

const DIFFERENCES_BMP_EXTENSION: string = "_differences.bmp";
const BLANK_CANVAS_PATH: string = path.join("./" + "imagesDifferences/" + "00000_blank.bmp");
const COMPONENTS_PER_PIXEL: number = 4;
const BLACK: number = 0;
const WHITE: number = 255;
const REQUIRED_IMAGE_WIDTH: number = 640;
const REQUIRED_IMAGE_HEIGHT: number = 480;

@injectable()
export class GenerateurDifferences {
    // Selon la documentation de Jimp, la valeur de retour doit être de type any
    // tslint:disable-next-line:typedef
    private jimp = require("jimp");

    public async readImage(imagePath: string): Promise<number[]> {
        try {
            // Selon la documentation de Jimp, la valeur de retour doit être de type any
            // tslint:disable-next-line:typedef
            const image = await this.jimp.read(imagePath);

            if (image.bitmap.width !== REQUIRED_IMAGE_WIDTH || image.bitmap.height !== REQUIRED_IMAGE_HEIGHT) {
                throw new Error("Mauvais taille de fichier, une taille de 640x480 était attendue");
            }

            return image.bitmap.data;
        } catch (e) {
            e = e;
        }

        return [];
    }

    public async compareImages(initial: number[], modified: number[]): Promise<number[]> {
        const differenceImagePixels: number[] = [];
        for (let pixelIndex: number = 0; pixelIndex < initial.length; pixelIndex += COMPONENTS_PER_PIXEL) {
            this.comparePixel(pixelIndex, initial, modified, differenceImagePixels);
        }

        return differenceImagePixels;
    }

    private comparePixel(pixelIndex: number, initialPixels: number[], modifiedPixels: number[], diffPixels: number[] ): void {
        PixelsManipulations.whitenPixel(pixelIndex, diffPixels);
        for (let componentIndex: number = 0; componentIndex < COMPONENTS_PER_PIXEL; componentIndex++) {
            this.comparePixelComponent(pixelIndex, componentIndex, initialPixels, modifiedPixels, diffPixels);
        }
    }

    private comparePixelComponent(pixelIndex: number, componentIndex: number, initialPixels: number[], modifiedPixels: number[],
                                  diffPixels: number[]): void {
        if (initialPixels[pixelIndex + componentIndex] !== modifiedPixels[pixelIndex + componentIndex]) {
            PixelsManipulations.blackenPixel(pixelIndex, diffPixels);
        }
    }

    private async generateDifferencesImage(imageID: string, pixels: number[]): Promise<void> {
        // Selon la documentation de Jimp, la valeur de retour doit être de type any
        // tslint:disable-next-line:typedef
        const differencesImage = await this.jimp.read(BLANK_CANVAS_PATH);
        differencesImage.bitmap.data = pixels;
        differencesImage.write(path.join("./" + "imagesDifferences/" + imageID));
    }

    public async enhanceDifferences(diffPixels: number[]): Promise<number[][]> {
        const differencePixels2D: number[][] = PixelsManipulations.convertPixelsArrayToMatrix(diffPixels);
        const enhancedDifferencePixels2D: number[][] = PixelsManipulations.convertPixelsArrayToMatrix(diffPixels);
        for (let lineNumber: number = 0; lineNumber < REQUIRED_IMAGE_HEIGHT; lineNumber++) {
            for (let colNumber: number = 0; colNumber < REQUIRED_IMAGE_WIDTH * COMPONENTS_PER_PIXEL; colNumber += COMPONENTS_PER_PIXEL) {
                if (differencePixels2D[lineNumber][colNumber] === BLACK) {
                    PixelsManipulations.enhancePixel(lineNumber, colNumber, enhancedDifferencePixels2D);
                }
            }
        }

        return enhancedDifferencePixels2D;
    }

    public convertToMatrixBW(nbRow: number, nbCol: number, pixels: number[][]): PixelBW[][] {
        const pixelsBW: PixelBW[][] = [];
        let colIndex: number = 0;
        for (let lineNumber: number = 0; lineNumber < nbRow; lineNumber++) {
            colIndex = 0;
            pixelsBW[lineNumber] = [];
            for (let colNumber: number = 0; colNumber < nbCol * COMPONENTS_PER_PIXEL; colNumber += COMPONENTS_PER_PIXEL) {
                let pixel: PixelBW;
                pixel = pixels[lineNumber][colNumber] === BLACK ? {color: BLACK, id: 0} : {color: WHITE, id: 0};
                pixelsBW[lineNumber][colIndex] = pixel;
                colIndex++;
            }
        }

        return pixelsBW;
    }

    public async generateDifferences(gameName: string, initialImageID: string, modifiedImageID: string): Promise<boolean> {
        const initialImagePath: string = path.join("./" + "images/" + initialImageID);
        const modifiedImagePath: string = path.join("./" + "images/" + modifiedImageID);
        const initialImagePixels: number[] = await this.readImage(initialImagePath);
        const modifiedImagePixels: number[] = await this.readImage(modifiedImagePath);

        let differencePixels: number[] = await this.compareImages(initialImagePixels, modifiedImagePixels);
        const enhancedDifferencePixels2D: number[][] = await this.enhanceDifferences(differencePixels);
        differencePixels = PixelsManipulations.convertPixelsMatrixToArray(REQUIRED_IMAGE_HEIGHT,
                                                                          REQUIRED_IMAGE_WIDTH * COMPONENTS_PER_PIXEL,
                                                                          enhancedDifferencePixels2D);
        await this.generateDifferencesImage(gameName + DIFFERENCES_BMP_EXTENSION, differencePixels);
        const pixels: PixelBW[][] = this.convertToMatrixBW(REQUIRED_IMAGE_HEIGHT, REQUIRED_IMAGE_WIDTH, enhancedDifferencePixels2D);
        const TARGET_DIFF: number = 7;

        return TARGET_DIFF === PixelsAnalysis.findNbDiff(pixels);
    }

}
