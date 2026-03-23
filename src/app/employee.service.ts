import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/student/all`);
  }
  public getEmployeeById(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/student/find/id/${id}`);
  }
  public findEmployeeByStudentCode(studentCode: String): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/student/find/code/${studentCode}`);
  }
  public findEmployeeByNameAndEmail(name: String,email: String): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/find/name/${name}/${email}`);
  }
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/student/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/student/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/student/delete/${employeeId}`);
  }
}
