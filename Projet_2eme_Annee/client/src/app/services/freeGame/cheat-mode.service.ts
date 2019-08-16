import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometricCheatService } from "./geomScene/geometric-cheat.service";
import { ThematicCheatService } from "./themeScene/thematic-cheat.service";
import { Vue3DService } from "./vue3D/vue3-d.service";

@Injectable({
  providedIn: "root",
})
export class CheatModeService {
  public activateMode: boolean;
  public isGeometric: boolean;
  public constructor(private vue3dService: Vue3DService, public thematicService: ThematicCheatService,
                     public geometricService: GeometricCheatService) {
    this.activateMode = false;
    this.isGeometric = false;
   }

  public showDifference(sceneO: THREE.Scene, sceneM: THREE.Scene): void {
    if (this.activateMode) {
      this.isGeometric = this.vue3dService.sceneType === "geometric";
      this.revealDifferences(sceneO, sceneM);
    } else {
        this.turnOffCheatMode();
    }
  }

  public revealDifferences(sceneO: THREE.Scene, sceneM: THREE.Scene): void {
    if (this.isGeometric) {
      this.geometricService.searchAddDiff(sceneM);
      this.geometricService.searchDeleteDiff(sceneO);
      this.geometricService.searchColorDiff(sceneO, sceneM);
    } else {
      this.thematicService.searchAddDiff(sceneM);
      this.thematicService.searchDeleteDiff(sceneO);
      this.thematicService.searchColorDiff(sceneO, sceneM);
    }
  }

  public turnOffCheatMode(): void {
    if (this.isGeometric) {
      this.turnOffOnGeometric();
    } else {
      this.turnOffOnThematic();
    }
  }

  public turnOffOnGeometric(): void {
    this.clearIntervalls(this.geometricService.timerO);
    this.clearIntervalls(this.geometricService.timerM);
    this.showAllObjects(this.geometricService.showingObj);
  }

  public turnOffOnThematic(): void {
    this.clearIntervalls(this.thematicService.timerO);
    this.clearIntervalls(this.thematicService.timerM);
    this.showAllObjects(this.thematicService.showingGroup);
  }

  public clearIntervalls(intervallsToClear: NodeJS.Timeout[]): void {
    for (const interval of intervallsToClear) {
      clearInterval(interval);
    }
  }

  public showAllObjects(objects: THREE.Mesh[] | THREE.Group[]): void {
    for (const object of objects) {
      object.visible = true;
    }
  }
}
