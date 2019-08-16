import { Position } from "../GeometricScene/Position";
import * as tools from "../GeometricScene/Random";

const NB_POKEMONS: number = tools.POKEMONS.length;

const NB_TEXTURES: number = 1;

export class PokemonService {

    public name: string;

    public size: number;

    public coordinates: Position;

    public diffName: string;

    public textureDir: string;

    public alreadyModified: boolean;

    public constructor(position: Position) {
        this.diffName = "";
        this.alreadyModified = false;
        this.generatePokemon();
        this.coordinates = position;
        this.coordinates.positionY = 0;
        this.textureDir = this.generateTexture();
    }

    public clone(): PokemonService {
        const clonedItem: PokemonService = new PokemonService(new Position(0, 0));
        clonedItem.coordinates = this.coordinates.clone();

        clonedItem.name = this.name;
        clonedItem.size = this.size;
        clonedItem.diffName = this.diffName;
        clonedItem.textureDir = this.textureDir;
        clonedItem.alreadyModified = this.alreadyModified;

        return clonedItem;
    }

    public generatePokemon(): void {
        const choice: number = tools.randomNumber(0, NB_POKEMONS - 1);
        const nameAndSize: string[] = this.extractPokemonsInfo(tools.POKEMONS[choice]);
        this.name = nameAndSize[0];
        this.size = this.generateSize(+nameAndSize[1]);
    }

    public generateTexture(): string {
        const textureDir: string = this.name === "PokeBall" ? "" + tools.randomNumber(1, NB_TEXTURES) :
        "" + tools.randomNumber(1, NB_TEXTURES);

        return "/" + textureDir +  "/";
    }

    public extractPokemonsInfo(pokemonInfos: string): string[] {
        return pokemonInfos.split("&");
    }

    public generateSize(size: number): number {
        const TWO_VALUE: number = 2;

        return tools.randomNumber(size, size * TWO_VALUE);
    }

}
