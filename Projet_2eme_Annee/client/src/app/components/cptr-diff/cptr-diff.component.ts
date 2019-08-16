import { Component, Input } from "@angular/core";
const NBDIFF: number = 7;
@Component({
  selector: "app-cptr-diff",
  templateUrl: "./cptr-diff.component.html",
  styleUrls: ["./cptr-diff.component.css"],
})
export class CptrDiffComponent {
  @Input() public nbDifferences: number;
  @Input() public foundDifferences: number;
  private arrConstruct: ArrayConstructor;
  public constructor() {
    this.foundDifferences = 0;
    this.nbDifferences = NBDIFF;
    this.arrConstruct = Array;
    this.arrConstruct = this.arrConstruct;
   }
}
