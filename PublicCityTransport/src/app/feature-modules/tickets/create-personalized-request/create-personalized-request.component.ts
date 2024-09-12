import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PersonalizedOut, PersonalizedType } from '../model/ticket.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalizedTicketRequest, UserCategory } from '../model/request.model';

@Component({
  selector: 'app-create-personalized-request',
  templateUrl: './create-personalized-request.component.html',
  styleUrls: ['./create-personalized-request.component.css']
})
export class CreatePersonalizedRequestComponent implements OnInit {

  user: User = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
  };

  selectedTicket: PersonalizedOut = {
    id: 0,
    zone: '',
    ticketType: 0,
    currentPrice: 0,
    personalizedType: 0,
    lines: []
  }

  formSubmitted: boolean = false;
  personalizedTickets: PersonalizedOut[] = [];

  constructor(private ticketService: TicketsService, private authService: AuthService) {}

    requestForm = new FormGroup({
      userCategory: new FormControl('', [Validators.required]),
      selectedTicketZone: new FormControl('', [Validators.required]),
      selectedPersonalizedType: new FormControl('', [Validators.required])
      });
  
  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
    });

    this.getAllTickets();
    this.validateRequestForm();
  }

  validateRequestForm(){
    const htmlForm = document.querySelector('#personalizedRequestForm') as HTMLFormElement;

    if (htmlForm) {

      htmlForm.addEventListener('submit', (event) => {
        this.formSubmitted = true; 
  
        if (!this.requestForm.valid) {
          event.preventDefault();
          event.stopPropagation();
          this.requestForm.markAllAsTouched();
        } else {
          this.createPersonalizedRequest();
        }
  
        htmlForm.classList.add('was-validated'); 
      });
    }
  }

  getAllTickets(){
    this.ticketService.getAllPersonalizedWithRelations().subscribe(
      (result: any) => {
        this.personalizedTickets = result;
        console.log(this.personalizedTickets);
      }
    );
  }

  createPersonalizedRequest(): void {
    const zone = this.requestForm.value.selectedTicketZone;
    const personalizedType = this.getPersonalizedTypeValue(this.requestForm.value.selectedPersonalizedType!);
    console.log(zone, personalizedType)

    this.selectedTicket = this.personalizedTickets.find(ticket => ticket.zone === zone && ticket.personalizedType === personalizedType)!;

    const requestRegistration: PersonalizedTicketRequest = {
      id: 0,
      status: 0,
      userCategory: this.getUserCategoryValue(this.requestForm.value.userCategory!),
      customerId: this.user.id,
      personalizedId: this.selectedTicket.id
    }

    if (this.requestForm.valid) {
      if (this.selectedTicket && this.selectedTicket.id) {
        this.ticketService.createPersonalizedTicketRequest(requestRegistration).subscribe(response => {

        });
      } 
    }
  }

  private getUserCategoryValue(category: string): UserCategory {
  
    switch (category) {
      case 'citizen':
        return UserCategory.citizen;
      case 'pupil':
        return UserCategory.pupil;
      case 'student':
        return UserCategory.student;
      case 'employee':
        return UserCategory.employee;
      case 'retiree':
        return UserCategory.retiree
      default:
        return UserCategory.citizen;
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
}
