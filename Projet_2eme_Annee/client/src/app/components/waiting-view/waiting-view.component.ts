import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HandleViewsService } from "src/app/services/handle-views.service";
import { WebSocketCommunications } from "../messageries/socket/socket.service";

@Component({
  selector: "app-waiting-view",
  templateUrl: "./waiting-view.component.html",
  styleUrls: ["./waiting-view.component.css"],
})
export class WaitingViewComponent implements OnInit {

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private wSocket: WebSocketCommunications,
                     private handleViews: HandleViewsService) { }

  public ngOnInit(): void {
    this.wSocket.subscribeGameJoined(() => {
      this.router.navigateByUrl("jeu/" + this.activatedRoute.snapshot.params["username"]).then((res) => {
        if (!res) {
          console.error("routing /jeu failed");
        }
      }).catch((e) => {
          console.error(e);
      });
    });
    this.wSocket.subscribeGameDeleted((gameName: string) => {
      if (gameName === this.handleViews.game.name) {
        this.cancelCreation();
      }
    });
  }

  public cancelCreation(): void {
    this.wSocket.cancelGameCreaton();
    const username: string = this.activatedRoute.snapshot.params["username"];
    this.router.navigateByUrl("parties/" + username).catch((e) => {
      console.error(e);
    },
    );
  }
}
