import { injectable } from "inversify";
import * as path from "path";
import { PixelsManipulations } from "./PixelsManipulations.service";

const NB_COMPONENT: number = 4;

const BLANK_CANVAS_PATH: string = path.join("./" + "imagesDifferences/" + "00000_blank.bmp");
@injectable()
export class ErrorsReplacement {
   // Selon la documentation de Jimp, la valeur de retour doit être de type any
   // tslint:disable-next-line:typedef
   // tslint:disable-next-line:no-any
   private jimp: any;
   private orginalImagePath: string;
   private modifiedImagePath: string;

   public constructor(orignalImagePath: string, modifiedImagePath: string) {
     this.orginalImagePath = orignalImagePath;
     this.modifiedImagePath = modifiedImagePath;
     this.jimp = require("jimp");
   }

   public async replaceDifferences(col: number, line: number, width: number, differenceImagePath: string): Promise<void> {

        const pixels: number[] = await PixelsManipulations.convertDifferencesImageToArray(differenceImagePath);
        const id: number = pixels[line * width + col];
        const originalImage: number[] = await PixelsManipulations.readImage(this.orginalImagePath);
        const modifiedImage: number[] = await PixelsManipulations.readImage(this.modifiedImagePath);
        await this.FindErrorsPixel(id, pixels, originalImage, modifiedImage);
        await this.generateImage(modifiedImage);

   }

   public async FindErrorsPixel(id: number, pixels: number[], originalImage: number[], modifiedImage: number[]): Promise<void> {
      for (let index: number = 0; index < pixels.length; index++) {
            if ( pixels[index] === id) {
               this.replacePixel(index, originalImage, modifiedImage);
            }
      }
   }

   public replacePixel(index: number, originalImage: number[], modifiedImage: number[]): void {
      for (let i: number = 0 ; i < NB_COMPONENT; i++) {
         modifiedImage[index * NB_COMPONENT + i] = originalImage[index * NB_COMPONENT + i];
      }
   }

   public async generateImage(modifiedImage: number[]): Promise<void> {
      // Selon la documentation de Jimp, la valeur de retour doit être de type any
      // tslint:disable-next-line:typedef
      const differencesImage = await this.jimp.read(BLANK_CANVAS_PATH);
      differencesImage.bitmap.data = modifiedImage;
      differencesImage.write(this.modifiedImagePath);
   }
}
