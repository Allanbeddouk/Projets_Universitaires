import { Coordinates3D } from "../FreeGamesInterfaces";

export interface GeometricItem {
    geometry: string;
    itemParams: number[];
    coordinates: Coordinates3D;
    rotation: number;
    color: string;
    diffName:string;
}