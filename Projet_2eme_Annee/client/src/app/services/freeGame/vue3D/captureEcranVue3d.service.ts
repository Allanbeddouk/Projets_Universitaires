import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CaptureEcranVue3DService {

  public takeScreenshot(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): string {

    const img: HTMLImageElement = new Image();
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL("image/jpeg");

    return  img.src;
  }
}
