import { Component, Input} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FreeGame } from "../../../../../common/GamesStructures/FreeGame";
import { SimpleGame } from "../../../../../common/GamesStructures/SimpleGame";
import { LoadGamesService } from "../../services/load-games.service";
@Component({
  selector: "app-liste-parties",
  templateUrl: "./liste-parties.component.html",
  styleUrls: ["./liste-parties.component.css"],
})
export class ListePartiesComponent {

  @Input() public adminMode: boolean = false;
  public simpleGames: SimpleGame[];
  public freeGames: FreeGame[];
  public username: string;

  public constructor(private loadGames: LoadGamesService, private activatedRoute: ActivatedRoute) {
    this.loadMyGames().catch();
    this.username = this.activatedRoute.snapshot.params["username"];
  }
  public async loadMyGames(): Promise<void> {
    this.simpleGames = await this.loadGames.getSimpleGames();
    this.freeGames = await this.loadGames.getFreeGames();
  }
}
