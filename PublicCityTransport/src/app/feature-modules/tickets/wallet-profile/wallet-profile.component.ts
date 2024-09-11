import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { TicketsService } from '../tickets.service';
import { Customer, User } from 'src/app/infrastructure/auth/model/user.model';
import { WalletOut } from '../model/wallet.model';

@Component({
  selector: 'app-wallet-profile',
  templateUrl: './wallet-profile.component.html',
  styleUrls: ['./wallet-profile.component.css']
})
export class WalletProfileComponent implements OnInit{

 @ViewChild('closebutton') closebutton!: ElementRef | undefined;

  constructor(private authService: AuthService, private stakeholdersService: StakeholdersService, private renderer: Renderer2,
    private ticketService: TicketsService) {}

  selectedNavItem: 'info' | 'balanceRecharges' = 'info';
  walletId: number = 0;

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

  wallet: WalletOut = {
    id: 0,
    balance: 0,
    bankAccount: "",
    currency: "",
    customerId: 0,
    balanceRecharges: []
  }

  ngOnInit(): void {
    this.getCustomer();

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

  showInfo() {
    this.selectedNavItem = 'info';
  }

  showBalanceRecharges() {
    this.selectedNavItem = 'balanceRecharges';
  }

  getCustomer(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User:', this.user);
      if (this.user && this.user.role === 0 && this.user.id) {
        this.stakeholdersService.getCustomer(this.user.id).subscribe({
          next: (result: Customer) => {
            this.customer = result;
            console.log('Customer:', result);
              this.getWalletByCustomerId();
          },
          error: (err) => {
            console.error('Error fetching customer:', err); 
          }
        });
      }
    });
  }

  getWalletByCustomerId() {
    this.ticketService.getWalletByCustomerId(this.user.id).subscribe((result: any) => {
      this.wallet = result;
      console.log(this.wallet)
    })
  }
}
