import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Employee, User, UserRole } from 'src/app/infrastructure/auth/model/user.model';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  constructor(private authService: AuthService, private stakeholdersService: StakeholdersService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
      if (this.user && String(this.user.role) === 'employee' && this.user.id) {
        this.stakeholdersService.getEmployee(this.user.id).subscribe({
          next: (result: Employee) => {
            this.employee = result;
            console.log('Employee:', result);
          },
          error: (err) => {
            console.error('Error fetching employee:', err); 
          }
        });
      }
    });
  }
  

  onLogout(): void {
    this.authService.logout();
  }
}
