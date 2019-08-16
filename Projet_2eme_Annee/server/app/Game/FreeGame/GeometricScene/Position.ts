import {Constants} from "../../../../../common/3DView/Constants";
import * as tools from "./Random";

export class Position {

    public positionX: number;
    public positionY: number;
    public positionZ: number;

    public rotation: number;

    public isUsed: boolean;

    public constructor(ratioX: number, ratioZ: number) {
        this.positionY = 0;
        this.positionX = Constants.MAX_X - (Constants.BOUNDING_SIZE / Constants.TWO_DIVID + ratioX * Constants.SHIFT_BOXES);
        this.positionZ = Constants.MAX_Z - (Constants.BOUNDING_SIZE / Constants.TWO_DIVID + ratioZ * Constants.SHIFT_BOXES);
        this.isUsed = false;
        this.rotation = this.generateRotation();
    }
    public generateRotation(): number { return Math.PI / tools.randomNumber(Constants.MIN_ROTATION, Constants.MAX_ROTATION); }

    public clone(): Position {
        const clonedPosition: Position = new Position(0, 0);
        clonedPosition.positionX = this.positionX;
        clonedPosition.positionY = this.positionY;
        clonedPosition.positionZ = this.positionZ;
        clonedPosition.rotation = this.rotation;
        clonedPosition.isUsed = this.isUsed;

        return clonedPosition;
    }
}

export const buildSceneStructure: Function = () => {
    const positions: Position[] = [];
    for (let i: number = 0 ; i < Constants.BOUNDING_SIZE ; ++i) {
        for (let j: number = 0 ; j < Constants.BOUNDING_SIZE ; ++j) {
        positions.push(new Position(i, j));
        }
    }

    return positions;
};
