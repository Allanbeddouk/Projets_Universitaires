import { expect } from "chai";
import { FreeGame } from "../../../common/GamesStructures/FreeGame";
import { Mode, Player } from "../../../common/GamesStructures/Player";
import { SimpleGame } from "../../../common/GamesStructures/SimpleGame";
import { freeGameModel, simpleGameModel, ISimpleGameModel } from "../Database/db";
import { GetGamesService } from "./GetGames.services";

describe("Tests GetGamesService", () => {
    const service: GetGamesService = new GetGamesService();

    it("Should return an array of simpleGames greater then 0 if at least one game is in the db", () => {
        const oneVsOne: Player[] = [];
        const solo: Player[] = [];

        const simpleGame: ISimpleGameModel = new simpleGameModel({ name: "gameTestService",
                                                                   image: "image.png", oneVsOne: JSON.stringify(oneVsOne),
                                                                   solo: JSON.stringify(solo)});
        // tslint:disable-next-line:no-floating-promises
        simpleGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.getSimpleGames().then((games: SimpleGame[]) => {
            expect(games.length).to.not.equal(0);
        });

        simpleGameModel.deleteOne({name: "gameTestService"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should return an array of freeGames greater then 0 if at least one game is in the db", () => {
        const oneVsOne: Player[] = [];
        const solo: Player[] = [];

        const freeGame: ISimpleGameModel = new simpleGameModel({ name: "gameTestService",
                                                                 originalScene: "sceneOG.png", modifiedScene: "sceneMd.png",
                                                                 oneVsOne: JSON.stringify(oneVsOne),
                                                                 solo: JSON.stringify(solo)});
        // tslint:disable-next-line:no-floating-promises
        freeGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.getFreeGames().then((games: FreeGame[]) => {
            expect(games.length).to.not.equal(0);
        });

        freeGameModel.deleteOne({name: "gameTestService"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should have the right game values in the array of simpleGames", () => {
        const oneVsOne: Player[] = [];
        const solo: Player[] = [];

        const simpleGame: ISimpleGameModel = new simpleGameModel({ name: "gameTestService",
                                                                   originalImage: "imageOG.png", modifiedImage: "imageMd.png",
                                                                   oneVsOne: JSON.stringify(oneVsOne),
                                                                   solo: JSON.stringify(solo)});
        // tslint:disable-next-line:no-floating-promises
        simpleGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.getSimpleGames().then((games: SimpleGame[]) => {
            expect(games[games.length - 1].name).to.equal("gameTestService");
            expect(games[games.length - 1].imgOg).to.equal("imageOg.png");
            expect(games[games.length - 1].imgMd).to.equal("imageMd.png");
            expect(games[games.length - 1].mode).to.equal(Mode.simple);
        });

        simpleGameModel.deleteOne({name: "gameTestService"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should have the right game values in the array of freeGames", () => {
        const oneVsOne: Player[] = [];
        const solo: Player[] = [];

        const freeGame: ISimpleGameModel = new simpleGameModel({ name: "gameTestService",
                                                                 originalScene: "sceneOG.png", modifiedScene: "sceneMd.png",
                                                                 oneVsOne: JSON.stringify(oneVsOne),
                                                                 solo: JSON.stringify(solo)});
        // tslint:disable-next-line:no-floating-promises
        freeGame.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.getSimpleGames().then((games: SimpleGame[]) => {
            expect(games[games.length - 1].name).to.equal("gameTestService");
            expect(games[games.length - 1].imgOg).to.equal("sceneOG.png");
            expect(games[games.length - 1].imgMd).to.equal("sceneMd.png");
            expect(games[games.length - 1].mode).to.equal(Mode.free);
        });

        simpleGameModel.deleteOne({name: "gameTestService"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

});
