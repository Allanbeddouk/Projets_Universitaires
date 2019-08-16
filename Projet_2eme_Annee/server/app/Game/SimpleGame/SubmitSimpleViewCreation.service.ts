import { injectable } from "inversify";
import "reflect-metadata";
import { simpleGameModel, ISimpleGameModel } from "../../Database/db";
import { GenerateurDifferences } from "../SimpleGame/ImagesServices/generateurDifferences.service";
import { SubmitGameCreationService } from "../SubmitGameCreation.service";
const IMAGES_FOLDER: string = "images/";
const IMAGES_DIFF_FOLDER: string = "imagesDifferences/";
const PATH_DIFF: string = "_differences.bmp";

@injectable()
export class SubmitSimpleViewCreationService {

  private generateurDiff: GenerateurDifferences;
  public submitGameCreationService: SubmitGameCreationService;

  public constructor() {
    this.generateurDiff = new GenerateurDifferences();
    this.submitGameCreationService = new SubmitGameCreationService();
  }

  public isImageEmpty(el: string): boolean {
    return (el === null || el === "");
  }

  public async receiveForm(files: Object): Promise<[boolean, string[]]> {
    const multerString: string = JSON.stringify(files);
    const names: string[] = [];
    names.push(this.extractMulterString(multerString, "originale"));
    names.push(this.extractMulterString(multerString, "modifiee"));
    const has7Diff: boolean = await this.has7Diff(names[0], names[1]);

    if (has7Diff) {
      return [true, names];
    } else {
      this.deleteImage(IMAGES_FOLDER + names[0]);
      this.deleteImage(IMAGES_FOLDER + names[1]);
      this.deleteImage(IMAGES_DIFF_FOLDER + this.submitGameCreationService.gameName + PATH_DIFF);

      return [false, names];
    }
  }

  public extractMulterString(multerString: string, name: string): string {

    const str1: string = multerString.substr(multerString.indexOf(name) + name.length + ":[".length, multerString.indexOf("]"));
    const str2: string = str1.substr(str1.indexOf("filename"), str1.length - 1);
    const str3: string = str2.substr("filename".length + ":,s".length, str2.length - 1);

    return str3.substr(0, str3.indexOf(",") - 1);
  }

  public async has7Diff(originaleName: string, modifiedName: string): Promise<boolean> {
    // tslint:disable-next-line:typedef
    return new Promise<boolean>(async (resolve) => {
      resolve(this.generateurDiff.generateDifferences(this.submitGameCreationService.gameName, originaleName, modifiedName));
    });
  }

  public deleteImage(name: string): void {
    // tslint:disable-next-line:typedef
    const fs = require("fs");

    fs.unlink("../server/" + name, (e: Error) => {
        if (e) {
          console.error(e);
        }
      });
  }

  public async deleteSimpleGames(gameName: string): Promise<Boolean> {
    try {
      const gameToDelete: ISimpleGameModel = await this.findGame(gameName);
      if (gameToDelete === undefined) {
        return false;
      }

      this.deleteImage("images/" + gameToDelete.originalImage);
      this.deleteImage("images/" + gameToDelete.modifiedImage);
      this.deleteImage("imagesDifferences/" + gameName + "_differences.bmp");

      await gameToDelete.remove();

      return true;
    } catch (err) {
      return false;
    }
  }

  public async findGame(gameName: string): Promise<ISimpleGameModel> {
    return new Promise<ISimpleGameModel>((resolve: (value?: ISimpleGameModel | PromiseLike<ISimpleGameModel>) => void,
                                          reject: (reason?: string) => void) => {

      simpleGameModel.find({ name: gameName }, (err: unknown, dbRes: ISimpleGameModel[]) => {
        if (err) {
          console.error("Failed to find game", err);
          reject(err as string);
        } else {
          resolve(dbRes[0]);
        }
      });
    });
  }

  public async initializeSimpleGame(gameName: string): Promise<Boolean> {
    // tslint:disable-next-line:typedef
    return new Promise<boolean>((resolve, reject) => {
      this.submitGameCreationService.createGame();
      simpleGameModel.updateOne(
        {
          name: gameName,
        },
        {
          $set: {
            oneVsOne: JSON.stringify(this.submitGameCreationService.oneVsOne),
            solo: JSON.stringify(this.submitGameCreationService.solo),
          },
        },
        (err: unknown) => {
          resolve(err === null);
        });
    });
  }

  public async checkSimpleGame(gameName: string, image1: string, image2: string): Promise<boolean> {
    this.submitGameCreationService.createGame();
    const gameSimple: ISimpleGameModel = new simpleGameModel({
      name: gameName, originalImage: image1,
      modifiedImage: image2,
      oneVsOne: JSON.stringify(this.submitGameCreationService.oneVsOne),
      solo: JSON.stringify(this.submitGameCreationService.solo) });

    // tslint:disable-next-line:typedef
    return new Promise<boolean>(async (resolve, reject) => {
      const nameAlreadyExists: boolean = await this.submitGameCreationService.findGameName(gameName);

      if (this.submitGameCreationService.verifyGameName(gameName) && !nameAlreadyExists) {
            // tslint:disable-next-line: no-floating-promises
            gameSimple.save((err2: unknown) => {
              if (err2) {
                reject(err2);
              }
              resolve(true);
            });
          } else {
              resolve(false);
      }
    });
  }
}
