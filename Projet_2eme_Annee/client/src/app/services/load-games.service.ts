import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FreeGame } from "../../../../common/GamesStructures/FreeGame";
import { SimpleGame } from "../../../../common/GamesStructures/SimpleGame";

@Injectable({
  providedIn: "root",
})
export class LoadGamesService {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/getGames";
  private constructor(private http: HttpClient) { }

  public async getSimpleGames(): Promise<SimpleGame[]> {
    return this.http.get<SimpleGame[]>(this.URL + "/getSimpleGames").toPromise();

  }
  public async getFreeGames(): Promise<FreeGame[]> {
    return this.http.get<FreeGame[]>(this.URL + "/getFreeGames").toPromise();
  }

}
