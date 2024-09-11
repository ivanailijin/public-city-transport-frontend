import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Wallet } from '../model/wallet.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  constructor(private router: Router, private ticketService: TicketsService, 
    private authService: AuthService, private renderer: Renderer2) {}

  walletRegistrationForm = new FormGroup({
    bankAccount: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}-\d{13}-\d{2}$/)]),
    currency: new FormControl({ value: 'RSD', disabled: true })
    });
  
    user: User = {
      id: 0,
      email: "",
      password: "",
      name: "",
      surname: "",
      role: 0,
    };

    ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        this.user = user;
      });

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

    validateWalletForm(event: Event) {
      event.preventDefault(); 
    
      const htmlForm = document.querySelector('#createWalletForm');
      this.renderer.addClass(htmlForm, 'was-validated');
     
      if (this.walletRegistrationForm.valid) {
          this.createWallet(); 
      } else {
          this.walletRegistrationForm.markAllAsTouched(); 
      }
    }

    createWallet(): void {
      const walletRegistration: Wallet = {
        id: 0,
        balance: 0,
        bankAccount: this.walletRegistrationForm.value.bankAccount || "",
        currency: "RSD",
        customerId: this.user.id || 0
      };
  
      if (this.walletRegistrationForm.valid) {
        this.ticketService.createWallet(walletRegistration).subscribe({
          next: () => {
            this.router.navigate(['wallet-profile'])
          }
        });
      }
    }
}
