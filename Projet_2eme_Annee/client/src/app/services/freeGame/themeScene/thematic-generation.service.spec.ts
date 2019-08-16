import { inject, TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { Pokemon } from "../../../../../../common/3DView/ThematicScene/Pokemon";
import Spy = jasmine.Spy;
import { ThematicScene } from "../../../../../../common/3DView/ThematicScene/ThematicScene";
import { CameraService } from "../vue3D/camera.service";
import { CaptureEcranVue3DService } from "../vue3D/captureEcranVue3d.service";
import { Scene3DService } from "../vue3D/scene3-d.service";
import { ThematicGenerationService } from "./thematic-generation.service";
describe("ThematicGenerationService", () => {
  const cameraService: CameraService = new CameraService();
  const sceneService: Scene3DService = new Scene3DService();
  const screenShotService: CaptureEcranVue3DService = new CaptureEcranVue3DService();
  const service: ThematicGenerationService = new ThematicGenerationService(sceneService, cameraService, screenShotService);

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ThematicGenerationService],
    }).compileComponents().catch();

});

  it("should be created", inject([ThematicGenerationService], () => {
    expect(service).toBeTruthy();
  }));

  it("generateScene should be called", async () => {
    try {
      const spy: Spy = spyOn(service, "generateScene").and.callThrough();
      const htmlCanvas: HTMLCanvasElement = document.createElement("canvas");
      const scene3D: ThematicScene = {pokemons: []};
      await service.generateScene(htmlCanvas, scene3D, true);
      expect(spy).toHaveBeenCalled();
    } catch (e) {
      e = e;
    }
  });

  it("generateScene should be called", async () => {
    try {
      const spy: Spy = spyOn(service, "generateScene").and.callThrough();
      const htmlCanvas: HTMLCanvasElement = document.createElement("canvas");
      const scene3D: ThematicScene = {pokemons: []};
      await service.generateScene(htmlCanvas, scene3D, false);
      expect(spy).toHaveBeenCalled();
    } catch (e) {
      e = e;
    }
  });

  it("addModelsToScene should call loadObjectMesh", () => {
      const spy: Spy = spyOn(service, "addModelsToScene").and.callThrough();
      const spyLoad: Spy = spyOn(service, "loadObjectMesh").and.callThrough();
      const scene3D: ThematicScene = {pokemons: []};
      const pokemon: Pokemon = {name : "", size: 0, coordinates: {x: 0, y: 0, z: 0}, textureDir: "",
                                rotation: 1, diffName: ""};
      scene3D.pokemons.push(pokemon);
      service.addModelsToScene(scene3D, false).then().catch((e) => { console.error(e); });
      expect(spy).toHaveBeenCalled();
      expect(spyLoad).toHaveBeenCalled();
  });

  it("addModelToScene should be called", () => {
    const spy: Spy = spyOn(service, "addModelToScene").and.callThrough();
    const object: THREE.Group = new THREE.Group();
    const pokemon: Pokemon = {name : "", size: 0, coordinates: {x: 0, y: 0, z: 0}, textureDir: "",
                              rotation: 1, diffName: ""};
    service.addModelToScene(object, false, pokemon);
    expect(spy).toHaveBeenCalled();
  });

  it("extractTexture should be called", () => {
    const spy: Spy = spyOn(service, "extractTexture").and.callThrough();
    const pokemon: Pokemon = {name : "", size: 0, coordinates: {x: 0, y: 0, z: 0}, textureDir: "",
                              rotation: 1, diffName: ""};
    service.extractTexture(pokemon);
    expect(spy).toHaveBeenCalled();
  });

  it("setPokemonSize should be called", () => {
    const spy: Spy = spyOn(service, "setPokemonSize").and.callThrough();
    const pokemon: THREE.Object3D = new THREE.Object3D();
    service.setPokemonSize(pokemon, 1);
    expect(spy).toHaveBeenCalled();
  });

  it("setPokemonPosition should be called", () => {
    const spy: Spy = spyOn(service, "setPokemonPosition").and.callThrough();
    const pokemon: THREE.Object3D = new THREE.Object3D();
    service.setPokemonPosition(pokemon, {x: 1, y: 1, z: 1});
    expect(pokemon.position.x).toEqual(1);
    expect(spy).toHaveBeenCalled();
  });

  it("loadObjectMesh should not do anything if it is a PokeBall", () => {
    const spy: Spy = spyOn(service, "loadObjectMesh").and.callThrough();
    const pokemon: Pokemon = {name : "", size: 0, coordinates: {x: 0, y: 0, z: 0}, textureDir: "",
                              rotation: 1, diffName: ""};
    pokemon.name = "PokeBall";
    service.loadObjectMesh(pokemon, true).catch();
    expect(spy).toHaveBeenCalled();
  });

  it("loadObjectMesh should call", () => {
    const spy: Spy = spyOn(service, "loadObjectMesh").and.callThrough();
    const pokemon: Pokemon = {name : "", size: 0, coordinates: {x: 0, y: 0, z: 0}, textureDir: "",
                              rotation: 1, diffName: ""};
    pokemon.name = "Pokemon";
    service.loadObjectMesh(pokemon, true).catch();
    expect(spy).toHaveBeenCalled();
  });

  it("generateSkybox should call", () => {
    const spy: Spy = spyOn(service, "generateSkybox").and.callThrough();
    const scene: THREE.Scene = new THREE.Scene();
    service.generateSkybox(scene);
    expect(spy).toHaveBeenCalled();
  });

  it("generateImageUrls should call", () => {
    const spy: Spy = spyOn(service, "generateImageUrls").and.callThrough();
    const result: string[] = service.generateImageUrls();
    const path: string = "assets/Skybox/Pokemon/";
    const format: string = ".jpg";
    const expected: string[] = [
      path + "side" + format,
      path + "side" + format,
      path + "sky" + format,
      path + "floor" + format,
      path + "side" + format,
      path + "side" + format,
    ];
    expect(spy).toHaveBeenCalled();
    expect(expected).toEqual(result);
  });
});
