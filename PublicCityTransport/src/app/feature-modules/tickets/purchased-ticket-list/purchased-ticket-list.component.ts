import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Customer, User } from 'src/app/infrastructure/auth/model/user.model';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { TicketsService } from '../tickets.service';
import { CustomerPersonalizedTicketOut, CustomerUnpersonalizedTicketOut, PersonalizedType, Unpersonalized, UnpersonalizedType } from '../model/ticket.model';

@Component({
  selector: 'app-purchased-ticket-list',
  templateUrl: './purchased-ticket-list.component.html',
  styleUrls: ['./purchased-ticket-list.component.css']
})
export class PurchasedTicketListComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, 
    private stakeholdersService: StakeholdersService, private ticketService: TicketsService) {}

  selectedNavItem: 'unpersonalized' | 'personalized' = 'unpersonalized';

  unpersonalizedTickets: CustomerUnpersonalizedTicketOut[] = [];
  personalizedTickets: CustomerPersonalizedTicketOut[] = [];

  user: User = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
  };

  customer: Customer = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
    gender: 0,
    phoneNumber: "",
    address: "",
    birthDate: new Date()
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
      this.getUnpersonalizedTickets();
      this.getPersonalizedTickets();
      if(this.user && this.user.role === 0 && this.user.id){
        this.stakeholdersService.getCustomer(this.user.id).subscribe({
          next: (result: Customer) => {
            this.customer = result;
            console.log('Customer:', result);
          },
          error: (err) => {
            console.error('Error fetching customer:', err); 
          }
        });
      }
    });
  }

  showUnpersonalized() {
    this.selectedNavItem = 'unpersonalized';
  }

  showPersonalized() {
    this.selectedNavItem = 'personalized';
  }

  getUnpersonalizedTickets(){
    this.ticketService.getCustomerUnpersonalizedTickets(this.user.id).subscribe(
      (result: CustomerUnpersonalizedTicketOut[]) => {
        this.unpersonalizedTickets = result.sort((a, b) => {
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        });
      }
    )
  }

  getPersonalizedTickets(){
    this.ticketService.getCustomerPersonalizedTickets(this.user.id).subscribe(
      (result: CustomerPersonalizedTicketOut[]) => {
        this.personalizedTickets = result.sort((a, b) => {
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        });
      }
    )
  }

  navigateToUnpersonalizedPurchase(): void {
    this.router.navigate(['/purchase-unpersonalized-ticket']);
  }

  navigateToPersonalizedPurchase(): void {
    this.router.navigate(['/create-personalized-ticket-request']);
  }

  public unpersonalizedTypeToString(type: UnpersonalizedType): string {
    switch (type) {
      case UnpersonalizedType.onetimeticket:
        return 'One Time Ticket';
      case UnpersonalizedType.dayticket:
        return 'Day Ticket';
      case UnpersonalizedType.weeklyticket:
          return 'Weekly Ticket';
      default:
        return 'One Time Ticket';
    }
  }

  public personalizedTypeToString(type: PersonalizedType): string {
    switch (type) {
      case PersonalizedType.monthlyticket:
        return 'Monthly Ticket';
      case PersonalizedType.annualticket:
        return 'Annual Ticket';
      default:
        return 'Monthly Ticket';
    }
  }
}
