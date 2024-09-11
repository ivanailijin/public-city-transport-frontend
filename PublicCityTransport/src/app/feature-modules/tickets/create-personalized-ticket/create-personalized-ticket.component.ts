import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Personalized, PersonalizedType, Unpersonalized, UnpersonalizedType } from '../model/ticket.model';
import { TransportService } from '../../transport/transport.service';
import { Line, LineType } from '../../transport/model/line.model';

@Component({
  selector: 'app-create-personalized-ticket',
  templateUrl: './create-personalized-ticket.component.html',
  styleUrls: ['./create-personalized-ticket.component.css']
})
export class CreatePersonalizedTicketComponent implements OnInit{

  formSubmitted = false;
  lines: Line[] = [];
  selectedLineIds: number[] = [];
  
  constructor(private router: Router, private ticketService: TicketsService, private transportService: TransportService) {}

  personalizedForm = new FormGroup({
    zone: new FormControl('', [Validators.required]),
    currentPrice: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    personalizedType: new FormControl('', [Validators.required]),
    selectedLines: new FormControl(0, [Validators.required])
    });

  ngOnInit(): void {
    this.getAllLines();
    this.validateTicketForm();
  }

  validateTicketForm(){
    const htmlForm = document.querySelector('#createTicketForm') as HTMLFormElement;

    if (htmlForm) {
      const personalizedTypeRadios = htmlForm.querySelectorAll('input[name="personalizedType"]');
      const personalizedTypeGroup = htmlForm.querySelector('.d-flex');
  
      const validateUnpersonalizedType = () => {
        if (this.formSubmitted) {
          let isTypeValid = Array.from(personalizedTypeRadios).some(radio => (radio as HTMLInputElement).checked);
          personalizedTypeGroup?.classList.toggle('is-invalid', !isTypeValid);
          personalizedTypeGroup?.classList.toggle('is-valid', isTypeValid);
          return isTypeValid;
        }
        return true;
      };
  
      htmlForm.addEventListener('submit', (event) => {
        this.formSubmitted = true; 
        const isTypeValid = validateUnpersonalizedType();
  
        if (!isTypeValid || !this.personalizedForm.valid) {
          event.preventDefault();
          event.stopPropagation();
          this.personalizedForm.markAllAsTouched();
        } else {
          this.createTicket();
        }
  
        htmlForm.classList.add('was-validated'); 
      });
  
      personalizedTypeRadios.forEach(radio => {
        radio.addEventListener('change', validateUnpersonalizedType);
      });
    }
  }
  
  createTicket(): void {
    const personalizedRegistration: Personalized = {
      id: 0,
      zone: this.personalizedForm.value.zone || "",
      ticketType: 0,
      currentPrice: Number(this.personalizedForm.value.currentPrice) || 0,
      personalizedType: this.getPersonalizedTypeValue(this.personalizedForm.value.personalizedType || 'monthlyticket')
    };

    this.selectedLineIds = Array.isArray(this.personalizedForm.value.selectedLines)
      ? this.personalizedForm.value.selectedLines.map((lineId: string) => Number(lineId))
      : [];

    if (this.personalizedForm.valid) {
      this.ticketService.createPersonalized(personalizedRegistration).subscribe({
        next: (ticket: any) => {
          this.ticketService.addLinesToTicket(ticket.id, this.selectedLineIds).subscribe(() => {
            
          });
        }
      });
    }
  }

  private getPersonalizedTypeValue(type: string): PersonalizedType {
  
    switch (type) {
      case 'monthlyticket':
        return PersonalizedType.monthlyticket;
      case 'annualticket':
        return PersonalizedType.annualticket;
      default:
        return PersonalizedType.monthlyticket;
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
}
