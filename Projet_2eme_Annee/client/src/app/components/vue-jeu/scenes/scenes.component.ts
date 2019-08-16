import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { WebSocketCommunications } from "src/app/components/messageries/socket/socket.service";
import { CapterDifferenceService } from "src/app/services/freeGame/capter-difference.service";
import { CheatModeService } from "src/app/services/freeGame/cheat-mode.service";
import { GeometricGenerationService } from "src/app/services/freeGame/geomScene/geometric-generation.service";
import { ThematicGenerationService } from "src/app/services/freeGame/themeScene/thematic-generation.service";
import { CameraService } from "src/app/services/freeGame/vue3D/camera.service";
import { SceneService } from "src/app/services/freeGame/vue3D/scene.service";
import { Vue3DService } from "src/app/services/freeGame/vue3D/vue3-d.service";
import { HandleViewsService } from "src/app/services/handle-views.service";
import { IdentifierErr } from "src/app/services/identifierErr.service";
import { GeometricScene } from "../../../../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../../../../common/3DView/ThematicScene/ThematicScene";
import { FreeGame } from "../../../../../../common/GamesStructures/FreeGame";
import { MessageDifferenceLibre } from "../../../../../../common/communication/messageDifference";
import {Position} from "../../../../../../common/communication/position";
const ONE_SECOND: number = 1000;
@Component({
  selector: "app-scenes",
  templateUrl: "./scenes.component.html",
  styleUrls: ["./scenes.component.css"],
})
export class ScenesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public gameName: string;
  @Input() public user: string;
  @ViewChild("leftScene") public leftScene: ElementRef;
  @ViewChild("rightScene") public rightScene: ElementRef;
  @ViewChild("page") public page: ElementRef;
  private animationid: number;
  private generationService: ThematicGenerationService | GeometricGenerationService;
  public constructor(private vue3DService: Vue3DService, private cameraService: CameraService,
                     public differenceService: CapterDifferenceService, private identifieErr: IdentifierErr,
                     private handleViews: HandleViewsService, private cheatService: CheatModeService,
                     private wSocket: WebSocketCommunications, private sceneService: SceneService,
                     private viewsService: HandleViewsService) {
                      this.gameName = "default";
                      this.user = "user";
                      this.sceneService.isGameBlocked = false;
                      this.animationid = 0;
                     }

  @HostListener("document:keydown", ["$event"])
  public cameraMovement(event: KeyboardEvent): void {
    const keyName: string = event.key;
    keyName === "t" ? this.switchCheatMode() : this.cameraService.moveCamera(keyName);
  }

  @HostListener("window:resize", ["$event"])
  public resizeWindow(): void {
    this.vue3DService.geometricGeneration.onWindowResize();
  }

  @HostListener("document:mousedown", ["$event"])
  public onMouseDown(event: MouseEvent): void {
    this.cameraService.onMouseDown(event);
  }

  @HostListener("document:mouseup", ["$event"])
  public onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    this.cameraService.onMouseUp(event);
  }

  @HostListener("document:mousemove", ["$event"])
  public onMouseMove(event: MouseEvent): void {
    this.cameraService.onMouseMove(event);
  }

  @HostListener("contextmenu", ["$event"])
  public disableRightClick(event: Event): void {
    event.preventDefault();
    }
  public async ngOnInit(): Promise<void> {
    this.wSocket.suscribeAddDiff((message: MessageDifferenceLibre) => {
      this.differenceService.isGeometric = this.vue3DService.sceneType === "geometric";
      this.differenceService.updateAddDifference(message.modifiedObj);
    });

    this.wSocket.suscribeDeleteDiff((message: MessageDifferenceLibre) => {
      this.differenceService.isGeometric = this.vue3DService.sceneType === "geometric";
      this.differenceService.updateDeleteDifference(message.originalObj);
    });

    this.wSocket.suscribeColorDiff((message: MessageDifferenceLibre) => {
      this.differenceService.isGeometric = this.vue3DService.sceneType === "geometric";
      this.differenceService.updateColorDifference(message.originalObj, message.modifiedObj);
    });
  }
  public async ngAfterViewInit(): Promise<void> {
    if ((this.handleViews.game as FreeGame).gameType === "geometric") {
      this.vue3DService.sceneType = "geometric";
      this.generationService = this.vue3DService.geometricGeneration;
      const originalScene3D: GeometricScene = (this.handleViews.game as FreeGame).originalScene as GeometricScene;
      const modifiedScene3D: GeometricScene = (this.handleViews.game as FreeGame).modifiedScene as GeometricScene;
      this.generationService.generateScene(this.leftScene.nativeElement, originalScene3D, true);
      this.generationService.generateScene(this.rightScene.nativeElement, modifiedScene3D, false);
    } else {
      this.vue3DService.sceneType = "thematic";
      this.generationService = this.vue3DService.thematicGeneration;
      const originalScene3D: ThematicScene = (this.handleViews.game as FreeGame).originalScene as ThematicScene;
      const modifiedScene3D: ThematicScene = (this.handleViews.game as FreeGame).modifiedScene as ThematicScene;
      await this.generationService.generateScene(this.leftScene.nativeElement, originalScene3D, true);
      await this.generationService.generateScene(this.rightScene.nativeElement, modifiedScene3D, false);
    }

    this.animate();
  }

  public animate = () => {
    this.animationid = requestAnimationFrame(() => {
      this.generationService.renderers[0].render(this.generationService.scenes[0],
                                                 this.cameraService.cameraO);
      this.generationService.renderers[1].render(this.generationService.scenes[1],
                                                 this.cameraService.cameraM);
      this.animate();
    });
  }

  public handleUserClick($event: MouseEvent): void {
    if (this.cheatService.activateMode) {
      this.switchCheatMode();
    }
    if (!this.sceneService.isGameBlocked) {
      const mouseCoordinates: Position = this.extractMouseCoordinates($event);
      const diffFound: boolean = this.differenceService.handleUserClick(mouseCoordinates);
      if (diffFound) {
        this.identifieErr.playSoundFound();
        if (this.viewsService.isSolo) { this.wSocket.difference(); } else {
          this.wSocket.difference({gameName: this.gameName, username: this.user});
          this.wSocket.differenceFound(mouseCoordinates);
        }

      } else {
        this.identificationError();
      }
    }
  }

  public extractMouseCoordinates($event: MouseEvent): Position {
    const TWO_MUL: number = 2;
    const clientWidth: number = (this.leftScene.nativeElement as HTMLCanvasElement).clientWidth;
    this.sceneService.position.x =  $event.offsetX;
    this.sceneService.position.y = $event.offsetY;

    const widthOfScene: number = this.sceneService.position.x % clientWidth;
    const x: number = (widthOfScene / clientWidth) * TWO_MUL - 1;
    const y: number = - (this.sceneService.position.y / (this.leftScene.nativeElement as HTMLCanvasElement).clientHeight) * TWO_MUL + 1;

    return {x: x, y: y};
  }

  private identificationError(): void {
    if (this.viewsService.isSolo) { this.wSocket.error(); } else {
      this.wSocket.error({gameName: this.gameName, username: this.user}); }
    this.identifieErr.playSoundMissed();
    this.popUpError();
  }

  private popUpError(): void {
    if (this.sceneService.isOriginalActive) {
      this.sceneService.isMissed[0] = true;
    } else {
        this.sceneService.isMissed[1] = true;
    }
    this.sceneService.isGameBlocked = true;
    this.page.nativeElement.style.cursor = "not-allowed";
    setTimeout(() => {
      this.sceneService.isGameBlocked = false;
      this.sceneService.isMissed[0] = false;
      this.sceneService.isMissed[1] = false;
      this.page.nativeElement.style.cursor = "context-menu";
    },         ONE_SECOND);
  }
  private switchCheatMode(): void {
    const sceneO: THREE.Scene = this.vue3DService.sceneType === "geometric" ? this.vue3DService.geometricGeneration.scenes[0] :
                                                                              this.vue3DService.thematicGeneration.scenes[0];
    const sceneM: THREE.Scene = this.vue3DService.sceneType === "geometric" ? this.vue3DService.geometricGeneration.scenes[1] :
                                                                              this.vue3DService.thematicGeneration.scenes[1];
    this.cheatService.activateMode = !this.cheatService.activateMode;
    this.cheatService.showDifference(sceneO, sceneM);
  }
  public ngOnDestroy(): void {
    cancelAnimationFrame( this.animationid );
    this.clearCanvas();
  }

  public clearCanvas(): void {
    this.clearScene(true);
    this.clearScene(false);
  }

  public clearScene(isOriginale: boolean): void {
    const sceneNo: number = isOriginale ? 0 : 1;
    for (const child of this.generationService.scenes[sceneNo].children) {
      if (child.type !== "HemisphereLight" && child.type !== "SpotLight") {
        this.generationService.scenes[sceneNo].remove(child);
      }
    }
  }
}
