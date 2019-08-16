import { Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";
import { CreationJeuService } from "src/app/services/creation-jeu.service";
import { CreationJeuVueSimpleService } from "../../services/creation-jeu-vue-simple.service";
import {SimpleFormError} from "./SimpleFormError";

@Component({
  selector: "app-creation-jeu-vue-simple",
  templateUrl: "./creation-jeu-vue-simple.component.html",
  styleUrls: ["./creation-jeu-vue-simple.component.css"],
})
export class CreationJeuVueSimpleComponent {

  @Input() protected conditionVisibleSimple: boolean;
  @ViewChild("originalImage") private originalImage: ElementRef;
  @ViewChild("modifiedImage") private moodifiedImage: ElementRef;
  @ViewChild("formdiff") private form: ElementRef;

  public errors: SimpleFormError;

  public constructor(private rd: Renderer2, private creationJeuSimpleService: CreationJeuVueSimpleService,
                     private creationJeuService: CreationJeuService) {
    this.conditionVisibleSimple = false;
    this.errors = new SimpleFormError();
  }

  public resetAttributes(): void {
    this.creationJeuSimpleService.gameName = "";
    this.errors.errorName = false;
    this.errors.nameExist = false;
    this.errors.originalImageEmpty = false;
    this.errors.modifiedImageEmpty = false;
    this.conditionVisibleSimple = false;
    this.errors.submitCompleted = false;
    this.errors.error7Diff = false;
  }

  public imageValue(el: ElementRef): string {
    return el.nativeElement.value;
  }

  public cancelForm(): void {
    this.rd.setProperty(this.originalImage.nativeElement, "value", "");
    this.rd.setProperty(this.moodifiedImage.nativeElement, "value", "");
    this.resetAttributes();
  }

  public reloadLocation(): void {
    location.reload();
  }

  public async finishingSubmit(): Promise<void> {
    const formData: FormData = new FormData(this.form.nativeElement as HTMLFormElement);
    let has7Diff: boolean = false;
    await this.creationJeuSimpleService.sendForm(formData).then((res: [boolean, string[]]) => {
      this.creationJeuSimpleService.originaleName = res[1][0];
      this.creationJeuSimpleService.modifiedName = res[1][1];
      has7Diff = res[0];
    });

    if (has7Diff) {
      this.creationJeuSimpleService.simpleGameValidation()
      .then((isValidationOk: boolean) => {
        if (isValidationOk) {
          this.errors.submitCompleted = true;
        } else {
          this.errors.nameExist = true;
        }
      }).catch((error: Error) => {
        console.error(error);
      });
    } else {
      this.errors.error7Diff = true;
    }
  }

  public async checkData(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const respondName: boolean = await this.creationJeuService.checkName(this.creationJeuSimpleService.gameName);
      this.errors.errorName = !(respondName);
      this.errors.nameExist = await this.creationJeuService.checkNameAvailable(this.creationJeuSimpleService.gameName);

      this.errors.originalImageEmpty = await this.creationJeuSimpleService.isImageEmpty(this.imageValue(this.originalImage));
      this.errors.modifiedImageEmpty = await this.creationJeuSimpleService.isImageEmpty(this.imageValue(this.moodifiedImage));
      resolve(!this.errors.errorName && !this.errors.originalImageEmpty && !this.errors.modifiedImageEmpty && !this.errors.nameExist);
    });
  }

  public async submit(): Promise<void> {
    const isFormOk: boolean = await this.checkData();
    if (isFormOk) {
      await this.finishingSubmit();
    }
  }

}
