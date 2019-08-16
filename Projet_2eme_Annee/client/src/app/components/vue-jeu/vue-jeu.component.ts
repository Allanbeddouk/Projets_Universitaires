import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeleteImageService } from "src/app/services/deleteImage.service";
import { SceneService } from "src/app/services/freeGame/vue3D/scene.service";
import { Mode } from "../../../../../common/GamesStructures/Player";
import { TimeMinSec } from "../../../../../common/GamesStructures/TimeMinSec";
import { HandleViewsService } from "../../services/handle-views.service";
import { HighScoreRep } from "../../services/highscoreRep.service";
import { ChronometreComponent } from "../chronometre/chronometre.component";
import { WebSocketCommunications } from "../messageries/socket/socket.service";
import { GameInfo } from "./GameInfo";
import { ImagesComponent } from "./images/images.component";
const NBDIFF_SOLO: number = 7;
const NBDIFF_1V1: number = 4;
@Component({
  selector: "app-vue-jeu",
  templateUrl: "./vue-jeu.component.html",
  styleUrls: ["./vue-jeu.component.css"],
})
export class VueJeuComponent implements OnInit, OnDestroy {
  @ViewChild("chrono") public chrono: ChronometreComponent;
  @ViewChild("images") public images: ImagesComponent;
  private gameInfo: GameInfo;
  protected time: TimeMinSec;
  protected foundDiffLoc: number;
  protected foundDiffOpp: number;
  protected maxDiff: number;
  public constructor(private viewsService: HandleViewsService,
                     private activatedRoute: ActivatedRoute,
                     private highscore: HighScoreRep,
                     private wSocket: WebSocketCommunications,
                     private sceneService: SceneService,
                     private router: Router,
                     private deleteImage: DeleteImageService) {
                      this.gameInfo = new GameInfo(
                        this.viewsService.game.mode === Mode.simple,
                        this.activatedRoute.snapshot.params["username"],
                        this.viewsService.game.name,
                        false, false);
                      this.time = {minutes: 0 , seconds: 0 };
                      this.foundDiffLoc = 0;
                      this.foundDiffOpp = 0;
                      this.maxDiff = viewsService.isSolo ? NBDIFF_SOLO : NBDIFF_1V1;
                      }

  public async endGame(winner: boolean): Promise<void> {
    this.gameInfo.isSimple ?  this.images.block() :
    this.sceneService.isGameBlocked = true;
    this.wSocket.stopTimer();
    this.time = this.chrono.getTime();
    this.gameInfo.isWinner = winner;
    this.gameInfo.isWon = true;
    if (winner) {
     this.setHighscore(await this.checkHighscore());
    }
  }
  public ngOnInit (): void {
    this.wSocket.subscribeDifferenceFound( async () => {
      this.foundDiffOpp++;
      if (this.foundDiffOpp === this.maxDiff) { await this.endGame(false); }
    });

    this.wSocket.subscribeUpdateCptrSolo( async () => {
      this.foundDiffLoc++;
      if (this.foundDiffLoc === this.maxDiff) { await this.endGame(true); }
    });
  }

  public ngOnDestroy(): void {
    this.viewsService.isSolo ?
    this.wSocket.leaveRoom() :
    this.wSocket.leaveRoom({gameName: this.gameInfo.gameName, username: this.gameInfo.user});
  }

  private async checkHighscore(): Promise<string> {
    let pos: string;
    if (this.gameInfo.isSimple) {
      this.viewsService.isSolo ? pos = await this.highscore.checkHighScoreSoloSimple(this.gameInfo.gameName, this.gameInfo.user,
                                                                                     String(this.time.minutes),
                                                                                     String(this.time.seconds)) :
                                 pos = await this.highscore.checkHighScore1v1Simple(this.gameInfo.gameName, this.gameInfo.user,
                                                                                    String(this.time.minutes),
                                                                                    String(this.time.seconds));
    } else {
      this.viewsService.isSolo ? pos = await this.highscore.checkHighScoreSoloFree(this.gameInfo.gameName, this.gameInfo.user,
                                                                                   String(this.time.minutes),
                                                                                   String(this.time.seconds)) :

                                 pos = await this.highscore.checkHighScore1v1Free(this.gameInfo.gameName, this.gameInfo.user,
                                                                                  String(this.time.minutes),
                                                                                  String(this.time.seconds));
    }

    return pos;
  }

  private setHighscore(pos: string): void {
    if (pos + "" !== "0") {
      this.viewsService.isSolo ? this.wSocket.bestTime( pos, "solo") : this.wSocket.bestTime(pos, "1 v 1");
    }
  }

  public async logoClicked(): Promise<void> {
    if (this.gameInfo.isSimple) {
      await this.deleteImage.deleteImages(this.gameInfo.user);
    }
    this.router.navigateByUrl("parties/" + this.gameInfo.user, {skipLocationChange: true}).then((res) => {
      if (!res) {
        console.error("routing failed");
      }
    }).catch((e) => {
        console.error(e);
    });
  }
}
