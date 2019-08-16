import { Injectable } from "@angular/core";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import * as THREE from "three";
import { Coordinates3D } from "../../../../../../common/3DView/FreeGamesInterfaces";
import { HandleViewsService } from "../../handle-views.service";
import { Vue3DService } from "../vue3D/vue3-d.service";

@Injectable({
  providedIn: "root",
})
export class ThematicDifferenceService {

  public constructor(private vue3DService: Vue3DService, private viewService: HandleViewsService,
                     private webSocket: WebSocketCommunications) { }

  public extractSkyBox(intersections: THREE.Intersection[]): void {
    for (let i: number = 0 ; i < intersections.length ; ++i) {
      if ((intersections[i].object as THREE.Mesh).geometry.name === "skybox") {
        intersections.splice(i, 1);
      }
    }
  }

  public checkAddDifference(originalObj: THREE.Object3D, modifiedObj: THREE.Object3D): boolean {
    const areEquals: boolean = this.compareObjects(originalObj as THREE.Group, modifiedObj as THREE.Group);

    if (!areEquals) {
      this.vue3DService.thematicGeneration.scenes[1].remove(modifiedObj.parent as THREE.Object3D);
      this.sendDifferenceToPlayer("add", originalObj.parent as THREE.Group, modifiedObj.parent as THREE.Group);

      return true;
    } else {
      return false;
    }
  }

  public checkTextureDifference(originalObj: THREE.Group, modifiedObj: THREE.Group): boolean {
    const sameColor: boolean = this.compareObjectsTexture(originalObj.parent as THREE.Group, modifiedObj.parent as THREE.Group);

    if (!sameColor && this.confirmTextureDifference(originalObj, modifiedObj)) {
      this.handleTextureDifference(originalObj.parent as THREE.Group, modifiedObj.parent as THREE.Group);
      this.sendDifferenceToPlayer("color", originalObj.parent as THREE.Group, modifiedObj.parent as THREE.Group);

      return true;
    }

    return false;
  }

  public checkDeleteDifference(originalObj: THREE.Group, modifiedObj: THREE.Group): boolean {

    const areEquals: boolean = this.compareObjects(originalObj, modifiedObj);
    if (!areEquals) {
      (originalObj.parent as THREE.Group).name = "";
      this.vue3DService.thematicGeneration.scenes[1].add((originalObj.parent as THREE.Object3D).clone());
      this.sendDifferenceToPlayer("delete", originalObj.parent as THREE.Group, modifiedObj.parent as THREE.Group);

      return true;
    }

    return false;
  }

  public confirmTextureDifference(object1: THREE.Group, object2: THREE.Group): boolean {
    const samePosition: boolean = this.compareObjectsPosition(object1.position, object2.position);
    if (!samePosition) {
      alert("Vous avez selectionne deux differences, deplacez vous dans la scene pour n'en selectionner qu'une seule");

      return false;
    }

    return true;
  }

  public handleTextureDifference(originalObject: THREE.Group, modifiedObject: THREE.Group): boolean {
    this.vue3DService.thematicGeneration.scenes[1].remove(modifiedObject);
    this.vue3DService.thematicGeneration.scenes[1].add((originalObject).clone());
    (originalObject as THREE.Group).name = "";
    (modifiedObject as THREE.Group).name = "";

    return true;
  }

  public extractPokemonTexture(pokemon: THREE.Group): string {
    return pokemon.name.split("&")[0];
  }

  public compareObjectsPosition(object1: THREE.Vector3, object2: THREE.Vector3): boolean {
    const sameX: boolean = object1.x === object2.x;
    const sameY: boolean = object1.y === object2.y;
    const sameZ: boolean = object1.z === object2.z;

    return sameX && sameY && sameZ;
  }

  public compareObjectsTexture(object1: THREE.Group, object2: THREE.Group): boolean {
    return this.extractPokemonTexture(object1) === this.extractPokemonTexture(object2);
  }

  public compareObjects(object1: THREE.Group, object2: THREE.Group): boolean {
    return this.compareObjectsTexture(object1, object2) &&
    this.compareObjectsPosition(object1.position, object2.position);
  }

  public sendDifferenceToPlayer(diffName: string, originalObj: THREE.Group, modifiedObj: THREE.Group): void {
    if (!this.viewService.isSolo) {
      this.webSocket.differenceFreeGame(diffName, originalObj ? (originalObj as THREE.Group).position : new THREE.Vector3(),
                                        modifiedObj ? (modifiedObj as THREE.Group).position : new THREE.Vector3());
    }
  }

  public findObjectByPosition(position: Coordinates3D, scene: THREE.Scene): THREE.Group {
    let foundObject: THREE.Group = new THREE.Group();
    for (const object of scene.children) {
      if (this.compareObjectsPosition(new THREE.Vector3(position.x, position.y, position.z), object.position)) {
        foundObject = object as THREE.Group;
        break;
      }
    }

    return foundObject;
  }
}
