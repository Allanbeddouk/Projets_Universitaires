import { expect } from "chai";
import { PixelBW } from "./PixelBW";
import { PixelsAnalysis } from "./PixelsAnalysis.service";

const REQUIRED_IMAGE_WIDTH: number = 640;
const REQUIRED_IMAGE_HEIGHT: number = 480;
const BLACK: number = 0;
const WHITE: number = 255;

// tslint:disable:no-magic-numbers
describe("Test PixelAnalysis", () => {
    const matrixWhite: PixelBW[][] = [];
    for (let i: number = 0; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrixWhite[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: WHITE, id: 1};
            matrixWhite[i][j] = pixel;
        }
    }

    const matrixID1: PixelBW[][] = [];
    for (let i: number = 0; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrixID1[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: BLACK, id: 1};
            matrixID1[i][j] = pixel;
        }
    }

    const matrixGood: PixelBW[][] = [];
    for (let i: number = 0; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrixGood[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: BLACK, id: 0};
            matrixGood[i][j] = pixel;
        }
    }

    const matrix1Pix: PixelBW[][] = [];
    for (let i: number = 0; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrix1Pix[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: WHITE, id: 0};
            matrix1Pix[i][j] = pixel;
        }
    }

    matrix1Pix[30][30] = {color: BLACK, id: 0};
    const matrix1Diff: PixelBW[][] = [];
    for (let i: number = 0; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrix1Diff[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: BLACK, id: 0};
            matrix1Diff[i][j] = pixel;
        }
    }

    for (let i: number = 340; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrix1Diff[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: WHITE, id: 0};
            matrix1Diff[i][j] = pixel;
        }
    }

    const matrix2Diff: PixelBW[][] = [];
    for (let i: number = 0; i < REQUIRED_IMAGE_HEIGHT; i++ ) {
        matrix2Diff[i] = [];
        for (let j: number = 0; j < REQUIRED_IMAGE_WIDTH; j++ ) {
            const pixel: PixelBW = {color: WHITE, id: 0};
            matrix2Diff[i][j] = pixel;
        }
    }

    for (let i: number = 0; i < 46; i++ ) {
        for (let j: number = 0; j < 95; j++ ) {
            const pixel: PixelBW = {color: BLACK, id: 0};
            matrix2Diff[i][j] = pixel;
        }
    }

    for (let i: number = 147; i < 340; i++ ) {
        for (let j: number = 147; j < 225; j++ ) {
            const pixel: PixelBW = {color: BLACK, id: 0};
            matrix2Diff[i][j] = pixel;
        }
    }

    it("The stack should be empty because the pixel on top in out of the Matrix", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborTop(479, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on top is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborTop(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on top has not an ID of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborTop(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 top", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborTop(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on DiagTopRight in out of the Matrix in height", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopRight(479, 1, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagTopRight in out of the Matrix in width", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopRight(1, 639, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagTopRight is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopRight(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagTopRight has not an id of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopRight(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 diadTopRight", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopRight(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on the right in out of the Matrix", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborRight(1, 639, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on the right is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborRight(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on the right has not an ID of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborRight(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 right", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborRight(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on DiagBotRight in out of the Matrix in height", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotRight(0, 1, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagBotRight in out of the Matrix in width", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotRight(1, 639, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagBotRight is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotRight(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagBotRight has not an id of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotRight(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 diadBotRight", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotRight(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on bot in out of the Matrix", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborBot(1, 0, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on bot is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborBot(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on bot has not an ID of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborBot(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 bot", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborBot(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on DiagBotLeft in out of the Matrix in height", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotLeft(0, 1, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagBotLeft in out of the Matrix in width", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotLeft(1, 0, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagBotLeft is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotLeft(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagBotLeft has not an id of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotLeft(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 diagBotLeft", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagBotLeft(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on left in out of the Matrix", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborLeft(0, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on left is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborLeft(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on left has not an ID of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborLeft(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 left", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborLeft(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("The stack should be empty because the pixel on DiagTopLeft in out of the Matrix in height", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopLeft(479, 1, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagTopLeft in out of the Matrix in width", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopLeft(1, 0, stack, matrixGood);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagTopLeft is not black", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopLeft(1, 1, stack, matrixWhite);
        expect(stack.length).equal(0);
    });
    it("The stack should be empty because the pixel on DiagTopLeft has not an id of 0", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopLeft(1, 1, stack, matrixID1);
        expect(stack.length).equal(0);
    });
    it("The stack should be a lenght of 1 diagTopLeft", () => {
        const stack: [number, number][] = new Array();
        PixelsAnalysis.findNeighborDiagTopLeft(1, 1, stack, matrixGood);
        expect(stack.length).equal(1);
    });
    it("0 difference should be detected", () => {
        expect(PixelsAnalysis.findNbDiff(matrixWhite)).equal(0);
    });
    it("1 difference should be detected, full black matrix", () => {
        expect(PixelsAnalysis.findNbDiff(matrixGood)).equal(1);
    });
    it("1 difference should be detected", () => {
        expect(PixelsAnalysis.findNbDiff(matrix1Diff)).equal(1);
    });
    it("1 difference should be detected, one pixel difference", () => {
        expect(PixelsAnalysis.findNbDiff(matrix1Pix)).equal(1);
    });
    it("2 difference should be detected", () => {
        expect(PixelsAnalysis.findNbDiff(matrix2Diff)).equal(2);
    });
});
