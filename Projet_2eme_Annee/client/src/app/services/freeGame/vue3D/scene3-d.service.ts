import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Constants } from "../../../components/vue3-d/fileConstant3DView";

const CANVAS_WIDTH: number = window.innerWidth / Constants.DIVIDEBY2;
const CANVAS_HEIGHT: number = window.innerHeight;

@Injectable({
  providedIn: "root",
})

export class Scene3DService {

  public createRenderer(elem: HTMLCanvasElement): THREE.WebGLRenderer {
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas: elem, alpha: true });
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

    return renderer;
  }

  public createLight(scene: THREE.Scene): void {
    scene.add(new THREE.HemisphereLight(Constants.lightColor));
    const lightIntensity: number = 2;
    const spotLight: THREE.SpotLight = new THREE.SpotLight(Constants.lightColor, lightIntensity);
    spotLight.position.set(Constants.LIGHT_POSITION_X, Constants.LIGHT_POSITION_Y, Constants.LIGHT_POSITION_Z);
    const scalar: number = 1000;
    spotLight.position.multiplyScalar(scalar);
    scene.add(spotLight);
    spotLight.castShadow = true;
  }

  public addMeshesToScene(scene: THREE.Scene, meshes: Array<THREE.Mesh>): void {
    for (const mesh of meshes) {
      scene.add(mesh);
    }
  }

  public makeScene(): THREE.Scene {
    const scene: THREE.Scene = new THREE.Scene();
    this.createLight(scene);

    return scene;
  }

  public cameraSettings(camera: THREE.PerspectiveCamera, elem: HTMLCanvasElement): void {
    camera.fov = Constants.FOV;
    camera.aspect = elem.clientWidth / elem.clientHeight;
    camera.far = Constants.FAR;
    camera.near = Constants.NEAR;
  }
}
