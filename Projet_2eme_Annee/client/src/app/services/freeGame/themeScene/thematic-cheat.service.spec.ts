import { getTestBed, inject, TestBed } from "@angular/core/testing";
import Spy = jasmine.Spy;
import * as THREE from "three";

import { ThematicCheatService } from "./thematic-cheat.service";

describe("ThematicCheatService", () => {
  let injector: TestBed;
  let service: ThematicCheatService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ThematicCheatService],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(ThematicCheatService);
});

  it("should be created", inject([ThematicCheatService], () => {
    expect(service).toBeTruthy();
  }));

  it("searchColorDiff should be called", () => {
    const spy: Spy = spyOn(service, "isSameObjects").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const sceneM: THREE.Scene = new THREE.Scene();
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh1: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
    const mesh2: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
    mesh1.name = "&color";
    mesh2.name = "&color";
    sceneO.add(mesh1);
    sceneM.add(mesh2);
    service.searchColorDiff(sceneO, sceneM);
    expect(spy).toHaveBeenCalled();
  });

  it("searchAddDiff should be called", () => {
    const spy: Spy = spyOn(service, "searchAddDiff").and.callThrough();
    const sceneM: THREE.Scene = new THREE.Scene();
    const mesh: THREE.Mesh = new THREE.Mesh();
    mesh.name = "&add";
    sceneM.add(mesh);
    service.searchAddDiff(sceneM);
    expect(spy).toHaveBeenCalled();
  });

  it("searchDeleteDiff should be called", () => {
    const spy: Spy = spyOn(service, "searchDeleteDiff").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const mesh: THREE.Mesh = new THREE.Mesh();
    mesh.name = "&delete";
    sceneO.add(mesh);
    service.searchDeleteDiff(sceneO);
    expect(spy).toHaveBeenCalled();
  });

  it("hideObject should be called", () => {
    const spy: Spy = spyOn(service, "hideObject").and.callThrough();
    const group: THREE.Group = new THREE.Group();
    service.hideObject(group);
    expect(spy).toHaveBeenCalled();
  });

  it("isSameObjects should return true when we compare two objects with the same position", () => {
    const spy: Spy = spyOn(service, "isSameObjects").and.callThrough();
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh1: THREE.Mesh = new THREE.Mesh(geometry);
    const group1: THREE.Group = new THREE.Group();
    group1.add(mesh1);
    const group2: THREE.Group = new THREE.Group();
    group2.add(mesh1.clone());
    mesh1.position.setX(0);
    mesh1.position.setY(0);
    mesh1.position.setZ(0);
    const response: boolean = service.isSameObjects(group1, group2);
    expect(spy).toHaveBeenCalled();
    expect(response).toBeTruthy();
  });

  it("isSameObjects should return false when we compare two objects with different position", () => {
    const spy: Spy = spyOn(service, "isSameObjects").and.callThrough();
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh1: THREE.Mesh = new THREE.Mesh(geometry);
    const mesh2: THREE.Mesh = new THREE.Mesh(geometry);
    const group1: THREE.Group = new THREE.Group();
    group1.add(mesh1);
    const group2: THREE.Group = new THREE.Group();
    group2.add(mesh2);
    mesh1.position.setX(0);
    mesh1.position.setY(0);
    mesh1.position.setZ(0);
    mesh2.position.setX(1);
    mesh2.position.setY(1);
    mesh2.position.setZ(1);
    const response: boolean = service.isSameObjects(group1, group2);
    expect(spy).toHaveBeenCalled();
    expect(response).toBeTruthy();
  });
});
