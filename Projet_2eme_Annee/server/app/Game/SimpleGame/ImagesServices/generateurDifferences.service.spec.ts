import { expect } from "chai";
import * as path from "path";
import { PixelBW } from "./PixelBW";
import { PixelsManipulations } from "./PixelsManipulations.service";
import { GenerateurDifferences } from "./generateurDifferences.service";

const COMPONENTS_PER_PIXEL: number = 4;
const REQUIRED_IMAGE_WIDTH: number = 640;
const REQUIRED_IMAGE_HEIGHT: number = 480;

// tslint:disable:no-magic-numbers
const pixels1: number[] = [0, 1, 2, 3];
const pixels2: number[] = [0, 1, 2, 4];
const pixels3: number[] = [4, 5, 6, 7];
const pixels4: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const pixels5: number[] = [11, 12, 13, 14, 15, 16, 17, 18];

const WHITE_COMPONENT: number = 255;
const BLACK_COMPONENT: number = 0;

describe("Tests GenerateurDifferencesService", () => {
    const service: GenerateurDifferences = new GenerateurDifferences();
    it("readImage:: should return a promise", () => {
        const imagePath: string = path.join("imagesTest/" + "00001.bmp");

        return expect(service.readImage(imagePath)).to.be.a("Promise");
    });

    it("readImage:: should return a number array", async () => {
        const imagePath: string = path.join("imagesTest/" + "00001.bmp");
        const resolved: number[] = await service.readImage(imagePath);
        expect(resolved[0]).to.be.a("number");
    });

    it("readImage:: should an empty array when the image doesn't exist", async () => {
        let unresolved: number[] = [];
        try {
            const imagePath: string = path.join("imagesTest/" + "unexistingImage.bmp");

            unresolved = await service.readImage(imagePath);
            expect(unresolved).to.equal(0);
        } catch (e) {
            const empty: number[] = [];
            expect(unresolved[0]).to.equal(empty[0]);
        }
    });

    it("readImage:: should an empty array when the image doesn't have the right extension", async () => {
        let unresolved: number[] = [];
        try {
            unresolved = await service.readImage(".\\imagesInitiales\\00001.png");
            expect(unresolved).to.equal(0);
        } catch (e) {
            const empty: number[] = [];
            expect(unresolved[0]).to.equal(empty[0]);
        }
    });

    it("compareImages:: should return a number array", async () => {
        const resolved: number[] = await service.compareImages(pixels1, pixels1);

        resolved.forEach((element: number) => {
            expect(element).to.be.a("number");
        });
    });

    it("compareImages:: all values should be WHITE_COMPONENT when passing 2 completely identical pixels", async () => {
        const resolved: number[] = await service.compareImages(pixels1, pixels1);

        resolved.forEach((element: number) => {
            expect(element).to.equal(WHITE_COMPONENT);
        });
    });

    it("compareImages:: all values should be BLACK_COMPONENT when passing 2 completely different pixels", async () => {
        const resolved: number[] = await service.compareImages(pixels1, pixels3);

        resolved.forEach((element: number) => {
            expect(element).to.equal(BLACK_COMPONENT);
        });
    });

    it("compareImages:: all values should be BLACK_COMPONENT when passing pixels with different components", async () => {
        const resolved: number[] = await service.compareImages(pixels1, pixels2);

        resolved.forEach((element: number) => {
            expect(element).to.equal(BLACK_COMPONENT);
        });
    });

    it("compareImages:: all values should be WHITE_COMPONENT when passing 2 completely identical arrays", async () => {
        const resolved: number[] = await service.compareImages(pixels4, pixels4);

        resolved.forEach((element: number) => {
            expect(element).to.equal(WHITE_COMPONENT);
        });
    });

    it("compareImages:: all values should be BLACK_COMPONENT when passing 2 completely different arrays", async () => {
        const resolved: number[] = await service.compareImages(pixels4, pixels5);

        resolved.forEach((element: number) => {
            expect(element).to.equal(BLACK_COMPONENT);
        });
    });

    it("compareImages:: all values should be BLACK_COMPONENT when passing 2 completely different arrays", async () => {
        const resolved: number[] = await service.compareImages(pixels4, pixels5);

        resolved.forEach((element: number) => {
            expect(element).to.equal(BLACK_COMPONENT);
        });
    });

    it("compareImages:: all values should be BLACK_COMPONENT when passing 2 completely different arrays", async () => {
        const resolved: number[] = await service.compareImages(pixels4, pixels5);

        resolved.forEach((element: number) => {
            expect(element).to.equal(BLACK_COMPONENT);
        });
    });

    it("enhanceDifferences:: Should enhance a single pixel with 36 more pixels", async () => {
        const imagePath: string = path.join("imagesTest/" + "00007.bmp");
        const resolved: number[] = await service.readImage(imagePath);

        const enhancedPixelsMatrix: number[][] = await service.enhanceDifferences(resolved);
        const enhancedPixels: number[] = PixelsManipulations.convertPixelsMatrixToArray(REQUIRED_IMAGE_HEIGHT,
                                                                                        REQUIRED_IMAGE_WIDTH * COMPONENTS_PER_PIXEL,
                                                                                        enhancedPixelsMatrix);
        let enhancedImageBlackComponentCount: number = 0;
        enhancedPixels.forEach((element: number) => {
            if (element === BLACK_COMPONENT) {
                enhancedImageBlackComponentCount++;
            }
        });

        const initialPixelsAmount: number = 1;
        const addedPixelsAmount: number = 36;
        expect(enhancedImageBlackComponentCount).to.equal((initialPixelsAmount + addedPixelsAmount) * COMPONENTS_PER_PIXEL);
    });

    it("enhanceDifferences:: Should enhance two consecutive pixels with 42 more pixels", async () => {
        const imagePath: string = path.join("imagesTest/" + "00010.bmp");
        const resolved: number[] = await service.readImage(imagePath);

        const enhancedPixelsMatrix: number[][] = await service.enhanceDifferences(resolved);
        const enhancedPixels: number[] = PixelsManipulations.convertPixelsMatrixToArray(REQUIRED_IMAGE_HEIGHT,
                                                                                        REQUIRED_IMAGE_WIDTH * COMPONENTS_PER_PIXEL,
                                                                                        enhancedPixelsMatrix);
        let enhancedImageBlackComponentCount: number = 0;
        enhancedPixels.forEach((element: number) => {
            if (element === BLACK_COMPONENT) {
                enhancedImageBlackComponentCount++;
            }
        });

        const initialPixelsAmount: number = 2;
        const addedPixelsAmount: number = 42;
        expect(enhancedImageBlackComponentCount).to.equal((initialPixelsAmount + addedPixelsAmount) * COMPONENTS_PER_PIXEL);
    });

    it("convertToMatrixBW:: Should convert a number matrix to an indentical PixelBW matrix", async () => {
        const imagePath: string = path.join("imagesTest/" + "00007.bmp");
        const resolved: number[] = await service.readImage(imagePath);
        const pixelNumberMatrix: number[][] = PixelsManipulations.convertPixelsArrayToMatrix(resolved);

        const pixelBWMatrix: PixelBW[][] = service.convertToMatrixBW(REQUIRED_IMAGE_HEIGHT, REQUIRED_IMAGE_WIDTH, pixelNumberMatrix);

        for (let rowIndex: number = 0; rowIndex < REQUIRED_IMAGE_HEIGHT; rowIndex++) {
            for (let colIndex: number = 0; colIndex < REQUIRED_IMAGE_WIDTH; colIndex++) {
                expect(pixelBWMatrix[rowIndex][colIndex].color).to.equal(pixelNumberMatrix[rowIndex][colIndex * COMPONENTS_PER_PIXEL]);
            }
        }
    });

    it("generateDifferences:: Should return a promise", async () => {
        try {
            expect(service.generateDifferences("nomJeu", "imagePourTest1.bmp", "imagePourTest2.bmp")).to.be.a("Promise");
         } catch (e) {
            expect(e.message).to.equal("Le fichier ne respecte pas les requis");
         }
    });

    it("generateDifferences:: When resolved, should return 7 differences for imagePourTest1.bmp and imagePourTest2.bmp", async () => {
        try {
            const resolved: boolean = await service.generateDifferences("nomJeu", "imagePourTest1.bmp", "imagePourTest2.bmp");
            expect(resolved).to.equal(true);
        } catch (e) {
            expect(e.message).to.equal("Le fichier ne respecte pas les requis");
        }
    });

    it("generateDifferences:: When unresolved, should throw an error", async () => {
        try {
            const unresolved: boolean = await service.generateDifferences("nomJeu", "imagePourTest1.png", "imagePourTest2.bmp");
            expect(unresolved).to.equal(false);
        } catch (e) {
            expect(e.message).to.equal("Le fichier ne respecte pas les requis");
        }
    });
});
