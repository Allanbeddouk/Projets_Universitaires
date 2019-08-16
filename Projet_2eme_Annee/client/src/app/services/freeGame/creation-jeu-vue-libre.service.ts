import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {CriteresDifferences} from "../../../../../common/3DView/FreeGamesInterfaces";
import {GeometricScene} from "../../../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../../../common/3DView/ThematicScene/ThematicScene";
import { Vue3DService } from "./vue3D/vue3-d.service";

export const MIN_QUANTITY: number = 10;
const DELAY_SCENE_LOADING: number = 5000;

@Injectable({
  providedIn: "root",
})
export class CreationJeuVueLibreService {
  public readonly SERVER_URL_ADMIN: string = "http://" + window.location.hostname + ":3000/admin";

  public gameName: string;
  public quantity: number;
  public selection: string;

  public modifications: CriteresDifferences;
  public showScenes: boolean;

  public constructor(private http: HttpClient, private vue3dService: Vue3DService) {
    this.gameName = "";
    this.quantity = MIN_QUANTITY;
    this.selection = "geometric";
    this.showScenes = false;

    this.modifications = {changeColor: false, addItem: false, deleteItem: false};
  }

  public async checkQuantity(): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/checkQuantity", {quantity: this.quantity}).toPromise();
  }

  public async sendModifications(): Promise<void> {
    return this.http.post<void>(this.SERVER_URL_ADMIN + "/sendModifications", {modifications: this.modifications,
                                                                               selection: this.selection}).toPromise();
  }

  public async sendScreen(screen: string): Promise<void> {
    return this.http.post<void>(this.SERVER_URL_ADMIN + "/sendScreen", {screen: screen}).toPromise();
  }

  public async freeGameValidation(): Promise<boolean> {
    const screenShot: string = await this.generateScreenScene();
    const DIVID_TWO: number = 2;
    await this.sendScreen(screenShot.substr(0, screenShot.length / DIVID_TWO));
    await this.sendScreen(screenShot.substr(screenShot.length / DIVID_TWO, screenShot.length));

    const scenes: GeometricScene[] | ThematicScene[] = this.selection === "geometric" ? this.retrieveScenes() as GeometricScene[] :
                                                                                        this.retrieveScenes() as ThematicScene[];

    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/freeGameValidation", { gameName: this.gameName,
                                                                                    scenes: scenes}).toPromise();
  }

  public async freeGameInitialisation(gameName: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/freeGameInitialisation", { gameName: gameName}).toPromise();
  }

  public async waitSceneToLoad(ms: number): Promise<void> {
    return new Promise<void>( (resolve) => setTimeout(resolve, ms) );
  }

  public async deleteFreeGame(gameName: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/deleteFreeGames", {gameName: gameName}).toPromise();
  }

  public async generateScreenScene(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      await this.sendModifications();
      this.vue3dService.sceneType = this.selection;
      this.showScenes = true;
      await this.waitSceneToLoad(DELAY_SCENE_LOADING);
      const screenShot: string = this.selection === "geometric" ? this.vue3dService.geometricGeneration.originaleScreen :
                                                                  this.vue3dService.thematicGeneration.originaleScreen;
      this.showScenes = false;
      resolve(screenShot);
    });
    }

  public retrieveScenes(): GeometricScene[] | ThematicScene[] {
    if (this.selection === "geometric") {
      const scenes: GeometricScene[] = [];
      scenes.push(this.vue3dService.geometricGeneration.scenesInfos[0]);
      scenes.push(this.vue3dService.geometricGeneration.scenesInfos[1]);

      return scenes;
    } else {
      const scenes: ThematicScene[] = [];
      scenes.push(this.vue3dService.thematicGeneration.scenesInfos[0]);
      scenes.push(this.vue3dService.thematicGeneration.scenesInfos[1]);

      return scenes;
    }
  }

}
