import { Component, Input } from "@angular/core";
import { CreationJeuService } from "src/app/services/creation-jeu.service";
import { CreationJeuVueLibreService, MIN_QUANTITY } from "../../services/freeGame/creation-jeu-vue-libre.service";
import {LibreFormError} from "./LibreFormError";

@Component({
  selector: "app-creation-jeu-vue-libre",
  templateUrl: "./creation-jeu-vue-libre.component.html",
  styleUrls: ["./creation-jeu-vue-libre.component.css"],
})
export class CreationJeuVueLibreComponent {

  @Input() protected conditionVisibleLibre: boolean;
  protected submitCompleted: boolean;

  protected errors: LibreFormError;
  protected showScenes: boolean;

  public constructor(public creationJeuLibreService: CreationJeuVueLibreService, public creationJeuService: CreationJeuService ) {
    this.conditionVisibleLibre = false;
    this.submitCompleted = false;

    this.errors = new LibreFormError();
    this.showScenes = false;
  }

  public resetAttributes(): void {
    this.conditionVisibleLibre = false;
    this.submitCompleted = false;

    this.creationJeuLibreService.quantity = MIN_QUANTITY;
    this.creationJeuLibreService.selection = "geometric";

    this.creationJeuLibreService.modifications.changeColor = false;
    this.creationJeuLibreService.modifications.addItem = false;
    this.creationJeuLibreService.modifications.deleteItem = false;

    this.errors.errorName = false;
    this.errors.nameExist = false;
    this.errors.errorCheck = false;
    this.errors.errorQuantity = false;
  }

  public cancelForm(): void {
    this.resetAttributes();
  }

  public reloadLocation(): void {
    location.reload();
  }

  public async finishingSubmit(): Promise<void> {
    this.creationJeuLibreService.freeGameValidation()
    .then((isValidationOk: boolean) => {
        this.submitCompleted = isValidationOk;
    }).catch((error: unknown) => {
      console.error(error);
    });
  }

  public checkData = async (): Promise<boolean> => {
    const respondName: boolean = await this.creationJeuService.checkName(this.creationJeuLibreService.gameName);
    const respondQuantity: boolean = await this.creationJeuLibreService.checkQuantity();
    this.errors.errorName = !(respondName);
    this.errors.nameExist = await this.creationJeuService.checkNameAvailable(this.creationJeuLibreService.gameName);
    this.errors.errorQuantity = !(respondQuantity);
    this.errors.errorCheck = !( this.creationJeuLibreService.modifications.changeColor || this.creationJeuLibreService.modifications.addItem
                              || this.creationJeuLibreService.modifications.deleteItem);

    return this.errors.errorCheck || this.errors.errorQuantity || this.errors.errorName || this.errors.nameExist;
  }

  public submit = async (): Promise<void> => {
    const isDataIncorrect: boolean = await this.checkData();

    if (!isDataIncorrect) {

      await this.finishingSubmit();
    }
  }

}
