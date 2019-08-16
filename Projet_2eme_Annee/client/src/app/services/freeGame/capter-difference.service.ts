import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Coordinates3D } from "../../../../../common/3DView/FreeGamesInterfaces";
import {Position} from "../../../../../common/communication/position";
import { GeometricDifferenceService } from "./geomScene/geometric-difference.service";
import { ThematicDifferenceService } from "./themeScene/thematic-difference.service";
import { CameraService } from "./vue3D/camera.service";
import { Vue3DService } from "./vue3D/vue3-d.service";

@Injectable({
  providedIn: "root",
})
export class CapterDifferenceService {

  public isGeometricScene: boolean;
  public set isGeometric(isGeometric: boolean) { this.isGeometricScene = isGeometric; }
  public constructor(private vue3DService: Vue3DService, private cameraService: CameraService,
                     private geometricDiff: GeometricDifferenceService, private thematicDiff: ThematicDifferenceService) {
                       this.isGeometricScene = false;
                      }

  public handleUserClick(mouseV: Position): boolean {
    this.isGeometricScene = this.vue3DService.sceneType === "geometric";
    const vector: THREE.Vector2 = new THREE.Vector2(mouseV.x, mouseV.y);
    const originaleScene: THREE.Scene = this.isGeometricScene ? this.vue3DService.geometricGeneration.scenes[0] :
                                                                this.vue3DService.thematicGeneration.scenes[0];
    const modifiedScene: THREE.Scene = this.isGeometricScene ? this.vue3DService.geometricGeneration.scenes[1] :
                                                               this.vue3DService.thematicGeneration.scenes[1];

    const originalIntersect: THREE.Intersection[] = this.getIntersections(vector, this.cameraService.cameraO,
                                                                          originaleScene.children);

    const modifiedIntersect: THREE.Intersection[] = this.getIntersections(vector, this.cameraService.cameraM,
                                                                          modifiedScene.children);

    return this.checkDifferences(originalIntersect, modifiedIntersect);
  }

  public getIntersections(vector: THREE.Vector2, camera: THREE.PerspectiveCamera, sceneChildren: THREE.Object3D[]): THREE.Intersection[] {
    const raycaster: THREE.Raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(vector, camera);
    const intersectObjects: THREE.Intersection[] = raycaster.intersectObjects(sceneChildren, true);

    this.isGeometricScene ? this.geometricDiff.extractFloorFromIntersection(intersectObjects) :
                                                  this.thematicDiff.extractSkyBox(intersectObjects);

    return intersectObjects;
  }

  public checkDifferences(originalIntersect: THREE.Intersection[], modifiedIntersect: THREE.Intersection[]): boolean {
    if (originalIntersect.length === 0 && modifiedIntersect.length === 0) {
      return false;
    }
    if (originalIntersect.length !== modifiedIntersect.length) {
     this.handleSizeScenesDifference(originalIntersect, modifiedIntersect);

     return true;
    }

    return this.checkColorDifference(originalIntersect, modifiedIntersect);
  }

  public checkColorDifference(originalIntersect: THREE.Intersection[], modifiedIntersect: THREE.Intersection[]): boolean {
    for (const intersectionO of originalIntersect) {
      for (const intersectionM of modifiedIntersect) {
      const found: boolean = this.isGeometricScene ? this.geometricDiff.checkColorDifference(intersectionO.object as THREE.Mesh,
                                                                                             intersectionM.object as THREE.Mesh) :
                                                     this.thematicDiff.checkTextureDifference(intersectionO.object as THREE.Group,
                                                                                              intersectionM.object as THREE.Group);
      if (found) {
        return true;
      }
    }
  }

    return false;
  }

  public handleSizeScenesDifference(originalIntersect: THREE.Intersection[], modifiedIntersect: THREE.Intersection[]): void {
    if (originalIntersect.length < modifiedIntersect.length) {
      this.handleAddDifference(originalIntersect, modifiedIntersect);
    } else {
      this.handleDeleteDifference(originalIntersect, modifiedIntersect);
    }
   }

