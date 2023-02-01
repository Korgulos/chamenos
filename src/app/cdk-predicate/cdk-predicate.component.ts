import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from "@angular/cdk/drag-drop";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeService } from "../services/employee.service";
import { DialogRef } from "@angular/cdk/dialog";

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
export class CdkPredicateComponent {
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private _employeeService: EmployeeService, private _dialogRef: DialogRef<CdkPredicateComponent>) {
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

  onFormSubmit() {
    if (this.empForm.valid) {
      this._employeeService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert("Employee added!");
          this._dialogRef.close();
        },
        error(err: any) {
          console.error(err);
        },
      });
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
