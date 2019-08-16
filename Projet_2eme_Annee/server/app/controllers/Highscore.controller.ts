import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { FreeGame } from "../../../common/GamesStructures/FreeGame";
import { Player } from "../../../common/GamesStructures/Player";
import { SimpleGame } from "../../../common/GamesStructures/SimpleGame";
import { freeGameModel, simpleGameModel } from "../Database/db";
import { GetGamesService } from "../services/GetGames.services";
import { HighScoreService } from "../services/Highscore.service";
import Types from "../types";

@injectable()
export class HighScoreController {

    public constructor(@inject(Types.GetGamesService) private getGames: GetGamesService) { }

    public get routes(): Router {
        const router: Router = Router();
        const highscore: HighScoreService = new HighScoreService();
        router.post("/simple/solo",
                    async (req: Request, res: Response, next: NextFunction) => {
                    const games: SimpleGame[] = await this.getGames.getSimpleGames();
                    const activePlayer: Player = new Player( req.body._username, req.body._minutes, req.body._seconds);
                    const players: Player[] = await highscore.buildHighScoresSolo(req.body._gameName, activePlayer, games);
                    await highscore.updateHighScoreSolo(req.body._gameName, players, simpleGameModel);
                    res.send(await highscore.getHighScorePosition(players, activePlayer));
        });

        router.post("/free/solo",
                    async (req: Request, res: Response, next: NextFunction) => {
                    const games: FreeGame[] = await this.getGames.getFreeGames();
                    const activePlayer: Player = new Player( req.body._username, req.body._minutes, req.body._seconds);
                    const players: Player[] = await highscore.buildHighScoresSolo(req.body._gameName, activePlayer, games);
                    await highscore.updateHighScoreSolo(req.body._gameName, players, freeGameModel);
                    res.send(await highscore.getHighScorePosition(players, activePlayer));
        });

        router.post("/simple/1v1",
                    async (req: Request, res: Response, next: NextFunction) => {
                    const games: SimpleGame[] = await this.getGames.getSimpleGames();
                    const activePlayer: Player = new Player( req.body._username, req.body._minutes, req.body._seconds);
                    const players: Player[] = await highscore.buildHighScores1v1(req.body._gameName, activePlayer, games);
                    await highscore.updateHighScore1v1(req.body._gameName, players, simpleGameModel);
                    res.send(await highscore.getHighScorePosition(players, activePlayer));
        });

        router.post("/free/1v1",
                    async (req: Request, res: Response, next: NextFunction) => {
                    const games: FreeGame[] = await this.getGames.getFreeGames();
                    const activePlayer: Player = new Player( req.body._username, req.body._minutes, req.body._seconds);
                    const players: Player[] = await highscore.buildHighScores1v1(req.body._gameName, activePlayer, games);
                    await highscore.updateHighScore1v1(req.body._gameName, players, freeGameModel);
                    res.send(await highscore.getHighScorePosition(players, activePlayer));
        });

        return router;
    }
}
