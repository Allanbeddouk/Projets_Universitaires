import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometricItem } from "../../../../../../common/3DView/GeometricScene/GeometricItem";
import { GeometricScene } from "../../../../../../common/3DView/GeometricScene/GeometricScene";
import { Constants } from "../../../components/vue3-d/fileConstant3DView";
import { CameraService } from "../vue3D/camera.service";
import { CaptureEcranVue3DService } from "../vue3D/captureEcranVue3d.service";
import { Scene3DService } from "../vue3D/scene3-d.service";

@Injectable({
  providedIn: "root",
})
export class GeometricGenerationService {
  public scenesInfos: GeometricScene[];
  public renderers: THREE.WebGLRenderer[];
  public scenes: THREE.Scene[];
  public originaleScreen: string;
  public constructor(private screenShotService: CaptureEcranVue3DService,
                     private cameraService: CameraService, private sceneService: Scene3DService) {
    this.scenesInfos = [];
    this.scenesInfos.push({fontColor: "", items: []});
    this.scenesInfos.push({fontColor: "", items: []});

    this.renderers = [];
    this.renderers.push(new THREE.WebGLRenderer());
    this.renderers.push(new THREE.WebGLRenderer());

    this.scenes = [];
    this.scenes.push(this.sceneService.makeScene());
    this.scenes.push(this.sceneService.makeScene());
  }

