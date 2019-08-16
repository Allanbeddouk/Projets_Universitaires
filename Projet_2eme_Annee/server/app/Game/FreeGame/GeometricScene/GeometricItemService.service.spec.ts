import { expect } from "chai";
import { GeometricItemService } from "./GeometricItemService.service";
import { Position } from "./Position";

describe("Test Service SceneItem", () => {
    const item: GeometricItemService = new GeometricItemService(new Position(1, 1));

    it("Should make a clone of an item with the same attributes", () => {
        const clonedItem: GeometricItemService = item.clone();
        expect(clonedItem !== item).equal(true);
        expect(clonedItem.alreadyModified).equal(item.alreadyModified);
        expect(clonedItem.color).equal(item.color);
        expect(clonedItem.geometry).equal(item.geometry);
        expect(clonedItem.coordinates.rotation).equal(item.coordinates.rotation);
        expect(clonedItem.coordinates.positionX).equal(item.coordinates.positionX);
        expect(clonedItem.coordinates.positionY).equal(item.coordinates.positionY);
        expect(clonedItem.coordinates.positionZ).equal(item.coordinates.positionZ);
        expect(clonedItem.itemParams.length).equal(item.itemParams.length);
    });

    it("generateGeometry() should return a string", () => {
        expect(item.generateGeometry()).to.be.a("string");
    });

    it("generateParams() should return no parameters", () => {
        const fakeParams: number[] = item.generateParams("");
        // tslint:disable-next-line:no-magic-numbers
        expect(fakeParams.length).equal(1);
        // tslint:disable-next-line:no-magic-numbers
        expect(fakeParams[0]).equal(-1);
    });

    it("generateParams() should return sphere parameters (radius, widthSegments, heightSegments)", () => {
        const sphereParams: number[] = item.generateParams("sphere");
        // tslint:disable-next-line:no-magic-numbers
        expect(sphereParams.length).equal(3);
        // tslint:disable-next-line:no-magic-numbers
        expect(sphereParams[1]).equal(sphereParams[2]);
    });

    it("generateParams() should return cube parameters (depth, height, width)", () => {
        const cubeParams: number[] = item.generateParams("cube");
        // tslint:disable-next-line:no-magic-numbers
        expect(cubeParams.length).equal(3);
        // tslint:disable-next-line:no-magic-numbers
        expect(cubeParams[0] === cubeParams[1] && cubeParams[1] === cubeParams[2] ).equal(true);
    });

    it("generateParams() should return cone parameters (radius, height, widthSegments, heightSegments)", () => {
        const coneParams: number[] = item.generateParams("cone");
        // tslint:disable-next-line:no-magic-numbers
        expect(coneParams.length).equal(4);
        // tslint:disable-next-line:no-magic-numbers
        expect(coneParams[2]).equal(coneParams[3]);
    });

    it("generateParams() should return cylinder parameters (topRadius, bottomRadius, height, widthSegments, heightSegments)", () => {
        const cylinderParams: number[] = item.generateParams("cylinder");
        // tslint:disable-next-line:no-magic-numbers
        expect(cylinderParams.length).equal(5);
        // tslint:disable-next-line:no-magic-numbers
        expect(cylinderParams[0]).equal(cylinderParams[1]);
        // tslint:disable-next-line:no-magic-numbers
        expect(cylinderParams[3]).equal(cylinderParams[4]);
    });

    it("generateParams() should return pyramid parameters (height)", () => {
        expect(item.generatePyramidParams().length).equal(1);
    });

    it("Should generate sphere parameters (radius, widthSegments, heightSegments)", () => {
        const sphereParams: number[] = item.generateSphereParams();
        // tslint:disable-next-line:no-magic-numbers
        expect(sphereParams.length).equal(3);
        // tslint:disable-next-line:no-magic-numbers
        expect(sphereParams[1]).equal(sphereParams[2]);
    });

    it("Should generate cube parameters (depth, height, width)", () => {
        const cubeParams: number[] = item.generateCubeParams();
        // tslint:disable-next-line:no-magic-numbers
        expect(cubeParams.length).equal(3);
        // tslint:disable-next-line:no-magic-numbers
        expect(cubeParams[0] === cubeParams[1] && cubeParams[1] === cubeParams[2] ).equal(true);
    });

    it("Should generate cone parameters (radius, height, widthSegments, heightSegments)", () => {
        const coneParams: number[] = item.generateConeParams();
        // tslint:disable-next-line:no-magic-numbers
        expect(coneParams.length).equal(4);
        // tslint:disable-next-line:no-magic-numbers
        expect(coneParams[2]).equal(coneParams[3]);
    });

    it("Should generate cylinder parameters (topRadius, bottomRadius, height, widthSegments, heightSegments)", () => {
        const cylinderParams: number[] = item.generateCylinderParams();
        // tslint:disable-next-line:no-magic-numbers
        expect(cylinderParams.length).equal(5);
        // tslint:disable-next-line:no-magic-numbers
        expect(cylinderParams[0]).equal(cylinderParams[1]);
        // tslint:disable-next-line:no-magic-numbers
        expect(cylinderParams[3]).equal(cylinderParams[4]);
    });

    it("Should generate pyramid parameters (height)", () => {
        expect(item.generatePyramidParams().length).equal(1);
    });

});
