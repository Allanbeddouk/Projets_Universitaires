import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import * as path from "path";
import Types from "./types";

import {initialisationDB} from "./Database/db";

import { DeleteImageController } from "./controllers/DeleteImage.controller";
import { DuplicateImagesController } from "./controllers/DuplicateImages.controller";
import { ErrorsReplacementController } from "./controllers/ErrorsReplacement.controller";
import { GameStatusController } from "./controllers/GameStatus.controller";
import { GetGamesController } from "./controllers/GetGames.controller";
import { HighScoreController } from "./controllers/Highscore.controller";
import { IdentificationErrController } from "./controllers/IdentificationErr.controller";
import {SubmitFreeViewCreationController} from "./controllers/SubmitFreeViewCreation.controller";
import {SubmitGameCreationController} from "./controllers/SubmitGameCreation.controller";
import {SubmitSimpleViewCreationController} from "./controllers/SubmitSimpleViewCreation.controller";
import {SubmitUsernameController} from "./controllers/SubmitUsername.controller";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(Types.SubmitUsernameController) private submitUsernameController: SubmitUsernameController,
                       @inject(Types.SubmitSimpleViewCreationController)
                       private submitCreationSimpleController: SubmitSimpleViewCreationController,
                       @inject(Types.SubmitFreeViewCreationController)
                       private submitCreationFreeController: SubmitFreeViewCreationController,
                       @inject(Types.IdentifacationErrController)
                       private identificationErrController: IdentificationErrController,
                       @inject(Types.ErrorsReplacementController)
                       private errorReplacementController: ErrorsReplacementController,
                       @inject(Types.GetGamesController)
                       private getGamesController: GetGamesController,
                       @inject(Types.DuplicateImagesController)
                       private duplicateImagesController: DuplicateImagesController,
                       @inject(Types.HighScoreController)
                       private highScoreController: HighScoreController,
                       @inject(Types.SubmitGameCreationController)
                       private submitGameCreationController: SubmitGameCreationController,
                       @inject(Types.DeleteImageController)
                       private deleteImageController: DeleteImageController,
                       @inject(Types.GameStatusController)
                       private gameStatusController: GameStatusController) {

        this.app = express();

        this.config();

        this.app.use(express.static(path.join(__dirname, "../client")));
        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(express.static("images"));
        initialisationDB();
    }

    public bindRoutes(): void {

        // Notre application utilise le routeur de notre API `Index`
        this.app.use("/initiale", this.submitUsernameController.routes);
        this.app.use("/admin", this.submitGameCreationController.router);
        this.app.use("/admin", this.submitCreationSimpleController.router);
        this.app.use("/admin", this.submitCreationFreeController.router);
        this.app.use("/identificationErr", this.identificationErrController.routes);
        this.app.use("/errorsReplacement", this.errorReplacementController.routes);
        this.app.use("/getGames", this.getGamesController.routes);
        this.app.use("/duplicateImages", this.duplicateImagesController.routes);
        this.app.use("/setHighScore", this.highScoreController.routes);
        this.app.use("/deleteImage", this.deleteImageController.routes);
        this.app.use("/gameStatus", this.gameStatusController.routes);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
