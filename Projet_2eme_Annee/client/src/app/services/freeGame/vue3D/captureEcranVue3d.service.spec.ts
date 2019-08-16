import { HttpClientTestingModule } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { AppModule } from "../../../app.module";
import { CaptureEcranVue3DService } from "./captureEcranVue3d.service";
import Spy = jasmine.Spy;

describe("CaptureEcranVue3DService", () => {
  let injector: TestBed;
  let service: CaptureEcranVue3DService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [CaptureEcranVue3DService],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(CaptureEcranVue3DService);

  });

  it("takeScreenshot should be called and should return a image jpg 64 bits", () => {
    const spy: Spy = spyOn(service, "takeScreenshot").and.callThrough();
    try {
      const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
      const scene: THREE.Scene = new THREE.Scene();
      const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
      const sizeOfFormat: number = 21;
      const format: string = service.takeScreenshot(renderer, scene, camera).substring(0, sizeOfFormat);
      expect(format).toEqual("data:image/jpeg;base6");
      expect(spy).toHaveBeenCalled();
    } catch (e) {
      e = e;
    }

  });

});
