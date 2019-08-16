import { expect } from "chai";
import { ThematicDiffGenerator } from "./ThematicDiffGenerator.service";
import { ThematicSceneService } from "./ThematicScene.service";

describe("Test ThematicDiffGenerator", () => {
    // tslint:disable:no-magic-numbers
    const service: ThematicDiffGenerator = new ThematicDiffGenerator(new ThematicSceneService(7));
    const sceneOG: ThematicSceneService = new ThematicSceneService(7);

    it("Should return 3 when the three parameters in nbCriterias are set to true", () => {
        expect(service.nbCriterias(true, true, true)).equal(3);
    });

    it("Should return 2 when two parameters in nbCriterias are set to true", () => {
        expect(service.nbCriterias(true, true, false)).equal(2);
    });

    it("Should return 1 when one parameters in nbCriterias is set to true", () => {
        expect(service.nbCriterias(true, false, false)).equal(1);
    });

    it("Should return 0 when no parameters in nbCriterias is set to true", () => {
        expect(service.nbCriterias(false, false, false)).equal(0);
    });

    it("The modified scene should be the same since there is no criteria", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(false, false, false);

        expect(modifiedScene).equal(diffGenerator.modifiedScene);
    });

    it("The modified scene should be different from the originale (color of some pokemons, pokemons added, pokemons deleted)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(true, true, true);

        expect(modifiedScene !== sceneOG).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons and should have more pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(true, true, false);

        expect(modifiedScene.pokemons.length >= sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be the same since there is no criteria", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(false, false, false);

        expect(modifiedScene).equal(diffGenerator.modifiedScene);
    });

    it("The modified scene should be different from the originale (color of some pokemons, pokemons added, pokemons deleted)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(true, true, true);

        expect(modifiedScene !== sceneOG).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons and should have more pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(true, true, false);

        expect(modifiedScene.pokemons.length >= sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons and should have less pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(true, false, true);

        expect(modifiedScene.pokemons.length <= sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be different from the originale (should have deleted and added pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(false, true, true);

        expect(modifiedScene !== sceneOG).equal(true);
    });

    it("The modified scene should be different from the originale (should have 7 less pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(false, false, true);

        // tslint:disable-next-line:no-magic-numbers
        expect(modifiedScene.pokemons.length + 7 === sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be different from the originale (pokemons should have different colors)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(true, false, false);

        // tslint:disable-next-line:no-magic-numbers
        expect(modifiedScene.pokemons[3].textureDir !== sceneOG.pokemons[3].textureDir).equal(true);
    });

    it("The modified scene should be different from the originale (should have 7 more pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        const modifiedScene: ThematicSceneService = diffGenerator.generateModifiedScene(false, true, false);

        // tslint:disable-next-line:no-magic-numbers
        expect(modifiedScene.pokemons.length - 7 === sceneOG.pokemons.length).equal(true);
    });

    it("Should change color of 7 pokemons from the originale scene", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate1Criteria(true, false, false);

        expect(diffGenerator.modifiedScene.pokemons[0].textureDir !== sceneOG.pokemons[0].textureDir).equal(true);
    });

    it("Should add 7 pokemons from the originale scene", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate1Criteria(false, true, false);
        // tslint:disable-next-line:no-magic-numbers
        expect(diffGenerator.modifiedScene.pokemons.length - 7 === sceneOG.pokemons.length).equal(true);
    });

    it("Should delete 7 pokemons from the originale scene", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate1Criteria(false, false, true);
        // tslint:disable-next-line:no-magic-numbers
        expect(diffGenerator.modifiedScene.pokemons.length + 7 === sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be different from the originale (should have less pokemons and should have more pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate2Criterias(false, true, true);
        expect(diffGenerator.modifiedScene !== sceneOG).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons and should have less pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate2Criterias(true, false, true);
        expect(diffGenerator.modifiedScene.pokemons.length <= sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons and should have more pokemons)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate2Criterias(true, true, false);
        expect(diffGenerator.modifiedScene.pokemons.length >= sceneOG.pokemons.length).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons, pokemons added, pokemons deleted)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate3Criterias();

        expect(diffGenerator.modifiedScene !== sceneOG).equal(true);
    });

    it("The modified scene should be different from the originale (color of some pokemons, pokemons added, pokemons deleted)", () => {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(sceneOG);
        diffGenerator.generate3Criterias();

        expect(diffGenerator.modifiedScene !== sceneOG).equal(true);
    });
});
