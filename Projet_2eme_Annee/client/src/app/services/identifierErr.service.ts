import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class IdentifierErr {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/";
  private constructor(private http: HttpClient) { }

  public async isError(x: number, y: number, imgName: string): Promise <boolean> {
    return this.http.post<boolean>(this.URL + "identificationErr", { x_: x, y_: y, imgName_: imgName }).toPromise();
  }
  public playSoundFound(): void {
    const soundPath: string = ("assets/quite-impressed.ogg");
    const  notif: HTMLAudioElement = new Audio(soundPath);
    notif.play().catch((e) => {
      console.error(e);
    });
  }

  public playSoundMissed(): void {
    const soundPath: string = ("assets/incorrect.swf.mp3");
    const  notif: HTMLAudioElement = new Audio(soundPath);
    notif.play().catch((e) => {
      console.error(e);
    });
  }
}
