import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';
import { Bus } from '../model/bus.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { Employee, User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-all-buses',
  templateUrl: './all-buses.component.html',
  styleUrls: ['./all-buses.component.css']
})
export class AllBusesComponent implements OnInit{

  constructor(private transportService: TransportService, private router: Router, private authService: AuthService, private stakeholdersService: StakeholdersService) {}

  buses: Bus[] = [];

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
    this.transportService.getAllBuses().subscribe(
      (result: any) => {
        this.buses = result.results;
        console.log(this.buses)
        this.buses.sort((a: any, b: any) => {
          const nameA = parseFloat(a.yearOfProduction);
          const nameB = parseFloat(b.yearOfProduction);
  
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
    this.router.navigate(['create-bus'])
  }
}
