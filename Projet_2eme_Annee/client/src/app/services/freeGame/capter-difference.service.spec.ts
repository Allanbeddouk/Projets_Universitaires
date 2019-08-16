import {TestBed } from "@angular/core/testing";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import * as THREE from "three";
import Spy = jasmine.Spy;
import { mock } from "ts-mockito";
import { CameraService } from "../../services/freeGame/vue3D/camera.service";
import { CaptureEcranVue3DService } from "../../services/freeGame/vue3D/captureEcranVue3d.service";
import { Scene3DService } from "../../services/freeGame/vue3D/scene3-d.service";
import { Vue3DService } from "../../services/freeGame/vue3D/vue3-d.service";
import { GeometricDifferenceService } from "../freeGame/geomScene/geometric-difference.service";
import { GeometricGenerationService } from "../freeGame/geomScene/geometric-generation.service";
import { ThematicDifferenceService } from "../freeGame/themeScene/thematic-difference.service";
import { ThematicGenerationService } from "../freeGame/themeScene/thematic-generation.service";
import { HandleViewsService } from "../handle-views.service";
import { CapterDifferenceService } from "./capter-difference.service";

describe("CapterDifferenceService", () => {
  const cameraService: CameraService = new CameraService();
  const sceneService: Scene3DService = new Scene3DService();
  const screenShotService: CaptureEcranVue3DService = new CaptureEcranVue3DService();
  const geometricService: GeometricGenerationService = new GeometricGenerationService(screenShotService, cameraService, sceneService);
  const thematicService: ThematicGenerationService = new ThematicGenerationService(sceneService, cameraService, screenShotService);
  const vue3DService: Vue3DService = new Vue3DService(geometricService, thematicService);
  const geometricDiffService: GeometricDifferenceService =
  new GeometricDifferenceService(vue3DService, mock(HandleViewsService), mock(WebSocketCommunications));
  const thematicDiffService: ThematicDifferenceService =
  new ThematicDifferenceService(vue3DService, mock(HandleViewsService), mock(WebSocketCommunications));
  const service: CapterDifferenceService =
  new CapterDifferenceService(vue3DService, cameraService, geometricDiffService, thematicDiffService);
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: "red" });
  const intersection: THREE.Intersection = {
    distance: 1,
    point: new THREE.Vector3(1, 1, 1),
    object: new THREE.Mesh(geometry, material),
  };

  const intersections1: THREE.Intersection[] = [];
  const intersections2: THREE.Intersection[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return that there is a Add difference at position (0.5,0.5)", () => {
    const leftScene: HTMLCanvasElement = document.createElement("canvas");
    const rightScene: HTMLCanvasElement = document.createElement("canvas");
    vue3DService.geometricGeneration.renderers[0] = sceneService.createRenderer(leftScene);
    vue3DService.geometricGeneration.renderers[1] = sceneService.createRenderer(rightScene);

    const box2: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mat2: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: "green" });
    vue3DService.geometricGeneration.scenes[1].add(new THREE.Mesh(box2, mat2));
    // tslint:disable-next-line:no-magic-numbers
    expect(service.handleUserClick({x: 0.5, y: 0.5})).toBe(false);
  });

  it("updateDeleteDifference should be called", () => {
    const spy: Spy = spyOn(service, "updateDeleteDifference").and.callThrough();
    intersections1.push(intersection);
    service.isGeometric = false;
    service.updateDeleteDifference({x: 0, y: 0, z: 0});
    expect(spy).toHaveBeenCalled();
  });

  it("updateColorDifference should be called", () => {
    const spy: Spy = spyOn(service, "updateColorDifference").and.callThrough();
    intersections1.push(intersection);
    service.isGeometric = false;
    service.updateColorDifference({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});
    expect(spy).toHaveBeenCalled();
  });

  it("updateAddDifference should be called", () => {
    const spy: Spy = spyOn(service, "updateAddDifference").and.callThrough();
    intersections1.push(intersection);
    service.isGeometric = false;
    service.updateAddDifference({x: 0, y: 0, z: 0});
    expect(spy).toHaveBeenCalled();
  });

  it("should return that there is a Delete difference at position (0.5,0.5)", () => {
    const leftScene: HTMLCanvasElement = document.createElement("canvas");
    const rightScene: HTMLCanvasElement = document.createElement("canvas");
    vue3DService.geometricGeneration.renderers[0] = sceneService.createRenderer(leftScene);
    vue3DService.geometricGeneration.renderers[1] = sceneService.createRenderer(rightScene);
    const box: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mat: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: "red" });
    vue3DService.geometricGeneration.scenes[0].add(new THREE.Mesh(box, mat));

    // tslint:disable-next-line:no-magic-numbers
    expect(service.handleUserClick({x: 0.5, y: 0.5})).toBe(false);
  });

  it("should return that there is a Color difference at position (0.5,0.5)", () => {
    const leftScene: HTMLCanvasElement = document.createElement("canvas");
    const rightScene: HTMLCanvasElement = document.createElement("canvas");
    vue3DService.geometricGeneration.renderers[0] = sceneService.createRenderer(leftScene);
    vue3DService.geometricGeneration.renderers[1] = sceneService.createRenderer(rightScene);
    const box: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mat: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: "red" });
    vue3DService.geometricGeneration.scenes[0].add(new THREE.Mesh(box, mat));

    const box2: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mat2: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: "green" });
    vue3DService.geometricGeneration.scenes[1].add(new THREE.Mesh(box2, mat2));
    // tslint:disable-next-line:no-magic-numbers
    expect(service.handleUserClick({x: 0.5, y: 0.5})).toBe(false);
  });

  it("checkDifferences should return true when the size of the intersections is different", () => {
    const spy: Spy = spyOn(service, "checkDifferences").and.callThrough();
    intersections1.push(intersection);
    const result: boolean = service.checkDifferences(intersections1, intersections2);
    expect(spy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it("checkDifferences should return true when the objects are different", () => {
    const mesh: THREE.Mesh = new THREE.Mesh(new THREE.CylinderGeometry(), material);
    const intersectionBis: THREE.Intersection = {
      distance: 1,
      point: new THREE.Vector3(1, 1, 1),
      object: mesh,
    };
    const spy: Spy = spyOn(service, "checkDifferences").and.callThrough();
    intersections1.push(intersectionBis);
    intersections2.push(intersection);

    const result: boolean = service.checkDifferences(intersections1, intersections2);
    expect(spy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it("checkColorDifference should return false when the objects are same color", () => {
    const spy: Spy = spyOn(service, "checkColorDifference").and.callThrough();
    service.isGeometric = true;
    const mesh: THREE.Mesh = new THREE.Mesh(new THREE.CylinderGeometry(), material);
    const intersectionBis: THREE.Intersection = {
      distance: 1,
      point: new THREE.Vector3(1, 1, 1),
      object: mesh,
    };
    intersections1.push(intersectionBis);
    intersections2.push(intersection);
    const result: boolean = service.checkColorDifference(intersections1, intersections2);
    expect(spy).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });

  it("handleSizeScenesDifference should be called and should called handleDeleteDifference", () => {
    const spy: Spy = spyOn(service, "handleSizeScenesDifference").and.callThrough();
    const spyHandle: Spy = spyOn(service, "handleDeleteDifference").and.callThrough();
    intersections1.push(intersection);
    service.handleSizeScenesDifference(intersections1, intersections2);
    expect(spy).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalled();
  });

  it("handleSizeScenesDifference should be called and should called handleAddDifference", () => {
    const spy: Spy = spyOn(service, "handleSizeScenesDifference").and.callThrough();
    const spyHandle: Spy = spyOn(service, "handleAddDifference").and.callThrough();
    intersections1.push(intersection);
    service.handleSizeScenesDifference(intersections2, intersections1);
    expect(spy).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalled();
  });

  it("handleAddDifference should be called", () => {
    const spy: Spy = spyOn(service, "handleAddDifference").and.callThrough();
    intersections2.push(intersection);
    service.isGeometric = true;
    service.handleAddDifference(intersections2, intersections1);
    expect(spy).toHaveBeenCalled();
  });

  it("handleDeleteDifference should be called", () => {
    const spy: Spy = spyOn(service, "handleDeleteDifference").and.callThrough();
    service.handleDeleteDifference(intersections2, intersections1);
    expect(spy).toHaveBeenCalled();
  });

  it("handleDeleteDifference should be called", () => {
    const spy: Spy = spyOn(service, "handleDeleteDifference").and.callThrough();
    intersections1.push(intersection);
    service.handleDeleteDifference(intersections2, intersections1);
    expect(spy).toHaveBeenCalled();
  });

  it("updateDeleteDifference should be called", () => {
    const spy: Spy = spyOn(service, "updateDeleteDifference").and.callThrough();
    intersections1.push(intersection);
    service.updateDeleteDifference({x: 0, y: 0, z: 0});
    expect(spy).toHaveBeenCalled();
  });

  it("updateColorDifference should be called", () => {
    const spy: Spy = spyOn(service, "updateColorDifference").and.callThrough();
    intersections1.push(intersection);
    service.updateColorDifference({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});
    expect(spy).toHaveBeenCalled();
  });

  it("updateAddDifference should be called", () => {
    const spy: Spy = spyOn(service, "updateAddDifference").and.callThrough();
    intersections1.push(intersection);
    service.updateAddDifference({x: 0, y: 0, z: 0});
    expect(spy).toHaveBeenCalled();
  });
});
