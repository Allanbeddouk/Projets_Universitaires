import { injectable } from "inversify";
import { PixelsManipulations } from "./PixelsManipulations.service";

@injectable()
export class IdentificationErr {

   public static async IsError(col: number, line: number, width: number, differencesPath: string): Promise<boolean> {
      const pixels: number[] = await PixelsManipulations.convertDifferencesImageToArray(differencesPath);
      const id: number = pixels[line * width + col];

      return Boolean(id);
   }

}
