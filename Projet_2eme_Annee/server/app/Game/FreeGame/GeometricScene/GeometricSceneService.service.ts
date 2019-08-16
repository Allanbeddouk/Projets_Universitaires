import { GeometricItemService } from "./GeometricItemService.service";
import { buildSceneStructure, Position } from "./Position";
import * as Random from "./Random";

export class GeometricSceneService {

    public items: GeometricItemService[];

    public fontColor: string;

    public positions: Position[];

    public constructor(nbItems: number) {
        this.fontColor = Random.randomColor();
        this.positions = buildSceneStructure();
        this.items = [];
        this.generateSceneItems(nbItems);
    }

    public clone(): GeometricSceneService {
        const clonedScene: GeometricSceneService = new GeometricSceneService(1);

        clonedScene.fontColor = this.fontColor;

        clonedScene.items = [];
        this.items.forEach((item: GeometricItemService) => {
            clonedScene.items.push(item.clone());
        });

        clonedScene.positions = [];

        this.positions.forEach((position: Position) => {
            clonedScene.positions.push(position.clone());
        });

        return clonedScene;
    }

    public generateSceneItems(nbItems: number): void {
        for (let i: number = 0; i < nbItems; ++i) {
            const index: number = Random.randomNumber(0, this.positions.length - 1);
            if (this.positions[index].isUsed) {
                --i;
            } else {
                this.positions[index].isUsed = true;
                this.items.push(new GeometricItemService(this.positions[index]));
            }
        }
    }
}
