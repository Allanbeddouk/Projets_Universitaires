import { PixelBW } from "./PixelBW";
import { PixelsAnalysis } from "./PixelsAnalysis.service";
import { GenerateurDifferences } from "./generateurDifferences.service";

const COMPONENTS_PER_PIXEL: number = 4;
const BLACK: number = 0;
const WHITE: number = 255;
const IMAGE_WIDTH: number = 640;
const IMAGE_HEIGHT: number = 480;

export class PixelsManipulations {

    public static whitenPixel(pixelIndex: number, pixels: number[]): void {
        for (let i: number = 0; i < COMPONENTS_PER_PIXEL; i++) {
            pixels[pixelIndex + i] = WHITE;
        }
    }

    public static blackenPixel(pixelIndex: number, pixels: number[]): void {
        for (let i: number = 0; i < COMPONENTS_PER_PIXEL; i++) {
            pixels[pixelIndex + i] = BLACK;
        }
    }

    public static enhancePixel(row: number, col: number, pixels2D: number[][]): void {
        const G: number = 1;
        const B: number = 2;
        const A: number = 3;
        const adjustment: number = 3;
        let index: number = 1;
        let rowOf7: number = 0;
        let decriment: boolean = false;
        for (let rowIndex: number = row - adjustment; rowIndex <= row + adjustment; rowIndex++) {
            let colIndex: number = col - index * COMPONENTS_PER_PIXEL;
            while (colIndex <= col + index * COMPONENTS_PER_PIXEL) {
                if (PixelsManipulations.isInImage(rowIndex, colIndex)) {
                    pixels2D[rowIndex][colIndex] = BLACK;
                    pixels2D[rowIndex][colIndex + G] = BLACK;
                    pixels2D[rowIndex][colIndex + B] = BLACK;
                    pixels2D[rowIndex][colIndex + A] = BLACK;
                }
                colIndex += COMPONENTS_PER_PIXEL;
            }
            if (this.isMaxAdjustmentFinished(index, adjustment, rowOf7) || decriment) {
                index--;
                decriment = true;
            } else if (index !== adjustment) {
                index++;
            }
            if (index === adjustment) {
                rowOf7++;
            }
        }
    }

    public static convertPixelsMatrixToArray(nbRow: number, nbCol: number, pixels2D: number[][]): number[] {
        const pixels: number[] = [];
        for (let lineNumber: number = 0; lineNumber < nbRow; lineNumber++) {
            for (let colNumber: number = 0; colNumber < nbCol; colNumber++) {
                pixels[lineNumber * nbCol + colNumber] = pixels2D[lineNumber][colNumber];
            }
        }

        return pixels;
    }

    public static convertPixelsArrayToMatrix(pixels: number[]): number[][] {
        const pixels2D: number[][] = [];
        for (let lineNumber: number = 0; lineNumber < IMAGE_HEIGHT; lineNumber++) {
            pixels2D[lineNumber] = [];
            for (let colNumber: number = 0; colNumber < IMAGE_WIDTH * COMPONENTS_PER_PIXEL; colNumber++) {
                pixels2D[lineNumber][colNumber] = pixels[lineNumber * IMAGE_WIDTH * COMPONENTS_PER_PIXEL + colNumber];
            }
        }

        return pixels2D;
    }

    public static async convertDifferencesImageToArray(imagePath: string): Promise<number[]> {
        const differencesImage: number[] = await this.readImage(imagePath);
        const differencesImage2D: number[][] = PixelsManipulations.convertPixelsArrayToMatrix(differencesImage);

        const generateur: GenerateurDifferences = new GenerateurDifferences();
        const differencesImagePixelBW: PixelBW[][] = generateur.convertToMatrixBW(IMAGE_HEIGHT, IMAGE_WIDTH, differencesImage2D);
        PixelsAnalysis.findNbDiff(differencesImagePixelBW);

        return this.convertPixelsBWMatrixToArray(differencesImagePixelBW);
    }

    public static async readImage(imagePath: string): Promise<number[]> {
        // Selon la documentation de Jimp, la valeur de retour doit être de type any
        // tslint:disable-next-line:typedef
        const jimp = require("jimp");
         // Selon la documentation de Jimp, la valeur de retour doit être de type any
        // tslint:disable-next-line:typedef
        const image = await jimp.read(imagePath);

        return image.bitmap.data;
     }
    public static convertPixelsBWMatrixToArray(pixelsBW: PixelBW[][]): number[] {
        const errors: number[] = [];
        for (let row: number = 0; row < pixelsBW.length; row++ ) {
           for (let col: number = 0; col < pixelsBW[row].length; col++ ) {
              errors[row * pixelsBW[row].length + col ] = pixelsBW[row][col].id;
           }
        }

        return errors;
    }

    private static isInImage (rowIndex: number, colIndex: number): boolean {
        return (rowIndex >= 0 && colIndex >= 0) && (rowIndex < IMAGE_HEIGHT && colIndex < IMAGE_WIDTH * COMPONENTS_PER_PIXEL);
    }

    private static isMaxAdjustmentFinished(index: number, adjustment: number, rowOf7: number): boolean {
        return (index === adjustment && rowOf7 === adjustment);
    }
}
