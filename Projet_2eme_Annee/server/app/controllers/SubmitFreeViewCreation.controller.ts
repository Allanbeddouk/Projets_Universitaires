import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GeometricScene } from "../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../common/3DView/ThematicScene/ThematicScene";
import { SubmitFreeViewCreationService } from "../Game/FreeGame/SubmitFreeViewCreation.service";
import Types from "../types";

@injectable()
export class SubmitFreeViewCreationController {

    public constructor(@inject(Types.SubmitFreeViewCreationService) private submitService: SubmitFreeViewCreationService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/checkQuantity", (req: Request, res: Response, next: NextFunction) => {
            const isQuantityOk: boolean = this.submitService.verifyQuantity(req.body.quantity);
            res.send(isQuantityOk);
            });

        router.get("/generateThematicScene", (req: Request, res: Response, next: NextFunction) => {
                res.send(this.submitService.thematicConverter.generateScenes(this.submitService.quantity));
        });

        router.get("/generateGeometricScene", (req: Request, res: Response, next: NextFunction) => {
            res.send(this.submitService.geometricConverter.generateScenes(this.submitService.quantity));
    });

        router.post("/sendModifications", (req: Request, res: Response, next: NextFunction) => {
            this.submitService.gameType = req.body.selection;
            if (this.submitService.gameType === "geometric") {
                this.submitService.geometricConverter.modifications = req.body.modifications;

            } else {
                this.submitService.thematicConverter.modifications = req.body.modifications;
            }
            res.send();
        });

        router.post("/sendScreen", (req: Request, res: Response, next: NextFunction) => {
            this.submitService.screenShotScene += req.body.screen;
            res.send();
        });

        router.post("/freeGameValidation",
                    (req: Request, res: Response, next: NextFunction) => {
            const scenes: GeometricScene[] | ThematicScene[] = this.submitService.gameType === "geometric" ?
            req.body.scenes as GeometricScene[] : req.body.scenes as ThematicScene[];
            this.submitService.checkFreeGame(req.body.gameName, scenes).then((isCorrect: boolean) => {
                this.submitService.screenShotScene = "";
                res.send(isCorrect);

            }).catch((failureReason: unknown) => {
                console.error(failureReason);
                res.send(false);
            });
        });

        router.post("/deleteFreeGames",
                    async (req: Request, res: Response, next: NextFunction) => {
                res.send( await this.submitService.deleteFreeGames(req.body.gameName));
            });

        router.post("/freeGameInitialisation",
                    (req: Request, res: Response, next: NextFunction) => {

            this.submitService.initializeFreeGame(req.body.gameName).then((isCorrect: boolean) => {
                    res.send(isCorrect);

                }).catch((failureReason: unknown) => {
                    console.error(failureReason);
                    res.send(false);
                });
            });

        return router;
    }
}
