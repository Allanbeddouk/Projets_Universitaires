import { expect } from "chai";
import * as path from "path";
import { ErrorsReplacement } from "./ErrorsReplacement.service";
import { PixelsManipulations } from "./PixelsManipulations.service";

// tslint:disable:no-magic-numbers
describe("Test ErrorsReplacement", async () => {
    const initialImagePath: string = path.join("./" + "imagesInitiales/" + "bleu.bmp");
    const modifiedImagePath: string = path.join("./" + "imagesInitiales/" + "blanc.bmp");
    const service: ErrorsReplacement = new ErrorsReplacement(initialImagePath, modifiedImagePath);

    const arrayThreeError: number[] = [];
    for (let i: number = 0; i < 9; i++ ) {
        arrayThreeError[i] = 0;
    }
    arrayThreeError[0] = 3;
    arrayThreeError[4] = 3;
    arrayThreeError[8] = 3;

    const pixels: number[] = [];
    for (let j: number = 0; j < 9; j++) {
        pixels[j] = 0;
    }

    pixels[2] = 3;

    const valuesOriginal: number[] = [];
    for (let i: number = 0; i < 36; i++) {
        valuesOriginal[i] = 0;
    }

    const valuesModified: number[] = [];
    for (let j: number = 0; j < 36; j++) {
        valuesModified[j] = 255;
    }

    const valuesModifiedTest: number[] = [];
    for (let j: number = 0; j < 36; j++) {
        valuesModifiedTest[j] = 255;
    }

    it("Should change four values from index 8, the equivalent of the second pixel", () => {
        service.replacePixel(2, valuesOriginal, valuesModified);

        expect(valuesModified[7]).equal(255);
        expect(valuesModified[8]).equal(0);
        expect(valuesModified[9]).equal(0);
        expect(valuesModified[10]).equal(0);
        expect(valuesModified[11]).equal(0);
        expect(valuesModified[12]).equal(255);
    });

    it("Should replace the pixel with an id of 3", async () => {
        await service.FindErrorsPixel(3, arrayThreeError, valuesOriginal, valuesModifiedTest);

        expect(valuesModifiedTest[0]).equal(0);
        expect(valuesModifiedTest[1]).equal(0);
        expect(valuesModifiedTest[2]).equal(0);
        expect(valuesModifiedTest[3]).equal(0);
        expect(valuesModifiedTest[16]).equal(0);
        expect(valuesModifiedTest[17]).equal(0);
        expect(valuesModifiedTest[18]).equal(0);
        expect(valuesModifiedTest[19]).equal(0);
        expect(valuesModifiedTest[32]).equal(0);
        expect(valuesModifiedTest[33]).equal(0);
        expect(valuesModifiedTest[34]).equal(0);
        expect(valuesModifiedTest[35]).equal(0);

        expect(valuesModifiedTest[4]).equal(255);
        expect(valuesModifiedTest[15]).equal(255);
        expect(valuesModifiedTest[20]).equal(255);
        expect(valuesModifiedTest[31]).equal(255);
    });

    it("Should replace the difference in the modified image", async () => {
        try {
        const initialImage: string = path.join("./" + "imagesTest/" + "test01.bmp");
        const modifiedImage: string = path.join("./" + "imagesTest/" + "test_blank.bmp");
        const serv: ErrorsReplacement = new ErrorsReplacement(initialImage, modifiedImage);

        await serv.replaceDifferences(0, 0, 640, initialImage);

        const image: number[] = await PixelsManipulations.readImage(modifiedImage);
        expect(image[0]).equal(0);

        const BLANK_CANVAS_PATH: string = path.join("./" + "imagesDifferences/" + "00000_blank.bmp");
        await serv.generateImage( await PixelsManipulations.readImage(BLANK_CANVAS_PATH));
        } catch (e) {
            return e;
        }

    });
});
