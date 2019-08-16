import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Constants } from "../../../components/vue3-d/fileConstant3DView";
@Injectable({
  providedIn: "root",
})
export class CameraService {
  public cameraO: THREE.PerspectiveCamera;
  public cameraM: THREE.PerspectiveCamera;
  public scenes: THREE.Scene[];

  public canMove: boolean;
  public originalSceneClicked: boolean;

  private cameraHeightAdjustment: number = 0;
  private cameraHeightIncrement: number = 0.1;

  public constructor() {
    this.cameraM = this.createCamera();
    this.cameraO = this.createCamera();
    this.cameraO = this.cameraM;
    this.canMove = false;
    this.scenes = [];
    this.originalSceneClicked = false;
   }

  public createCamera(): THREE.PerspectiveCamera {
    return new THREE.PerspectiveCamera();
  }

  public setCameraPosition(isOriginale: boolean): void {
    const camera: THREE.PerspectiveCamera = isOriginale ? this.cameraO : this.cameraM;

    camera.position.set(Constants.CAMERA_POSITION_X, Constants.CAMERA_POSITION_Y, Constants.CAMERA_POSITION_Z);
  }

  public onMouseDown(event: MouseEvent): void {
    if (event.button === Constants.RIGHTCLICK ) {
      this.canMove = true;
    }
  }

  public onMouseUp(event: MouseEvent): void {
    if (event.button === Constants.RIGHTCLICK ) {
      this.canMove = false;
    }
  }

  public onMouseMove(event: MouseEvent): void {
    if (this.canMove) {
      this.cameraM.rotateX((event.movementY / Constants.CAMERA_ROTATION_SPEED_MODIFICATOR));
      this.cameraM.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), (event.movementX / Constants.CAMERA_ROTATION_SPEED_MODIFICATOR));
      this.cameraM.updateProjectionMatrix();
    }
  }
  public forward(): void {
    if (!this.checkCollision(new THREE.Vector3(0, 0, -1).applyQuaternion(this.cameraO.quaternion))) {
      this.cameraO = this.cameraO.translateZ(-Constants.MOVEMENT_SPEED);
      this.cameraM = this.cameraM.translateZ(-Constants.MOVEMENT_SPEED);
    }
  }

  public backward(): void {
    if (!this.checkCollision(new THREE.Vector3(0, 0, 1).applyQuaternion(this.cameraO.quaternion))) {
      this.cameraO = this.cameraO.translateZ(Constants.MOVEMENT_SPEED);
      this.cameraM = this.cameraM.translateZ(Constants.MOVEMENT_SPEED);
    }
  }

  public toTheLeft(): void {
    if (!this.checkCollision(new THREE.Vector3(-1, 0, 0).applyQuaternion(this.cameraO.quaternion))) {
      this.cameraO = this.cameraO.translateX(-Constants.MOVEMENT_SPEED);
      this.cameraM = this.cameraM.translateX(-Constants.MOVEMENT_SPEED);
    }
  }

  public toTheRight(): void {
    if (!this.checkCollision(new THREE.Vector3(1, 0, 0).applyQuaternion(this.cameraO.quaternion))) {
      this.cameraO = this.cameraO.translateX(Constants.MOVEMENT_SPEED);
      this.cameraM = this.cameraM.translateX(Constants.MOVEMENT_SPEED);
    }
  }

  public checkCollision(direction: THREE.Vector3): boolean {
    const raycaster: THREE.Raycaster = new THREE.Raycaster(this.cameraM.position, direction, 0, Constants.PLAYER_COLLISION_DISTANCE);
    const intersectionOriginal: THREE.Intersection[] = raycaster.intersectObjects(this.scenes[0].children, true);
    const intersectionModified: THREE.Intersection[] = raycaster.intersectObjects(this.scenes[1].children, true);

    return intersectionOriginal.length > 0 || intersectionModified.length > 0;
  }

  public moveCamera(keyName: string): void {
    switch (keyName) {
      case "w" : {
        this.forward();
        break;
      }
      case "s" : {
        this.backward();
        break;
      }
      case "a" : {
        this.toTheLeft();
        break;
      }
      case "d" : {
        this.toTheRight();
        break;
      }
      default : {
        break;
      }
    }
    this.adjustCameraPositionY();
  }

  private adjustCameraPositionY(): void {
    if (this.isBetweenHeightBounds()) {
      const height: number = Constants.STANDING + this.cameraHeightAdjustment;
      this.cameraM.position.y = height;
      this.cameraO.position.y = height;
      this.cameraHeightAdjustment += this.cameraHeightIncrement;
    } else {
      this.cameraHeightAdjustment -= this.cameraHeightIncrement;
      this.cameraHeightIncrement *= -1;
    }
  }

  private isBetweenHeightBounds(): boolean {
    return this.cameraHeightAdjustment < Constants.CAMERA_MAX_POSITION_Y &&
           this.cameraHeightAdjustment > Constants.CAMERA_MIN_POSITION_Y;
  }
}
