import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CdkPredicateComponent } from "../cdk-predicate/cdk-predicate.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "chamenos";

  constructor(private _dialog: MatDialog) {}

  openEditComponent() {
    this._dialog.open(CdkPredicateComponent);
  }
}
