import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Customer, Employee, User, UserRole } from 'src/app/infrastructure/auth/model/user.model';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { TicketsService } from '../../tickets/tickets.service';
import { WalletOut } from '../../tickets/model/wallet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  wallet: WalletOut = {
    id: 0,
    balance: 0,
    bankAccount: "",
    currency: "",
    customerId: 0,
    balanceRecharges: []
  }

  constructor(private authService: AuthService, private stakeholdersService: StakeholdersService, private ticketService: TicketsService, private router: Router) { }

  ngOnInit(): void {
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
      }else if(this.user && this.user.role === 0 && this.user.id){
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

  onWalletTabClick() {
    if (this.user && this.user.role === 0 && this.user.id) {
      this.stakeholdersService.getCustomer(this.user.id).subscribe({
        next: (result: Customer) => {
          this.customer = result;
          this.getWalletByCustomerId();
        },
        error: (err) => {
          console.error('Error fetching customer:', err); 
        }
      });
    }
  }

  getWalletByCustomerId() {
    this.ticketService.getWalletByCustomerId(this.customer.id).subscribe((result: any) => {
      this.wallet = result;
      console.log(this.wallet);
      this.redirectBasedOnWallet();
    })
  }

  redirectBasedOnWallet() {
    if (this.wallet && this.wallet.id) {
      this.router.navigate(['/wallet-profile']);
    } else {
      this.router.navigate(['/create-wallet']);
    }
  }
  
  onLogout(): void {
    this.authService.logout();
  }
}
