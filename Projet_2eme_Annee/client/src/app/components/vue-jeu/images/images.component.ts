import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import { SimpleGame } from "../../../../../../common/GamesStructures/SimpleGame";
import { Position } from "../../../../../../common/communication/position";
import { DuplicateImagesService } from "../../../services/duplicateImages.service";
import { ErrorsReplacement } from "../../../services/errorsReplacement.service";
import { HandleViewsService } from "../../../services/handle-views.service";
import { IdentifierErr } from "../../../services/identifierErr.service";
import { ImagesService } from "../../../services/images.service";

const PATH: string = "http://" + window.location.hostname + ":3000/";
const DELAY: number = 2500;
const ONE_SECOND: number = 1000;
const PATH_TEMP_BMP: string = "_temp.bmp";
const IMAGES_FOLDER: string = "images/";
const IMAGES_DIFF_FOLDER: string = "imagesDifferences/";
const PATH_TEMP_DIFF: string = "_temp_differences.bmp";
const PATH_DIFF: string = "_differences.bmp";
const PATH_TEMP: string = "_temp";
@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.css"],
})
export class ImagesComponent implements AfterViewInit, OnInit {
  @Input() public gameName: string;
  @Input() public user: string;
  @ViewChild("originalCanvas") public originalCanvas: ElementRef;
  @ViewChild("modifiedCanvas") public modifiedCanvas: ElementRef;
  @ViewChild("page") public page: ElementRef;
  private isBlocked: boolean;
  public constructor(private viewsService: HandleViewsService,
                     private serviceIdentification: IdentifierErr,
                     private serviceRemplacement: ErrorsReplacement,
                     private serviceDuplicateImage: DuplicateImagesService,
                     private wSocket: WebSocketCommunications,
                     private imagesService: ImagesService) {
                      this.imagesService.imgModName = (viewsService.game as SimpleGame).imgMd;
                      this.imagesService.pathImgMod = PATH + (viewsService.game as SimpleGame).imgMd;
                      this.imagesService.pathImgOg = PATH + (viewsService.game as SimpleGame).imgOg;
                      this.gameName = "default";
                      this.user = "user";
                      this.isBlocked = false;
  }

  public async ngOnInit(): Promise<void> {
    this.wSocket.subscribeDifferenceFound(async (position: Position) => {
      this.imagesService.pathImgMod = PATH + this.user + PATH_TEMP_BMP;
      await this.serviceRemplacement.replaceError((this.viewsService.game as SimpleGame).imgOg,
                                                  this.user + PATH_TEMP_BMP,
                                                  this.user + PATH_TEMP,
                                                  position.x, position.y)
                                                      .then(() => this.updateCanvas(this.modifiedCanvas, this.imagesService.pathImgMod));
    });
  }

  public async ngAfterViewInit(): Promise<void> {
    this.updateCanvas(this.originalCanvas, this.imagesService.pathImgOg);
    this.updateCanvas(this.modifiedCanvas, this.imagesService.pathImgMod);
    await this.serviceDuplicateImage.duplicateImages(IMAGES_FOLDER + this.imagesService.imgModName,
                                                     IMAGES_FOLDER + this.user + PATH_TEMP_BMP,
                                                     IMAGES_DIFF_FOLDER + this.gameName +  PATH_DIFF,
                                                     IMAGES_DIFF_FOLDER + this.user + PATH_TEMP_DIFF);
  }

  public async updateImages(e: MouseEvent): Promise<void> {
    if (!this.isBlocked) {
      const now: Date = new Date();
      if (now.getTime() - this.imagesService.lastClickMs > DELAY) {
        this.imagesService.lastClickMs = now.getTime();
        this.imagesService.position.x = e.offsetX;
        this.imagesService.position.y = e.offsetY;
        this.imagesService.pathImgMod = PATH + this.user + PATH_TEMP_BMP;
        if (await this.serviceIdentification.isError(this.imagesService.position.x,
                                                     this.imagesService.position.y,
                                                     this.user + PATH_TEMP_DIFF)) {
          if (this.viewsService.isSolo) { this.wSocket.difference(); } else {
          this.wSocket.difference({gameName: this.gameName, username: this.user}); }
          this.wSocket.differenceFound(this.imagesService.position);
          this.serviceIdentification.playSoundFound();
          await this.serviceRemplacement.replaceError((this.viewsService.game as SimpleGame).imgOg,
                                                      this.user + PATH_TEMP_BMP,
                                                      this.user + PATH_TEMP,
                                                      this.imagesService.position.x, this.imagesService.position.y)
                                                      .then(() => this.updateCanvas(this.modifiedCanvas, this.imagesService.pathImgMod));
        } else {
          this.identificationError();
        }
      }
    }
  }

  private identificationError(): void {
    if (this.viewsService.isSolo) { this.wSocket.error(); } else {
      this.wSocket.error({gameName: this.gameName, username: this.user}); }
    this.serviceIdentification.playSoundMissed();
    this.popUpError();
  }

  public updateCanvas(canvas: ElementRef, path: string): void {
    const WIDTH: number = 640;
    const HEIGHT: number = 480;
    const image: HTMLImageElement = new Image(WIDTH, HEIGHT);
    image.src = path + "?=" + Date.now();

    // We have to assume that we won't receive a null element so that this function works
    // tslint:disable-next-line:no-non-null-assertion
    const ctx: CanvasRenderingContext2D = canvas.nativeElement.getContext("2d")!;

    image.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.beginPath();
      ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
      ctx.closePath();
    };
  }

  private popUpError(): void {
    if (this.imagesService.isOriginalActive) {
      this.imagesService.isMissed[0] = true;
    } else {
        this.imagesService.isMissed[1] = true;
    }
    this.page.nativeElement.style.cursor = "not-allowed";
    setTimeout(() => {
      this.imagesService.isMissed[0] = false;
      this.imagesService.isMissed[1] = false;
      this.page.nativeElement.style.cursor = "context-menu";
    },         ONE_SECOND);
  }
  public block(): void { this.isBlocked = true; }
}
