import { Injectable } from "@angular/core";
import * as THREE from "three";

const quarterSecond: number = 250;

@Injectable({
  providedIn: "root",
})
export class GeometricCheatService {
  public showingObj: THREE.Mesh[];
  public timerO: NodeJS.Timeout[];
  public timerM: NodeJS.Timeout[];
  public constructor() {
    this.showingObj = [];
    this.timerO = [];
    this.timerM = [];
  }

  public searchColorDiff(sceneO: THREE.Scene, sceneM: THREE.Scene): void {
    for (const childO of sceneO.children) {
      for (const childM of sceneM.children) {
        const oName: string = (childO as THREE.Mesh).geometry !== undefined ? (childO as THREE.Mesh).geometry.name : "";
        const mName: string = (childM as THREE.Mesh).geometry !== undefined ? (childM as THREE.Mesh).geometry.name : "";
        const sameObject: boolean = this.isSameObjects(childO as THREE.Mesh, childM as THREE.Mesh);
        if (oName === "color" && mName === "color" && sameObject) {
          this.showingObj.push(childO as THREE.Mesh);
          this.showingObj.push(childM as THREE.Mesh);
          this.timerO.push(this.hideObject(childO as THREE.Mesh));
          this.timerM.push(this.hideObject(childM as THREE.Mesh));
        }
     }
    }
  }

  public searchAddDiff(sceneM: THREE.Scene): void {
    for (const child of sceneM.children) {
      const oName: string = (child as THREE.Mesh).geometry !== undefined ? (child as THREE.Mesh).geometry.name : "";
      if (oName === "add") {
        this.showingObj.push(child as THREE.Mesh);
        this.timerM.push(this.hideObject(child as THREE.Mesh));
      }
    }

  }

  public searchDeleteDiff(sceneO: THREE.Scene): void {
    for (const child of sceneO.children) {
      const oName: string = (child as THREE.Mesh).geometry !== undefined ? (child as THREE.Mesh).geometry.name : "";
      if (oName === "delete") {
        this.showingObj.push(child as THREE.Mesh);
        this.timerO.push(this.hideObject(child as THREE.Mesh));
      }
    }
  }

  public hideObject(object: THREE.Mesh): NodeJS.Timeout {
    return setInterval(() => {
      object.visible = ! object.visible;
    },                 quarterSecond);
  }

  public isSameObjects(object1: THREE.Mesh, object2: THREE.Mesh): boolean {
    if (object1.geometry === undefined || object2.geometry === undefined) {
      return false;
    }
    const sameGeometry: boolean = object1.geometry.type === object2.geometry.type;

    const sameX: boolean = object1.position.x === object2.position.x;
    const sameY: boolean = object1.position.y === object2.position.y;
    const sameZ: boolean = object1.position.z === object2.position.z;

    return sameGeometry && sameX && sameY && sameZ ;
  }
}
