import { Injectable } from "@angular/core";
import * as THREE from "three";

const quarterSecond: number = 250;

@Injectable({
  providedIn: "root",
})
export class ThematicCheatService {
  public timerO: NodeJS.Timeout[];
  public timerM: NodeJS.Timeout[];
  public showingGroup: THREE.Group[];
  public constructor() {
    this.showingGroup = [];
    this.timerO = [];
    this.timerM = [];
   }

  public searchColorDiff(sceneO: THREE.Scene, sceneM: THREE.Scene): void {
    for (const childO of sceneO.children) {
      for (const childM of sceneM.children) {
        const oName: string = this.extractDifference(childO as THREE.Group);
        const mName: string = this.extractDifference(childM as THREE.Group);
        const sameObject: boolean = this.isSameObjects(childO as THREE.Group, childM as THREE.Group);
        if (oName === "color" && mName === "color" && sameObject) {
          this.showingGroup.push(childO as THREE.Group);
          this.showingGroup.push(childM as THREE.Group);
          this.timerO.push(this.hideObject(childO as THREE.Group));
          this.timerM.push(this.hideObject(childM as THREE.Group));
        }
     }
    }
  }

  public searchAddDiff(sceneM: THREE.Scene): void {
    for (const child of sceneM.children) {
      const oName: string = this.extractDifference(child as THREE.Group);
      if (oName === "add") {
        this.showingGroup.push(child as THREE.Group);
        this.timerM.push(this.hideObject(child as THREE.Group));
      }
    }
  }

  public searchDeleteDiff(sceneO: THREE.Scene): void {
    for (const child of sceneO.children) {
      const oName: string = this.extractDifference(child as THREE.Group);
      if (oName === "delete") {
        this.showingGroup.push(child as THREE.Group);
        this.timerO.push(this.hideObject(child as THREE.Group));
      }
    }
  }

  public hideObject(object: THREE.Group): NodeJS.Timeout {
    return setInterval(() => {
      object.visible = ! object.visible;
    },                 quarterSecond);
  }

  public isSameObjects(object1: THREE.Group, object2: THREE.Group): boolean {
    if (object1 === undefined || object2 === undefined) {
      return false;
    }

    const sameX: boolean = object1.position.x === object2.position.x;
    const sameY: boolean = object1.position.y === object2.position.y;
    const sameZ: boolean = object1.position.z === object2.position.z;

    return sameX && sameY && sameZ;
  }

  public extractDifference(pokemon: THREE.Group): string {
    return pokemon !== undefined ? pokemon.name.split("&")[1] : "";
  }
}
