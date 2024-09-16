import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, User } from 'src/app/infrastructure/auth/model/user.model';
import { TransportService } from '../transport.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { LineOut, LineType } from '../model/line.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bus } from '../model/bus.model';
import { PagedResults } from 'src/app/shared/model/paged-results';
import { Direction } from '../model/direction.model';
import { Departure } from '../model/departure.model';
import { Station, StationOut } from '../model/station.model';

@Component({
  selector: 'app-line-profile',
  templateUrl: './line-profile.component.html',
  styleUrls: ['./line-profile.component.css']
})
export class LineProfileComponent implements OnInit {

  @ViewChild('closebutton') closebutton!: ElementRef | undefined;
  @ViewChild('closeEditButton') closeEditButton!: ElementRef | undefined;
  @ViewChild('closeDirectionButton') closeDirectionButton!: ElementRef | undefined;
  @ViewChild('closeDepartureButton') closeDepartureButton!: ElementRef | undefined;
  @ViewChild('closeStationButton') closeStationButton!: ElementRef | undefined;

  constructor(private transportService: TransportService, private authService: AuthService, private route: ActivatedRoute,
    private router: Router, private stakeholdersService: StakeholdersService, private renderer: Renderer2){}

  selectedNavItem: 'info' | 'buses' | 'directions' | 'stations' = 'info';
  lineId: number = 0;

  line : LineOut = {
    id: 0,
    name: '',
    lineType: LineType.city,
    length: 0,
    time: 0,
    buses: [],
    directions: [],
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

  selectedBusId: number = 0;
  selectedBusForDeletionName: string = '';
  busIdToDelete: number | undefined;
  busesForSelect: Bus[] = [];
  isSubmitted = false;
  departures: Departure[] = [];
  days: string[] = ['Workday', 'Saturday', 'Sunday'];
  selectedDirectionName: string = '';
  selectedDirectionId: number | undefined;
  selectedStationId: number = 0;
  stationsForSelect: StationOut[] = [];
  selectedStationToDelete: number | undefined;
  selectedStationNameToDelete: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lineId = +params['id'];
    });

    this.getEmployee();
    this.getLineWithRelations(this.lineId);

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

busForm = new FormGroup({
  busId: new FormControl('', [Validators.required])
  });

lineForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  lineType: new FormControl('', [Validators.required]),
  length: new FormControl(0, [Validators.required]),
  time: new FormControl(0, [Validators.required, Validators.pattern('[0-9]+')]),
  });

directionForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  firstStation: new FormControl('', [Validators.required]),
  });

departureForm = new FormGroup({
  day: new FormControl('', [Validators.required]),
  time: new FormControl('', [Validators.required]),
  });

stationForm = new FormGroup({
    stationId: new FormControl('', [Validators.required])
    });
  

    showInfo() {
      this.selectedNavItem = 'info';
    }
  
    showBuses() {
      this.selectedNavItem = 'buses';
    }
  
    showDirections() {
      this.selectedNavItem = 'directions';
    }
  
    showStations() {
      this.selectedNavItem = 'stations';
    }

  onBusSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedBusId = Number(target.value);
  }
  
  onStationSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStationId = Number(target.value);
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

  getLineWithRelations(id: number): void {
    this.transportService.getLineWithRelations(id).subscribe((result: any) => {
      this.line = result;
      console.log(this.line)
      this.getBuses();
      this.getStations();
      const lineTypeValue = this.line.lineType === LineType.city ? 'city' : 'suburban';
      this.lineForm.patchValue({
        name: this.line.name,
        lineType: lineTypeValue,
        length: this.line.length,
        time: this.line.time
      });
    })
  } 

  getBuses() {
    this.transportService.getAllBuses().subscribe(
      (result: PagedResults<Bus>) => {
        this.busesForSelect = result.results.filter(bus => 
          !this.line.buses.some(lineBus => lineBus.id === bus.id)
        );
      }
    )
  }

  getStations() {
    this.transportService.getAllStationsWithRelations().subscribe(
      (result: StationOut[]) => {
        this.stationsForSelect = result.filter(station => 
          !this.line.directions.some(direction => 
            direction.stations.some(stationDir => stationDir.id === station.id)
          )
        );
      }
    );
  }

  addBus() {
    if (this.selectedBusId !== 0) {
      this.transportService.addBus(this.selectedBusId, this.lineId).subscribe((result: LineOut) => {
        this.getLineWithRelations(this.lineId);
      });
    }
  }
  
  validateBusForm(event: Event) {
    event.preventDefault(); 
  
    this.isSubmitted = true; 
    const htmlForm = document.querySelector('form');
    this.renderer.addClass(htmlForm, 'was-validated');
   
    if (this.busForm.valid) {
        this.addBus(); 
        if (this.closebutton) {
          this.closebutton.nativeElement.click();
        }
        this.resetForm();
    } else {
        this.busForm.markAllAsTouched(); 
    }
  }

  resetForm() {
    const htmlForm = document.querySelector('form');
    if (htmlForm) {
      htmlForm.classList.remove('was-validated');
    }
    this.busForm.reset();
    this.isSubmitted = false;
  }

