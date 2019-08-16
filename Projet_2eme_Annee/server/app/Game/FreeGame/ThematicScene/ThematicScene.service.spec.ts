import { expect } from "chai";
import { ThematicSceneService } from "./ThematicScene.service";

describe("Test ThematicScene", () => {
    // tslint:disable:no-magic-numbers
    const sceneService: ThematicSceneService = new ThematicSceneService(10);

    it("Should make a clone of a scene with the same attributes", () => {
        const s: ThematicSceneService = sceneService.clone();
        expect(s.pokemons.length).equal(sceneService.pokemons.length);
        for (let i: number = 0 ; i < s.pokemons.length ; ++i) {
            expect(s.pokemons[i].coordinates.positionX).equal(sceneService.pokemons[i].coordinates.positionX);
            expect(s.pokemons[i].coordinates.positionY).equal(sceneService.pokemons[i].coordinates.positionY);
            expect(s.pokemons[i].diffName).equal(sceneService.pokemons[i].diffName);
            expect(s.pokemons[i].name).equal(sceneService.pokemons[i].name);
        }
    });

    it("Should generate 5 more pokemons when the number parameter is set to 7", () => {
        expect(sceneService.pokemons.length).equal(10);
        sceneService.generatePokemons(5);
        expect(sceneService.pokemons.length).equal(15);
    });
});
