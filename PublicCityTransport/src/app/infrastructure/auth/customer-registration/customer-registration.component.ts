import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerRegistration } from '../model/registration.model';
import { Gender, UserRole } from '../model/user.model';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent {

  formSubmitted = false;

  constructor(private router: Router, private authService: AuthService) {}

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    gender: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    address: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });

    
    passwordMatchValidator(group: AbstractControl) {
      const password = group.get('password')?.value;
      const passwordConfirmation = group.get('passwordConfirmation')?.value;
      
      if (password !== passwordConfirmation) {
        group.get('passwordConfirmation')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      
      return null;
  }
  get gender() {
    return this.registrationForm.get('gender');
  }

  ngOnInit(): void {
    (() => {
      'use strict';
  
      const forms = document.querySelectorAll('.needs-validation');
  
      Array.from(forms).forEach(form => {
        const htmlForm = form as HTMLFormElement;
        const genderRadios = htmlForm.querySelectorAll('input[name="gender"]');
        const genderGroup = htmlForm.querySelector('.d-flex');
  
        function validateGender() {
          let isGenderValid = Array.from(genderRadios).some(radio => (radio as HTMLInputElement).checked);
          genderGroup?.classList.toggle('is-invalid', !isGenderValid);
          genderGroup?.classList.toggle('is-valid', isGenderValid);
        }
  
        genderRadios.forEach(radio => {
          radio.addEventListener('change', validateGender);
        });

  
        htmlForm.addEventListener('submit', event => {
          validateGender();
  
          if (!htmlForm.checkValidity() || !Array.from(genderRadios).some(radio => (radio as HTMLInputElement).checked)) {
            event.preventDefault();
            event.stopPropagation();
          }
  
          htmlForm.classList.add('was-validated');
        }, false);
      });
    })();
  }

  

  register(): void {
    this.formSubmitted = true;

    const birthDateValue = this.registrationForm.value.birthDate;
    const birthDate = birthDateValue ? new Date(birthDateValue) : new Date();

    const registration: CustomerRegistration = {
      email: this.registrationForm.value.email || "",
      password: this.registrationForm.value.password || "",
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      role : UserRole.customer,
      gender: this.getGenderValue(this.registrationForm.value.gender || 'male'),
      phoneNumber: this.registrationForm.value.phoneNumber || "",
      address: this.registrationForm.value.address || "",
      birthDate: birthDate,
    };

    if (this.registrationForm.valid) {
      this.authService.registerCustomer(registration).subscribe({
        next: () => {
          this.router.navigate(['login']);
        }
      });
    }
  }

  private getGenderValue(gender: string): Gender {
  
    switch (gender) {
      case 'male':
        return Gender.male;
      case 'female':
        return Gender.female;
      default:
        return Gender.male;
    }
  }
}