import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
   public editEmployee: Employee | null = null;
  public deleteEmployee: Employee|null = null;
   constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getAllEmployees();
  }

  public getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
public onAddEmloyee(addForm: NgForm): void {  
  this.employeeService.addEmployee(addForm.value).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getAllEmployees();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}
getFirstName(): string {
  if (!this.editEmployee || !this.editEmployee.name) {
    return '';
  }
  return this.editEmployee.name.split(' ')[0];
}

public onCancel(addForm: NgForm): void {
  addForm.reset();
}


  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getAllEmployees();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 public searchEmployees(key: string): void {
  // Leere Suche → alle Mitarbeiter laden
  if (!key || key.trim() === '') {
    this.getAllEmployees();
    return;
  }

  const searchKey = key.toLowerCase().trim();

  // Liste der Felder, die durchsucht werden sollen
  const searchableFields = [
    'id',
    'name',
    'email',
    'tel',
    'alias',
    'plz_ort',
    'strasse_Nummer',
    'lieblingsfach',
    'hobby',
    'essen'
  ];

  // Filtere Mitarbeiter
  this.employees = this.employees.filter(employee => {
    return searchableFields.some(field => {
      const value = employee[field as keyof Employee];
      return value && typeof value === 'string' && value.toLowerCase().includes(searchKey);
    });
  });
}

  public onOpenModal(employee: Employee|null, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
       this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (container) {
      container.appendChild(button);
    }
    button.click();
  }
  public lieblingsfaecher: string[] = [
    'Mathe',
    'Deutsch',
    'Englisch',
    'Geografie',
    'Chemie',
    'Physik',
    'Geschichte',
    'SWP',
    'INFI',
    'Sport',
    'NWES',
    'Cloud Computing',
    'Security',
    'Bet',
    'UFW',
    'Religion',
    'AMEC'
  ]
}