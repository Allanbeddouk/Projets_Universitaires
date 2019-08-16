import { Component } from "@angular/core";
import { MessageWS } from "../../../../../common/communication/messageWS";
import { WebSocketCommunications } from "./socket/socket.service";

@Component({
  selector: "app-messagerie",
  templateUrl: "./messagerie.component.html",
  styleUrls: ["./messagerie.component.css"],
})
export class MessagerieComponent {
  public messages: MessageWS[];
  public constructor(private wsService: WebSocketCommunications) {
    this.messages = [];
    this.wsService.subscribeMessage( (message: MessageWS) => {
      this.addMessage(message);
    });
  }
  public addMessage(msg: MessageWS): void {
    this.messages.push({ time: msg.time, text: msg.text });
  }
}
