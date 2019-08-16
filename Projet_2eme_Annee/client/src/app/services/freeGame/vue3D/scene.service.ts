import { Injectable } from "@angular/core";
import {Position} from "../../../../../../common/communication/position";

@Injectable({
    providedIn: "root",
})
export class SceneService {
    public isGameBlocked: boolean;
    public isMissed: boolean[];
    public isOriginalActive: boolean;
    public position: Position;

    public constructor() {
        this.isGameBlocked = false;
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
