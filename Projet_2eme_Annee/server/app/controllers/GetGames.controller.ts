import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GetGamesService } from "../services/GetGames.services";

import Types from "../types";

@injectable()
export class GetGamesController {

    public constructor(@inject(Types.GetGamesService) private getGamesService: GetGamesService) { }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/getSimpleGames",
                   async (req: Request, res: Response, next: NextFunction) => {
                        res.send(await this.getGamesService.getSimpleGames());
        });
        router.get("/getFreeGames",
                   async (req: Request, res: Response, next: NextFunction) => {
                        res.send( await this.getGamesService.getFreeGames());
         });

        return router;
    }
}
