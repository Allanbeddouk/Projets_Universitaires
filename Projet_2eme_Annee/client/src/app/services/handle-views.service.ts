import { Injectable } from "@angular/core";
import { FreeGame } from "../../../../common/GamesStructures/FreeGame";
import { SimpleGame } from "../../../../common/GamesStructures/SimpleGame";

@Injectable({
  providedIn: "root",
})
export class HandleViewsService {
  public game: SimpleGame | FreeGame;
  public isSolo: boolean;
  public constructor() {
    this.game = new SimpleGame();
    this.isSolo = true;
  }
}
