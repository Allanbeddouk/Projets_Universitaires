import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../../../../common/communication/message";

@Injectable({
  providedIn: "root",

})
export class InitialeService {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/initiale/";
  public username: string;

  public constructor(private http: HttpClient) {
    this.username = "";
  }

  public async evaluateName(username: string): Promise <boolean> {
    return this.http.post<boolean>(this.URL + "alphaNumValidation", { username_: username }).toPromise();
  }

  public async evaluateSize(username: string): Promise<boolean> {
    return this.http.post<boolean>(this.URL + "sizeValidation", { username_: username }).toPromise();
  }

  public validateUsername(username: string): Observable<Message> {
    return this.http.post<Message>(this.URL + "usernameValidation", { username_: username });
  }

  public async logout(username: string): Promise<Message> {
    return this.http.post<Message>(this.URL + "logout", { username_: username }).toPromise();
  }

}
