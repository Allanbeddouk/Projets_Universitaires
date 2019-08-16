
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GameStatusService } from "src/app/services/gameStatus.service";
import { FreeGame } from "../../../../../common/GamesStructures/FreeGame";
import {Mode} from "../../../../../common/GamesStructures/Player";
import { SimpleGame } from "../../../../../common/GamesStructures/SimpleGame";
import { CreationJeuVueSimpleService } from "../../services/creation-jeu-vue-simple.service";
import { CreationJeuVueLibreService } from "../../services/freeGame/creation-jeu-vue-libre.service";
import { HandleViewsService } from "../../services/handle-views.service";
import { WebSocketCommunications } from "../messageries/socket/socket.service";

@Component({
  selector: "app-fiche",
  templateUrl: "./fiche.component.html",
  styleUrls: ["./fiche.component.css"],
})
export class FicheComponent implements OnInit {
  @Input() protected deleteVisible: boolean;
  @Input() protected initializeVisible: boolean;
  @Input() public myGame: SimpleGame | FreeGame;
  @Input() public adminMode: boolean;
  public imgPath: string;
  @Input() protected isGameCreated: boolean;
  public constructor(protected viewsService: HandleViewsService,
                     private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private freeGameService: CreationJeuVueLibreService,
                     private simpleGameService: CreationJeuVueSimpleService,
                     private wSocket: WebSocketCommunications,
                     private gameStatusService: GameStatusService) {
    this.adminMode = false;
    this.imgPath = "";
    this.myGame = new SimpleGame();
    this.deleteVisible = false;
    this.initializeVisible = false;
    this.isGameCreated = false;
  }

  public async ngOnInit(): Promise<void> {
    await this.setGameStatus();
    this.wSocket.subscribeGameCreation((gameName: string) => {
      if (gameName === this.myGame.name) {
        this.isGameCreated = true;
      }
    });

    this.wSocket.subscribeGameJoined(() => {
      this.router.navigateByUrl("jeu/" + this.activatedRoute.snapshot.params["username"]).then((res: boolean) => {
        if (res) {
          console.error("Le routing vers /jeu a echoue");
        }
      }).catch((e) => {
        console.error(e);
      },
      );
    });

    this.wSocket.subscribeGameClosed((gameName: string) => {
      if (gameName === this.myGame.name) {
        this.isGameCreated = false;
      }
    });
    if (this.myGame.mode === Mode.simple) {
    this.imgPath = "http://" + window.location.hostname + ":3000/" + (this.myGame as SimpleGame).imgOg;
    } else if (this.myGame.mode === Mode.free) {
      this.imgPath = (this.myGame as FreeGame).screen;
    }
  }

  public startGame(): void {
    this.viewsService.isSolo = true;
    this.wSocket.createGameSolo();
    if (this.myGame.mode === Mode.simple) {
      this.viewsService.game = this.myGame as SimpleGame;
      const username: string = this.activatedRoute.snapshot.params["username"];
      this.router.navigateByUrl("jeu/" + username).then((res: boolean) => {
        if (res) {
          console.error("Le routing vers /jeu a echoue");

        }
      }).catch((e) => {
        console.error(e);
      },
      );
    } else {
      this.viewsService.game = this.myGame as FreeGame;
      const username: string = this.activatedRoute.snapshot.params["username"];
      this.router.navigateByUrl("jeu/" + username).then((res: boolean) => {
        if (res) {
          console.error("Le routing vers /jeu a echoue");

        }
      }).catch((e) => {
        console.error(e);
      },
      );
    }
  }

  public async deleteGame(): Promise<void> {
    let isDelete: boolean = false;
    if (this.myGame.mode === Mode.simple) {
    isDelete = await this.simpleGameService.deleteSimpleGame(this.myGame.name);
    } else if (this.myGame.mode === Mode.free) {
      isDelete = await this.freeGameService.deleteFreeGame(this.myGame.name);
    }
    if (isDelete) {
        this.wSocket.gameDeleted(this.myGame.name);
        alert("Le jeu a été supprimé avec succès");
        location.reload();
    } else {
      alert("Le jeu n'a pas pu être supprimé");
    }
  }

  public async initializeGame(): Promise<void> {
    let isInitialize: boolean = false;
    if (this.myGame.mode === Mode.simple) {
      isInitialize = await this.simpleGameService.simpleGameInitialisation(this.myGame.name);
    } else if (this.myGame.mode === Mode.free) {
      isInitialize = await this.freeGameService.freeGameInitialisation(this.myGame.name);
    }

    if (isInitialize) {
      alert("Le jeu a été initialisé avec succès");
      location.reload();
    } else {
      alert("Le jeu n'a pas pu être initialisé");
    }
  }

  public createGame(): void {
    const username: string = this.activatedRoute.snapshot.params["username"];
    this.viewsService.isSolo = false;
    this.myGame.mode === Mode.simple ?
    this.viewsService.game = this.myGame as SimpleGame :
    this.viewsService.game = this.myGame as FreeGame;

    this.wSocket.createGame1v1();
    this.selectViewType();
    this.router.navigateByUrl("attente/" + username).then((res: boolean) => {
      if (res) {
        console.error("Le routing vers /attente a echoue");

      }
    }).catch((e) => {
      console.error(e);
    },
    );
  }

  public joinGame(): void {
    this.viewsService.isSolo = false;
    this.myGame.mode === Mode.simple ?
    this.viewsService.game = this.myGame as SimpleGame :
    this.viewsService.game = this.myGame as FreeGame;
    this.wSocket.joinGame();
    this.selectViewType();
  }

  private selectViewType(): void {
   this.myGame.mode === Mode.simple ? this.viewsService.game = this.myGame as SimpleGame :
                                      this.viewsService.game = this.myGame as FreeGame;
  }

  private async setGameStatus(): Promise<void> {
    this.isGameCreated = await this.gameStatusService.getGameStatus(this.myGame.name);
  }
}
