import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import * as path from "path";
import { ErrorsReplacement } from "../Game/SimpleGame/ImagesServices/ErrorsReplacement.service";
import { GenerateurDifferences } from "../Game/SimpleGame/ImagesServices/generateurDifferences.service";

@injectable()
export class ErrorsReplacementController {

    public get routes(): Router {
        const router: Router = Router();
        router.post("/",
                    async (req: Request, res: Response, next: NextFunction) => {

                        try {
                            const initialImagePath: string = path.join("./" + "images/" + req.body._initialPath);
                            const modifiedImagePath: string = path.join("./" + "images/" + req.body._modifiedPath);
                            const differencesImagePath: string = path.join("./" + "imagesDifferences/"
                             + req.body._differencesPath + "_differences"   + ".bmp");
                            const WIDTH: number  = 640;
                            const replacement: ErrorsReplacement = new ErrorsReplacement(initialImagePath, modifiedImagePath);
                            await replacement.replaceDifferences(req.body.x, req.body.y, WIDTH, differencesImagePath);
                            const generator: GenerateurDifferences = new GenerateurDifferences();
                            await generator.generateDifferences(req.body._differencesPath, req.body._initialPath, req.body._modifiedPath);

                        } catch (err) {
                            res.send(false);
                        }
                        res.send(true);
                });

        return router;
    }
}
