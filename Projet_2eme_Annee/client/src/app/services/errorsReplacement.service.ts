import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class ErrorsReplacement {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/";
  private constructor(private http: HttpClient) { }

  public async replaceError(initialPath: string, modifiedPath: string, differencesPath: string, x: number, y: number): Promise <boolean> {
    return this.http.post<boolean>(this.URL + "errorsReplacement", {
        _initialPath: initialPath, _modifiedPath: modifiedPath, _differencesPath: differencesPath, x: x, y: y}).toPromise();
  }
}
