import { buildSceneStructure, Position } from "../GeometricScene/Position";
import * as Random from "../GeometricScene/Random";
import { PokemonService } from "./Pokemon.service";

export class ThematicSceneService {

    public pokemons: PokemonService[];

    public positions: Position[];

    public constructor(nbItems: number) {
        this.positions = buildSceneStructure();
        this.pokemons = [];
        this.generatePokemons(nbItems);
    }

    public clone(): ThematicSceneService {
        const clonedScene: ThematicSceneService = new ThematicSceneService(1);

        clonedScene.pokemons = [];
        this.pokemons.forEach((pokemon: PokemonService) => {
            clonedScene.pokemons.push(pokemon.clone());
        });

        clonedScene.positions = [];

        this.positions.forEach((position: Position) => {
            clonedScene.positions.push(position.clone());
        });

        return clonedScene;
    }

    public generatePokemons(nbItems: number): void {
        for (let i: number = 0; i < nbItems; ++i) {
            const index: number = Random.randomNumber(0, this.positions.length - 1);
            if (this.positions[index].isUsed) {
                --i;
            } else {
                this.positions[index].isUsed = true;
                this.pokemons.push(new PokemonService(this.positions[index]));
            }
        }
    }
}
