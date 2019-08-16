import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class HighScoreRep {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/";
  private constructor(private http: HttpClient) { }

  public async checkHighScoreSoloSimple(gameName: string, username: string, minutes: string, seconds: string): Promise <string> {
    return this.http.post<string>(this.URL + "setHighScore/simple/solo", {
        _gameName: gameName, _username: username, _minutes: minutes, _seconds: seconds}).toPromise();
  }

  public async checkHighScoreSoloFree(gameName: string, username: string, minutes: string, seconds: string): Promise <string> {
    return this.http.post<string>(this.URL + "setHighScore/free/solo", {
        _gameName: gameName, _username: username, _minutes: minutes, _seconds: seconds}).toPromise();
  }

  public async checkHighScore1v1Simple(gameName: string, username: string, minutes: string, seconds: string): Promise <string> {
    return this.http.post<string>(this.URL + "setHighScore/simple/1v1", {
        _gameName: gameName, _username: username, _minutes: minutes, _seconds: seconds}).toPromise();
  }

  public async checkHighScore1v1Free(gameName: string, username: string, minutes: string, seconds: string): Promise <string> {
    return this.http.post<string>(this.URL + "setHighScore/free/1v1", {
        _gameName: gameName, _username: username, _minutes: minutes, _seconds: seconds}).toPromise();
  }
}
