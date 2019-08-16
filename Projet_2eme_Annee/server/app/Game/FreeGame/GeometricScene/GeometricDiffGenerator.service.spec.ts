import { expect } from "chai";
import { GeometricDiffGenerator } from "./GeometricDiffGenerator.service";
import { GeometricSceneService } from "./GeometricSceneService.service";

describe("Test Service SceneDiffGenerator", () => {
    // tslint:disable-next-line:no-magic-numbers
    const originaleScene: GeometricSceneService = new GeometricSceneService(7);

    it("Should return that there is 1 criteria (addItem)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        expect(diffGenerator.nbCriterias(false, true, false)).equal(1);
    });

    it("Should return that there is 3 criterias (deleteItem, changeColor and addItem)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        // tslint:disable-next-line:no-magic-numbers
        expect(diffGenerator.nbCriterias(true, true, true)).equal(3);
    });

    it("Should return that there is 2 criteria (changeColor and addItem)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        // tslint:disable-next-line:no-magic-numbers
        expect(diffGenerator.nbCriterias(true, true, false)).equal(2);
    });

    it("The modified scene should be the same since there is no criteria", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(false, false, false);

        expect(modifiedScene).equal(diffGenerator.modifiedScene);
    });

    it("The modified scene should be different from the originale (color of some items, items added, items deleted)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(true, true, true);

        expect(modifiedScene !== originaleScene).equal(true);
    });

    it("The modified scene should be different from the originale (color of some items and should have more items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(true, true, false);

        expect(modifiedScene.items.length >= originaleScene.items.length).equal(true);
    });

    it("The modified scene should be different from the originale (color of some items and should have less items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(true, false, true);

        expect(modifiedScene.items.length <= originaleScene.items.length).equal(true);
    });

    it("The modified scene should be different from the originale (should have deleted and added items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(false, true, true);

        expect(modifiedScene !== originaleScene).equal(true);
    });

    it("The modified scene should be different from the originale (should have 7 less items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(false, false, true);

        // tslint:disable-next-line:no-magic-numbers
        expect(modifiedScene.items.length + 7 === originaleScene.items.length).equal(true);
    });

    it("The modified scene should be different from the originale (items should have different colors)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(true, false, false);

        // tslint:disable-next-line:no-magic-numbers
        expect(modifiedScene.items[3].color !== originaleScene.items[3].color).equal(true);
    });

    it("The modified scene should be different from the originale (should have 7 more items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        const modifiedScene: GeometricSceneService = diffGenerator.generateModifiedScene(false, true, false);

        // tslint:disable-next-line:no-magic-numbers
        expect(modifiedScene.items.length - 7 === originaleScene.items.length).equal(true);
    });

    it("Should change color of 7 items from the originale scene", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate1Criteria(true, false, false);

        expect(diffGenerator.modifiedScene.items[0].color !== originaleScene.items[0].color).equal(true);
    });

    it("Should add 7 items from the originale scene", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate1Criteria(false, true, false);
        // tslint:disable-next-line:no-magic-numbers
        expect(diffGenerator.modifiedScene.items.length - 7 === originaleScene.items.length).equal(true);
    });

    it("Should delete 7 items from the originale scene", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate1Criteria(false, false, true);
        // tslint:disable-next-line:no-magic-numbers
        expect(diffGenerator.modifiedScene.items.length + 7 === originaleScene.items.length).equal(true);
    });

    it("The modified scene should be different from the originale (should have less items and should have more items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate2Criterias(false, true, true);
        expect(diffGenerator.modifiedScene !== originaleScene).equal(true);
    });

    it("The modified scene should be different from the originale (color of some items and should have less items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate2Criterias(true, false, true);
        expect(diffGenerator.modifiedScene.items.length <= originaleScene.items.length).equal(true);
    });

    it("The modified scene should be different from the originale (color of some items and should have more items)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate2Criterias(true, true, false);
        expect(diffGenerator.modifiedScene.items.length >= originaleScene.items.length).equal(true);
    });

    it("The modified scene should be different from the originale (color of some items, items added, items deleted)", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generate3Criterias();

        expect(diffGenerator.modifiedScene !== originaleScene).equal(true);
    });

    it("Should add a random item to the scene", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generateAddDiff(1);

        expect(diffGenerator.modifiedScene.items.length >= originaleScene.items.length).equal(true);
    });

    it("Should change color of a random item of the scene", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generateColorDiff(1);

        expect(diffGenerator.modifiedScene !== originaleScene).equal(true);
    });

    it("Should delete a random item of the scene", () => {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);
        diffGenerator.generateDeleteDiff(1);

        expect(diffGenerator.modifiedScene.items.length <= originaleScene.items.length).equal(true);
    });
});
