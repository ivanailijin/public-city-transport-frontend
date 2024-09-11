import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Unpersonalized, UnpersonalizedType } from '../model/ticket.model';
import { TransportService } from '../../transport/transport.service';
import { Line, LineType } from '../../transport/model/line.model';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit{

  formSubmitted = false;
  lines: Line[] = [];
  selectedLineIds: number[] = [];
  
  constructor(private router: Router, private ticketService: TicketsService, private transportService: TransportService) {}

  unpersonalizedForm = new FormGroup({
    zone: new FormControl('', [Validators.required]),
    currentPrice: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    unpersonalizedType: new FormControl('', [Validators.required]),
    selectedLines: new FormControl(0, [Validators.required])
    });

  ngOnInit(): void {
    this.getAllLines();
    this.validateTicketForm();
  }

  validateTicketForm(){
    const htmlForm = document.querySelector('#createTicketForm') as HTMLFormElement;

    if (htmlForm) {
      const unpersonalizedTypeRadios = htmlForm.querySelectorAll('input[name="unpersonalizedType"]');
      const unpersonalizedTypeGroup = htmlForm.querySelector('.d-flex');
  
      const validateUnpersonalizedType = () => {
        if (this.formSubmitted) {
          let isTypeValid = Array.from(unpersonalizedTypeRadios).some(radio => (radio as HTMLInputElement).checked);
          unpersonalizedTypeGroup?.classList.toggle('is-invalid', !isTypeValid);
          unpersonalizedTypeGroup?.classList.toggle('is-valid', isTypeValid);
          return isTypeValid;
        }
        return true;
      };
  
      htmlForm.addEventListener('submit', (event) => {
        this.formSubmitted = true; 
        const isTypeValid = validateUnpersonalizedType();
  
        if (!isTypeValid || !this.unpersonalizedForm.valid) {
          event.preventDefault();
          event.stopPropagation();
          this.unpersonalizedForm.markAllAsTouched();
        } else {
          this.createTicket();
        }
  
        htmlForm.classList.add('was-validated'); 
      });
  
      unpersonalizedTypeRadios.forEach(radio => {
        radio.addEventListener('change', validateUnpersonalizedType);
      });
    }
  }
  
  createTicket(): void {
    const unpersonalizedRegistration: Unpersonalized = {
      id: 0,
      zone: this.unpersonalizedForm.value.zone || "",
      ticketType: 0,
      currentPrice: Number(this.unpersonalizedForm.value.currentPrice) || 0,
      unpersonalizedType: this.getUnpersonalizedTypeValue(this.unpersonalizedForm.value.unpersonalizedType || 'onetimeticket')
    };

    this.selectedLineIds = Array.isArray(this.unpersonalizedForm.value.selectedLines)
      ? this.unpersonalizedForm.value.selectedLines.map((lineId: string) => Number(lineId))
      : [];

    if (this.unpersonalizedForm.valid) {
      this.ticketService.createUnpersonalized(unpersonalizedRegistration).subscribe({
        next: (ticket: any) => {
          this.ticketService.addLinesToTicket(ticket.id, this.selectedLineIds).subscribe(() => {
            
          });
        }
      });
    }
  }

  private getUnpersonalizedTypeValue(type: string): UnpersonalizedType {
  
    switch (type) {
      case 'onetimeticket':
        return UnpersonalizedType.onetimeticket;
      case 'dayticket':
        return UnpersonalizedType.dayticket;
      case 'weeklyticket':
        return UnpersonalizedType.weeklyticket;
      default:
        return UnpersonalizedType.onetimeticket;
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
