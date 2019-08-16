import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import * as path from "path";
import { IdentificationErr } from "../Game/SimpleGame/ImagesServices/IdentificationErr.service";

@injectable()
export class IdentificationErrController {

    public get routes(): Router {
        const router: Router = Router();

        router.post("/",
                    async (req: Request, res: Response, next: NextFunction) => {
                    const differencesImagePath: string = path.join("./" + "imagesDifferences/" + req.body.imgName_ );
                    const WIDTH: number = 640;
                    res.send(await IdentificationErr.IsError(req.body.x_, req.body.y_, WIDTH, differencesImagePath));

                });

        return router;
    }
}
