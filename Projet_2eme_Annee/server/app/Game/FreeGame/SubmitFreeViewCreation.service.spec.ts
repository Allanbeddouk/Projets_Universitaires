import { expect } from "chai";
import sinon = require("sinon");
import { freeGameModel, IFreeGameModel } from "../../Database/db";
import { SubmitFreeViewCreationService } from "./SubmitFreeViewCreation.service";

describe("Test SubmitFreeViewCreationService", () => {
    const service: SubmitFreeViewCreationService = new SubmitFreeViewCreationService();

    it("Should not accept a number of items over 200", () => {
        // tslint:disable-next-line:no-magic-numbers
        expect(service.verifyQuantity(201)).equal(false);
    });

    it("Should not accept a number of items under 10", () => {
        // tslint:disable-next-line:no-magic-numbers
        expect(service.verifyQuantity(9)).equal(false);
    });

    it("Should accept a number of items that is beetween 10 and 200", () => {
        // tslint:disable-next-line:no-magic-numbers
        expect(service.verifyQuantity(100)).equal(true);
    });

    it("Should save game datas and return sucess", async () => {
        let result: boolean = false;
        service.checkFreeGame("test", []).then((res: boolean) => result = res).catch((e: Error) => { console.error(e); });
        // tslint:disable-next-line:no-magic-numbers
        expect(result).equal(false);
    });

    describe("Game initialize", () => {
        it("Should return a resolve promise to true if a free game is initialize ", async () => {
            const gameSimple: IFreeGameModel = new freeGameModel({
                name: "gameName", originalImage: "originalImage",
                modifiedImage: "modifiedImage",
                oneVsOne: "",
                solo: "",
            });
            // tslint:disable-next-line: no-floating-promises
            service.findGame("gameName").then(() => {
                sinon.stub(service, "findGame").resolves(gameSimple);
            });
            // tslint:disable-next-line: no-floating-promises
            service.initializeFreeGame("gameName").then((res: boolean) => {
                expect(res).to.equal(true);
            });
        });

        it("Should return a resolve promise to false if a free game can't be initialize ", async () => {
            // tslint:disable-next-line: no-floating-promises
            service.findGame("gameName").then(() => {
                sinon.stub(service, "findGame").rejects("erreur");
            });
            // tslint:disable-next-line: no-floating-promises
            service.initializeFreeGame("gameName").then((res: boolean) => {
                expect(res).to.equal(false);
            });
        });
    });

});
