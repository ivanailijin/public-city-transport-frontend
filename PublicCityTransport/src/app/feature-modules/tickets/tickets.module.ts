import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { WalletProfileComponent } from './wallet-profile/wallet-profile.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';



@NgModule({
  declarations: [
    WalletProfileComponent,
    CreateWalletComponent,
    CreateTicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TicketsModule { }
