import { expect } from "chai";
import { Player } from "../../../common/GamesStructures/Player";
import { SimpleGame } from "../../../common/GamesStructures/SimpleGame";
import { freeGameModel, simpleGameModel, IFreeGameModel, ISimpleGameModel } from "../Database/db";
import { HighScoreService } from "./Highscore.service";

// tslint:disable:no-magic-numbers
describe("Tests HighscoreService", () => {
    const simpleGames: SimpleGame[] = [];
    const players: Player[] = [];
    const playersOne: Player = new Player("koko", "2", "49");
    const playersTwo: Player = new Player("toto", "3", "15");
    const playersThree: Player = new Player("momo", "4", "20");
    players[0] = playersThree;
    players[1] = playersOne;
    players[2] = playersTwo;

    const playerTest: Player = new Player("jojo", "3", "11");

    const playersSorted: Player[] = [];
    playersSorted[0] = playersOne;
    playersSorted[1] = playerTest;
    playersSorted[2] = playersTwo;

    const service: HighScoreService = new HighScoreService();

    it("Should return true because it's the same player", () => {
        expect(service.isActivePlayer(playerTest, new Player("jojo", "3", "11"))).equal(true);
    });

    it("Should return false because the player time is different", () => {
        expect(service.isActivePlayer(playerTest, new Player("jojo", "4", "11"))).equal(false);
    });

    it("Should return an array of Player sorted by time", () => {
        service.orderHighScores(players, playerTest);
        for (let i: number = 0; i < 3; i++) {
            expect(players[i].name).equal(playersSorted[i].name);
        }
    });

    it("Should return an change 2 to 02", () => {
        expect(service.ajustSeconds("2")).equal("02");
    });

    it("Should return copy the array of Players", () => {
        const playersExpected: Player[] = [];
        service.transferHighScores(playersSorted, playersExpected);
        for (let i: number = 0; i < 3; i++) {
            expect(playersExpected[i].name).equal(playersSorted[i].name);
        }
    });

    it("Should return 2 wich is the position of the active player", async () => {
        expect(await service.getHighScorePosition(playersSorted, playerTest)).equal("2");
    });

    it("Should return 0 because the player is not in the highscores", async () => {
        expect(await service.getHighScorePosition(playersSorted, playersThree)).equal("0");
    });

    it("Should an array of sorted players by looking into a array of games in solo", async () => {
        players[0] = playersThree;
        players[1] = playersOne;
        players[2] = playersTwo;
        simpleGames[0] = new SimpleGame("test", "", "", players, players);
        const playersExpected: Player[] = await service.buildHighScoresSolo("test", playerTest, simpleGames);
        for (let i: number = 0; i < 3; i++) {
            expect(playersExpected[i].name).equal(playersSorted[i].name);
        }
    });

    it("Should an array of sorted players by looking into a array of games in solo", async () => {
        players[0] = playersThree;
        players[1] = playersOne;
        players[2] = playersTwo;
        simpleGames[0] = new SimpleGame("test", "", "", players, players);
        const playersExpected: Player[] = await service.buildHighScores1v1("test", playerTest, simpleGames);
        for (let i: number = 0; i < 3; i++) {
            expect(playersExpected[i].name).equal(playersSorted[i].name);
        }
    });

    it("Should change the score in a SimpleGame in the database", () => {
        const solo: Player[] = [];
        const oneVsOne: Player[] = [];

        simpleGameModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        const simpleGame: ISimpleGameModel = new simpleGameModel({ name: "highscoreServiceTest",
                                                                   image: "image.png", oneVsOne: JSON.stringify(oneVsOne),
                                                                   solo: JSON.stringify(solo)});

        // tslint:disable-next-line:no-floating-promises
        simpleGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.updateHighScoreSolo("highscoreServiceTest", playersSorted, simpleGameModel).then((isCorrect: boolean) => {
            expect(isCorrect).equal(true);
        });

        simpleGameModel.deleteOne({name: "highscoreServiceTest"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });

    });

    it("Should change the score in a Freegame in the database", () => {
        const solo: Player[] = [];
        const oneVsOne: Player[] = [];

        freeGameModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        const freeGame: IFreeGameModel = new freeGameModel({ name: "highscoreServiceTest", originalScene: {fontColor: "", items: []},
                                                             modifiedScene: {fontColor: "", items: []}, oneVsOne: JSON.stringify(oneVsOne),
                                                             solo: JSON.stringify(solo)});

        // tslint:disable-next-line:no-floating-promises
        freeGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.updateHighScoreSolo("highscoreServiceTest", playersSorted, freeGameModel).then((isCorrect: boolean) => {
            expect(isCorrect).equal(true);
        });

        freeGameModel.deleteOne({name: "highscoreServiceTest"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });

    });

    it("Should return false because the game is not in the database (FreeGame)", () => {
        const solo: Player[] = [];
        const oneVsOne: Player[] = [];

        freeGameModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        const freeGame: IFreeGameModel = new freeGameModel({ name: "highscoreServiceTest", originalScene: {fontColor: "", items: []},
                                                             modifiedScene: {fontColor: "", items: []}, oneVsOne: JSON.stringify(oneVsOne),
                                                             solo: JSON.stringify(solo)});

        // tslint:disable-next-line:no-floating-promises
        freeGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.updateHighScoreSolo("allo", playersSorted, freeGameModel).then((isCorrect: boolean) => {
            expect(isCorrect).equal(false);
        });

        freeGameModel.deleteOne({name: "highscoreServiceTest"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });

    });

    it("Should return false because the game is not in the database (SimpleGame)", () => {
        const solo: Player[] = [];
        const oneVsOne: Player[] = [];

        simpleGameModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        const simpleGame: ISimpleGameModel = new simpleGameModel({ name: "highscoreServiceTest",
                                                                   image: "image.png", oneVsOne: JSON.stringify(oneVsOne),
                                                                   solo: JSON.stringify(solo)});

        // tslint:disable-next-line:no-floating-promises
        simpleGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.updateHighScoreSolo("test", playersSorted, simpleGameModel).then((isCorrect: boolean) => {
            expect(isCorrect).equal(false);
        });

        simpleGameModel.deleteOne({name: "highscoreServiceTest"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });
});
