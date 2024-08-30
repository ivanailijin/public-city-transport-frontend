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

  ngOnInit(): void {
    (() => {
      'use strict';
  
      const forms = document.querySelectorAll('.needs-validation');
  
      Array.from(forms).forEach(form => {
        const htmlForm = form as HTMLFormElement;
        const lineTypeRadios = htmlForm.querySelectorAll('input[name="lineType"]');
        const lineTypeGroup = htmlForm.querySelector('.d-flex');

        function validateLineType() {
          let isGenderValid = Array.from(lineTypeRadios).some(radio => (radio as HTMLInputElement).checked);
          lineTypeGroup?.classList.toggle('is-invalid', !isGenderValid);
          lineTypeGroup?.classList.toggle('is-valid', isGenderValid);
        }

        lineTypeRadios.forEach(radio => {
          radio.addEventListener('change', validateLineType);
        });
  
        htmlForm.addEventListener('submit', event => {
          validateLineType();

          if (!htmlForm.checkValidity() || !Array.from(lineTypeRadios).some(radio => (radio as HTMLInputElement).checked)) {
            event.preventDefault();
            event.stopPropagation();
          }
  
          htmlForm.classList.add('was-validated');
        }, false);
      });
    })();
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
          this.router.navigate(['all-lines'])
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
