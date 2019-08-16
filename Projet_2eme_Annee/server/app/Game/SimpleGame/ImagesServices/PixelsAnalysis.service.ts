import { PixelBW } from "./PixelBW";

const IMAGE_WIDTH: number = 640;
const IMAGE_HEIGHT: number = 480;
const BLACK: number = 0;

export class PixelsAnalysis {

    public static findNbDiff(pixelsDiffBW: PixelBW[][]): number {
        let diffId: number = 1;
        for (let lineNumber: number = 0; lineNumber < pixelsDiffBW.length; lineNumber++) {
            for (let colNumber: number = 0; colNumber < pixelsDiffBW[lineNumber].length; colNumber++) {
                const stack: [number, number][] = new Array();
                if (pixelsDiffBW[lineNumber][colNumber].color === BLACK && pixelsDiffBW[lineNumber][colNumber].id === 0) {
                    pixelsDiffBW[lineNumber][colNumber].id = diffId;
                    this.propagateDiffID(lineNumber, colNumber, stack, pixelsDiffBW);
                    while (stack.length !== 0) {
                        const pixel: [number, number] = stack[stack.length - 1];
                        stack.pop();
                        pixelsDiffBW[pixel[0]][pixel[1]].id = diffId;
                        this.propagateDiffID(pixel[0], pixel[1], stack, pixelsDiffBW);
                    }
                    diffId++;
                }
            }
        }

        return diffId - 1;
    }

    private static propagateDiffID(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        this.findNeighborDiagTopRight(line, col, stack, pixelsDiffBW);

        this.findNeighborRight(line, col, stack, pixelsDiffBW);

        this.findNeighborDiagBotRight(line, col, stack, pixelsDiffBW);

        this.findNeighborBot(line, col, stack, pixelsDiffBW);

        this.findNeighborDiagBotLeft(line, col, stack, pixelsDiffBW);

        this.findNeighborLeft(line, col, stack, pixelsDiffBW);

        this.findNeighborDiagTopLeft(line, col, stack, pixelsDiffBW);

        this.findNeighborTop(line, col, stack, pixelsDiffBW);
    }

    public static findNeighborTop(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const lineNeighbor: number = line + 1;
        if (this.isWhitinBoundTop(lineNeighbor) &&
            this.isUnidentifiedError(lineNeighbor, col, pixelsDiffBW)) {
                stack.push([lineNeighbor, col]);
        }
    }

    public static findNeighborDiagTopRight(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const colNeighbor: number = col + 1;
        const lineNeighbor: number = line + 1;
        if (this.isWhitinBoundTop(lineNeighbor) &&
            this.isWhitinBoundRight(colNeighbor) &&
            this.isUnidentifiedError(lineNeighbor, colNeighbor, pixelsDiffBW)) {
                stack.push([lineNeighbor, colNeighbor]);
        }
    }

    public static findNeighborRight(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const colNeighbor: number = col + 1;
        if (this.isWhitinBoundRight(colNeighbor) &&
            this.isUnidentifiedError(line, colNeighbor, pixelsDiffBW)) {
                stack.push([line, colNeighbor]);
        }
    }

    public static findNeighborDiagBotRight(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const colNeighbor: number = col + 1;
        const lineNeighbor: number = line - 1;
        if (this.isWhitinBoundBot(lineNeighbor) &&
            this.isWhitinBoundRight(colNeighbor) &&
            this.isUnidentifiedError(lineNeighbor, colNeighbor, pixelsDiffBW)) {
                stack.push([lineNeighbor, colNeighbor]);
        }
    }

    public static findNeighborBot(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const lineNeighbor: number = line - 1;
        if (this.isWhitinBoundBot(lineNeighbor) &&
            this.isUnidentifiedError(lineNeighbor, col, pixelsDiffBW)) {
                stack.push([lineNeighbor, col]);
        }
    }
    public static findNeighborDiagBotLeft(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const colNeighbor: number = col - 1;
        const lineNeighbor: number = line - 1;
        if (this.isWhitinBoundBot(lineNeighbor) &&
            this.isWhitinBoundLeft(colNeighbor) &&
            this.isUnidentifiedError(lineNeighbor, colNeighbor, pixelsDiffBW)) {
                stack.push([lineNeighbor, colNeighbor]);
        }
    }

    public static findNeighborLeft(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const colNeighbor: number = col - 1;
        if (this.isWhitinBoundLeft(colNeighbor) &&
            this.isUnidentifiedError(line, colNeighbor, pixelsDiffBW)) {
                stack.push([line, colNeighbor]);
        }
    }

    public static findNeighborDiagTopLeft(line: number, col: number, stack: [number, number][], pixelsDiffBW: PixelBW[][]): void {
        const colNeighbor: number = col - 1;
        const lineNeighbor: number = line + 1;
        if (this.isWhitinBoundLeft(colNeighbor) &&
            this.isWhitinBoundTop(lineNeighbor) &&
            this.isUnidentifiedError(lineNeighbor, colNeighbor, pixelsDiffBW)) {
                stack.push([lineNeighbor, colNeighbor]);
        }
    }

    private static isUnidentifiedError(line: number, col: number, pixelsDiffBW: PixelBW[][]): boolean {
        return  pixelsDiffBW[line][col].color === BLACK &&
                pixelsDiffBW[line][col].id === 0;
    }

    private static isWhitinBoundTop(position: number): boolean {
        return position < IMAGE_HEIGHT;
    }

    private static isWhitinBoundRight(position: number): boolean {
        return position < IMAGE_WIDTH;
    }

    private static isWhitinBoundBot(position: number): boolean {
        return position >= 0;
    }

    private static isWhitinBoundLeft(position: number): boolean {
        return position >= 0;
    }

}
