import { Player, Mode } from "./Player";
import { GeometricScene } from "../3DView/GeometricScene/GeometricScene";
import { Game } from "./Game";
import { ThematicScene } from "../3DView/ThematicScene/ThematicScene";

export class FreeGame extends Game {
    public readonly screen: string;
    public readonly originalScene: GeometricScene | ThematicScene;
    public readonly modifiedScene: GeometricScene | ThematicScene;
    public readonly mode: Mode;
    public readonly gameType: string;
    public constructor (name: string = "Default", screen: string ="default.png", gameType:string,
                        originalScene: GeometricScene | ThematicScene, modifiedScene: GeometricScene | ThematicScene,
                        hsSolo:Player[] = [{name: "Joe", minutes: "1", seconds:"00"},
                                           {name: "William", minutes: "1", seconds:"30"},
                                           {name: "Jack", minutes: "1", seconds:"45"}],
                        hs1v1: Player[] = [{name: "Averell", minutes: "1", seconds:"00"},
                                           {name: "Rantanplan", minutes: "1", seconds:"30"},
                                           {name: "JollyJumper", minutes: "1", seconds:"45"}]) {
        super(name, hsSolo, hs1v1);
        this.screen = screen;
        this.gameType = gameType;
        this.mode = Mode.free;
        this.originalScene = originalScene;
        this.modifiedScene = modifiedScene;
    }
}
