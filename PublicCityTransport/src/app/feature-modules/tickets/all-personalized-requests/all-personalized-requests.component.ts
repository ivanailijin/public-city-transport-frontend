import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { TicketsService } from '../tickets.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PersonalizedTicketRequestOut, UserCategory } from '../model/request.model';
import { PersonalizedType } from '../model/ticket.model';

@Component({
  selector: 'app-all-personalized-requests',
  templateUrl: './all-personalized-requests.component.html',
  styleUrls: ['./all-personalized-requests.component.css']
})
export class AllPersonalizedRequestsComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, 
    private stakeholdersService: StakeholdersService, private ticketService: TicketsService) {}

  selectedNavItem: 'onhold' | 'accepted' | 'rejected' = 'onhold';

  user: User = {
    id: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    role: 0,
  };

  requests: PersonalizedTicketRequestOut[] = [];
  requestsOnHold: PersonalizedTicketRequestOut[] = [];
  requestsAccepted: PersonalizedTicketRequestOut[] = [];
  requestsRejected: PersonalizedTicketRequestOut[] = [];
  selectedRequestId: number = 0;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
    });

    this.getRequests();
  }

  showOnHold() {
    this.selectedNavItem = 'onhold';
  }

  showAccepted() {
    this.selectedNavItem = 'accepted';
  }

  showRejected() {
    this.selectedNavItem = 'rejected';
  }

  getRequests() {
    this.ticketService.getAllRequestsWithRelations().subscribe(
      (result: PersonalizedTicketRequestOut[]) => {
        this.requests = result;
        this.requestsOnHold = this.requests.filter(request => request.status === 0);
        this.requestsAccepted = this.requests.filter(request => request.status === 1);
        this.requestsRejected = this.requests.filter(request => request.status === 2);
      }
    )
  }

  toUserCategoryString(category: UserCategory): string {
    switch (category) {
      case UserCategory.citizen:
        return 'Citizen';
      case UserCategory.pupil:
        return 'Pupil';
      case UserCategory.student:
        return 'Student';
      case UserCategory.employee:
        return 'Employee';
      case UserCategory.retiree:
        return 'Retiree';
      default:
        return 'Citizen';
    }
  }

  toPersonalizedTypeString(type: PersonalizedType): string {
    switch (type) {
      case PersonalizedType.monthlyticket:
        return 'Monthly Ticket';
      case PersonalizedType.annualticket:
        return 'Annual Ticket';
      default:
        return 'Monthly Ticket';
    }
  }

  setSelectedRequest(request: PersonalizedTicketRequestOut) {
    this.selectedRequestId = request.id; 
  }

  approveRequest(){
    this.ticketService.approvePersonalizedTicketRequest(this.selectedRequestId, this.user.id).subscribe(
      (result: any) => {
        this.getRequests();
      }
    )
  }

  rejectRequest(){
    this.ticketService.rejectPersonalizedTicketRequest(this.selectedRequestId, this.user.id).subscribe(
      (result: any) => {
        this.getRequests();
      }
    )
  }
}
