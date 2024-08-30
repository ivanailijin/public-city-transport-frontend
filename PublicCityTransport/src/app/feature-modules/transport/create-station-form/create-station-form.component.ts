import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../transport.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Station } from '../model/station.model';
import { Location } from '../model/location.model';

@Component({
  selector: 'app-create-station-form',
  templateUrl: './create-station-form.component.html',
  styleUrls: ['./create-station-form.component.css']
})
export class CreateStationFormComponent implements OnInit{

  latitude: number = 0;
  longitude: number = 0;
  locationId: number = 0;
  locations: Location[] = [];

  constructor(private router: Router, private transportService: TransportService) {}

  stationRegistrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
   // latitude: new FormControl('', [Validators.required]),
   // longitude: new FormControl('', [Validators.required]),
    locationId: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')])
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

    this.transportService.getAllLocations().subscribe(
      (result: any) => {
        this.locations = result.results;
      }
    );
  }

  createStation(): void {
    const stationRegistration: Station = {
      id: 0,
      name: this.stationRegistrationForm.value.name || "",
      locationId: Number(this.stationRegistrationForm.value.locationId) || 0,
      latitude: 0,
      longitude: 0
    };

    if(this.latitude != 0 && this.longitude != 0){
      stationRegistration.latitude = this.latitude;
      stationRegistration.longitude = this.longitude;
      //stationRegistration.locationId = this.locationId;
    }

    if (this.stationRegistrationForm.valid && this.latitude != 0 && this.longitude != 0) {
      this.transportService.createStation(stationRegistration).subscribe({
        next: () => {
          this.router.navigate(['all-stations'])
        }
      });
    }
  }

  onLocationSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.locationId = Number(target.value);
  }

  GetLatitude(latitude: number) {
    this.latitude = latitude;
  }

  GetLongitude(longitude: number) {
    this.longitude = longitude;
  }
}
