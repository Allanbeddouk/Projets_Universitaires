import { expect } from "chai";
import * as path from "path";
import { simpleGameModel, ISimpleGameModel } from "../../Database/db";
import { SubmitSimpleViewCreationService } from "./SubmitSimpleViewCreation.service";

// tslint:disable: no-floating-promises
describe("Test SubmitSimpleViewCreationService", () => {
    const service: SubmitSimpleViewCreationService = new SubmitSimpleViewCreationService();

    it("Should not accept if the image is empty", () => {
        expect(service.isImageEmpty("")).equal(true);
    });

    it("Should accept an image", () => {
        expect(service.isImageEmpty("../image.bmp")).equal(false);
    });

    it("Should extract the name of originale from MulterString", () => {
        // tslint:disable-next-line:max-line-length
        const toBeExtract: string = "{àoriginaleà:[{àfieldnameà:àoriginaleà,àoriginalnameà:à1550163386088.bmpà,àencodingà:à7bità,àmimetypeà:àimage/bmpà,àdestinationà:à../server/imagesà,àfilenameà:à1550937178940.bmpà,àpathà:à../server/images/1550937178940.bmpà,àsizeà:921654}],àmodifieeà:[{àfieldnameà:àmodifieeà,àoriginalnameà:à1550163386101.bmpà,àencodingà:à7bità,àmimetypeà:àimage/bmpà,àdestinationà:à../server/imagesà,àfilenameà:à1550937178954.bmpà,àpathà:à../server/images/1550937178954.bmpà,àsizeà:921654}]}";
        expect(service.extractMulterString(toBeExtract, "originale")).equal("1550937178940.bmp");
    });

    it("Should have 7 differences", async () => {
        service.submitGameCreationService.gameName = "SimpleViewTest1";
        expect(await service.has7Diff("imagePourTest1.bmp", "imagePourTest2.bmp")).equal(true);
    });

    it("Shouldn't have 7 differences", async () => {
        service.submitGameCreationService.gameName = "SimpleViewTest2";
        expect(await service.has7Diff("imagePourTest1.bmp", "imagePourTest1.bmp")).equal(false);
    });

    it("Should delete the file", () => {
        // tslint:disable-next-line:typedef
        const fs = require("fs");

        const fileContent: string = "Hello World!";

        const fileName: string = "mynewfile.txt";
        const filePath: string = path.join("imagesTest/" + fileName);

        fs.writeFile(filePath, fileContent, (err: unknown) => {
            if (err) { throw err; } else {
                service.deleteImage(filePath);
            }
        });
    });

    it("Should send the game to the database", () => {
        service.checkSimpleGame("NpmTest", "image1", "image2").then((res: boolean) => {
            expect(res).to.equal(true);
        });

    });
    it("Should treat form datas without raising any error", async () => {
        const formTest: Object = new Object({
            originale:
            [ { fieldname: "originale",
                originalname: "imagePourTest1.bmp",
                encoding: "7bit",
                mimetype: "image/bmp",
                destination: "../server/images",
                filename: "imagePourTest1.bmp",
                path: "../server/images/imagePourTest1.bmp",
                size: 921654 } ],
            modifiee:
            [ { fieldname: "modifiee",
                originalname: "imagePourTest2.bmp",
                encoding: "7bit",
                mimetype: "image/bmp",
                destination: "../server/images",
                filename: "imagePourTest2.bmp",
                path: "../server/images/imagePourTest2.bmp",
                size: 921654 } ] });
        service.receiveForm(formTest);
    });

    describe("Game deletion", () => {
        it("Should return a resolve promise to true if a simple game is found and remove works", async () => {
            // tslint:disable-next-line:typedef
            const fs = require("fs");
            const fileContent: string = "Hello World!";
            let filePath: string = ("images/originalImage");
            fs.writeFileSync(filePath, fileContent);
            filePath = ("images/modifiedImage");
            fs.writeFileSync(filePath, fileContent);
            filePath = ("imagesDifferences/gameName_differences.bmp");
            fs.writeFileSync(filePath, fileContent);
            // tslint:disable-next-line:typedef
            const sinon = require("sinon");

            const gameSimple: ISimpleGameModel = new simpleGameModel({
                name: "gameName", originalImage: "originalImage",
                modifiedImage: "modifiedImage",
                oneVsOne: "",
                solo: "",
              });
            sinon.stub(service, "findGame").resolves(gameSimple);
            service.deleteSimpleGames("gameName").then((res: boolean) => {
                expect(res).to.equal(true);
            });
            sinon.restore();
        });

        it("Should return a resolve promise to false if a simple game doesn't exist ", async () => {
            // tslint:disable-next-line:typedef
            const sinon = require("sinon");
            sinon.stub(service, "findGame").rejects("erreur");
            service.deleteSimpleGames("gameName").then((res: boolean) => {
                expect(res).to.equal(false);
            });
            sinon.restore();
        });
    });

    describe("Game initialize", () => {
        it("Should return a resolve promise to true if a simple game is initialize ", async () => {
            const gameSimple: ISimpleGameModel = new simpleGameModel({
                name: "gameName", originalImage: "originalImage",
                modifiedImage: "modifiedImage",
                oneVsOne: "",
                solo: "",
            });
            // tslint:disable-next-line:typedef
            const sinon = require("sinon");
            service.findGame("gameName").then(() => {
                sinon.stub(service, "findGame").resolves(gameSimple);
            });
            service.initializeSimpleGame("gameName").then((res: boolean) => {
                expect(res).to.equal(true);
            });
            sinon.restore();
        });

        it("Should return a resolve promise to false if a simple game can't be initialize ", async () => {
            // tslint:disable-next-line:typedef
            const sinon = require("sinon");
            service.findGame("gameName").then(() => {
                sinon.stub(service, "findGame").rejects("erreur");
            });
            service.initializeSimpleGame("gameName").then((res: boolean) => {
                expect(res).to.equal(false);
            });
            sinon.restore();
        });
    });
});
