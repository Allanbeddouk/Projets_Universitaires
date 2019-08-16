import { injectable } from "inversify";
import { GeometricScene } from "../../../common/3DView/GeometricScene/GeometricScene";
import {FreeGame} from "../../../common/GamesStructures/FreeGame";
import {SimpleGame} from "../../../common/GamesStructures/SimpleGame";
import { freeGameModel, simpleGameModel, IFreeGameModel, ISimpleGameModel } from "../Database/db";

import { GameStatusService } from "./GameStatus.service";

@injectable()
export class GetGamesService {
    private gameStatus: GameStatusService;

    public constructor() {
        this.gameStatus = GameStatusService.getInstance();
    }

    public async getSimpleGames(): Promise<SimpleGame[]> {
        return new Promise<SimpleGame[]>((resolve: (value?: SimpleGame[] | PromiseLike<SimpleGame[]> | undefined) => void) => {
            const simpleGames: SimpleGame[] = [];
            simpleGameModel.find({ }, (err: unknown, dbRes: ISimpleGameModel[]) => {
                if (err) {
                console.error(err);
                }
                for ( const game of dbRes ) {
                    this.gameStatus.addGame(game.name);
                    simpleGames.push(new SimpleGame(game.name , game.originalImage, game.modifiedImage,
                                                    JSON.parse(String(game.solo)), JSON.parse(String(game.oneVsOne))));
                }
                resolve(simpleGames);
            });

        });
    }
    public async getFreeGames(): Promise<FreeGame[]> {
        return new Promise<FreeGame[]>((resolve: (value?: FreeGame[] | PromiseLike<FreeGame[]> | undefined) => void) => {
        const freeGames: FreeGame[] = [];
        freeGameModel.find({ }, (err: unknown, dbRes: IFreeGameModel[]) => {
            if (err) {
            console.error(err);
            }
            for ( const game of dbRes ) {
                this.gameStatus.addGame(game.name);
                freeGames.push(new FreeGame(game.name , game.screen, game.gameType,
                                            game.originalScene as GeometricScene, game.modifiedScene as GeometricScene,
                                            JSON.parse(String(game.solo)), JSON.parse(String(game.oneVsOne))));
            }
            resolve(freeGames);
        });
    });
    }

}
