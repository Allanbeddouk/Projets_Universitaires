import { injectable } from "inversify";
import "reflect-metadata";
import * as PLAYER from "../../../common/GamesStructures/Player";
import { freeGameModel, simpleGameModel, IFreeGameModel, ISimpleGameModel, } from "../Database/db";
import { HighscoreManip } from "./HighscoreManip.service";

const MIN_LENGTH_GAME_NAME: number = 3;
const MAX_LENGTH_GAME_NAME: number = 20;

@injectable()
export class SubmitGameCreationService {

  public oneVsOne: PLAYER.Player[];
  public solo: PLAYER.Player[];
  public gameName: string;

  public constructor() {
    this.solo = [];
    this.oneVsOne = [];
    this.gameName = "";
  }

  public verifyGameName(gameName: string): boolean {
      if (gameName !== null && gameName.length > MIN_LENGTH_GAME_NAME && gameName.length < MAX_LENGTH_GAME_NAME) {
        this.gameName = gameName;

        return true;
      } else {
          return false;
      }
}

  public async findGameName(gameName: string): Promise<boolean> {
      // tslint:disable-next-line:typedef
      return new Promise<boolean> ( async (resolve, reject) => {
        const isSimpleGame: boolean = await this.findSimpleGameName(gameName);
        const isFreeGame: boolean = await this.findFreeGameName(gameName);
        resolve(isSimpleGame || isFreeGame);
      });
  }

  public async findSimpleGameName(gameName: string): Promise<boolean> {
    // tslint:disable-next-line:typedef
    return new Promise<boolean> ((resolve, reject) => {
      simpleGameModel.find({ name: gameName }, (err: unknown, dbRes: ISimpleGameModel[]) => {
        if (err) { reject(err); }
        if (dbRes.length === 1) {
            resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public async findFreeGameName(gameName: string): Promise<boolean> {
    // tslint:disable-next-line:typedef
    return new Promise<boolean> ((resolve, reject) => {
      freeGameModel.find({ name: gameName }, (err: unknown, dbRes: IFreeGameModel[]) => {
        if (err) { reject(err); }
        if (dbRes.length === 1) {
            resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public createGame(): void {
    // tslint:disable-next-line:typedef
    const random = require("fakerator");
    // tslint:disable-next-line:typedef
    const random2 = random();
    let i: number;
    this.oneVsOne = [];
    this.solo = [];
    for (i = 0; i <= PLAYER.MAX_BEST_PLAYERS ; i++) {
      this.solo.push(new PLAYER.Player(random2.names.firstName(),
                                      // tslint:disable-next-line:no-any
                                       random2.random.number(PLAYER.MINUTES_MIN, PLAYER.MINUTES_MAX) as any as string,
                                      // tslint:disable-next-line:no-any
                                       random2.random.number(PLAYER.SECOND_MIN, PLAYER.SECOND_MAX) as any as string));
      this.oneVsOne.push(new PLAYER.Player(random2.names.firstName(),
                                          // tslint:disable-next-line:no-any
                                           random2.random.number(PLAYER.MINUTES_MIN, PLAYER.MINUTES_MAX) as any as string,
                                            // tslint:disable-next-line:no-any
                                           random2.random.number(PLAYER.SECOND_MIN, PLAYER.SECOND_MAX) as any as string));
      if (this.oneVsOne[i].seconds < "10") {
          this.oneVsOne[i].seconds = "0" + this.oneVsOne[i].seconds;
      }
      if (this.solo[i].seconds < "10") {
          this.solo[i].seconds = "0" + this.solo[i].seconds;
      }
    }
    this.oneVsOne = HighscoreManip.OrderByArray(this.oneVsOne, "seconds");
    this.solo = HighscoreManip.OrderByArray(this.solo, "seconds");
    this.oneVsOne = HighscoreManip.OrderByArray(this.oneVsOne, "minutes");
    this.solo = HighscoreManip.OrderByArray(this.solo, "minutes");
  }

}
