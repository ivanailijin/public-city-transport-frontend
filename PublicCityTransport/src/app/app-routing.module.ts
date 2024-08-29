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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
