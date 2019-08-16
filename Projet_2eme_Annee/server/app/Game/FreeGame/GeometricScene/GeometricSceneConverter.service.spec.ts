import { expect } from "chai";
import { GeometricItem } from "../../../../../common/3DView/GeometricScene/GeometricItem";
import { GeometricScene } from "../../../../../common/3DView/GeometricScene/GeometricScene";
import { Position } from "../GeometricScene/Position";
import { GeometricItemService } from "./GeometricItemService.service";
import { GeometricConverter } from "./GeometricSceneConverter.service";
import { GeometricSceneService } from "./GeometricSceneService.service";

describe("Test GeometricSceneConverter", () => {
    // tslint:disable:no-magic-numbers
    const geometricSceneConverterService: GeometricConverter = new GeometricConverter();
    const geometricSceneService: GeometricSceneService = new GeometricSceneService(10);

    it("Should return a GeometricSceneService with 5 items", () => {
        const s: GeometricSceneService = geometricSceneConverterService.generateSceneContent(5);
        expect(s.items.length).equal(5);
    });

    it("Both scenes should contain the same amount of items", () => {
        const s: GeometricScene = geometricSceneConverterService.generateModifiedScene(geometricSceneService, {changeColor: true,
                                                                                                               addItem: false,
                                                                                                               deleteItem: false});
        expect(s.items.length === geometricSceneService.items.length);
    });

    it("Both scenes shouldn't contain the same amount of items (modified contains one more)", () => {
        const s: GeometricScene = geometricSceneConverterService.generateModifiedScene(geometricSceneService, {changeColor: true,
                                                                                                               addItem: true,
                                                                                                               deleteItem: false});
        expect(s.items.length < geometricSceneService.items.length);
    });

    it("Both scenes shouldn't contain the same amount of pokemons (modified contains one less)", () => {
        const s: GeometricScene = geometricSceneConverterService.generateModifiedScene(geometricSceneService, {changeColor: true,
                                                                                                               addItem: false,
                                                                                                               deleteItem: true});
        expect(s.items.length < geometricSceneService.items.length);
    });

    it("Expect convertTogeometricItem() to return a GeometricItem", () => {
        const item: GeometricItem = geometricSceneConverterService.convertToGeometricItem(new GeometricItemService(new Position(0, 0)));

        expect(item).to.ownProperty("geometry");
        expect(item).to.ownProperty("itemParams");
        expect(item).to.ownProperty("coordinates");
        expect(item).to.ownProperty("color");
        expect(item).to.ownProperty("rotation");
        expect(item).to.ownProperty("diffName");
    });

    it("Should return an originale scene with 100 items and a modified scene", () => {
        const scenes: GeometricScene[] = geometricSceneConverterService.generateScenes(100);

        expect(scenes.length).to.equal(2);
        expect(scenes[0].items.length).to.equal(100);
    });
});
