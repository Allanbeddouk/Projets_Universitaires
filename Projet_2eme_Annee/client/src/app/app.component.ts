import { Location } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WebSocketCommunications } from "./components/messageries/socket/socket.service";
import { InitialeService } from "./services/initiale.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public constructor(private initialeService: InitialeService, private wSocket: WebSocketCommunications,
                     private location: Location, private router: Router) {
  }
  public ngOnInit(): void {
    if (this.location.path() !== "/admin") {
      this.router.navigate([""]).then((res) => {
        if (!res) {
          console.error("routing failed");
        }
      }).catch((e) => {
          console.error(e);
      });
    }
  }
  @HostListener("window:beforeunload", ["$event"])
  public beforeUnload($event: Event): void {
    this.wSocket.disconnect(this.initialeService.username);
    this.initialeService.logout(this.initialeService.username).then().catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    $event.returnValue = true;
  }
}
