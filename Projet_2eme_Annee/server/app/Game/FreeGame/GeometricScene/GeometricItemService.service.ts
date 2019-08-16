import { Position } from "./Position";
import * as tools from "./Random";

const NB_GEOMETRY: number = 5;
const NB_SEGMENTS: number = 50;

const MIN_HEIGHT: number = 5;
const MAX_HEIGHT: number = 9;
const MIN_RADIUS: number = 4;
const MAX_RADIUS: number = 6;

export class GeometricItemService {

    public geometry: string;

    public itemParams: number[];

    public coordinates: Position;

    public diffName: string;

    public color: string;

    public alreadyModified: boolean;

    public constructor(position: Position) {
        this.diffName = "";
        this.alreadyModified = false;
        this.geometry = this.generateGeometry();
        this.itemParams = this.generateParams(this.geometry);
        this.coordinates = position;
        this.color = tools.randomColor();
    }

    public clone(): GeometricItemService {
        const clonedItem: GeometricItemService = new GeometricItemService(new Position(0, 0));
        clonedItem.coordinates = this.coordinates.clone();

        clonedItem.geometry = this.geometry;
        clonedItem.color = this.color;
        clonedItem.alreadyModified = this.alreadyModified;
        clonedItem.itemParams = [];
        clonedItem.diffName = this.diffName;
        this.itemParams.forEach((param: number) => {
            clonedItem.itemParams.push(param);
        });

        return clonedItem;
    }

    public generateGeometry(): string {
        const choice: number = tools.randomNumber(1, NB_GEOMETRY);
        const TWO_VALUE: number = 2;
        const THREE_VALUE: number = 3;
        const FOUR_VALUE: number = 4;
        const FIVE_VALUE: number = 5;

        switch (choice) {
            case 1: {
                return tools.Geometry.Sphere;
            }
            case TWO_VALUE: {
                return tools.Geometry.Cube;
            }
            case THREE_VALUE: {
                return tools.Geometry.Cone;
            }
            case FOUR_VALUE: {
                return tools.Geometry.Cylinder;
            }
            case FIVE_VALUE: {
                return tools.Geometry.Pyramid;
            }
            default: {
                return "";
            }
        }
    }

    public generateParams(geometry: string): number[] {
        switch (geometry) {
            case "sphere": {
                return this.generateSphereParams();
            }
            case "cube": {
                return this.generateCubeParams();
            }
            case "cone": {
                return this.generateConeParams();
            }
            case "cylinder": {
                return this.generateCylinderParams();
            }
            case "pyramid": {
                return this.generatePyramidParams();
            }

            default: {
                return [-1];
            }
        }
    }

    public generateSphereParams(): number[] {
        return [tools.randomNumber(MIN_RADIUS, MAX_RADIUS), NB_SEGMENTS, NB_SEGMENTS];
    }

    public generateCubeParams(): number[] {
        const side: number = tools.randomNumber(MIN_HEIGHT, MAX_HEIGHT);

        return [side, side, side];
    }

    public generateConeParams(): number[] {
        return [tools.randomNumber(MIN_RADIUS, MAX_RADIUS), tools.randomNumber(MIN_HEIGHT, MAX_HEIGHT), NB_SEGMENTS, NB_SEGMENTS];
    }

    public generateCylinderParams(): number[] {
        const radius: number = tools.randomNumber(MIN_RADIUS, MAX_RADIUS);

        return [radius, radius, tools.randomNumber(MIN_HEIGHT, MAX_HEIGHT), NB_SEGMENTS, NB_SEGMENTS];
    }

    public generatePyramidParams(): number[] {
        return [tools.randomNumber(MIN_HEIGHT, MAX_HEIGHT)];
    }
}
