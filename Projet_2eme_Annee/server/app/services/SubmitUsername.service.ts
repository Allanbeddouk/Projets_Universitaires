import { injectable } from "inversify";
import { userModel, IUserModel } from "../Database/db";

const MIN_LENGHT_GAME_NAME: number = 3;
const MAX_LENGHT_GAME_NAME: number = 20;
const NALPHANUM: RegExp = new RegExp("[^a-zA-Z0-9]");
@injectable()
export class SubmitUsernameService {

    public evaluateName(username: string): boolean {
        return (NALPHANUM.test(username));
      }

    public evaluateSize(s: string): boolean {
        return !(s.length > MIN_LENGHT_GAME_NAME && s.length < MAX_LENGHT_GAME_NAME);
      }

    public async checkUsername(name: string): Promise<boolean> {

        const usernameModel: IUserModel = new userModel({ username: name });
        if (!this.evaluateName(name) && !this.evaluateSize(name)) {
        // tslint:disable-next-line:typedef
        return new Promise<boolean>((resolve, reject) => {
            userModel.find({ username: name }, (err: unknown, dbRes: IUserModel[]) => {

                if (err) {
                    reject(err);
                }

                if (dbRes.length === 1) {
                    resolve(false);
                } else {
                    // To avoid typescript compilation error, because the property is undefined (see mongoose documentation)
                    // tslint:disable-next-line:no-floating-promises
                    usernameModel.save((err2: unknown) => {
                        if (err2) {
                          reject(err2);
                        }
                    });
                    resolve(true);
                }
            });
        });
    } else {
    // tslint:disable-next-line:typedef
    return new Promise<boolean>((resolve) => {
        resolve(false);
    });
    }
}

    public async logout(name: string): Promise<boolean> {

        // tslint:disable-next-line:typedef
        return new Promise<boolean>((resolve, reject) =>  {
            userModel.deleteOne({ username: name }, (err: unknown) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

}
