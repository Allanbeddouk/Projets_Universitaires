import { expect } from "chai";
import * as path from "path";
import { PixelBW } from "./PixelBW";
import { PixelsManipulations } from "./PixelsManipulations.service";

// tslint:disable:no-magic-numbers
describe("Test PixelsManipulation", () => {
    const pixelsB: number[] = [0, 0, 0 , 0];
    const pixelsW: number[] = [255, 255, 255, 255];

    const matrixToEnhance: number[][] = [];
    for (let i: number = 0; i < 7; i++ ) {
        matrixToEnhance[i] = [];
        for (let j: number = 0; j < 27; j++ ) {
            matrixToEnhance[i][j] = 255;
        }
    }
    for (let k: number = 0; k < 4; k++ ) {
        matrixToEnhance[3][12 + 4] = 255;
    }

    const matrixToConvert: number[][] = [];
    for (let i: number = 0; i < 3; i++ ) {
        matrixToConvert[i] = [];
        for (let j: number = 0; j < 3; j++ ) {
            matrixToConvert[i][j] = i * 3 + j;
        }
    }

    const arrayToConvert: number[] = [];
    for (let k: number = 0; k < 1228800; k++ ) {
        arrayToConvert[k] = k;
    }

    const matrixPixelsBW: PixelBW[][] = [];
    for (let i: number = 0; i < 3; i++ ) {
        matrixPixelsBW[i] = [];
        for (let j: number = 0; j < 3; j++ ) {
            matrixPixelsBW[i][j] = {color: 0, id: i * 3 + j};
        }
     }

    it("The pixels are now white", () => {
        PixelsManipulations.whitenPixel(0, pixelsB);
        expect(pixelsB[0]).equal(255);
        expect(pixelsB[1]).equal(255);
        expect(pixelsB[2]).equal(255);
        expect(pixelsB[3]).equal(255);
    });

    it("The pixels are now black", () => {
        PixelsManipulations.blackenPixel(0, pixelsW);
        expect(pixelsW[0]).equal(0);
        expect(pixelsW[1]).equal(0);
        expect(pixelsW[2]).equal(0);
        expect(pixelsW[3]).equal(0);
    });

    it("The pixel is now bigger", () => {
        PixelsManipulations.enhancePixel(3, 12, matrixToEnhance);
        for (let k: number = 0; k < 12; k++ ) {
            expect(matrixToEnhance[0][k + 8]).equal(0);
        }
        for (let k: number = 0; k < 20; k++ ) {
            expect(matrixToEnhance[1][k + 4]).equal(0);
        }
        for (let k: number = 0; k < 27; k++ ) {
            expect(matrixToEnhance[2][k]).equal(0);
        }
        for (let k: number = 0; k < 27; k++ ) {
            expect(matrixToEnhance[3][k]).equal(0);
        }
        for (let k: number = 0; k < 27; k++ ) {
            expect(matrixToEnhance[4][k]).equal(0);
        }
        for (let k: number = 0; k < 20; k++ ) {
            expect(matrixToEnhance[5][k + 4]).equal(0);
        }
        for (let k: number = 0; k < 12; k++ ) {
            expect(matrixToEnhance[6][k + 8]).equal(0);
        }
    });

    it("Matrix is now a array", () => {
        let array: number[] = [];
        array = PixelsManipulations.convertPixelsMatrixToArray(3, 3, matrixToConvert);
        for (let k: number = 0; k < 9; k++) {
            expect(array[k]).equal(k);
        }
    });

    it("Matrix is now a array: length 9", () => {
        let array: number[] = [];
        array = PixelsManipulations.convertPixelsMatrixToArray(3, 3, matrixToConvert);
        for (let k: number = 0; k < 9; k++) {
            expect(array[k]).equal(k);
        }
    });

    it("Array is now a matrix", () => {
        const matrix: number[][] = PixelsManipulations.convertPixelsArrayToMatrix(arrayToConvert);
        for (let i: number = 0; i < 480; i++ ) {
            for (let j: number = 0; j < 640; j++ ) {
                expect(matrix[i][j]).equal(i * 640 * 4 + j);
            }
        }
    });

    it("Pixels Matrix is now an array of differences", () => {
        const array: number[] = PixelsManipulations.convertPixelsBWMatrixToArray(matrixPixelsBW);
        for (let i: number = 0; i < array.length; i++) {
            expect(array[i]).equal(i);
        }
    });

    it("Convert a difference image to an array with differences id", async () => {
        const testPath: string = path.join("./" + "imagesTest/" + "test01.bmp");
        const array: number[] = await PixelsManipulations.convertDifferencesImageToArray(testPath);
        expect(array[0]).equal(1);
        expect(array[639]).equal(2);
        expect(array[306560]).equal(3);
        expect(array[307199]).equal(4);
    });

    it("Convert an image to an array", async () => {
        const testPath: string = path.join("./" + "imagesTest/" + "test01.bmp");
        const array: number[] = await PixelsManipulations.readImage(testPath);
        expect(array[0]).equal(0);
        expect(array[639  * 4]).equal(0);
        expect(array[306560 * 4]).equal(0);
        expect(array[array.length - 2]).equal(0);
    });
});