  public handleAddDifference(originalIntersect: THREE.Intersection[], modifiedIntersect: THREE.Intersection[]): void {
    if (originalIntersect.length === 0) {
      if (this.isGeometricScene) {
        this.geometricDiff.checkAddDifference(new THREE.Mesh(), modifiedIntersect[0].object as THREE.Mesh);
      } else {
        this.thematicDiff.checkAddDifference(new  THREE.Mesh(), modifiedIntersect[0].object);
      }

      return;
    }
    for (const intersectionO of originalIntersect) {
      for (const intersectionM of modifiedIntersect) {
      const originalObj: THREE.Mesh = intersectionO.object as THREE.Mesh;
      const modifiedObj: THREE.Mesh = intersectionM.object as THREE. Mesh;

      const found: boolean = this.isGeometricScene ? this.geometricDiff.checkAddDifference(originalObj, modifiedObj) :
                                                     this.thematicDiff.checkAddDifference(originalObj , modifiedObj);
      if (found) {
        return;
      }
    }
    }
  }

  public handleDeleteDifference(originalIntersect: THREE.Intersection[], modifiedIntersect: THREE.Intersection[]): void {
    if (modifiedIntersect.length === 0) {
      if (this.isGeometricScene) {
        this.geometricDiff.checkDeleteDifference(originalIntersect[0].object as THREE.Mesh, new THREE.Mesh());
      } else {
        this.thematicDiff.checkDeleteDifference(originalIntersect[0].object as THREE.Group, new THREE.Group());
      }

      return;
    }

    for (const intersectionO of originalIntersect) {
      for (const intersectionM of modifiedIntersect) {

        const found: boolean = this.isGeometricScene ? this.geometricDiff.checkDeleteDifference(intersectionO.object as THREE.Mesh,
                                                                                                intersectionM.object as THREE.Mesh) :
                                                       this.thematicDiff.checkDeleteDifference(intersectionO.object as THREE.Group,
                                                                                               intersectionM.object as THREE.Group);
        if (found) {
          return;
        }
      }
    }
  }

  public updateDeleteDifference(originalObj: Coordinates3D): void {
    if (this.isGeometricScene) {
      const obj: THREE.Mesh = this.geometricDiff.findObjectByPosition(originalObj, this.vue3DService.geometricGeneration.scenes[0]);
      this.vue3DService.geometricGeneration.scenes[1].add(obj.clone());
      obj.geometry.name = "";
    } else {
      const obj: THREE.Group = this.thematicDiff.findObjectByPosition(originalObj, this.vue3DService.thematicGeneration.scenes[0]);
      obj.name = "";
      this.vue3DService.thematicGeneration.scenes[1].add(obj.clone());
    }
  }

  public updateAddDifference(modifiedObj: Coordinates3D): void {
    if (this.isGeometricScene) {
      const obj: THREE.Mesh = this.geometricDiff.findObjectByPosition(modifiedObj, this.vue3DService.geometricGeneration.scenes[1]);
      this.vue3DService.geometricGeneration.scenes[1].remove(obj);
    } else {
      const obj: THREE.Group = this.thematicDiff.findObjectByPosition(modifiedObj, this.vue3DService.thematicGeneration.scenes[1]);
      this.vue3DService.thematicGeneration.scenes[1].remove(obj);
    }
  }

  public updateColorDifference(originalPos: Coordinates3D, modifiedPos: Coordinates3D): void {
    if (this.isGeometricScene) {
      const originalObj: THREE.Mesh = this.geometricDiff.findObjectByPosition(originalPos, this.vue3DService.geometricGeneration.scenes[0]);
      const modifiedObj: THREE.Mesh = this.geometricDiff.findObjectByPosition(modifiedPos, this.vue3DService.geometricGeneration.scenes[1]);

      this.geometricDiff.handleColorDifference(originalObj, modifiedObj);
    } else {
      const originalObj: THREE.Group = this.thematicDiff.findObjectByPosition(originalPos, this.vue3DService.thematicGeneration.scenes[0]);
      const modifiedObj: THREE.Group = this.thematicDiff.findObjectByPosition(modifiedPos, this.vue3DService.thematicGeneration.scenes[1]);

      this.thematicDiff.handleTextureDifference(originalObj, modifiedObj);
    }
  }
}
