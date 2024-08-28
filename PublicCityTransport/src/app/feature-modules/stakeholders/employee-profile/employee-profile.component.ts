import { Component, OnInit } from '@angular/core';
import { Employee, User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmitted = false;
  editMode: boolean = false;
  changePassword: boolean = false;

  user: User = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
  };

  employee: Employee = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
    employeeRole: 0,
    gender: 0,
    phoneNumber: "",
    address: "",
    birthDate: new Date(),
    educationalBackground: ""
  }
}
