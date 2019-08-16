import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { HandleViewsService } from "src/app/services/handle-views.service";
import { InitialeService } from "src/app/services/initiale.service";
import * as THREE from "three";
import { TimeMinSec } from "../../../../../../common/GamesStructures/TimeMinSec";
import { MessageBT } from "../../../../../../common/communication/messageBT";
import { MessageDifferenceLibre, MessageDifferenceSimple } from "../../../../../../common/communication/messageDifference";
import { MessageGameUser } from "../../../../../../common/communication/messageGameUser";
import { MessageWS } from "../../../../../../common/communication/messageWS";
import { Position } from "../../../../../../common/communication/position";

@Injectable()
export class WebSocketCommunications {

  private socket: SocketIOClient.Socket;

  public constructor(private initialeService: InitialeService, private viewService: HandleViewsService) {
    this.socket = io("http://" + window.location.hostname + ":3000");
  }

  public connect(): void {
    this.socket.emit("connectionApp", this.initialeService.username);
  }
  public subscribeMessage( f: Function): void {
    this.socket.on("message", (message: MessageWS) => f(message));
  }
  public subscribeTime(f: Function): void {
    this.socket.on("updateTime", (time: TimeMinSec) => f(time));
  }

  public subscribeGameCreation(f: Function): void {
    this.socket.on("gameCreated", (gameName: string) => f(gameName));
  }

  public subscribeGameJoined(f: Function): void {
    this.socket.on("gameJoined", (gameName: string) => f(gameName));
  }

  public subscribeDifferenceFound(f: Function): void {
    this.socket.on("differenceFound", (position: Position) => f(position));
  }
  public subscribeGameClosed(f: Function): void {
    this.socket.on("gameClosed", (gameName: string) => f(gameName));
  }

  public subscribeUpdateCptrSolo(f: Function): void {
    this.socket.on("updateCptr", () => f());
  }
  public subscribeOpponentLeft(f: Function): void {
    this.socket.on("opponentLeft", () => f());
  }
  public differenceFound(position: Position): void {
    const message: MessageDifferenceSimple = {x: position.x, y: position.y, username: this.initialeService.username,
                                              gameName: this.viewService.game.name};
    this.socket.emit("sendDifference", message );
  }
  public disconnect(username: string): void {
    this.socket.emit("disconnectionApp", username);
  }
  public createGameSolo(): void {
    this.socket.emit("createRoom");
  }
  public leaveRoom(message?: MessageGameUser): void {
    this.socket.emit("leaveRoom", message);
  }
  public error(message?: MessageGameUser): void {
    this.socket.emit("errorIdent", message);
  }
  public difference( message?: MessageGameUser): void {
    this.socket.emit("difference", message);
  }
  public bestTime(pos: string, mod: string ): void {
    const message: MessageBT = { username: this.initialeService.username , position: pos, gameName: this.viewService.game.name, mode: mod};
    this.socket.emit("bestTime", message);
  }
  public stopTimer(): void {
    this.socket.emit("stopTimer");
  }
  public resetTimer(): void {
    this.socket.emit("resetTimer");
  }

  public createGame1v1(): void {
    const message: MessageGameUser = { gameName: this.viewService.game.name, username: this.initialeService.username};
    this.socket.emit("createGame", message);
  }

  public joinGame(): void {
    const message: MessageGameUser = { gameName: this.viewService.game.name, username: this.initialeService.username};
    this.socket.emit("joinGame", message);
  }

  public cancelGameCreaton(): void {
    this.socket.emit("deleteRoom", this.viewService.game.name);
  }

  public differenceFreeGame(diffName: string, originalObj: THREE.Vector3, modifiedObj: THREE.Vector3): void {
    const message: MessageDifferenceLibre = {originalObj: {x: originalObj.x, y: originalObj.y,
                                                           z: originalObj.z},
                                             modifiedObj: {x: modifiedObj.x, y: modifiedObj.y,
                                                           z: modifiedObj.z},
                                             username: this.initialeService.username,
                                             gameName: this.viewService.game.name};
    switch (diffName) {
      default: {
        break;
      }
      case "add" : {
        this.socket.emit("addDifference", message);
        break;
      }

      case "delete" : {
        this.socket.emit("deleteDifference", message);
        break;
      }

      case "color" : {
        this.socket.emit("colorDifference", message);
        break;
      }
    }
  }

  public suscribeAddDiff(f: Function): void {
    this.socket.on("addDiffFound", (message: MessageDifferenceLibre) => f(message));
  }

  public suscribeDeleteDiff(f: Function): void {
    this.socket.on("deleteDiffFound", (message: MessageDifferenceLibre) => f(message));
  }

  public suscribeColorDiff(f: Function): void {
    this.socket.on("colorDiffFound", (message: MessageDifferenceLibre) => f(message));
  }
  public gameDeleted(gameName: string): void {
    this.socket.emit("gameDeleted", gameName);
  }
  public subscribeGameDeleted(f: Function): void {
    this.socket.on("gameDeleted", (gameName: string) => f(gameName));
  }
}
