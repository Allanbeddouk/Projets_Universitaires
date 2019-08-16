import { expect } from "chai";
import {Constants} from "../../../../../common/3DView/Constants";
import { GeometricSceneService } from "./GeometricSceneService.service";
import { buildSceneStructure} from "./Position";

describe("Test Service Scene3D", () => {
    // tslint:disable-next-line:no-magic-numbers
    const scene: GeometricSceneService = new GeometricSceneService(10);

    it("Should make a clone of a scene with the same attributes", () => {
        const s: GeometricSceneService = scene.clone();
        expect(s.fontColor).equal(scene.fontColor);
        for (let i: number = 0 ; i < s.items.length ; ++i) {
            expect(s.items[i].color).equal(scene.items[i].color);
            expect(s.items[i].geometry).equal(scene.items[i].geometry);
            expect(s.items[i].alreadyModified).equal(scene.items[i].alreadyModified);
            expect(s.items[i].coordinates.rotation).equal(scene.items[i].coordinates.rotation);
            expect(s.items[i].coordinates.positionX).equal(scene.items[i].coordinates.positionX);
            expect(s.items[i].coordinates.positionY).equal(scene.items[i].coordinates.positionY);
            expect(s.items[i].coordinates.positionZ).equal(scene.items[i].coordinates.positionZ);
            expect(s.items[i].itemParams.length).equal(scene.items[i].itemParams.length);
        }
    });

    it("Should create 200 bounding boxes in the scene for sceneItems", () => {
        buildSceneStructure();
        // tslint:disable-next-line:no-magic-numbers
        expect(scene.positions.length).equal(Constants.BOUNDING_SIZE * Constants.BOUNDING_SIZE);
    });

    it("Should generate 10 sceneItems in the Scene", () => {
        // tslint:disable-next-line:no-magic-numbers
        const s: GeometricSceneService = new GeometricSceneService(10);
        // tslint:disable-next-line:no-magic-numbers
        expect(s.items.length).equal(10);
    });
});
