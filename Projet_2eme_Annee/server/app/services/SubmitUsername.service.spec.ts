import { expect } from "chai";
import { userModel, IUserModel } from "../Database/db";
import { SubmitUsernameService } from "./SubmitUsername.service";

describe("Tests SubmitUsernameService", () => {
    const service: SubmitUsernameService = new SubmitUsernameService();

    it("Should not accept a name over 20 characters", () => {
        expect(service.evaluateSize("JhonnyyyyyyyyyyyJhonnyyyyyyyyyyy")).equal(true);
    });

    it("Should not accept a name under 3 characters", () => {
        expect(service.evaluateSize("le")).equal(true);
    });

    it("Should accept a name that is beetween 3 and 20 characters", () => {
        expect(service.evaluateSize("Jhonny")).equal(false);
    });

    it("Should not accept a name with non-alphanumeric characters", () => {
        expect(service.evaluateName("&^%%&&")).equal(true);
    });

    it("Should accept a name with alphanumeric characters", () => {
        expect(service.evaluateName("Jhonny")).equal(false);
    });

    it("Should not accept a name that is already in the database", () => {

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });

        const usernameModel: IUserModel = new userModel({ username: "Jhonny" });

        // tslint:disable-next-line:no-floating-promises
        usernameModel.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.checkUsername("Jhonny").then((isCorrect: boolean) => {
            expect(isCorrect).equal(false);
        });

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should not accept a name that is not alphanumeric or lower than 3 characters and greater than 15", () => {

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.checkUsername("??ppoodd>").then((isCorrect: boolean) => {
            expect(isCorrect).equal(false);
        });

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should accept a name that is not in database", () => {

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.checkUsername("Jhonny").then((isCorrect: boolean) => {
            expect(isCorrect).equal(true);
        });

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should delete a name that is already in the database", () => {

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });

        const usernameModel: IUserModel = new userModel({ username: "Jhonny" });
        // tslint:disable-next-line:no-floating-promises
        usernameModel.save((err: unknown) => {
            if (err) {
              return err;
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.logout("Jhonny").then((isCorrect: boolean) => {
            expect(isCorrect).equal(true);
        });

        userModel.deleteOne({username: "Jhonny"}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
    });

    it("Should not delete a name that is not in the database", () => {

        userModel.deleteOne({}, (err: unknown) => {
            if (err) {
                console.error("Failed to remove:", err);
            }
        });
        // tslint:disable-next-line:no-floating-promises
        service.logout("Jhonny").then((isCorrect: boolean) => {
            expect(isCorrect).equal(false);
        });

    });

});
