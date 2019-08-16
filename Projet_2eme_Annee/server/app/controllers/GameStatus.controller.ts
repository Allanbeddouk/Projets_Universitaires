import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import { GameStatusService } from "../services/GameStatus.service";

@injectable()
export class GameStatusController {
    private gameStatus: GameStatusService;
    public constructor() { this.gameStatus = GameStatusService.getInstance(); }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/:gameName",
                   async (req: Request, res: Response, next: NextFunction) => {

                        res.send(this.gameStatus.getGameStatus(req.params.gameName));
        });

        return router;
    }
}
