import { Injectable } from "@angular/core";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import * as THREE from "three";
import { Coordinates3D } from "../../../../../../common/3DView/FreeGamesInterfaces";
import { HandleViewsService } from "../../handle-views.service";
import { Vue3DService } from "../vue3D/vue3-d.service";

@Injectable({
  providedIn: "root",
})
export class GeometricDifferenceService {

  public constructor(private vue3DService: Vue3DService, private viewService: HandleViewsService,
                     private webSocket: WebSocketCommunications ) { }

  public extractFloorFromIntersection(intersections: THREE.Intersection[]): void {
    for (let i: number = 0 ; i < intersections.length ; ++i) {
      if (this.isSkybox((intersections[i].object as THREE.Mesh).geometry.name)) {
        intersections.splice(i--, 1);
      }
    }
  }

  public isSkybox(name: string ): boolean {
    return name === "floor" || name === "skybox";
  }

  public checkAddDifference(originalObj: THREE.Mesh, modifiedObj: THREE.Mesh): boolean {
    const areEquals: boolean = this.compareObjectsColor(originalObj as THREE.Mesh, modifiedObj as THREE.Mesh) &&
                                 this.compareObjectsPosition((originalObj as THREE.Mesh).position, (modifiedObj as THREE.Mesh).position);

    if (!areEquals) {
      this.vue3DService.geometricGeneration.scenes[1].remove(modifiedObj);
      this.sendDifferenceToPlayer("add", originalObj, modifiedObj as THREE.Mesh);

      return true;
    } else {
      return false;
    }
  }

  public checkDeleteDifference(originalObj: THREE.Mesh, modifiedObj: THREE.Mesh): boolean {

        const areEquals: boolean = this.compareObjectsColor(originalObj, modifiedObj) &&
                                   this.compareObjectsPosition(originalObj.position, modifiedObj.position);
        if (!areEquals) {
          this.vue3DService.geometricGeneration.scenes[1].add(originalObj.clone());
          originalObj.geometry.name = "";
          this.sendDifferenceToPlayer("delete", originalObj, modifiedObj);

          return true;
        }

        return false;
  }

  public checkColorDifference(originalObj: THREE.Mesh, modifiedObj: THREE.Mesh): boolean {
    const sameColor: boolean = this.compareObjectsColor(originalObj, modifiedObj);
    if (!sameColor && this.confirmColorDifference(originalObj, modifiedObj)) {
        this.handleColorDifference(originalObj, modifiedObj);
        this.sendDifferenceToPlayer("color", originalObj, modifiedObj);

        return true;
      }

    return false;
  }

  public confirmColorDifference(object1: THREE.Mesh, object2: THREE.Mesh): boolean {
    const samePosition: boolean = this.compareObjectsPosition(object1.position, object2.position);
    if (!samePosition) {
        alert("Vous avez selectionne deux differences, deplacez vous dans la scene pour n'en selectionner qu'une seule");

        return false;
      }

    return true;
  }

  public handleColorDifference(originalObject: THREE.Mesh, modifiedObject: THREE.Mesh): void {
    const originalMaterial: THREE.MeshLambertMaterial = originalObject.material as THREE.MeshLambertMaterial;
    const modifiedMaterial: THREE.MeshLambertMaterial = modifiedObject.material as THREE.MeshLambertMaterial;

    modifiedMaterial.color.r = originalMaterial.color.r;
    modifiedMaterial.color.g = originalMaterial.color.g;
    modifiedMaterial.color.b = originalMaterial.color.b;
    originalObject.geometry.name = "";
    modifiedObject.geometry.name = "";
  }

  public compareObjectsPosition(object1: THREE.Vector3, object2: THREE.Vector3): boolean {
    const sameX: boolean = object1.x === object2.x;
    const sameY: boolean = object1.y === object2.y;
    const sameZ: boolean = object1.z === object2.z;

    return sameX && sameY && sameZ;
  }

  public compareObjectsColor(object1: THREE.Mesh, object2: THREE.Mesh): boolean {

    const object1Material: THREE.MeshLambertMaterial = object1.material as THREE.MeshLambertMaterial;
    const object2Material: THREE.MeshLambertMaterial = object2.material as THREE.MeshLambertMaterial;

    const sameR: boolean = object1Material.color.r === object2Material.color.r;
    const sameG: boolean = object1Material.color.g === object2Material.color.g;
    const sameB: boolean = object1Material.color.b === object2Material.color.b;

    return sameR && sameG && sameB;
  }

  public sendDifferenceToPlayer(diffName: string, originalObj: THREE.Mesh, modifiedObj: THREE.Mesh): void {
    if (!this.viewService.isSolo) {
      this.webSocket.differenceFreeGame(diffName, (originalObj as THREE.Mesh).position,
                                        (modifiedObj as THREE.Mesh).position);
    }
  }

  public findObjectByPosition(position: Coordinates3D, scene: THREE.Scene): THREE.Mesh {
    let foundObject: THREE.Mesh = new THREE.Mesh();
    for (const object of scene.children) {
      if (this.compareObjectsPosition(new THREE.Vector3(position.x, position.y, position.z), object.position)) {
        foundObject = object as THREE.Mesh;
        break;
      }
    }

    return foundObject;
  }
}
