import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import * as path from "path";
import { ErrorsReplacement } from "../Game/SimpleGame/ImagesServices/ErrorsReplacement.service";
import { GenerateurDifferences } from "../Game/SimpleGame/ImagesServices/generateurDifferences.service";

@injectable()
export class DuplicateImagesController {

    public get routes(): Router {
        const router: Router = Router();

        router.post("/",
                    async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        await this.duplicate(req.body._originalPath, req.body._destinationPath);
                        await this.duplicate(req.body._originalPathDiff, req.body._destinationPathDiff);
                    } catch (err) {
                        res.send(false);
                    }
                    res.send(true);
                });

        return router;
    }

    private async duplicate(originalPath: string, destinationPath: string): Promise<void> {
        const generator: GenerateurDifferences = new GenerateurDifferences();
        const pixels: number[] = await generator.readImage(path.join("./" + originalPath));
        const error: ErrorsReplacement = new ErrorsReplacement("", path.join("./"  + destinationPath));
        await error.generateImage(pixels);

    }
}