deleteBus() {
    this.transportService.removeBus(this.busIdToDelete!, this.lineId).subscribe(
      () => {
        this.line.buses = this.line.buses.filter(bus => bus.id !== this.busIdToDelete);
        this.getBuses();
      },
      (error) => {
        console.error('Error deleting driver:', error);
      }
    );
}

openBusDeleteModal(bus: Bus) {
  this.selectedBusForDeletionName = bus.licencePlate!;
  this.busIdToDelete = bus.id; 
}

  public getLineTypeValue(line: string): LineType {
  
    switch (line) {
      case 'city':
        return LineType.city;
      case 'suburban':
        return LineType.suburban;
      default:
        return LineType.city;
    }
  }

  updateLine() {
    this.transportService.updateLine(this.line).subscribe({
      next: () => { }
    })
  }

  resetEditForm() {
    const htmlForm = document.querySelector('#editLineForm');
    if (htmlForm) {
      htmlForm.classList.remove('was-validated');
    }
    this.isSubmitted = false;
  }

  validateEditForm(event: Event) {
    event.preventDefault(); 
  
    const htmlForm = document.querySelector('#editLineForm');
    this.renderer.addClass(htmlForm, 'was-validated');
   
    if (this.lineForm.valid) {
        const lineType = this.getLineTypeValue(this.lineForm.value.lineType || 'city')
        this.line.lineType = lineType;
        this.updateLine(); 
        if (this.closeEditButton) {
          this.closeEditButton.nativeElement.click();
        }
        this.resetEditForm();
    } else {
        this.busForm.markAllAsTouched(); 
    }
  }

  createDirection() {
    const direction: Direction = {
      id: 0,
      name: this.directionForm.value.name || "",
      firstStation: this.directionForm.value.firstStation || "",
      lineId: this.lineId
    };
    this.transportService.createDirection(direction).subscribe({
      next: () => {
        this.getLineWithRelations(this.lineId);
      }
    });
  }

  resetDirectionForm() {
    const htmlForm = document.querySelector('#addDirectionForm');
    if (htmlForm) {
      htmlForm.classList.remove('was-validated');
    }
    this.directionForm.reset();
    this.isSubmitted = false;
  }

  validateDirectionForm(event: Event) {
    event.preventDefault(); 
  
    this.isSubmitted = true; 
    const htmlForm = document.querySelector('#addDirectionForm');
    this.renderer.addClass(htmlForm, 'was-validated');
   
    if (this.directionForm.valid) {
        this.createDirection(); 
        if (this.closeDirectionButton) {
          this.closeDirectionButton.nativeElement.click();
        }
        this.resetDirectionForm();
    } else {
        this.busForm.markAllAsTouched(); 
    }
  }

  setSelectedDirection(direction: Direction) {
    this.selectedDirectionName = direction.name!;
    this.selectedDirectionId = direction.id; 
  }

  deleteDirection() {
    this.transportService.deleteDirection(this.selectedDirectionId!, this.lineId).subscribe(
      () => {
        this.line.directions = this.line.directions.filter(direction => direction.id !== this.selectedDirectionId);
      },
      (error) => {
        console.error('Error deleting direction:', error);
      }
    );
}