  public addFloor(scene: THREE.Scene): void {
    const width: number = 0.1;
    const height: number = 750;
    const depth: number = 750;
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(width, height, depth);
    geometry.name = "floor";
    const materialFloor: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: Constants.FLOOR_COLOR });
    const floor: THREE.Mesh = new THREE.Mesh(geometry, materialFloor);
    floor.rotateZ(- (Math.PI / Constants.DIVIDEBY2));
    scene.add(floor);
  }

  public createSphereMesh(sceneItem: GeometricItem): THREE.Mesh {
    const radius: number = sceneItem.itemParams[Constants.INDEX_0];
    const widthSegments: number = sceneItem.itemParams[Constants.INDEX_1];
    const heightSegments: number = sceneItem.itemParams[Constants.INDEX_2];
    const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const colorItem: string = sceneItem.color;
    const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: colorItem });
    sphereGeometry.name = sceneItem.diffName;

    return new THREE.Mesh(sphereGeometry, material);
  }

  public createCubeMesh(sceneItem: GeometricItem): THREE.Mesh {
    const width: number = sceneItem.itemParams[Constants.INDEX_0];
    const height: number = sceneItem.itemParams[Constants.INDEX_1];
    const depth: number = sceneItem.itemParams[Constants.INDEX_2];
    const colorItem: string = sceneItem.color;
    const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: colorItem });
    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(width, height, depth);
    cubeGeometry.name = sceneItem.diffName;

    return new THREE.Mesh(cubeGeometry, material);
  }

  public createConeMesh(sceneItem: GeometricItem): THREE.Mesh {
    const radius: number = sceneItem.itemParams[Constants.INDEX_0];
    const height: number = sceneItem.itemParams[Constants.INDEX_1];
    const radialSegments: number = sceneItem.itemParams[Constants.INDEX_2];
    const heightSegments: number = sceneItem.itemParams[Constants.INDEX_3];
    const colorItem: string = sceneItem.color;
    const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: colorItem });
    const coneGeometry: THREE.ConeGeometry = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments);
    coneGeometry.name = sceneItem.diffName;

    return new THREE.Mesh(coneGeometry, material);
  }

  public createCylinderMesh(sceneItem: GeometricItem): THREE.Mesh {
    const radiusTop: number = sceneItem.itemParams[Constants.INDEX_0];
    const radiusBottom: number = sceneItem.itemParams[Constants.INDEX_1];
    const height: number = sceneItem.itemParams[Constants.INDEX_2];
    const radialSegments: number = sceneItem.itemParams[Constants.INDEX_3];
    const heightSegments: number = sceneItem.itemParams[Constants.INDEX_4];
    const colorItem: string = sceneItem.color;
    const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: colorItem });
    const cylinderGeometry: THREE.CylinderBufferGeometry =
      new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);
    cylinderGeometry.name = sceneItem.diffName;

    return new THREE.Mesh(cylinderGeometry, material);
  }

  public createPyramidMesh(sceneItem: GeometricItem): THREE.Mesh {
    const radius: number = sceneItem.itemParams[Constants.INDEX_0];
    const colorItem: string = sceneItem.color;
    const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: colorItem });
    const pyramidGeometry: THREE.TetrahedronGeometry = new THREE.TetrahedronGeometry(radius);
    pyramidGeometry.name = sceneItem.diffName;

    return new THREE.Mesh(pyramidGeometry, material);
  }

  public positioningRotatingGeometry(mesh: THREE.Mesh, sceneItem: GeometricItem): void {
    const box: THREE.Box3 = new THREE.Box3().setFromObject(mesh);
    mesh.position.x = sceneItem.coordinates.x;
    mesh.position.y = sceneItem.coordinates.y + box.max.y;
    mesh.position.z = sceneItem.coordinates.z;
    mesh.rotateX(sceneItem.rotation);
    mesh.rotateY(sceneItem.rotation);
    mesh.rotateZ(sceneItem.rotation);
  }

  public addMeshToTab(sceneItem: GeometricItem, allObjects: Array<THREE.Mesh>): void {
    switch (sceneItem.geometry) {
      case "sphere": {
        allObjects.push(this.createSphereMesh(sceneItem));
        break;
      }
      case "cube": {
        allObjects.push(this.createCubeMesh(sceneItem));
        break;
      }
      case "cone": {
        allObjects.push(this.createConeMesh(sceneItem));
        break;
      }
      case "cylinder": {
        allObjects.push(this.createCylinderMesh(sceneItem));
        break;
      }
      case "pyramid": {
        allObjects.push(this.createPyramidMesh(sceneItem));
        break;
      }
      default: {
        break;
      }
    }
  }

  public buildTabOfGeometry(scene: GeometricScene): Array<THREE.Mesh> {
    const allObjects: Array<THREE.Mesh> = [];
    for (let i: number = 0; i < scene.items.length; i++) {
      this.addMeshToTab(scene.items[i], allObjects);
      this.positioningRotatingGeometry(allObjects[i], scene.items[i]);
    }

    return allObjects;
  }

  public addColorToScene(scene: THREE.Scene, scene3D: GeometricScene): void {
    scene.background = new THREE.Color(scene3D.fontColor);
  }

  public generateScene(elem: HTMLCanvasElement, scene3D: GeometricScene, isOriginale: boolean): void {
    const scene: THREE.Scene = isOriginale ? this.scenes[0] : this.scenes[1];
    const renderer: THREE.WebGLRenderer = this.sceneService.createRenderer(elem);
    if (isOriginale) {
      this.scenesInfos[0] = scene3D;
      this.cameraService.setCameraPosition(true);
      this.renderers[0] = renderer;
      this.generateSkybox(this.scenes[0]);
    } else {
      this.scenesInfos[1] = scene3D;
      this.cameraService.setCameraPosition(false);
      this.renderers[1] = renderer;
      this.generateSkybox(this.scenes[1]);
    }
    this.addColorToScene(scene, scene3D);
    this.addFloor(scene);

    const allObjects: Array<THREE.Mesh> = this.buildTabOfGeometry(scene3D);
    this.sceneService.addMeshesToScene(scene, allObjects);

    const camera: THREE.PerspectiveCamera = isOriginale ? this.cameraService.cameraO : this.cameraService.cameraM;
    this.sceneService.cameraSettings(camera, elem);
    if (isOriginale) {
      this.originaleScreen = this.screenShotService.takeScreenshot(renderer, scene, camera);
    }
    this.cameraService.scenes = this.scenes;
  }

  public onWindowResize(): void {
    this.renderers[0].setSize(window.innerWidth / Constants.DIVIDEBY2, window.outerHeight);
    this.renderers[1].setSize(window.innerWidth / Constants.DIVIDEBY2, window.outerHeight);
  }

  public generateSkybox(scene: THREE.Scene): void {
    const urls: string[] = this.generateImageUrls();

    const reflectionCube: THREE.Texture = THREE.ImageUtils.loadTextureCube(urls);
    reflectionCube.format = THREE.RGBAFormat;

    const shader: THREE.Shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;

    const material: THREE.ShaderMaterial = new THREE.ShaderMaterial( {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide,
        transparent: true,
    });

    const mesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(Constants.SKYBOX_SIZE, Constants.SKYBOX_SIZE, Constants.SKYBOX_SIZE),
                                            material);
    mesh.position.y = Constants.SKYBOX_HEIGHT;
    mesh.geometry.name = "skybox";
    scene.add(mesh);
  }

  public generateImageUrls(): string[] {
    const path: string = "assets/Skybox/GeometricScene/";
    const format: string = ".png";

    return [
      path + "transparent" + format,
      path + "transparent" + format,
      path + "transparent" + format,
      path + "transparent" + format,
      path + "transparent" + format,
      path + "transparent" + format,
    ];

  }
}
