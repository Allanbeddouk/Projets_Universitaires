import { expect } from "chai";
import { Pokemon } from "../../../../../common/3DView/ThematicScene/Pokemon";
import { ThematicScene } from "../../../../../common/3DView/ThematicScene/ThematicScene";
import { Position } from "../GeometricScene/Position";
import { PokemonService } from "./Pokemon.service";
import { ThematicSceneService } from "./ThematicScene.service";
import { ThematicSceneConverter } from "./ThematicSceneConverter.service";

describe("Test ThematicSceneConverter", () => {
    // tslint:disable:no-magic-numbers
    const sceneConverterService: ThematicSceneConverter = new ThematicSceneConverter();
    const thematicSceneService: ThematicSceneService = new ThematicSceneService(10);

    it("Should return a ThematicSceneService with 5 pokemons", () => {
        const s: ThematicSceneService = sceneConverterService.generateSceneContent(5);
        expect(s.pokemons.length).equal(5);
    });

    it("Both scenes should contain the same amount of pokemons", () => {
        const scene: ThematicScene = sceneConverterService.generateModifiedScene(thematicSceneService, {changeColor: true,
                                                                                                        addItem: false, deleteItem: false});
        expect(scene.pokemons.length === thematicSceneService.pokemons.length);
    });

    it("Both scenes shouldn't contain the same amount of pokemons (modified contains one more)", () => {
        const scene: ThematicScene = sceneConverterService.generateModifiedScene(thematicSceneService,  {changeColor: true,
                                                                                                         addItem: true, deleteItem: false});
        expect(scene.pokemons.length < thematicSceneService.pokemons.length);
    });

    it("Both scenes shouldn't contain the same amount of pokemons (modified contains one less)", () => {
        const scene: ThematicScene = sceneConverterService.generateModifiedScene(thematicSceneService,  {changeColor: true,
                                                                                                         addItem: false, deleteItem: true});
        expect(scene.pokemons.length > thematicSceneService.pokemons.length);
    });

    it("Expect convertToPokemon() to return a Pokemon", () => {
        const pokemon: Pokemon = sceneConverterService.convertToPokemon(new PokemonService(new Position(0, 0)));

        expect(pokemon).to.ownProperty("name");
        expect(pokemon).to.ownProperty("size");
        expect(pokemon).to.ownProperty("coordinates");
        expect(pokemon).to.ownProperty("textureDir");
        expect(pokemon).to.ownProperty("rotation");
        expect(pokemon).to.ownProperty("diffName");
    });

    it("Should return an originale scene with 100 items and a modified scene", () => {
        const scenes: ThematicScene[] = sceneConverterService.generateScenes(100);

        expect(scenes.length).to.equal(2);
        expect(scenes[0].pokemons.length).to.equal(100);
    });

});
