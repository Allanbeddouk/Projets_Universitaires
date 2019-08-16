import { expect } from "chai";
import * as path from "path";
import { IdentificationErr } from "../ImagesServices/IdentificationErr.service";
// tslint:disable:no-magic-numbers
describe("Test identificationErr", () => {

    const imageTestPath: string = path.join("./" + "imagesTest/" + "test01.bmp");
    it("Should return 0 so the pixel isn't an error", async () => {
        expect(await IdentificationErr.IsError(250, 250, 640, imageTestPath)).equal(false);
    });

    it("Should not return 0 so the pixel is an error", async () => {
        expect(await IdentificationErr.IsError(0, 0, 640, imageTestPath)).equal(true);
    });

});
