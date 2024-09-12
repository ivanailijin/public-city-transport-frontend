import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../tickets.service';
import { TransportService } from '../../transport/transport.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Line, } from '../../transport/model/line.model';
import { Unpersonalized } from '../model/ticket.model';
import { Departure } from '../../transport/model/departure.model';
import { DirectionOut } from '../../transport/model/direction.model';

@Component({
  selector: 'app-purchase-unpersonalized-form',
  templateUrl: './purchase-unpersonalized-form.component.html',
  styleUrls: ['./purchase-unpersonalized-form.component.css']
})
export class PurchaseUnpersonalizedFormComponent implements OnInit {

  lines: Line[] = [];
  tickets: Unpersonalized[] = [];
  directions: DirectionOut[] = [];
  departures: Departure[] = [];
  filteredDepartures: Departure[] = [];
  selectedLineId: number = 0;
  selectedTicketId: number = 0;
  selectedDepartureId?: number = 0;
  selectedDirectionId: number = 0;
  selectedDay: string = '';
  formSubmitted = false;

  user: User = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
  };

  selectedTicket: Unpersonalized = {
    id: 0,
    zone: '',
    ticketType: 0,
    currentPrice: 0,
    unpersonalizedType: 0
  }

  constructor(private ticketService: TicketsService, private transportService: TransportService,
    private authService: AuthService) {}

  purchaseForm = new FormGroup({
    selectedLineId: new FormControl('', [Validators.required]),
    selectedTicketId: new FormControl('', [Validators.required]),
    selectedDirectionId: new FormControl({ value: '', disabled: true }, [Validators.required]),
    selectedDay: new FormControl('', [Validators.required]),
    selectedDepartureId: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });

  ngOnInit(): void {
    this.getAllLines();

    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
    });

    this.validatePurchaseForm();
  }


  validatePurchaseForm(){
    const htmlForm = document.querySelector('#purchaseTicketForm') as HTMLFormElement;

    if (htmlForm) {

      htmlForm.addEventListener('submit', (event) => {
        this.formSubmitted = true; 
  
        if (!this.purchaseForm.valid) {
          event.preventDefault();
          event.stopPropagation();
          this.purchaseForm.markAllAsTouched();
        } else {
          this.purchaseTicket();
        }
  
        htmlForm.classList.add('was-validated'); 
      });
    }
  }

  getAllLines(){
    this.transportService.getAllLines().subscribe(
      (result: any) => {
        this.lines = result.results;
        console.log(this.lines);
        this.sortLines()
      }
    );
  }

  sortLines(): void {
    this.lines = this.lines.sort((a, b) => {
      if (a.lineType === 0 && b.lineType !== 0) {
        return -1; 
      }
      if (a.lineType !== 0 && b.lineType === 0) {
        return 1; 
      }

      const nameA = parseInt(a.name, 10);
      const nameB = parseInt(b.name, 10); 
  
      return nameA - nameB;
    });
  }

  onLineChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    this.selectedLineId = Number(target.value);
    console.log(this.selectedLineId)
    this.ticketService.getLineUnpersonalizedTickets(this.selectedLineId).subscribe(tickets => {
      this.tickets = tickets;
    });
    this.departures = [];
    this.purchaseForm.patchValue({ selectedTicketId: null, selectedDepartureId: null, selectedDay: null });
    this.selectedTicketId = 0;
  }

  onCardChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTicketId = Number(target.value);
    this.ticketService.getUnpersonalizedWithRelations(this.selectedTicketId).subscribe(card => {
      this.selectedTicket = card;
  
      if (this.selectedTicket.unpersonalizedType === 0 ) {
        this.purchaseForm.get('selectedDirectionId')?.enable();
        this.purchaseForm.get('selectedDay')?.disable();  
        this.purchaseForm.get('selectedDepartureId')?.disable(); 
        this.transportService.getLineWithRelations(this.selectedLineId).subscribe(line => {
          this.directions = line.directions;
        });
      } else {
        this.purchaseForm.get('selectedDepartureId')?.disable();
        this.purchaseForm.get('selectedDay')?.disable(); 
        this.purchaseForm.get('selectedDirectionId')?.disable(); 
      }
    });
  }
  
  onDayChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDay = String(target.value);

    const selectedDirection = this.directions.find(direction => direction.id === this.selectedDirectionId);
    if (selectedDirection) {
      this.filteredDepartures = selectedDirection.departures.filter(departure => departure.day === this.selectedDay);
    }
  }

  onDirectionChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDirectionId = Number(target.value);

    if (this.selectedTicket.unpersonalizedType === 0 && this.selectedDirectionId) {
      this.purchaseForm.get('selectedDay')?.enable(); 
      this.purchaseForm.get('selectedDepartureId')?.enable();
    } else {
      this.purchaseForm.get('selectedDay')?.disable(); 
      this.purchaseForm.get('selectedDepartureId')?.disable(); 
    }
    
    this.purchaseForm.get('selectedDay')?.setValue(null);
    this.filteredDepartures = [];
  }
  
  purchaseTicket(): void {
    const unpersonalizedType = this.selectedTicket.unpersonalizedType;
    this.selectedDepartureId = Number(this.purchaseForm.value.selectedDepartureId);
  
    if (this.purchaseForm.valid) {
      if (unpersonalizedType === 0 && this.selectedDepartureId) {
        this.ticketService.buyUnpersonalizedOneTimeTicket(this.user.id, this.selectedTicketId, this.selectedDepartureId).subscribe(response => {

        });
      } else {
        this.ticketService.buyUnpersonalizedTicket(this.user.id, this.selectedTicketId).subscribe(response => {

        });
      }
    }
  }
}