getDepartures(directionId: number): Departure[] {

  this.transportService.getAllDepartures().subscribe(
    (result: PagedResults<Departure>) => {
      result.results.filter(dep => dep.directionId === directionId)
    }
  );
  return this.departures;
}

createDeparture() {
  const departure: Departure = {
    id: 0,
    day: this.departureForm.value.day || "",
    time: this.departureForm.value.time + ":00"|| "",
    directionId: this.selectedDirectionId!,
    lineId: this.lineId,
  };
  this.transportService.createDeparture(departure).subscribe({
    next: () => {
      this.getLineWithRelations(this.lineId);
    }
  });
}

resetDepartureForm() {
  const htmlForm = document.querySelector('#addDepartureForm');
  if (htmlForm) {
    htmlForm.classList.remove('was-validated');
  }
}

validateDepartureForm(event: Event) {
  event.preventDefault(); 

  this.isSubmitted = true; 
  const htmlForm = document.querySelector('#addDepartureForm');
  this.renderer.addClass(htmlForm, 'was-validated');
 
  if (this.departureForm.valid) {
      this.createDeparture(); 
      if (this.closeDepartureButton) {
        this.closeDepartureButton.nativeElement.click();
      }
      this.resetDepartureForm();
  } else {
      this.busForm.markAllAsTouched(); 
  }
}

addStation() {
  this.transportService.addStation(this.selectedStationId, this.selectedDirectionId!).subscribe({
    next: () => {
      this.getLineWithRelations(this.lineId);
    }
  });
}

resetStationForm() {
  const htmlForm = document.querySelector('#addStationForm');
  if (htmlForm) {
    htmlForm.classList.remove('was-validated');
  }
  this.stationForm.reset();
  this.isSubmitted = false;
}

validateStationForm(event: Event) {
  event.preventDefault(); 

  this.isSubmitted = true; 
  const htmlForm = document.querySelector('#addStationForm');
  this.renderer.addClass(htmlForm, 'was-validated');
 
  if (this.stationForm.valid) {
      this.addStation(); 
      if (this.closeStationButton) {
        this.closeStationButton.nativeElement.click();
      }
      this.resetStationForm();
  } else {
      this.busForm.markAllAsTouched(); 
  }
}

getWorkdayDepartures(directionId: number): Departure[] {
  const departures = this.getDepartures(directionId);
  
  const workdayDepartures = departures.filter(dep => dep.day === 'Workday');

  const sortedDepartures = workdayDepartures.sort((a, b) => {
    return new Date(`1970-01-01T${a.time}Z`).getTime() - new Date(`1970-01-01T${b.time}Z`).getTime();
  });

  return sortedDepartures;
}

public lineTypeToString(line: LineType): string {
    switch (line) {
      case LineType.city:
        return 'City';
      case LineType.suburban:
        return 'Suburban';
      default:
        return 'City';
    }
  }

  setSelectedStation(station: StationOut, direction: Direction) {
    this.selectedStationNameToDelete = station.name! + ',' + station.location.address;
    this.selectedStationToDelete = station.id; 
    this.selectedDirectionId = direction.id;
    this.selectedDirectionName = direction.name;
  }

  deleteStation() {
    this.transportService.removeStation(this.selectedStationToDelete!, this.selectedDirectionId!).subscribe(
      () => {
        const directionToUpdate = this.line.directions.find(direction => direction.id === this.selectedDirectionId);
      
        if (directionToUpdate) {
          directionToUpdate.stations = directionToUpdate.stations.filter(station => station.id !== this.selectedStationToDelete!);
        }
        this.getStations();
      },
      (error) => {
        console.error('Error deleting direction:', error);
      }
    );
}
}
