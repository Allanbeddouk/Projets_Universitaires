import { injectable } from "inversify";
import "reflect-metadata";
import {GeometricScene} from "../../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../../common/3DView/ThematicScene/ThematicScene";
import { freeGameModel, IFreeGameModel } from "../../Database/db";
import { SubmitGameCreationService } from "../SubmitGameCreation.service";
import { GeometricConverter } from "./GeometricScene/GeometricSceneConverter.service";
import { ThematicSceneConverter } from "./ThematicScene/ThematicSceneConverter.service";

const MIN_LENGTH_QUANTITY: number = 10;
const MAX_LENGTH_QUANTITY: number = 200;

@injectable()
export class SubmitFreeViewCreationService {

    public submitGameCreationService: SubmitGameCreationService;
    public quantity: number;
    public screenShotScene: string;
    public gameType: string;
    public geometricConverter: GeometricConverter;
    public thematicConverter: ThematicSceneConverter;

    public constructor() {
        this.submitGameCreationService = new SubmitGameCreationService();
        this.quantity = MIN_LENGTH_QUANTITY + MIN_LENGTH_QUANTITY;
        this.screenShotScene = "";
        this.gameType = "geometric";
        this.geometricConverter = new GeometricConverter();
        this.thematicConverter = new ThematicSceneConverter();
    }

    public verifyQuantity(quantity: number): boolean {
        if (quantity <= MAX_LENGTH_QUANTITY && quantity >= MIN_LENGTH_QUANTITY && quantity !== null) {
            this.quantity = quantity;

            return true;
        } else {
            return false;
        }
    }

    public async deleteFreeGames(gameName: string): Promise<Boolean> {
      try {
        const gameToDelete: IFreeGameModel = await this.findGame(gameName);
        if (gameToDelete === undefined) {
          return false;
        }
        await gameToDelete.remove();

        return true;
      } catch (err) {
        return false;
      }
      }

    public async findGame(gameName: string): Promise<IFreeGameModel> {
        return new Promise<IFreeGameModel>(async (resolve: (value?: IFreeGameModel | PromiseLike<IFreeGameModel> | undefined) => void,
                                                  reject: (reason?: string) => void) => {

          freeGameModel.find({ name: gameName }, (err: unknown, dbRes: IFreeGameModel[]) => {
            if (err) {
              console.error("Failed to find game", err);
              reject(err as string);
            } else {
              resolve(dbRes[0]);
            }
          });
        });
      }

    public async initializeFreeGame(gameName: string): Promise<Boolean> {
        // tslint:disable-next-line:typedef
        return new Promise<boolean>((resolve, reject) => {
          this.submitGameCreationService.createGame();
          freeGameModel.updateOne(
                    {
                    name: gameName},
                    {
                    $set : { oneVsOne: JSON.stringify(this.submitGameCreationService.oneVsOne),
                             solo: JSON.stringify(this.submitGameCreationService.solo) }},
                    (err: unknown) => {
                if (err) {
                  resolve(false);
                  reject(err);
                }  else {
                  resolve(true);
                }
            });
        });
      }

    public async checkFreeGame(gameName: string, scenes: GeometricScene[] | ThematicScene[]): Promise<boolean> {
      this.submitGameCreationService.createGame();
      const gameFree: IFreeGameModel = new freeGameModel({ name: gameName, screen: this.screenShotScene,  gameType: this.gameType,
                                                           originalScene: scenes[0], modifiedScene: scenes[1],
                                                           oneVsOne: JSON.stringify(this.submitGameCreationService.oneVsOne),
                                                           solo: JSON.stringify(this.submitGameCreationService.solo) });
      if (this.submitGameCreationService.verifyGameName(gameName)) {
        // tslint:disable-next-line:typedef
        return new Promise<boolean>((resolve, reject) => {
                    // To avoid typescript compilation error, because the property is undefined (see mongoose documentation)
                    // tslint:disable-next-line:no-floating-promises
                    gameFree.save((err2: unknown) => {
                        if (err2) {
                            reject(err2);
                        }
                        });
                    this.screenShotScene = "";
                    resolve(true);
                });
      } else {
            // tslint:disable-next-line:typedef
            return new Promise<boolean>((resolve) => {
                resolve(false);
            });
        }
    }
}
