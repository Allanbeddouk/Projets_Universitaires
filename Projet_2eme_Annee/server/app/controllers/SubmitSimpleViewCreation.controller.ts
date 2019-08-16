import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import * as path from "path";
import { SubmitSimpleViewCreationService } from "../Game/SimpleGame/SubmitSimpleViewCreation.service";
import Types from "../types";

@injectable()
export class SubmitSimpleViewCreationController {

    public upload: multer.Instance;
    public constructor(@inject(Types.SubmitSimpleViewCreationService) private submitService: SubmitSimpleViewCreationService) {
        this.upload = multer({
            dest: "../server/images",
            storage: multer.diskStorage({
                destination: (req: Express.Request,
                              file: Express.Multer.File, cb: Function) => {
                    cb(null, "../server/images");
                },
                filename: (req: Express.Request,
                           file: Express.Multer.File, cb: Function) => {
                    cb(null, Date.now() + path.extname(file.originalname));
                },
            }),
        });
    }

    public get router(): Router {
        const router: Router = Router();

        router.post("/checkImage", (req: Request, res: Response, next: NextFunction) => {
            this.submitService.submitGameCreationService.gameName = req.body.gameName;
            res.send(this.submitService.isImageEmpty(req.body.element));
        });

        router.post("/sendForm", this.upload.fields([{ name: "originale", maxCount: 1 }, { name: "modifiee", maxCount: 1 }]),
                    async (req: Request, res: Response, next: NextFunction) => {
                res.send(await this.submitService.receiveForm(req.files));
            });

        router.post("/simpleGameValidation",
                    (req: Request, res: Response, next: NextFunction) => {

                this.submitService.checkSimpleGame(req.body.gameName, req.body.originale,
                                                   req.body.modifiee).then((isCorrect: boolean) => {
                        res.send(isCorrect);

                    }).catch((failureReason: unknown) => {
                        console.error(failureReason);
                        res.send(false);
                    });
            });

        router.post("/deleteSimpleGames",
                    async (req: Request, res: Response, next: NextFunction) => {
                res.send( await this.submitService.deleteSimpleGames(req.body.gameName));
            });

        router.post("/simpleGameInitialisation",
                    (req: Request, res: Response, next: NextFunction) => {
                        this.submitService.initializeSimpleGame(req.body.gameName).then((isCorrect: boolean) => {
                            res.send(isCorrect);

                }).catch((failureReason: unknown) => {
                    console.error(failureReason);
                    res.send(false);
                });
            });

        return router;
    }
}
