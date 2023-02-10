import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CdkPredicateComponent } from "../cdk-predicate/cdk-predicate.component";
import { EmployeeService } from "../services/employee.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CoreService } from "../core/core.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "chamenos";

  displayedColumns: string[] = ["id", "name", "suriname", "email", "birthday", "gender", "education", "company", "experience", "package", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private _coreService: CoreService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  openEditComponent() {
    const dialogRef = this._dialog.open(CdkPredicateComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getEmployees();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CdkPredicateComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getEmployees();
        }
      },
    });
  }

  getEmployees() {
    this._empService.getEmployees().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res: any) => {
        this._coreService.openSnackBar("Employee Successfully Deleted!", "OK");
        this.getEmployees();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
