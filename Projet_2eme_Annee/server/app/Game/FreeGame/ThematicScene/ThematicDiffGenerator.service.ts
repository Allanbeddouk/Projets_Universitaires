import * as Random from "../GeometricScene/Random";
import { PokemonService } from "./Pokemon.service";
import {ThematicSceneService} from "./ThematicScene.service";

const NB_MAX_DIFFERENCES: number = 7;

export class ThematicDiffGenerator {
    public modifiedScene: ThematicSceneService;
    public originalScene: ThematicSceneService;
    public constructor(scene: ThematicSceneService) {
        this.modifiedScene = scene.clone();
        this.originalScene = scene;
    }

    public nbCriterias(changeColor: boolean, addItem: boolean, deleteItem: boolean): number {
        let count: number = 0;

        if (changeColor) {
            count += 1;
        }
        if (addItem) {
            count += 1;
        }
        if (deleteItem) {
            count += 1;
        }

        return count;
    }

    public generateModifiedScene(changeColor: boolean, addItem: boolean, deleteItem: boolean): ThematicSceneService {
        const count: number = this.nbCriterias(changeColor, addItem, deleteItem);
        const TWO_VALUE: number = 2;
        const THREE_VALUE: number = 3;

        switch (count) {
            case 1: {
                this.generate1Criteria(changeColor, addItem, deleteItem);
                break;
            }
            case TWO_VALUE: {
                this.generate2Criterias(changeColor, addItem, deleteItem);
                break;
            }
            case THREE_VALUE: {
                this.generate3Criterias();
                break;
            }
            default: {
                console.error("Erreur : Il n'y a pas de critere pour modifier la scene");
                break;
            }
        }

        return this.modifiedScene;
    }

    public generate1Criteria(changeColor: boolean, addItem: boolean, deleteItem: boolean): void {
        const nbDifferences: number = 7;
        if (changeColor) {
            this.generateColorDiff(nbDifferences);
        } else if (addItem) {
            this.generateAddDiff(nbDifferences);
        } else if (deleteItem) {
            this.generateDeleteDiff(nbDifferences);
        }
    }

    public generate2Criterias(changeColor: boolean, addItem: boolean, deleteItem: boolean): void {
        const nbDifferences1: number = Random.randomNumber(1, NB_MAX_DIFFERENCES);
        const nbDifferences2: number = NB_MAX_DIFFERENCES - nbDifferences1;

        if (changeColor && addItem) {
            this.generateColorDiff(nbDifferences1);
            this.generateAddDiff(nbDifferences2);
        } else if (changeColor && deleteItem) {
            this.generateColorDiff(nbDifferences1);
            this.generateDeleteDiff(nbDifferences2);
        } else if (deleteItem && addItem) {
            this.generateDeleteDiff(nbDifferences1);
            this.generateAddDiff(nbDifferences2);
        }
    }

    public generate3Criterias(): void {
        const TWO_VALUE: number = 2;
        const nbDifferences1: number = Random.randomNumber(1, NB_MAX_DIFFERENCES - TWO_VALUE);
        const nbDifferences2: number = Random.randomNumber(1, NB_MAX_DIFFERENCES - nbDifferences1 - 1);
        const nbDifferences3: number = NB_MAX_DIFFERENCES - (nbDifferences1 + nbDifferences2);

        this.generateColorDiff(nbDifferences1);
        this.generateAddDiff(nbDifferences2);
        this.generateDeleteDiff(nbDifferences3);
    }

    public generateAddDiff(nbDifferences: number): void {
        for (let i: number = 0; i < nbDifferences; ++i) {
            this.modifiedScene.generatePokemons(1);
            this.modifiedScene.pokemons[this.modifiedScene.pokemons.length - 1].alreadyModified = true;
            this.modifiedScene.pokemons[this.modifiedScene.pokemons.length - 1].diffName = "add";
        }
    }

    public generateDeleteDiff(nbDifferences: number): void {
        for (let i: number = 0; i < nbDifferences; ++i) {
            const index: number = Random.randomNumber(0, this.modifiedScene.pokemons.length - 1);
            if (!this.modifiedScene.pokemons[index].alreadyModified) {
                const indexO: number = this.findItemInOriginale(this.modifiedScene.pokemons[index]);
                this.modifiedScene.pokemons.splice(index, 1);
                this.originalScene.pokemons[indexO].diffName = "delete";
            } else {
                --i;
            }
        }
    }

    public generateColorDiff(nbDifferences: number): void {
        for (let i: number = 0; i < nbDifferences; ++i) {
            const index: number = Random.randomNumber(0, this.modifiedScene.pokemons.length - 1);
            const diff: string = this.modifiedScene.pokemons[index].textureDir === "/1/" ? "/2/" : "/1/";
            if (!this.modifiedScene.pokemons[index].alreadyModified) {
                const indexO: number = this.findItemInOriginale(this.modifiedScene.pokemons[index]);
                this.modifiedScene.pokemons[index].diffName = "color";
                this.originalScene.pokemons[indexO].diffName = "color";
                this.modifiedScene.pokemons[index].textureDir = diff;
                this.modifiedScene.pokemons[index].alreadyModified = true;
            } else {
                --i;
            }
        }
    }

    public findItemInOriginale(item: PokemonService): number {
        let index: number = 0;
        for (let i: number = 0; i < this.originalScene.pokemons.length; ++i) {
            const sameColor: boolean = this.originalScene.pokemons[i].textureDir === item.textureDir;
            const sameX: boolean = this.originalScene.pokemons[i].coordinates.positionX === item.coordinates.positionX;
            const sameY: boolean = this.originalScene.pokemons[i].coordinates.positionY === item.coordinates.positionY;
            const sameZ: boolean = this.originalScene.pokemons[i].coordinates.positionZ === item.coordinates.positionZ;
            if (sameColor && sameX && sameY && sameZ ) {
                index = i;
                break;
            }
        }

        return index;
    }
}
