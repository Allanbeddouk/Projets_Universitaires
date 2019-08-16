import { injectable } from "inversify";
import "reflect-metadata";
import {CriteresDifferences} from "../../../../../common/3DView/FreeGamesInterfaces";
import {GeometricItem} from "../../../../../common/3DView/GeometricScene/GeometricItem";
import {GeometricScene} from "../../../../../common/3DView/GeometricScene/GeometricScene";
import { GeometricDiffGenerator } from "./GeometricDiffGenerator.service";
import { GeometricItemService } from "./GeometricItemService.service";
import { GeometricSceneService } from "./GeometricSceneService.service";
@injectable()
export class GeometricConverter {
    public modifications: CriteresDifferences;
    public constructor() {
        this.modifications = {changeColor: true, addItem: true, deleteItem: true};
    }

    public generateSceneContent(nbObjects: number): GeometricSceneService {
            return new GeometricSceneService(nbObjects);
    }

    public generateModifiedScene(originaleScene: GeometricSceneService, criterias: CriteresDifferences): GeometricScene {
        const diffGenerator: GeometricDiffGenerator = new GeometricDiffGenerator(originaleScene);

        const scene: GeometricSceneService = diffGenerator.generateModifiedScene(criterias.changeColor, criterias.addItem,
                                                                                 criterias.deleteItem);

        return this.convertToScene3D(scene);
    }

    public convertToGeometricItem(item: GeometricItemService): GeometricItem {
        const newItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
        newItem.color = item.color;
        newItem.geometry = item.geometry;
        newItem.rotation = item.coordinates.rotation;
        newItem.diffName = item.diffName;

        item.itemParams.forEach((param: number) => {
            newItem.itemParams.push(param);
        });

        newItem.coordinates.x = item.coordinates.positionX;
        newItem.coordinates.y = item.coordinates.positionY;
        newItem.coordinates.z = item.coordinates.positionZ;

        return newItem;
    }

    public convertToScene3D(scene: GeometricSceneService): GeometricScene {
        const newScene: GeometricScene = {fontColor: "", items: []};
        newScene.fontColor = scene.fontColor;

        scene.items.forEach((item: GeometricItemService) => {
            newScene.items.push(this.convertToGeometricItem(item));
        });

        return newScene;
    }

    public generateScenes(quantity: number): GeometricScene[] {
        const sceneService: GeometricSceneService = this.generateSceneContent(quantity);
        const modifiedScene: GeometricScene = this.generateModifiedScene(sceneService, this.modifications);
        const originaleScene: GeometricScene = this.convertToScene3D(sceneService);
        const scenes: GeometricScene[] = [];
        scenes.push(originaleScene);
        scenes.push(modifiedScene);

        return scenes;
    }
}
