export class OrbitControls {
  constructor(object: any, domElement: any, domWindow: any);
  addEventListener(type: any, listener: any): void;
  apply(target: any): void;
  dispatchEvent(event: any): void;
  dispose(): void;
  dollyIn(dollyScale: any): void;
  dollyOut(dollyScale: any): void;
  getAutoRotationAngle(): any;
  getAzimuthalAngle(): any;
  getPolarAngle(): any;
  getZoomScale(): any;
  hasEventListener(type: any, listener: any): any;
  pan(deltaX: any, deltaY: any): void;
  panLeft(distance: any, objectMatrix: any): void;
  panUp(distance: any, objectMatrix: any): void;
  removeEventListener(type: any, listener: any): void;
  reset(): void;
  rotateLeft(angle: any): void;
  rotateUp(angle: any): void;
  update(): any;
}
