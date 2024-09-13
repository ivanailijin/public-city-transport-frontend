import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { EmployeeRegistrationComponent } from './infrastructure/auth/employee-registration/employee-registration.component';
import { CustomerRegistrationComponent } from './infrastructure/auth/customer-registration/customer-registration.component';
import { HomeComponent } from './feature-modules/layout/home/home.component';
import { CustomerProfileComponent } from './feature-modules/stakeholders/customer-profile/customer-profile.component';
import { EmployeeProfileComponent } from './feature-modules/stakeholders/employee-profile/employee-profile.component';
import { AuthGuard } from './infrastructure/auth/auth.guard';
import { CreateBusFormComponent } from './feature-modules/transport/create-bus-form/create-bus-form.component';
import { CreateLineFormComponent } from './feature-modules/transport/create-line-form/create-line-form.component';
import { CreateStationFormComponent } from './feature-modules/transport/create-station-form/create-station-form.component';
import { AllBusesComponent } from './feature-modules/transport/all-buses/all-buses.component';
import { AllLinesComponent } from './feature-modules/transport/all-lines/all-lines.component';
import { AllStationsComponent } from './feature-modules/transport/all-stations/all-stations.component';
import { BusProfileComponent } from './feature-modules/transport/bus-profile/bus-profile.component';
import { LineProfileComponent } from './feature-modules/transport/line-profile/line-profile.component';
import { WalletProfileComponent } from './feature-modules/tickets/wallet-profile/wallet-profile.component';
import { CreateWalletComponent } from './feature-modules/tickets/create-wallet/create-wallet.component';
import { CreateTicketComponent } from './feature-modules/tickets/create-ticket/create-ticket.component';
import { CreatePersonalizedTicketComponent } from './feature-modules/tickets/create-personalized-ticket/create-personalized-ticket.component';
import { PurchaseUnpersonalizedFormComponent } from './feature-modules/tickets/purchase-unpersonalized-form/purchase-unpersonalized-form.component';
import { CreatePersonalizedRequestComponent } from './feature-modules/tickets/create-personalized-request/create-personalized-request.component';
import { AllPersonalizedRequestsComponent } from './feature-modules/tickets/all-personalized-requests/all-personalized-requests.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: EmployeeRegistrationComponent },
  { path: 'register-customer', component: CustomerRegistrationComponent },
  { path: 'customer-profile', component: CustomerProfileComponent, canActivate: [AuthGuard]},
  { path: 'employee-profile', component: EmployeeProfileComponent, canActivate: [AuthGuard]},
  { path: 'create-bus', component: CreateBusFormComponent },
  { path: 'create-line', component: CreateLineFormComponent },
  { path: 'create-station', component: CreateStationFormComponent },
  { path: 'all-buses', component: AllBusesComponent},
  { path: 'all-lines', component: AllLinesComponent},
  { path: 'all-stations', component: AllStationsComponent},
  { path: 'bus-profile/:id', component: BusProfileComponent },
  { path: 'line-profile/:id', component: LineProfileComponent },
  { path: 'wallet-profile', component: WalletProfileComponent},
  { path: 'create-wallet', component: CreateWalletComponent},
  { path: 'create-nonpersonalized-ticket', component: CreateTicketComponent},
  { path: 'create-personalized-ticket', component: CreatePersonalizedTicketComponent},
  { path: 'purchase-unpersonalized-ticket', component: PurchaseUnpersonalizedFormComponent},
  { path: 'create-personalized-ticket-request', component: CreatePersonalizedRequestComponent},
  { path: 'all-personalized-ticket-requests', component: AllPersonalizedRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
