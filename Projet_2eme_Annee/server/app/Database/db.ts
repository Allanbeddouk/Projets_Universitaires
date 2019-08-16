import * as Mongoose from "mongoose";
import {GeometricScene} from "../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../common/3DView/ThematicScene/ThematicScene";
import { Player } from "../../../common/GamesStructures/Player";

// To avoid typescript compilation error, any is required here (see mongoose documentation)
// tslint:disable-next-line:no-any
(Mongoose as any).Promise = global.Promise;
const DB_URL: string = "mongodb://" + "equipe109" + ":" + "7differences" + "@" + "ds058739.mlab.com" + ":" + "58739" + "/" + "log2990";
interface IUser {
    username: string;
}

interface IFreeGame {
    name: string;
    screen: string;
    gameType: string;
    originalScene: GeometricScene | ThematicScene;
    modifiedScene: GeometricScene | ThematicScene;
    oneVsOne: Player[];
    solo: Player[];
}

interface ISimpleGame {
    name: string;
    originalImage: string;
    modifiedImage: string;
    oneVsOne: Player[];
    solo: Player[];
}

interface IFreeGameModel extends Mongoose.Document, IFreeGame {
}

interface ISimpleGameModel extends Mongoose.Document, ISimpleGame {
}

interface IUserModel extends Mongoose.Document, IUser {
}

const userSchema: Mongoose.Schema = new Mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
},                                                      { collection: "usernames" },
);

const freeGameSchema: Mongoose.Schema = new Mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    screen: {
        required: true,
        type: String,
    },

    gameType: {
        required: true,
        type: String,
    },

    originalScene: {
        required: true,
        type: Object,
    },

    modifiedScene: {
        required: true,
        type: Object,
    },

    oneVsOne: {
        required: true,
        type: [String],
    },

    solo: {
        required: true,
        type: [String],
    },
},                                                          { collection: "freegames" },
);

const simpleGameSchema: Mongoose.Schema = new Mongoose.Schema({
    name: {
        required: true,
        type: String,
    },

    originalImage: {
        required: true,
        type: String,
    },

    modifiedImage: {
        required: true,
        type: String,
    },

    oneVsOne: {
        required: true,
        type: [String],
    },

    solo: {
        required: true,
        type: [String],
    },
},                                                            { collection: "simplegames" },
);

const userModel: Mongoose.Model<IUserModel> = Mongoose.model<IUserModel>("UserModel", userSchema);
const freeGameModel: Mongoose.Model<IFreeGameModel> = Mongoose.model<IFreeGameModel>("FreeGameModel", freeGameSchema);
const simpleGameModel: Mongoose.Model<ISimpleGameModel> = Mongoose.model<ISimpleGameModel>("SimpleGameModel", simpleGameSchema);

// Need name for the function
// tslint:disable-next-line:only-arrow-functions
const initialisationDB: Function = () => {

    Mongoose.connect(DB_URL, { useNewUrlParser: true }).catch((err: unknown) => {
        if (err) {
          return err;
        }
      });

    userModel.deleteOne({}, (err: unknown) => {
        if (err) {
            console.error("Failed to remove:", err);
        }
    });

};

export { freeGameModel, simpleGameModel, ISimpleGame, IFreeGame, userModel,
        Mongoose, initialisationDB, DB_URL, IUserModel, IFreeGameModel, ISimpleGameModel };
