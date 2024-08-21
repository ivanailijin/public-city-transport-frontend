import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';



@NgModule({
  declarations: [
    LoginComponent,
    EmployeeRegistrationComponent,
    CustomerRegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
