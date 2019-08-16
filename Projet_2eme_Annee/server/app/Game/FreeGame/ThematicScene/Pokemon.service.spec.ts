import { expect } from "chai";
import { Position } from "../GeometricScene/Position";
import { PokemonService } from "./Pokemon.service";

describe("Test PokemonService", () => {
    // tslint:disable-next-line:no-magic-numbers
    const service: PokemonService = new PokemonService(new Position(0, 0));

    it("Should make a clone of a pokemon with the same attributes", () => {
        const clone: PokemonService = service.clone();

        expect(clone.coordinates.positionX).equal(service.coordinates.positionX);
        expect(clone.coordinates.positionY).equal(service.coordinates.positionY);
        expect(clone.name).equal(service.name);
        expect(clone.size).equal(service.size);
        expect(clone.diffName).equal(service.diffName);
        expect(clone.textureDir).equal(service.textureDir);
    });

    it("Should generate a random pokemon", () => {
        const pokemon1: PokemonService = new PokemonService(new Position(0, 0));
        const pokemon2: PokemonService = new PokemonService(new Position(0, 0));
        pokemon1.generatePokemon();
        pokemon2.generatePokemon();

        while (pokemon1.name === pokemon2.name) {
            pokemon1.generatePokemon();
        }

        expect(pokemon1.name).not.equal(pokemon2.name);
    });

    it("This function is expected to return a string", () => {
        expect(service.generateTexture()).to.be.a("string");
    });

    it("Should split a string in two: [length-1, lastChar]", () => {
        const pokemonInfo: string[] = service.extractPokemonsInfo("Pika&1");

        expect(pokemonInfo[0]).equal("Pika");
        expect(pokemonInfo[1]).equal("1");
    });
});
