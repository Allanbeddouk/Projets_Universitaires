import { getTestBed, inject, TestBed } from "@angular/core/testing";
import Spy = jasmine.Spy;
import * as THREE from "three";

import { GeometricCheatService } from "./geometric-cheat.service";

describe("GeometricCheatService", () => {
  let injector: TestBed;
  let service: GeometricCheatService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [GeometricCheatService],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(GeometricCheatService);
});

  it("should be created", inject([GeometricCheatService], () => {
    expect(service).toBeTruthy();
  }));

  it("searchColorDiff should be called", () => {
    const spy: Spy = spyOn(service, "isSameObjects").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const sceneM: THREE.Scene = new THREE.Scene();
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
    mesh.geometry.name = "color";
    sceneO.add(mesh);
    sceneO.add(mesh.clone());
    sceneM.add(mesh);
    sceneM.add(mesh.clone());
    service.searchColorDiff(sceneO, sceneM);
    expect(spy).toHaveBeenCalled();
  });

  it("searchAddDiff should return true if it is an additionnal object modification", () => {
    const spy: Spy = spyOn(service, "searchAddDiff").and.callThrough();
    const sceneM: THREE.Scene = new THREE.Scene();
    const mesh: THREE.Mesh = new THREE.Mesh();
    mesh.geometry.name = "add";
    sceneM.add(mesh);
    service.searchAddDiff(sceneM);
    expect(spy).toHaveBeenCalled();
  });

  it("searchAddDiff should return false when it is not an additionnal object modification", () => {
    const spy: Spy = spyOn(service, "searchAddDiff").and.callThrough();
    const sceneM: THREE.Scene = new THREE.Scene();
    const mesh: THREE.Mesh = new THREE.Mesh();
    mesh.geometry.name = "color";
    sceneM.add(mesh);
    service.searchAddDiff(sceneM);
    expect(spy).toHaveBeenCalled();
  });

  it("searchDeleteDiff should return false when it is not a deleted object modifcation", () => {
    const spy: Spy = spyOn(service, "searchDeleteDiff").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const mesh: THREE.Mesh = new THREE.Mesh();
    mesh.geometry.name = "color";
    sceneO.add(mesh);
    service.searchDeleteDiff(sceneO);
    expect(spy).toHaveBeenCalled();
  });

  it("searchDeleteDiff should return true when it is a deleted object modifcation", () => {
    const spy: Spy = spyOn(service, "searchDeleteDiff").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const mesh: THREE.Mesh = new THREE.Mesh();
    mesh.geometry.name = "delete";
    sceneO.add(mesh);
    service.searchDeleteDiff(sceneO);
    expect(spy).toHaveBeenCalled();
  });

  it("hideObject should be called", () => {
    const spy: Spy = spyOn(service, "hideObject").and.callThrough();
    const mesh: THREE.Mesh = new THREE.Mesh();
    service.hideObject(mesh);
    expect(spy).toHaveBeenCalled();
  });

  it("isSameObjects should return true when we compare the same objects with a different color", () => {
    const spy: Spy = spyOn(service, "isSameObjects").and.callThrough();
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material1: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: "red" });
    const material2: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: "blue" });
    const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material1);
    const mesh2: THREE.Mesh = new THREE.Mesh(geometry, material2);
    mesh1.position.setX(0);
    mesh1.position.setY(0);
    mesh1.position.setZ(0);
    mesh2.position.setX(0);
    mesh2.position.setY(0);
    mesh2.position.setZ(0);
    mesh1.geometry.name = "color";
    mesh1.geometry.name = "color";
    const response: boolean = service.isSameObjects(mesh1, mesh2);
    expect(spy).toHaveBeenCalled();
    expect(response).toBeTruthy();
  });

  it("isSameObjects should return false when we compare 2 different objects with a different color", () => {
    const spy: Spy = spyOn(service, "isSameObjects").and.callThrough();
    const geometry1: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const geometry2: THREE.CylinderGeometry = new THREE.CylinderGeometry();
    const material1: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: "red" });
    const material2: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: "blue" });
    const mesh1: THREE.Mesh = new THREE.Mesh(geometry1, material1);
    const mesh2: THREE.Mesh = new THREE.Mesh(geometry2, material2);
    mesh1.geometry.name = "color";
    mesh1.geometry.name = "color";
    const response: boolean = service.isSameObjects(mesh1, mesh2);
    expect(spy).toHaveBeenCalled();
    expect(response).toBeFalsy();
  });
});
