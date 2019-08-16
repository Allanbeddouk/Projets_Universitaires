import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class GameStatusService {
  private readonly URL: string = "http://localhost:3000/";
  public username: string;

  private constructor(private http: HttpClient) { }

  public async getGameStatus(gameName: string): Promise <boolean> {
    return this.http.get<boolean>(this.URL + "gameStatus/" + gameName).toPromise();
  }

}
