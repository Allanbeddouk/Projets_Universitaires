import { getTestBed, inject, TestBed } from "@angular/core/testing";
import * as THREE from "three";
import Spy = jasmine.Spy;
import { Constants } from "../../../components/vue3-d/fileConstant3DView";
import { CameraService } from "./camera.service";

describe("CameraService", () => {
  let injector: TestBed;
  let service: CameraService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [CameraService],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(CameraService);
    service.scenes[0] = new THREE.Scene();
    service.scenes[1] = new THREE.Scene();
});

  it("should be created", inject([CameraService], () => {
    expect(service).toBeTruthy();
  }));

  it("createCamera should be called to create a camera", () => {
    const spy: Spy = spyOn(service, "createCamera").and.callThrough();
    service.createCamera();
    expect(spy).toHaveBeenCalled();
  });

  it("onMouseDonw should change the variable canMove to true if it's a right click", () => {
    const event: MouseEvent = new MouseEvent("click", { button: Constants.RIGHTCLICK });
    service.onMouseDown(event);
    expect(service.canMove).toBeTruthy();
  });

  it("onMouseUp should change the variable canMove to true if it's a right click", () => {
    const event: MouseEvent = new MouseEvent("mouseup", { button: Constants.RIGHTCLICK });
    service.onMouseUp(event);
    expect(service.canMove).toBeFalsy();
  });

  it("onMouseMove should be called and rotate the camera", () => {
    const spy: Spy = spyOn(service, "onMouseMove").and.callThrough();
    const camera: THREE.PerspectiveCamera = service.cameraM.clone();
    const event: MouseEvent = new MouseEvent("onmousemove", { button: Constants.RIGHTCLICK,
                                                              clientX: 54, clientY: 88, });
    service.canMove = true;
    service.onMouseMove(event);
    expect(spy).toHaveBeenCalled();
    expect(camera.rotation).not.toEqual(service.cameraM.rotation);
  });

  it("forward should be called and change the position of both camera ", () => {
    const spy: Spy = spyOn(service, "forward").and.callThrough();
    const camera: THREE.PerspectiveCamera = service.cameraM.clone();
    service.forward();
    expect(spy).toHaveBeenCalled();
    expect(camera.position).not.toEqual(service.cameraM.position);
  });

  it("backward should be called and change the position of both camera ", () => {
    const spy: Spy = spyOn(service, "backward").and.callThrough();
    const camera: THREE.PerspectiveCamera = service.cameraM.clone();
    service.backward();
    expect(spy).toHaveBeenCalled();
    expect(camera.position).not.toEqual(service.cameraM.position);
  });

  it("toTheLeft should be called and change the position of both camera ", () => {
    const spy: Spy = spyOn(service, "toTheLeft").and.callThrough();
    const camera: THREE.PerspectiveCamera = service.cameraM.clone();
    service.toTheLeft();
    expect(spy).toHaveBeenCalled();
    expect(camera.position).not.toEqual(service.cameraM.position);
  });

  it("toTheRight should be called and change the position of both camera ", () => {
    const spy: Spy = spyOn(service, "toTheRight").and.callThrough();
    const camera: THREE.PerspectiveCamera = service.cameraM.clone();
    service.toTheRight();
    expect(spy).toHaveBeenCalled();
    expect(camera.position).not.toEqual(service.cameraM.position);
  });

  it("checkCollision should be called and return true if there is an object in front of the camera", () => {
    const spy: Spy = spyOn(service, "checkCollision").and.callThrough();
    service.scenes[0].add(service.cameraM);
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(0, 0, 0);
    const mesh: THREE.Mesh = new THREE.Mesh(geometry);
    mesh.position.setX(0);
    mesh.position.setY(0);
    mesh.position.setZ(0);
    service.cameraM.position.setZ(-1);
    service.scenes[0].add(mesh);
    service.cameraM.lookAt(mesh.position);
    const result: boolean = service.checkCollision(new THREE.Vector3(0, 0, -1).applyQuaternion(service.cameraO.quaternion));
    expect(spy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it("checkCollision should be called and return false if there is not an object in front of the camera", () => {
    const spy: Spy = spyOn(service, "checkCollision").and.callThrough();
    service.scenes[0].add(service.cameraM);
    const result: boolean = service.checkCollision(new THREE.Vector3(0, 0, -1).applyQuaternion(service.cameraO.quaternion));
    expect(spy).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });

  it("moveCamera should be called and called forward when 'w' is pressed ", () => {
    const spy: Spy = spyOn(service, "moveCamera").and.callThrough();
    const spyCamera: Spy = spyOn(service, "forward").and.callThrough();
    service.moveCamera("w");
    expect(spy).toHaveBeenCalled();
    expect(spyCamera).toHaveBeenCalled();
  });

  it("moveCamera should be called and called backward when 's' is pressed ", () => {
    const spy: Spy = spyOn(service, "moveCamera").and.callThrough();
    const spyCamera: Spy = spyOn(service, "backward").and.callThrough();
    service.moveCamera("s");
    expect(spy).toHaveBeenCalled();
    expect(spyCamera).toHaveBeenCalled();
  });

  it("moveCamera should be called and called toTheLeft when 'a' is pressed ", () => {
    const spy: Spy = spyOn(service, "moveCamera").and.callThrough();
    const spyCamera: Spy = spyOn(service, "toTheLeft").and.callThrough();
    service.moveCamera("a");
    expect(spy).toHaveBeenCalled();
    expect(spyCamera).toHaveBeenCalled();
  });

  it("moveCamera should be called and called toTheRight when 'd' is pressed ", () => {
    const spy: Spy = spyOn(service, "moveCamera").and.callThrough();
    const spyCamera: Spy = spyOn(service, "toTheRight").and.callThrough();
    service.moveCamera("d");
    expect(spy).toHaveBeenCalled();
    expect(spyCamera).toHaveBeenCalled();
  });
});
