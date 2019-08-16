import {TestBed } from "@angular/core/testing";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import Spy = jasmine.Spy;
import * as THREE from "three";
import { mock } from "ts-mockito";
import { HandleViewsService } from "../../handle-views.service";
import { GeometricGenerationService } from "../geomScene/geometric-generation.service";
import { ThematicGenerationService } from "../themeScene/thematic-generation.service";
import { Vue3DService } from "../vue3D/vue3-d.service";
import { ThematicDifferenceService } from "./thematic-difference.service";

describe("ThematicDifferenceService", () => {
  let service: ThematicDifferenceService;
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: "red" });
  const intersection: THREE.Intersection = {
    distance: 1,
    point: new THREE.Vector3(1, 1, 1),
    object: new THREE.Mesh(geometry, material),
  };

  const intersections1: THREE.Intersection[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ThematicDifferenceService(new Vue3DService(mock(GeometricGenerationService), mock(ThematicGenerationService)),
                                            mock(HandleViewsService), mock(WebSocketCommunications));
  });

  it("extractSkyBox should be called and should delete the skybox from the intersection if there is any", () => {
    const spy: Spy = spyOn(service, "extractSkyBox").and.callThrough();
    intersections1.push(intersection);
    const sizeBefore: number = intersections1.length;
    (intersections1[0].object as THREE.Mesh).geometry.name = "skybox";
    service.extractSkyBox(intersections1);
    expect(spy).toHaveBeenCalled();
    expect(sizeBefore).toBeGreaterThan(intersections1.length);
});

  it("Should extract the name of the pokemon from the group", () => {
    const spy: Spy = spyOn(service, "extractPokemonTexture").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu&";
    const extractedName: string = service.extractPokemonTexture(pokemon);
    expect(spy).toHaveBeenCalled();
    expect(extractedName).toBe("Pikachu");
  });

  it("Should return true if pokemons are the same (position and texture)", () => {
    const spy: Spy = spyOn(service, "compareObjects").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu1&";
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.name = "Pikachu1&";
    pokemon2.position.set(0, 0, 0);
    const areSame: boolean = service.compareObjects(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeTruthy();
  });

  it("Should return false if pokemons are not the same because they dont have same position", () => {
    const spy: Spy = spyOn(service, "compareObjects").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu1&";
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.name = "Pikachu1&";
    pokemon2.position.set(1, 0, 0);
    const areSame: boolean = service.compareObjects(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeFalsy();
  });

  it("Should return false if pokemons are not the same because they dont have same texture", () => {
    const spy: Spy = spyOn(service, "compareObjects").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu1&";
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.name = "Pikachu2&";
    pokemon2.position.set(0, 0, 0);
    const areSame: boolean = service.compareObjects(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeFalsy();
  });

  it("Should return false if pokemons dont have same texture", () => {
    const spy: Spy = spyOn(service, "compareObjectsTexture").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu1&";
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.name = "Pikachu2&";
    const areSame: boolean = service.compareObjectsTexture(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeFalsy();
  });

  it("Should return true if pokemons have the same texture", () => {
    const spy: Spy = spyOn(service, "compareObjectsTexture").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu1&";
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.name = "Pikachu1&";
    const areSame: boolean = service.compareObjectsTexture(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeTruthy();
  });

  it("Should return true if pokemons have the same position", () => {
    const spy: Spy = spyOn(service, "compareObjectsPosition").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.position.set(0, 0, 0);
    const areSame: boolean = service.compareObjectsPosition(pokemon.position, pokemon2.position);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeTruthy();
  });

  it("Should return false if pokemons have not the same position", () => {
    const spy: Spy = spyOn(service, "compareObjectsPosition").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.position.set(1, 0, 0);
    const areSame: boolean = service.compareObjectsPosition(pokemon.position, pokemon2.position);
    expect(spy).toHaveBeenCalled();
    expect(areSame).toBeFalsy();
  });

  it("Should replace texture of pokemon modified by the original pokemon that corresponds", () => {
    const spy: Spy = spyOn(service, "handleTextureDifference").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.name = "Pikachu";

    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.name = "Charmander";
    service["vue3DService"].thematicGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
    const textureHandled: boolean = service.handleTextureDifference(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(pokemon.name).toBe("");
    expect(pokemon2.name).toBe("");
    expect(textureHandled).toBeTruthy();
  });

  it("Should return true if the color difference is confirmed based on position", () => {
    const spy: Spy = spyOn(service, "confirmTextureDifference").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.position.set(0, 0, 0);
    const isDiffConfirmed: boolean = service.confirmTextureDifference(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(isDiffConfirmed).toBeTruthy();
  });

  it("Should return false if the color difference is not confirmed based on position", () => {
    const spy: Spy = spyOn(service, "confirmTextureDifference").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.position.set(1, 0, 0);
    const isDiffConfirmed: boolean = service.confirmTextureDifference(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(isDiffConfirmed).toBeFalsy();
  });

  it("Should find a delete difference between two scenes", () => {
    const spy: Spy = spyOn(service, "checkDeleteDifference").and.callThrough();
    const pokemonParent: THREE.Group = new THREE.Group();
    pokemonParent.name = "Pikachu";
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.parent = pokemonParent;

    const pokemonParent2: THREE.Group = new THREE.Group();
    pokemonParent2.name = "Charmander";
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.parent = pokemonParent2;
    service["vue3DService"].thematicGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
    const isDiffConfirmed: boolean = service.checkDeleteDifference(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(isDiffConfirmed).toBeFalsy();
  });

  it("Should find a color difference between two scenes", () => {
    const spy: Spy = spyOn(service, "checkTextureDifference").and.callThrough();
    const pokemonParent: THREE.Group = new THREE.Group();
    pokemonParent.name = "Pikachu";
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.parent = pokemonParent;

    const pokemonParent2: THREE.Group = new THREE.Group();
    pokemonParent2.name = "Charmander";
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.parent = pokemonParent2;
    service["vue3DService"].thematicGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
    const isDiffConfirmed: boolean = service.checkTextureDifference(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(isDiffConfirmed).toBeTruthy();
  });

  it("Should find a add difference between two scenes", () => {
    const spy: Spy = spyOn(service, "checkAddDifference").and.callThrough();
    const pokemon: THREE.Group = new THREE.Group();
    pokemon.position.set(0, 0, 0);
    const pokemon2: THREE.Group = new THREE.Group();
    pokemon2.position.set(1, 0, 0);
    service["vue3DService"].thematicGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
    const isDiffConfirmed: boolean = service.checkAddDifference(pokemon, pokemon2);
    expect(spy).toHaveBeenCalled();
    expect(isDiffConfirmed).toBeTruthy();
  });
});
