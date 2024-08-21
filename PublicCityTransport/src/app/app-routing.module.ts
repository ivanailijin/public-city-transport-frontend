import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { EmployeeRegistrationComponent } from './infrastructure/auth/employee-registration/employee-registration.component';
import { CustomerRegistrationComponent } from './infrastructure/auth/customer-registration/customer-registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-employee', component: EmployeeRegistrationComponent },
  { path: 'register-customer', component: CustomerRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
