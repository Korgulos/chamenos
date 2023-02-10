import { Component, Inject, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from "@angular/cdk/drag-drop";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeService } from "../services/employee.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CoreService } from "../core/core.service";

interface Educations {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-cdk-predicate",
  templateUrl: "./cdk-predicate.component.html",
  styleUrls: ["./cdk-predicate.component.scss"],
})

/**
 * @title Drag&Drop enter predicate
 */
export class CdkPredicateComponent implements OnInit {
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private _employeeService: EmployeeService, private _dialogRef: MatDialogRef<CdkPredicateComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService) {
    this.empForm = this._fb.group({
      name: "",
      suriname: "",
      email: "",
      birthday: "",
      gender: "",
      education: "",
      company: "",
      experience: "",
      package: "",
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._employeeService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee updated!", "OK");
            this._dialogRef.close(true);
          },
          error(err: any) {
            console.error(err);
          },
        });
      } else {
        this._employeeService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee added!", "OK");
            this._dialogRef.close(true);
          },
          error(err: any) {
            console.error(err);
          },
        });
      }
    }
  }

  educations: Educations[] = [
    { value: "primary_education", viewValue: "Primary Education" },
    { value: "secondary_education", viewValue: "Secondary Education" },
    { value: "post_secondary_education", viewValue: "Post Secondary Education" },
    { value: "short_tertiary_education", viewValue: "Short Tertiary Education" },
    { value: "bachelors_degree", viewValue: "Bachelors Degree or equivalent" },
    { value: "masters_degree", viewValue: "Masters Degree or equivalent" },
    { value: "doctoral_degree", viewValue: "Doctoral Degree or equivalent" },
  ];
}
