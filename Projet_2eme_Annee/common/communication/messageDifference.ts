import { Coordinates3D } from "../3DView/FreeGamesInterfaces";

export interface MessageDifferenceSimple {
    x: number;
    y: number;
    username: string;
    gameName: string;
}


export interface MessageDifferenceLibre {
    originalObj: Coordinates3D;
    modifiedObj: Coordinates3D;
    username: string;
    gameName: string;
}
