import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message } from "../../../common/communication/message";
import { SubmitUsernameService } from "../services/SubmitUsername.service";
import Types from "../types";

@injectable()
export class SubmitUsernameController {

    public constructor(@inject(Types.SubmitUsernameService) private submitUsernameService: SubmitUsernameService) { }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/alphaNumValidation",
                    (req: Request, res: Response, next: NextFunction) => {
                res.send(this.submitUsernameService.evaluateName(req.body.username_));
            });

        router.post("/sizeValidation",
                    (req: Request, res: Response, next: NextFunction) => {
                res.send(this.submitUsernameService.evaluateSize(req.body.username_));
            });

        router.post("/usernameValidation",
                    (req: Request, res: Response, next: NextFunction) => {
                const m: Message = {
                    title: "Validation de l'username",
                    body: "",
                };
                this.submitUsernameService.checkUsername(req.body.username_).then((isCorrect: boolean) => {
                    m.body = String(isCorrect);
                    res.json(m);

                }).catch((failureReason: unknown) => {
                    m.body = String(failureReason);
                    res.json(m);
                });
            });

        router.post("/logout",
                    (req: Request, res: Response, next: NextFunction) => {
                const m: Message = {
                    title: "Essaie de logout",
                    body: "",
                };
                this.submitUsernameService.logout(req.body.username_).then((isCorrect: boolean) => {
                    m.body = String(isCorrect);
                    res.json(m);

                }).catch((failureReason: unknown) => {
                    m.body = String(failureReason);
                    res.json(m);
                });
            });

        return router;
    }
}
