import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router";
import { DeleteImageService } from "src/app/services/deleteImage.service";
import { TimeMinSec } from "../../../../../common/GamesStructures/TimeMinSec";

@Component({
  selector: "app-end-game",
  templateUrl: "./end-game.component.html",
  styleUrls: ["./end-game.component.css"],
})
export class EndGameComponent implements OnInit {
  @Input() public time: TimeMinSec;
  @Input() public isSimple: boolean;
  @Input() public isWinner: boolean;
  private messageTop: string;
  private messageBot: string;
  public constructor(private activatedRoute: ActivatedRoute, private router: Router,
                     private deleteService: DeleteImageService) {
    this.time = {minutes: 0, seconds: 0 };
    this.messageTop = "";
    this.messageTop = this.messageTop;
    this.messageBot = "";
    this.messageBot = this.messageBot;
  }
  public ngOnInit(): void {
    this.messageTop = this.isWinner ? "Vous avez gagné!" : "Vous avez perdu...";
    this.messageBot = this.isWinner ? "Félicitation!" :  "Nous vous invitons à rejouer";
  }
  public onMenu(): void {
    const username: string = this.activatedRoute.snapshot.params["username"];
    this.router.navigateByUrl("parties/" + username, {skipLocationChange: true}).then( async (res: boolean) => {
      if (this.isSimple) {
        await this.deleteService.deleteImages(username);
      }
      if (res) {
        console.error("Le routing vers /parties a echoue");

      }
    }).catch((e) => {
      console.error(e);
    },
    );
  }
}
