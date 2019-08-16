import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CreationJeuService {
  private readonly SERVER_URL_ADMIN: string = "http://localhost:3000/admin";

  public constructor(private http: HttpClient) {

   }

  public async checkName(gameName: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/checkName", {gameName: gameName}).toPromise();
  }

  public async checkNameAvailable(gameName: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/checkNameAvailable", {gameName: gameName}).toPromise();
  }
}
