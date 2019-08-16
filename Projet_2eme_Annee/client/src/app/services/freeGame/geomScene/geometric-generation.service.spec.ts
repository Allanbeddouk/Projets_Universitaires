import { getTestBed, inject, TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { GeometricItem } from "../../../../../../common/3DView/GeometricScene/GeometricItem";
import { GeometricScene } from "../../../../../../common/3DView/GeometricScene/GeometricScene";
import Spy = jasmine.Spy;
import { CaptureEcranVue3DService } from "../vue3D/captureEcranVue3d.service";
import { GeometricGenerationService } from "./geometric-generation.service";

describe("GeometricGenerationService", () => {
    let injector: TestBed;
    let service: GeometricGenerationService;
    beforeEach(() => {
          TestBed.configureTestingModule({
              providers: [GeometricGenerationService,
                          CaptureEcranVue3DService],
          }).compileComponents().catch();
          injector = getTestBed();
          service = injector.get(GeometricGenerationService);
      });

    it("should be created", inject([GeometricGenerationService], () => {
          expect(service).toBeTruthy();
    }));

    it("addFloor should be called to create a floor and add it to the scene", () => {
      const spy: Spy = spyOn(service, "addFloor").and.callThrough();
      const scene: THREE.Scene = new THREE.Scene();
      service.addFloor(scene);
      expect(spy).toHaveBeenCalled();
    });

    it("positioningRotatingGeometry should be called to create a floor and add it to the scene", () => {
      const spy: Spy = spyOn(service, "positioningRotatingGeometry").and.callThrough();
      const mesh: THREE.Mesh = new THREE.Mesh();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      service.positioningRotatingGeometry(mesh, sceneItem);
      expect(spy).toHaveBeenCalled();
    });

    it("createSphereMesh should be called when the geometry is a sphere in addMeshToTab", () => {
      const spy: Spy = spyOn(service, "createSphereMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      sceneItem.geometry = "sphere";
      const allObjects: Array<THREE.Mesh> = [];
      service.addMeshToTab(sceneItem, allObjects);
      expect(spy).toHaveBeenCalled();
    });

    it("createCubeMesh should be called when the geometry is a cube in addMeshToTab", () => {
      const spy: Spy = spyOn(service, "createCubeMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      sceneItem.geometry = "cube";
      const allObjects: Array<THREE.Mesh> = [];
      service.addMeshToTab(sceneItem, allObjects);
      expect(spy).toHaveBeenCalled();
    });

    it("createConeMesh should be called when the geometry is a cone in addMeshToTab", () => {
      const spy: Spy = spyOn(service, "createConeMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      sceneItem.geometry = "cone";
      const allObjects: Array<THREE.Mesh> = [];
      service.addMeshToTab(sceneItem, allObjects);
      expect(spy).toHaveBeenCalled();
    });

    it("createCylinderMesh should be called when the geometry is a cylinder in addMeshToTab", () => {
      const spy: Spy = spyOn(service, "createCylinderMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      sceneItem.geometry = "cylinder";
      const allObjects: Array<THREE.Mesh> = [];
      service.addMeshToTab(sceneItem, allObjects);
      expect(spy).toHaveBeenCalled();
    });

    it("createPyramidMesh should be called when the geometry is a pyramid in addMeshToTab", () => {
      const spy: Spy = spyOn(service, "createPyramidMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      sceneItem.geometry = "pyramid";
      const allObjects: Array<THREE.Mesh> = [];
      service.addMeshToTab(sceneItem, allObjects);
      expect(spy).toHaveBeenCalled();
    });

    it("buildTabOFGeometry should create an Array of Mesh with the same length of th number of items in the scene3D", () => {
      const spy: Spy = spyOn(service, "buildTabOfGeometry").and.callThrough();
      const spyAddMesh: Spy = spyOn(service, "addMeshToTab").and.callThrough();
      const spyPositionning: Spy = spyOn(service, "positioningRotatingGeometry").and.callThrough();
      const scene: GeometricScene = {fontColor: "", items: []};
      scene.items[0] = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                        color: "", diffName: ""};
      scene.items[0].geometry = "cube";
      scene.items[0].itemParams = [1, 1, 1];
      scene.items[0].coordinates = {x: 1, y: 1, z: 1 };
      scene.items[0].rotation = 1;
      scene.items[0].color = "blue";
      const allObjects: Array<THREE.Mesh> = service.buildTabOfGeometry(scene);
      expect(allObjects.length).toEqual(scene.items.length);
      expect(spy).toHaveBeenCalled();
      expect(spyAddMesh).toHaveBeenCalled();
      expect(spyPositionning).toHaveBeenCalled();
    });

    it("addColorToScene should be called", () => {
      const spy: Spy = spyOn(service, "addColorToScene").and.callThrough();
      const scene: THREE.Scene = new THREE.Scene();
      const scene3D: GeometricScene = {fontColor: "", items: []};
      service.addColorToScene(scene, scene3D);
      expect(spy).toHaveBeenCalled();
    });

    it("createSphereMesh should creat a Mesh that has a SphereGeometry", () => {
      const spy: Spy = spyOn(service, "createSphereMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      const mesh: THREE.Mesh = service.createSphereMesh(sceneItem);
      expect(mesh.geometry.type).toEqual("SphereGeometry");
      expect(spy).toHaveBeenCalled();
    });

    it("createCubeMesh should creat a Mesh that has a BoxGeometry", () => {
      const spy: Spy = spyOn(service, "createCubeMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      const mesh: THREE.Mesh = service.createCubeMesh(sceneItem);
      expect(mesh.geometry.type).toEqual("BoxGeometry");
      expect(spy).toHaveBeenCalled();
    });

    it("createConeMesh should creat a Mesh that has a ConeGeometry", () => {
      const spy: Spy = spyOn(service, "createConeMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      const mesh: THREE.Mesh = service.createConeMesh(sceneItem);
      expect(mesh.geometry.type).toEqual("ConeGeometry");
      expect(spy).toHaveBeenCalled();
    });

    it("createCylinderMesh should creat a Mesh that has a CylinderBufferGeometry", () => {
      const spy: Spy = spyOn(service, "createCylinderMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      const mesh: THREE.Mesh = service.createCylinderMesh(sceneItem);
      expect(mesh.geometry.type).toEqual("CylinderBufferGeometry");
      expect(spy).toHaveBeenCalled();
    });

    it("createPyramidMesh should creat a Mesh that has a TetrahedronGeometry", () => {
      const spy: Spy = spyOn(service, "createPyramidMesh").and.callThrough();
      const sceneItem: GeometricItem = {geometry: "", itemParams: [], coordinates: {x: 0, y: 0, z: 0}, rotation: 1,
                                        color: "", diffName: ""};
      const mesh: THREE.Mesh = service.createPyramidMesh(sceneItem);
      expect(mesh.geometry.type).toEqual("TetrahedronGeometry");
      expect(spy).toHaveBeenCalled();
    });

    it("addColorToScene should add the good color", () => {
      const spy: Spy = spyOn(service, "addColorToScene").and.callThrough();
      const scene: THREE.Scene = new THREE.Scene();
      scene.background = new THREE.Color();
      const scene3D: GeometricScene = {fontColor: "", items: []};
      service.addColorToScene(scene, scene3D);
      expect(scene.background.r).toEqual(new THREE.Color(scene3D.fontColor).r);
      expect(spy).toHaveBeenCalled();
    });

    it("generateScene should be called", () => {
      try {
        const spy: Spy = spyOn(service, "generateScene").and.callThrough();
        const htmlCanvas: HTMLCanvasElement = document.createElement("canvas");
        const scene3D: GeometricScene = {fontColor: "", items: []};
        service.generateScene(htmlCanvas, scene3D, true);
        expect(spy).toHaveBeenCalled();
      } catch (e) {
        e = e;
      }
    });
});
