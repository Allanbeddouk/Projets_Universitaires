import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class DeleteImageService {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/";
  private constructor(private http: HttpClient) { }

  public async deleteImages(username: string): Promise <boolean> {
    return this.http.post<boolean>(this.URL + "deleteImage", {_username: username}).toPromise();
  }
}
