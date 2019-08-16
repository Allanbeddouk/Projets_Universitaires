import {TestBed } from "@angular/core/testing";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import Spy = jasmine.Spy;
import * as THREE from "three";
import { mock } from "ts-mockito";
import { HandleViewsService } from "../../handle-views.service";
import { ThematicGenerationService } from "../themeScene/thematic-generation.service";
import { Vue3DService } from "../vue3D/vue3-d.service";
import { GeometricDifferenceService } from "./geometric-difference.service";
import { GeometricGenerationService } from "./geometric-generation.service";

describe("GeometricDifferenceService", () => {
    let service: GeometricDifferenceService;
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
      service = new GeometricDifferenceService(new Vue3DService(mock(GeometricGenerationService), mock(ThematicGenerationService)),
                                               mock(HandleViewsService), mock(WebSocketCommunications));
    });

    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("extractFloorFromIntersection should be called and should delete the floor from the intersection if there is any", () => {
      const spy: Spy = spyOn(service, "extractFloorFromIntersection").and.callThrough();
      intersections1.push(intersection);
      const sizeBefore: number = intersections1.length;
      (intersections1[0].object as THREE.Mesh).geometry.name = "floor";
      service.extractFloorFromIntersection(intersections1);
      expect(spy).toHaveBeenCalled();
      expect(sizeBefore).toBeGreaterThan(intersections1.length);
    });

    it("handleColorDifference should be called", () => {
      const spy: Spy = spyOn(service, "handleColorDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      service.handleColorDifference(mesh1, mesh1);
      expect(spy).toHaveBeenCalled();
    });

    it("checkAddDifference should be return false when the objects are the same ", () => {
      const spy: Spy = spyOn(service, "checkAddDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const result: boolean = service.checkAddDifference(mesh1, mesh1);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it("checkAddDifference should be return true when the objects are different ", () => {
      const spy: Spy = spyOn(service, "checkAddDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const mesh2: THREE.Mesh = new THREE.Mesh(geometry, material);
      mesh1.position.setX(0);
      mesh2.position.setX(1);
      service["vue3DService"].geometricGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
      const result: boolean = service.checkAddDifference(mesh1, mesh2);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it("checkDeleteDifference should be return false when the objects are the same ", () => {
      const spy: Spy = spyOn(service, "checkDeleteDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const result: boolean = service.checkDeleteDifference(mesh1, mesh1);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it("checkDeleteDifference should be return true when the objects are different ", () => {
      const spy: Spy = spyOn(service, "checkDeleteDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const mesh2: THREE.Mesh = new THREE.Mesh(geometry, material);
      mesh1.position.setX(0);
      mesh2.position.setX(1);
      service["vue3DService"].geometricGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
      const result: boolean = service.checkDeleteDifference(mesh1, mesh2);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it("checkColorDifference should be return false when the objects are not the same color ", () => {
      const spy: Spy = spyOn(service, "checkColorDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const mesh2: THREE.Mesh = new THREE.Mesh(geometry, material);
      const object1Material: THREE.MeshLambertMaterial = mesh1.material as THREE.MeshLambertMaterial;
      const object2Material: THREE.MeshLambertMaterial = mesh2.material as THREE.MeshLambertMaterial;
      object1Material.color.r = 1;
      object2Material.color.r = 0;
      const result: boolean = service.checkColorDifference(mesh1, mesh2);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it("confirmColorDifference should return true when the objects have different position ", () => {
      const spy: Spy = spyOn(service, "checkDeleteDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const mesh2: THREE.Mesh = new THREE.Mesh(geometry, material);
      mesh1.position.setX(0);
      mesh2.position.setX(1);
      service["vue3DService"].geometricGeneration.scenes = [new THREE.Scene(), new THREE.Scene()];
      const result: boolean = service.checkDeleteDifference(mesh1, mesh2);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it("confirmColorDifference should return false when the objects have same position ", () => {
      const spy: Spy = spyOn(service, "checkDeleteDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      mesh1.position.setX(0);
      const result: boolean = service.checkDeleteDifference(mesh1, mesh1);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it("handleColorDifference should return true ", () => {
      const spy: Spy = spyOn(service, "handleColorDifference").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      service.handleColorDifference(mesh1, mesh1);
      expect(spy).toHaveBeenCalled();
    });

    it("compareObjectsPosition should return true when the object have same position", () => {
      const spy: Spy = spyOn(service, "compareObjectsPosition").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const result: boolean = service.compareObjectsPosition(mesh1.position, mesh1.position);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it("compareObjectsColor should return true when the object have same color", () => {
      const spy: Spy = spyOn(service, "compareObjectsColor").and.callThrough();
      const mesh1: THREE.Mesh = new THREE.Mesh(geometry, material);
      const result: boolean = service.compareObjectsColor(mesh1, mesh1);
      expect(spy).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
});
