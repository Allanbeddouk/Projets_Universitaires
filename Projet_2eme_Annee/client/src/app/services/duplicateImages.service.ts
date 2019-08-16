import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class DuplicateImagesService {
  private readonly URL: string = "http://" + window.location.hostname + ":3000/";
  private constructor(private http: HttpClient) { }

  public async duplicateImages(originalPath: string, destinationPath: string,
                               originalPathDiff: string, destinationPathDiff: string): Promise <boolean> {
    return this.http.post<boolean>(this.URL + "duplicateImages", {_originalPath: originalPath, _destinationPath: destinationPath,
                                                                  _originalPathDiff: originalPathDiff,
                                                                  _destinationPathDiff: destinationPathDiff }).toPromise();
  }
}
