import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GeometricScene } from "../../../../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../../../../common/3DView/ThematicScene/ThematicScene";

@Injectable({
  providedIn: "root",
})
export class Vue3DRequeteService {
  private readonly SERVER_URL_ADMIN: string = "http://" + window.location.hostname + ":3000/admin";

  public constructor(private http: HttpClient) { }

  public async generateGeometricScene(): Promise<GeometricScene[]> {
    return this.http.get<GeometricScene[]>(this.SERVER_URL_ADMIN + "/generateGeometricScene").toPromise();
  }

  public async generateThematicScene(): Promise<ThematicScene[]> {
    return this.http.get<ThematicScene[]>(this.SERVER_URL_ADMIN + "/generateThematicScene").toPromise();
  }
}
