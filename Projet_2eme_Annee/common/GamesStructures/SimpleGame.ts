import { Player, Mode } from "./Player";
import { Game } from "./Game";

export class SimpleGame extends Game {
    public readonly imgOg: string;
    public readonly imgMd: string;
    public readonly mode: Mode;
    public constructor (name: string = "Default", imgOg: string ="default.png", imgMd: string ="defaultMd.png",
                        hsSolo:Player[] = [{name: "Joe", minutes: "1", seconds:"00"},
                                           {name: "William", minutes: "1", seconds:"1:30"},
                                           {name: "Jack", minutes: "1", seconds:"45"}],
                        hs1v1: Player[] = [{name: "Averell", minutes: "1", seconds:"00"},
                                           {name: "Rantanplan", minutes: "1", seconds:"30"},
                                           {name: "JollyJumper", minutes: "1", seconds:"45"}]) {

        super(name, hsSolo, hs1v1);
        this.mode = Mode.simple;
        this.imgOg = imgOg;
        this.imgMd = imgMd;
    }
}
