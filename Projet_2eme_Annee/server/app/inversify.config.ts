import { Container } from "inversify";
import "reflect-metadata";
import {GeometricConverter} from "./Game/FreeGame/GeometricScene/GeometricSceneConverter.service";
import { SubmitFreeViewCreationService } from "./Game/FreeGame/SubmitFreeViewCreation.service";
import { ThematicSceneConverter } from "./Game/FreeGame/ThematicScene/ThematicSceneConverter.service";
import { ErrorsReplacement } from "./Game/SimpleGame/ImagesServices/ErrorsReplacement.service";
import { IdentificationErr } from "./Game/SimpleGame/ImagesServices/IdentificationErr.service";
import { SubmitSimpleViewCreationService } from "./Game/SimpleGame/SubmitSimpleViewCreation.service";
import { SubmitGameCreationService } from "./Game/SubmitGameCreation.service";
import { Application } from "./app";
import { DeleteImageController } from "./controllers/DeleteImage.controller";
import { DuplicateImagesController } from "./controllers/DuplicateImages.controller";
import { ErrorsReplacementController } from "./controllers/ErrorsReplacement.controller";
import { GameStatusController } from "./controllers/GameStatus.controller";
import { GetGamesController } from "./controllers/GetGames.controller";
import { HighScoreController } from "./controllers/Highscore.controller";
import { IdentificationErrController } from "./controllers/IdentificationErr.controller";
import { SubmitFreeViewCreationController } from "./controllers/SubmitFreeViewCreation.controller";
import { SubmitGameCreationController } from "./controllers/SubmitGameCreation.controller";
import { SubmitSimpleViewCreationController } from "./controllers/SubmitSimpleViewCreation.controller";
import { SubmitUsernameController } from "./controllers/SubmitUsername.controller";
import { Server } from "./server";
import { GetGamesService } from "./services/GetGames.services";
import { HighScoreService } from "./services/Highscore.service";
import { SubmitUsernameService } from "./services/SubmitUsername.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.SubmitSimpleViewCreationController).to(SubmitSimpleViewCreationController);
container.bind(Types.SubmitSimpleViewCreationService).to(SubmitSimpleViewCreationService);

container.bind(Types.SubmitFreeViewCreationController).to(SubmitFreeViewCreationController);
container.bind(Types.SubmitFreeViewCreationService).to(SubmitFreeViewCreationService);

container.bind(Types.GeometricConverter).to(GeometricConverter);
container.bind(Types.ThematicSceneConverter).to(ThematicSceneConverter);

container.bind(Types.SubmitGameCreationService).to(SubmitGameCreationService);
container.bind(Types.SubmitGameCreationController).to(SubmitGameCreationController);

container.bind(Types.SubmitUsernameService).to(SubmitUsernameService);
container.bind(Types.SubmitUsernameController).to(SubmitUsernameController);

container.bind(Types.IdentifacationErrController).to(IdentificationErrController);
container.bind(Types.IdentifacationErr).to(IdentificationErr);

container.bind(Types.ErrorsReplacementController).to(ErrorsReplacementController);
container.bind(Types.ErrorsReplacement).to(ErrorsReplacement);

container.bind(Types.GetGamesController).to(GetGamesController);
container.bind(Types.GetGamesService).to(GetGamesService);

container.bind(Types.DuplicateImagesController).to(DuplicateImagesController);

container.bind(Types.HighScoreController).to(HighScoreController);
container.bind(Types.HighScoreService).to(HighScoreService);

container.bind(Types.DeleteImageController).to(DeleteImageController);

container.bind(Types.GameStatusController).to(GameStatusController);

export { container };
