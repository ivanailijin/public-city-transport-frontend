import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Employee, Gender, User } from 'src/app/infrastructure/auth/model/user.model';
import { BusOut } from '../model/bus.model';
import { TransportService } from '../transport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-bus-profile',
  templateUrl: './bus-profile.component.html',
  styleUrls: ['./bus-profile.component.css']
})


export class BusProfileComponent implements OnInit {

  @ViewChild('closebutton') closebutton!: ElementRef | undefined;
  @ViewChild('closeEditButton') closeEditButton!: ElementRef | undefined;

  constructor(private transportService: TransportService, private authService: AuthService, private route: ActivatedRoute,
     private router: Router, private stakeholdersService: StakeholdersService, private renderer: Renderer2) {}

  selectedNavItem: 'info' | 'drivers' | 'lines' = 'info';
  busId: number = 0;
  modalInstance!: Modal; 

  bus : BusOut = {
    id: 0,
    garageNumber: '',
    licencePlate: '',
    busBrand: '',
    yearOfProduction: '',
    arrivalDate: Date.prototype,
    employees: []
  }

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
  
  selectedDriverId: number = 0;
  selectedDriverForDeletionName: string = '';
  driverIdToDelete: number | undefined;
  drivers: Employee[] = [];
  isSubmitted = false;
  arrivalDate: Date = new Date();

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.busId = +params['id'];
    });

    this.getEmployee();
    this.getBusWithRelations(this.busId);

    (() => {
      'use strict';
  
      const forms = document.querySelectorAll('.needs-validation');
  
      Array.from(forms).forEach(form => {
        const htmlForm = form as HTMLFormElement;
  
        htmlForm.addEventListener('submit', event => {
          if (!htmlForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
  
          htmlForm.classList.add('was-validated');
        }, false);
      });
    })();
  }

  driverForm = new FormGroup({
    driverId: new FormControl('', [Validators.required])
    });

  busForm = new FormGroup({
    garageNumber: new FormControl(this.bus.garageNumber, [Validators.required]),
    licencePlate: new FormControl('', [Validators.required]),
    busBrand: new FormControl('', [Validators.required]),
    yearOfProduction: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    arrivalDate: new FormControl('', [Validators.required]),
    });

  getBusWithRelations(id: number): void {
    this.transportService.getWithRelations(id).subscribe((result: any) => {
      this.bus = result;
      console.log(this.bus)
      this.getDrivers();
      this.busForm.patchValue({
        garageNumber: this.bus.garageNumber,
        licencePlate: this.bus.licencePlate,
        busBrand: this.bus.busBrand,
        yearOfProduction: this.bus.yearOfProduction,
        arrivalDate: this.formatDate(this.bus.arrivalDate) 
      });
    })
  } 

  getEmployee(): void {
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

  showInfo() {
    this.selectedNavItem = 'info';
  }

  showDrivers() {
    this.selectedNavItem = 'drivers';
  }

  showLines() {
    this.selectedNavItem = 'lines';
  }

  onDriverSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDriverId = Number(target.value);
  }

  getDrivers(){
    this.stakeholdersService.getDrivers().subscribe((result: Employee[]) => {
      this.drivers = result.filter(driver => 
        !this.bus.employees.some(employee => employee.id === driver.id)
      );
    })
  }

  addDriver() {
    if (this.selectedDriverId !== 0) {
      this.transportService.addDriver(this.selectedDriverId, this.busId).subscribe((result: any) => {
        this.getBusWithRelations(this.busId);
        console.log(this.drivers);
      });
    }
  }

  validateForm(event: Event) {
    event.preventDefault(); 
  
    this.isSubmitted = true; 
    const htmlForm = document.querySelector('form');
    this.renderer.addClass(htmlForm, 'was-validated');
   
    if (this.driverForm.valid) {
        this.addDriver(); 
        if (this.closebutton) {
          this.closebutton.nativeElement.click();
        }
        this.resetForm();
    } else {
        this.driverForm.markAllAsTouched(); 
    }
  }

  resetForm() {
    const htmlForm = document.querySelector('form');
    if (htmlForm) {
      htmlForm.classList.remove('was-validated');
    }
    this.driverForm.reset();
    this.isSubmitted = false;
  }

  deleteDriver() {
      this.transportService.removeDriver(this.driverIdToDelete!, this.busId).subscribe(
        () => {
          this.bus.employees = this.bus.employees.filter(driver => driver.id !== this.driverIdToDelete);
          this.getDrivers()
        },
        (error) => {
          console.error('Error deleting driver:', error);
        }
      );
  }

  openDeleteModal(driver: Employee) {
    this.selectedDriverForDeletionName = driver.name! + ' ' + driver.surname!;
    this.driverIdToDelete = driver.id; 
  }
  
  toGenderEnum(role: Gender): string {
    switch (role) {
      case Gender.male:
        return 'Male';
      case Gender.female:
        return 'Female';
      default:
        return 'Male';
    }
  }

  validateEditForm(event: Event) {
    event.preventDefault(); 
  
    this.isSubmitted = true; 
    const htmlForm = document.querySelector('#editBusForm');
    this.renderer.addClass(htmlForm, 'was-validated');
   
    if (this.busForm.valid) {
      const arrivalDateValue = this.busForm.value.arrivalDate;
      const arrivalDate = arrivalDateValue ? new Date(arrivalDateValue) : new Date();
      this.bus.arrivalDate = arrivalDate;
        this.updateBus(); 
        if (this.closeEditButton) {
          this.closeEditButton.nativeElement.click();
        }
        this.resetEditForm();
    } else {
        this.busForm.markAllAsTouched(); 
    }
  }

  updateBus() {
    this.transportService.updateBus(this.bus).subscribe({
      next: () => { }
    })
  }

  resetEditForm() {
    const htmlForm = document.querySelector('#editBusForm');
    if (htmlForm) {
      htmlForm.classList.remove('was-validated');
    }
    this.driverForm.reset();
    this.isSubmitted = false;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

