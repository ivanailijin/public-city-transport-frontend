import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';
import { Router } from '@angular/router';
import { Line, LineType } from '../model/line.model';
import { Employee, User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';

@Component({
  selector: 'app-all-lines',
  templateUrl: './all-lines.component.html',
  styleUrls: ['./all-lines.component.css']
})
export class AllLinesComponent implements OnInit {

  constructor(private transportService: TransportService, private router: Router, private authService: AuthService, private stakeholdersService: StakeholdersService) {}

  lines: Line[] = [];

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

  ngOnInit(): void {
    this.transportService.getAllLines().subscribe(
      (result: any) => {
        this.lines = result.results;
        this.lines.sort((a: any, b: any) => {
          const nameA = parseFloat(a.name);
          const nameB = parseFloat(b.name);
  
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
    )

    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
      if (this.user && this.user.role === 1 && this.user.id) {
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

  navigateToCreate(){
    this.router.navigate(['create-line'])
  }

  public getLineTypeString(type: LineType): string {
    switch (type) {
      case LineType.city:
        return 'city';
      case LineType.suburban:
        return 'suburban';
      default:
        return 'city';
    }
  }
}
