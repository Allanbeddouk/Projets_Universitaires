  import { HttpClient } from "@angular/common/http";
  import { Injectable } from "@angular/core";

  @Injectable({
    providedIn: "root",
  })
export class CreationJeuVueSimpleService {
  private readonly SERVER_URL_ADMIN: string = "http://" + window.location.hostname + ":3000/admin";

  public gameName: string;
  public originaleName: string;
  public modifiedName: string;

  public constructor(private http: HttpClient) {
    this.gameName = "";
    this.originaleName = "";
    this.modifiedName = "";
  }

  public async isImageEmpty(element: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/checkImage", {element: element, gameName: this.gameName}).toPromise();
  }

  public async sendForm(form: FormData): Promise<[boolean, string[]]> {
    return this.http.post<[boolean, string[]]>(this.SERVER_URL_ADMIN + "/sendForm", form).toPromise();
  }

  public async simpleGameValidation(): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/simpleGameValidation", {gameName: this.gameName,
                                                                                     originale: this.originaleName,
                                                                                     modifiee: this.modifiedName}).toPromise();
  }
  public async deleteSimpleGame(gameName: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/deleteSimpleGames", {gameName: gameName}).toPromise();
  }

  public async simpleGameInitialisation(gameName: string): Promise<boolean> {
    return this.http.post<boolean>(this.SERVER_URL_ADMIN + "/simpleGameInitialisation", {gameName: gameName}).toPromise();
  }

}
