import { Coordinates3D } from "../FreeGamesInterfaces";

export interface Pokemon {
    name : string;
    size: number;
    coordinates: Coordinates3D;
    textureDir: string;
    rotation: number;
    diffName: string;
}