import { expect } from "chai";

import { Player } from "../../../common/GamesStructures/Player";
import { HighscoreManip } from "./HighscoreManip.service";

describe("Test HighscoreManip", () => {

    const players: Player[] = [];
    const playersOne: Player = new Player("koko", "2", "49");
    const playersTwo: Player = new Player("toto", "3", "15");
    const playersThree: Player = new Player("momo", "4", "20");
    players[0] = playersThree;
    players[1] = playersOne;
    // tslint:disable-next-line:no-magic-numbers
    players[2] = playersTwo;

    it("Should order the array of players by seconds", () => {
        HighscoreManip.OrderByArray(players, "seconds");
        expect(players[0].name).equal("toto");
        expect(players[1].name).equal("momo");
        // tslint:disable-next-line:no-magic-numbers
        expect(players[2].name).equal("koko");
    });

    it("Should order the array of players by minutes", () => {
        players[0] = playersThree;
        players[1] = playersOne;
        // tslint:disable-next-line:no-magic-numbers
        players[2] = playersTwo;

        HighscoreManip.OrderByArray(players, "minutes");
        expect(players[0].name).equal("koko");
        expect(players[1].name).equal("toto");
        // tslint:disable-next-line:no-magic-numbers
        expect(players[2].name).equal("momo");
    });
});
