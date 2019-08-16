import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { GeometricScene } from "../../../../../common/3DView/GeometricScene/GeometricScene";
import { ThematicScene } from "../../../../../common/3DView/ThematicScene/ThematicScene";
import { CapterDifferenceService } from "../../services/freeGame/capter-difference.service";
import { GeometricGenerationService } from "../../services/freeGame/geomScene/geometric-generation.service";
import { ThematicGenerationService } from "../../services/freeGame/themeScene/thematic-generation.service";
import { CameraService } from "../../services/freeGame/vue3D/camera.service";
import { Vue3DService } from "../../services/freeGame/vue3D/vue3-d.service";
import { Vue3DRequeteService } from "../../services/freeGame/vue3D/vue3D-Requete.service";

@Component({
  selector: "app-vue3-d",
  templateUrl: "./vue3-d.component.html",
  styleUrls: ["./vue3-d.component.css"],
})

export class Vue3DComponent implements AfterViewInit {
  @ViewChild("leftScene") public leftScene: ElementRef;
  @ViewChild("rightScene") public rightScene: ElementRef;
  private animatedRenderer: ThematicGenerationService | GeometricGenerationService;
  @HostListener("document:keydown", ["$event"])
  public cameraMovement(event: KeyboardEvent): void {
    const keyName: string = event.key;
    this.cameraService.moveCamera(keyName);
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

  public constructor(private vue3DService: Vue3DService, private requete: Vue3DRequeteService,
                     private cameraService: CameraService, public differenceService: CapterDifferenceService) {
                       this.animatedRenderer = vue3DService.thematicGeneration as ThematicGenerationService;
  }

  public ngAfterViewInit(): void {
    if (this.vue3DService.sceneType === "geometric") {
      this.animatedRenderer = this.vue3DService.geometricGeneration as GeometricGenerationService;
      this.requete.generateGeometricScene().then(async (scenes: GeometricScene[]) => {
        this.vue3DService.geometricGeneration.generateScene(this.leftScene.nativeElement, scenes[0], true);
        this.vue3DService.geometricGeneration.scenesInfos[1] = scenes[1];
      }).catch((err: unknown) => {
        console.error(err);
      });
    } else {
      this.animatedRenderer = this.vue3DService.thematicGeneration as ThematicGenerationService;
      this.requete.generateThematicScene().then(async (scenes: ThematicScene[]) => {
        await this.vue3DService.thematicGeneration.generateScene(this.leftScene.nativeElement, scenes[0], true).then(async () => {
          this.vue3DService.thematicGeneration.scenesInfos[1] = scenes[1];
        });
      }).catch((err: unknown) => {
        console.error(err);
      });
    }
    this.animate();
  }

  public animate = () => {
    requestAnimationFrame(() => {
      this.animatedRenderer.renderers[0].render(this.animatedRenderer.scenes[0],
                                                this.cameraService.cameraO);
      this.animatedRenderer.renderers[1].render(this.animatedRenderer.scenes[1],
                                                this.cameraService.cameraM);
      this.animate();
    });
  }
}
