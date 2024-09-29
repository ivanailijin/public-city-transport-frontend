import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../transport.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Line, LineType } from '../model/line.model';

@Component({
  selector: 'app-create-line-form',
  templateUrl: './create-line-form.component.html',
  styleUrls: ['./create-line-form.component.css']
})
export class CreateLineFormComponent implements OnInit {

  constructor(private router: Router, private transportService: TransportService) {}

  lineRegistrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lineType: new FormControl('', [Validators.required]),
    length: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    });

    formSubmitted = false;

  ngOnInit(): void {
    this.validateLineCreationForm();
  }

  validateLineCreationForm(){
    const htmlForm = document.querySelector('#createLineForm') as HTMLFormElement;

    if (htmlForm) {
      const lineTypeRadios = htmlForm.querySelectorAll('input[name="lineType"]');
      const lineTypeGroup = htmlForm.querySelector('.d-flex');
  
      const validateLineType = () => {
        if (this.formSubmitted) {
          let isLineTypeValid = Array.from(lineTypeRadios).some(radio => (radio as HTMLInputElement).checked);
          lineTypeGroup?.classList.toggle('is-invalid', !isLineTypeValid);
          lineTypeGroup?.classList.toggle('is-valid', isLineTypeValid);
          return isLineTypeValid;
        }
        return true;
      };
  
      htmlForm.addEventListener('submit', (event) => {
        this.formSubmitted = true; 
        const isGenderValid = validateLineType();
  
        if (!isGenderValid || !this.lineRegistrationForm.valid) {
          event.preventDefault();
          event.stopPropagation();
          this.lineRegistrationForm.markAllAsTouched();
        } else {
          this.createLine();
        }
  
        htmlForm.classList.add('was-validated'); 
      });
  
      lineTypeRadios.forEach(radio => {
        radio.addEventListener('change', validateLineType);
      });
    }
  }

  createLine(): void {

    const lineRegistration: Line = {
      id: 0,
      name: this.lineRegistrationForm.value.name || "",
      lineType: this.getLineTypeValue(this.lineRegistrationForm.value.lineType || 'city'),
      length: Number(this.lineRegistrationForm.value.length) || 0,
      time: Number(this.lineRegistrationForm.value.time) || 0
    };

    if (this.lineRegistrationForm.valid) {
      this.transportService.createLine(lineRegistration).subscribe({
        next: () => {
          this.router.navigate([''])
        }
      });
    }
  }

  private getLineTypeValue(line: string): LineType {
  
    switch (line) {
      case 'city':
        return LineType.city;
      case 'suburban':
        return LineType.suburban;
      default:
        return LineType.city;
    }
  }
}
