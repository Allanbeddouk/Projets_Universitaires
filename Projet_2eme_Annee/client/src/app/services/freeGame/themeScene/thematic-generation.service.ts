import { Injectable } from "@angular/core";
import * as THREE from "three";
import {ThematicScene} from "../../../../../../../Cadriciel/common/3DView/ThematicScene/ThematicScene";
import {Coordinates3D} from "../../../../../../common/3DView/FreeGamesInterfaces";
import { Pokemon } from "../../../../../../common/3DView/ThematicScene/Pokemon";
import { Constants } from "../../../components/vue3-d/fileConstant3DView";
import { CameraService } from "../vue3D/camera.service";
import { CaptureEcranVue3DService } from "../vue3D/captureEcranVue3d.service";
import { Scene3DService } from "../vue3D/scene3-d.service";
const ASSETS_DIR: string = "assets/";
const OBJ_EXT: string = ".obj";
const MTL_EXT: string = ".mtl";

@Injectable({
  providedIn: "root",
})
export class ThematicGenerationService {
  public scenesInfos: ThematicScene[];
  public renderers: THREE.WebGLRenderer[];
  public scenes: THREE.Scene[];
  public originaleScreen: string;
  private loadedPokemons: {[name: string]: THREE.Group};
  public constructor(private sceneService: Scene3DService, private cameraService: CameraService,
                     private screenShotService: CaptureEcranVue3DService) {
    this.scenesInfos = [];
    this.scenesInfos.push({pokemons: []});
    this.scenesInfos.push({pokemons: []});

    this.renderers = [];
    this.renderers.push(new THREE.WebGLRenderer());
    this.renderers.push(new THREE.WebGLRenderer());

    this.scenes = [];
    this.scenes.push(this.sceneService.makeScene());
    this.scenes.push(this.sceneService.makeScene());
    this.originaleScreen = "";

    this.loadedPokemons = {};
  }

  public async generateScene(elem: HTMLCanvasElement, scene3D: ThematicScene, isOriginale: boolean): Promise<void> {
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
    const camera: THREE.PerspectiveCamera = isOriginale ? this.cameraService.cameraO : this.cameraService.cameraM;
    this.sceneService.cameraSettings(camera, elem);

    await this.addModelsToScene(scene3D, isOriginale).then(() => {
      if (isOriginale) {
            this.originaleScreen = this.screenShotService.takeScreenshot(renderer, scene, camera);
          }
      this.cameraService.scenes = this.scenes;
    });
  }

  public onWindowResize(): void {
    this.renderers[0].setSize(window.innerWidth / Constants.DIVIDEBY2, window.outerHeight);
    this.renderers[1].setSize(window.innerWidth / Constants.DIVIDEBY2, window.outerHeight);
  }

  public async addModelsToScene(scene: ThematicScene, isOriginale: boolean): Promise<void> {
    for (const pokemon of scene.pokemons) {
      const name: string = pokemon.name + pokemon.textureDir;
      this.isPokemonLoaded(name) ? this.addModelToScene(this.loadedPokemons[name].clone(),
                                                        isOriginale, pokemon) :
                                   await this.loadObjectMesh(pokemon, isOriginale).then();
    }
  }

  public addModelToScene(model: THREE.Group, isOriginale: boolean, pokemonInfos: Pokemon): void {
    const scene: THREE.Scene = isOriginale ? this.scenes[0] : this.scenes[1];
    this.setPokemonSize( model, pokemonInfos.size);
    this.setPokemonPosition( model, pokemonInfos.coordinates);
    this.setModelName(model, pokemonInfos);
    model.rotation.y = 0;
    model.rotateY(pokemonInfos.rotation);
    scene.add(model);
  }

  public extractTexture(pokemon: Pokemon): string {
    const TWO_INDEX: number = 2;

    return pokemon.textureDir.substr(1, pokemon.textureDir.length - TWO_INDEX);
  }

  public setModelName (model: THREE.Group, pokemonInfos: Pokemon): void {
    model.name = pokemonInfos.name + this.extractTexture(pokemonInfos) + "&" + pokemonInfos.diffName;
  }

  public setPokemonSize(pokemon: THREE.Object3D, size: number): void {
    pokemon.scale.set(size, size, size);
  }

  public setPokemonPosition(pokemon: THREE.Object3D, position: Coordinates3D): void {
    pokemon.position.set(position.x, position.y, position.z);
  }

  public async loadObjectMesh(pokemon: Pokemon, isOriginale: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      const mtlDir: string = pokemon.name + pokemon.textureDir + pokemon.name;
      const objDir: string = pokemon.name + "/" + pokemon.name;
      // To avoid typeScript error at compilation any is required here
      // tslint:disable-next-line:no-any
      const mtlLoader: any = require("three-obj-mtl-loader");
      const texture: THREE.OBJLoader = new mtlLoader.MTLLoader();
      // To avoid typeScript error at compilation any is required here
      // tslint:disable-next-line:no-any
      const objLoader: any = require("three-obj-loader");
      objLoader(THREE);
      const objModel: THREE.OBJLoader = new THREE.OBJLoader();

      texture.load(ASSETS_DIR + mtlDir + MTL_EXT,
                  // ThreeJS MTLLoader
                  // tslint:disable-next-line:no-any
                   ( materials: any ) => {
          objModel.setMaterials(materials);
          objModel.load(ASSETS_DIR + objDir + OBJ_EXT,
                        ( model: THREE.Group ) => {
            this.addModelToScene(model, isOriginale, pokemon);
            this.loadedPokemons[pokemon.name + pokemon.textureDir] = model;
            resolve();
        });
      });
    });
  }

  private isPokemonLoaded(name: string): boolean {
    return this.loadedPokemons[name] ? true : false;
  }

  public generateSkybox(scene: THREE.Scene): void {
    const urls: string[] = this.generateImageUrls();

    const reflectionCube: THREE.Texture = THREE.ImageUtils.loadTextureCube(urls);
    reflectionCube.format = THREE.RGBFormat;

    const shader: THREE.Shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;

    const material: THREE.ShaderMaterial = new THREE.ShaderMaterial( {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide,
    });

    const mesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(Constants.SKYBOX_SIZE, Constants.SKYBOX_SIZE, Constants.SKYBOX_SIZE),
                                            material);
    mesh.position.y = Constants.SKYBOX_HEIGHT;
    mesh.geometry.name = "skybox";
    scene.add(mesh);
  }

  public generateImageUrls(): string[] {
    const path: string = "assets/Skybox/Pokemon/";
    const format: string = ".jpg";

    return [
      path + "side" + format,
      path + "side" + format,
      path + "sky" + format,
      path + "floor" + format,
      path + "side" + format,
      path + "side" + format,
    ];
  }
}
