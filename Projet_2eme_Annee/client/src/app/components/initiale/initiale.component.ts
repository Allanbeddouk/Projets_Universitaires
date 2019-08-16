import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { MatButton } from "@angular/material";
import { Router } from "@angular/router";
import { Message } from "../../../../../common/communication/message";
import { InitialeService } from "../../services/initiale.service";
import { WebSocketCommunications } from "../messageries/socket/socket.service";

const MIN_SIZE: number = 3;

@Component({
  selector: "app-initiale",
  templateUrl: "./initiale.component.html",
  styleUrls: ["./initiale.component.css"],
})

export class InitialeComponent implements AfterViewInit {
  public errorSize: boolean;
  public errorName: boolean;
  public errorAlreadyExists: boolean;
  @ViewChild("username") private usernameInput: ElementRef;
  @ViewChild("startButton") private startButton: MatButton;

  public constructor(private initialeService: InitialeService, private router: Router,
                     private wSocket: WebSocketCommunications) {
    if (this.initialeService.username !== "") {
      this.wSocket.disconnect(this.initialeService.username);
      this.initialeService.logout(this.initialeService.username).catch((err: unknown) => {
        console.error(err);
      });
    }
    this.errorSize = false;
    this.errorName = false;
    this.errorAlreadyExists = false;
  }

  public ngAfterViewInit(): void {
    this.usernameInput.nativeElement.focus();
    this.usernameInput.nativeElement.select();
}
  public async startGame(name: string): Promise<void> {
    this.errorName = await this.initialeService.evaluateName(name);
    this.errorSize = await this.initialeService.evaluateSize(name);

    this.errorAlreadyExists = false;

    if (!this.errorName && !this.errorSize) {
      this.initialeService.validateUsername(name)
        .subscribe((m: Message) => {
          const connected: boolean = JSON.parse(m.body);
          this.errorAlreadyExists = !(connected);
          if (!this.errorAlreadyExists) {
            this.initialeService.username = name;
            this.wSocket.connect();
            this.router.navigateByUrl("parties/" + this.initialeService.username).then((res: boolean) => {
              if (!res) {
                console.error("Le routing vers /parties a echoue");

              }
            }).catch((e) => {
              console.error(e);
            },
            );
          }
        });
    }
  }

  public checkInputSize(): void {
    this.startButton.disabled = this.usernameInput.nativeElement.value.length > MIN_SIZE ?
    false : true;
  }
}
