import { Injectable } from "@angular/core";
import { SimpleGame } from "../../../../common/GamesStructures/SimpleGame";
import {Position} from "../../../../common/communication/position";
import { HandleViewsService } from "./handle-views.service";
const PATH: string = "http://" + window.location.hostname + ":3000/";

@Injectable({
    providedIn: "root",
})
export class ImagesService {
    public imgModName: string;
    public pathImgMod: string;
    public pathImgOg: string;
    public lastClickMs: number;
    public isMissed: boolean[];
    public isOriginalActive: boolean;
    public position: Position;

    public constructor(private viewsService: HandleViewsService) {
        this.imgModName = (this.viewsService.game as SimpleGame).imgMd;
        this.pathImgMod = PATH + (this.viewsService.game as SimpleGame).imgMd;
        this.pathImgOg = PATH + (this.viewsService.game as SimpleGame).imgOg;
        this.lastClickMs = 0;
        this.isMissed = [false, false];
        this.isOriginalActive = false;
        this.position = {x: 0, y: 0};
    }

    public activateModifiedView(): void {
        this.isOriginalActive = false;
      }

    public activateOriginalView(): void {
        this.isOriginalActive = true;
    }
}
