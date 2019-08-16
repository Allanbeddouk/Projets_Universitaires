import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SubmitSimpleViewCreationService } from "../Game/SimpleGame/SubmitSimpleViewCreation.service";
import Types from "../types";
const IMAGES_FOLDER: string = "images/";
const IMAGES_DIFF_FOLDER: string = "imagesDifferences/";
const PATH_DIFF: string = "_differences.bmp";

@injectable()
export class DeleteImageController {

    public constructor(@inject(Types.SubmitSimpleViewCreationService) private simpleView: SubmitSimpleViewCreationService) { }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/",
                    (req: Request, res: Response, next: NextFunction) => {

                    try {
                        this.simpleView.deleteImage(IMAGES_FOLDER + req.body._username + "_temp.bmp");
                        this.simpleView.deleteImage(IMAGES_DIFF_FOLDER + req.body._username + "_temp"  + PATH_DIFF);
                    } catch (err) {
                        res.send(false);
                    }
                    res.send(true);

                });

        return router;
    }
}
