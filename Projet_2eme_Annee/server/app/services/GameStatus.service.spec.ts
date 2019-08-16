
import { expect } from "chai";
import { GameStatusService } from "./GameStatus.service";

describe("Tests GetStatusService", () => {
    const service: GameStatusService = GameStatusService.getInstance();

    it("Should return an map with one more game in it with the value false", () => {
        service.addGame("test");
        expect(service.getGameStatus("test")).to.equal(false);
    });

    it("Should set the value of the game test to true ", () => {
        service.setGameWaiting("test");
        expect(service.getGameStatus("test")).to.equal(true);
    });

    it("Should set the value of the game test to false ", () => {
        service.setGameClosed("test");
        expect(service.getGameStatus("test")).to.equal(false);
    });

});
