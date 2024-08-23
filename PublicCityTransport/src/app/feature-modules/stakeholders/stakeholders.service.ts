import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Employee, User } from 'src/app/infrastructure/auth/model/user.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.apiHost + 'user/get/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiHost + 'user/update/' + user.id, user);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(environment.apiHost + 'employee/get-profile/' + id);
  }

  updateEmployee(user: Employee): Observable<Employee> {
    return this.http.put<Employee>(environment.apiHost + 'employee/update-profile', user);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(environment.apiHost + 'customer/get-profile/' + id);
  }

  updateCustomer(user: Customer): Observable<Customer> {
    return this.http.put<Customer>(environment.apiHost + 'customer/update-profile', user);
  }
}
