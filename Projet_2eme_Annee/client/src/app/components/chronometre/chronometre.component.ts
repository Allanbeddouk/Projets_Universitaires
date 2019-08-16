import { Component, OnDestroy, OnInit } from "@angular/core";
import { TimeMinSec } from "../../../../../common/GamesStructures/TimeMinSec";
import { WebSocketCommunications } from "../messageries/socket/socket.service";
@Component({
  selector: "app-chronometre",
  templateUrl: "./chronometre.component.html",
  styleUrls: ["./chronometre.component.css"],
})

export class ChronometreComponent implements OnInit, OnDestroy {
  private time: TimeMinSec;
  public constructor(private wSocket: WebSocketCommunications) {
    this.time = {minutes: 0, seconds: 0};
    this.wSocket.resetTimer();
  }

  public ngOnDestroy(): void {
    this.wSocket.stopTimer();
  }
  public ngOnInit (): void {
    this.wSocket.subscribeTime((time: TimeMinSec) => {
      this.time = time;
    });
  }
  public getTime(): TimeMinSec {
    return this.time;
  }
}
