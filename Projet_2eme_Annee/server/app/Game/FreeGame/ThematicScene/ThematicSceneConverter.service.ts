import { injectable } from "inversify";
import "reflect-metadata";
import {CriteresDifferences} from "../../../../../common/3DView/FreeGamesInterfaces";
import {Pokemon} from "../../../../../common/3DView/ThematicScene/Pokemon";
import {ThematicScene} from "../../../../../common/3DView/ThematicScene/ThematicScene";
import { PokemonService } from "./Pokemon.service";
import { ThematicDiffGenerator } from "./ThematicDiffGenerator.service";
import { ThematicSceneService } from "./ThematicScene.service";

@injectable()
export class ThematicSceneConverter {
    public modifications: CriteresDifferences;
    public constructor() {
        this.modifications = {changeColor: true, addItem: true, deleteItem: true};
    }
    public generateSceneContent(nbObjects: number): ThematicSceneService {
            return new ThematicSceneService(nbObjects);
    }

    public generateModifiedScene(originaleScene: ThematicSceneService, criterias: CriteresDifferences): ThematicScene {
        const diffGenerator: ThematicDiffGenerator = new ThematicDiffGenerator(originaleScene);

        const scene: ThematicSceneService = diffGenerator.generateModifiedScene(criterias.changeColor, criterias.addItem,
                                                                                criterias.deleteItem);

        return this.convertToScene3D(scene);
    }

    public convertToPokemon(pokemon: PokemonService): Pokemon {
        const newPokemon: Pokemon = {name : "", size: 0, coordinates: {x: 0, y: 0, z: 0}, textureDir: "",
                                     rotation: 1, diffName: ""};
        newPokemon.name = pokemon.name;
        newPokemon.textureDir = pokemon.textureDir;
        newPokemon.size = pokemon.size;
        newPokemon.rotation = pokemon.coordinates.rotation;
        newPokemon.diffName = pokemon.diffName;

        newPokemon.coordinates.x = pokemon.coordinates.positionX;
        newPokemon.coordinates.y = pokemon.coordinates.positionY;
        newPokemon.coordinates.z = pokemon.coordinates.positionZ;

        return newPokemon;
    }

    public convertToScene3D(scene: ThematicSceneService): ThematicScene {
        const newScene: ThematicScene = {pokemons: []};

        scene.pokemons.forEach((pokemon: PokemonService) => {
            newScene.pokemons.push(this.convertToPokemon(pokemon));
        });

        return newScene;
    }

    public generateScenes(quantity: number): ThematicScene[] {
        const sceneService: ThematicSceneService = this.generateSceneContent(quantity);

        const modifiedScene: ThematicScene = this.generateModifiedScene(sceneService, this.modifications);

        const originaleScene: ThematicScene = this.convertToScene3D(sceneService);
        const scenes: ThematicScene[] = [];
        scenes.push(originaleScene);
        scenes.push(modifiedScene);

        return scenes;
    }
}
