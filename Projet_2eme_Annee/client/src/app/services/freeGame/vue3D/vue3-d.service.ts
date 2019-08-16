import { Injectable } from "@angular/core";
import { GeometricGenerationService } from "../geomScene/geometric-generation.service";
import { ThematicGenerationService } from "../themeScene/thematic-generation.service";

@Injectable({
  providedIn: "root",
})
export class Vue3DService {

  public sceneType: string;

  public constructor(public geometricGeneration: GeometricGenerationService, public thematicGeneration: ThematicGenerationService) {
  }
}
