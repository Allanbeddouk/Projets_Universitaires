import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SubmitGameCreationService } from "../Game/SubmitGameCreation.service";
import Types from "../types";

@injectable()
export class SubmitGameCreationController {

    public constructor(@inject(Types.SubmitGameCreationService) private submitService: SubmitGameCreationService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/checkName", (req: Request, res: Response, next: NextFunction) => {
            const isGameNameOk: boolean = this.submitService.verifyGameName(req.body.gameName);
            res.send(isGameNameOk);
        });

        router.post("/checkNameAvailable", (req: Request, res: Response, next: NextFunction) => {
            this.submitService.findGameName(req.body.gameName).then((nameAlreadyExists: boolean) => {
                res.send(nameAlreadyExists);
            }).catch(() => {
                res.send(false);
              });
        });

        return router;
    }
}
