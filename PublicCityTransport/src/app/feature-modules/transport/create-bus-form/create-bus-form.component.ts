import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bus } from '../model/bus.model';
import { TransportService } from '../transport.service';

@Component({
  selector: 'app-create-bus-form',
  templateUrl: './create-bus-form.component.html',
  styleUrls: ['./create-bus-form.component.css']
})
export class CreateBusFormComponent implements OnInit{

  constructor(private router: Router, private transportService: TransportService) {}

  busRegistrationForm = new FormGroup({
    garageNumber: new FormControl('', [Validators.required]),
    licencePlate: new FormControl('', [Validators.required]),
    busBrand: new FormControl('', [Validators.required]),
    yearOfProduction: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    arrivalDate: new FormControl('', [Validators.required]),
    });

  ngOnInit(): void {
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

  createBus(): void {
    const arrivalDateValue = this.busRegistrationForm.value.arrivalDate;
    const arrivalDate = arrivalDateValue ? new Date(arrivalDateValue) : new Date();

    const busRegistration: Bus = {
      id: 0,
      garageNumber: this.busRegistrationForm.value.garageNumber || "",
      licencePlate: this.busRegistrationForm.value.licencePlate || "",
      busBrand: this.busRegistrationForm.value.busBrand || "",
      yearOfProduction: this.busRegistrationForm.value.yearOfProduction || "",
      arrivalDate: arrivalDate,
    };

    if (this.busRegistrationForm.valid) {
      this.transportService.createBus(busRegistration).subscribe({
        next: () => {
          this.router.navigate(['all-buses'])
        }
      });
    }
  }
}
