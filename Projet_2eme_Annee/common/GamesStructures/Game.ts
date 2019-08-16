import { Player } from "./Player";

export abstract class Game {
    public readonly name: string;
    public readonly hsSolo: Player[];
    public readonly hs1v1: Player[];
    public constructor (name: string = "Default",
                        hsSolo:Player[] = [{name: "Joe", minutes: "1", seconds:"00"},
                                           {name: "William", minutes: "1", seconds:"1:30"},
                                           {name: "Jack", minutes: "1", seconds:"45"}],
                        hs1v1: Player[] = [{name: "Averell", minutes: "1", seconds:"00"},
                                           {name: "Rantanplan", minutes: "1", seconds:"30"},
                                           {name: "JollyJumper", minutes: "1", seconds:"45"}]) {
        this.name = name;
        this.hsSolo = hsSolo;
        this.hs1v1 = hs1v1;
    }
}