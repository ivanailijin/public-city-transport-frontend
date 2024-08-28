import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StakeholdersService } from '../stakeholders.service';
import { Customer, User } from 'src/app/infrastructure/auth/model/user.model';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  profileForm: FormGroup;
  editMode = false;
  changePassword = false;
  formSubmitted = false;

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
    birthDate: new Date(),
  }

  constructor(
    private router: Router,
    private stakeholdersService: StakeholdersService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: [''],
      passwordConfirmation: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+ \\d+, [a-zA-Z\\s]+$')]],
    });

    // Initial validation setup
    this.setPasswordValidators();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.stakeholdersService.getCustomer(this.user.id).subscribe({
        next: (result: Customer) => {
          this.customer = result;
          this.profileForm.patchValue(this.customer);
          this.switchMode(false);
        },
        error: (err) => {
          console.error('Error fetching customer:', err); 
        }
      });
    });

    // Bootstrap validation initialization
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

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      if (!this.changePassword) {
        return null;
      }

      const newPassword = group.get('newPassword')?.value;
      const passwordConfirmation = group.get('passwordConfirmation')?.value;

      if (newPassword && passwordConfirmation && newPassword !== passwordConfirmation) {
        group.get('passwordConfirmation')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  setPasswordValidators(): void {
    if (this.changePassword) {
      this.profileForm.setValidators(this.passwordMatchValidator());
      this.profileForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.profileForm.get('passwordConfirmation')?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.profileForm.setValidators(null);
      this.profileForm.get('newPassword')?.clearValidators();
      this.profileForm.get('passwordConfirmation')?.clearValidators();
    }
    
    this.profileForm.updateValueAndValidity();
  }

  switchChangePasswordMode(newMode: boolean): void {
    this.changePassword = newMode;
    this.setPasswordValidators();
  }

  switchMode(newMode: boolean): void {
    this.editMode = newMode;
    if (!newMode) {
      this.profileForm.reset(this.customer);
      this.changePassword = false;
      this.profileForm.get('newPassword')?.setValue('');
      this.profileForm.get('passwordConfirmation')?.setValue('');
      const formElement = document.querySelector('.needs-validation');
      if (formElement) {
        formElement.classList.remove('was-validated');
      }
      Object.keys(this.profileForm.controls).forEach(controlName => {
        this.profileForm.get(controlName)?.disable();
      });
    } else {
      Object.keys(this.profileForm.controls).forEach(controlName => {
        this.profileForm.get(controlName)?.enable();
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.formSubmitted = true;
      console.log('okines li');
      this.customer = { 
        ...this.customer,
        ...this.profileForm.value
      };
      if (this.changePassword && this.profileForm.get('newPassword')?.value) {
        this.customer.password = this.profileForm.get('newPassword')?.value;
      }
      this.stakeholdersService.updateCustomer(this.customer).subscribe({
        next: () => {
          this.profileForm.reset(this.customer);
          this.profileForm.get('newPassword')?.setValue('');
          this.profileForm.get('passwordConfirmation')?.setValue('');
          setTimeout(() => {
            this.switchMode(false);
          }, 0);
          console.log('Profile updated:', this.profileForm.value);
        }
      });
    }
  }
}
