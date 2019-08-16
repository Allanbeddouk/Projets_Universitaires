import { expect } from "chai";
import { SubmitGameCreationService } from "./SubmitGameCreation.service";

describe("Test SubmitGameCreationService", () => {
    const service: SubmitGameCreationService = new SubmitGameCreationService();

    it("Should not accept a name too long (over 20 characters)", () => {
        expect(service.verifyGameName("qwertyuiopasdfghjklzxcvbnm")).equal(false);
    });

    it("Should not accept a name too short (under 3 characters)", () => {
        expect(service.verifyGameName("le")).equal(false);
    });

    it("Should accept a name that is beetween 3 and 20 characters", () => {
        expect(service.verifyGameName("Jhonny")).equal(true);
    });

    it("findFreeGameName should return false when searching for gameName 'p' ", async () => {
        let result: boolean = false;
        service.findFreeGameName("p").then((res: boolean ) => {
            result = res;
        }).catch((e: Error) => { console.error(e); });
        expect(result).to.equal(false);
      });

});
