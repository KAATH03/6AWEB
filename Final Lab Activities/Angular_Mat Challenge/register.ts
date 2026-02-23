import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// ✅ 3 MORE MATERIAL COMPONENTS
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatBadgeModule,
    MatProgressSpinnerModule,

    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,

    // ✅ Added components
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  // for showing output text (your old style)
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;

  submitted = false;
  isLoading = false;

  // light/dark toggle
  isDarkMode = false;

  minSkillLevel = 1;
  maxSkillLevel = 10;

  // DOB: accept only year 2006 and below
  maxBirthDate = new Date(2006, 11, 31);

  // chips list options
  interestOptions = ['Web Dev', 'UI/UX', 'Cybersecurity', 'Data', 'Mobile', 'Cloud'];

  // ✅ password: starts with letter, alphanumeric only, at least 8 chars
  passwordRule = Validators.pattern(/^[A-Za-z][A-Za-z0-9]{7,}$/);

  // ✅ DOB validator
  dob2006BelowValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return { invalidDate: true };

    const cutoff = new Date(2006, 11, 31);
    return date <= cutoff ? null : { dobTooYoung: true };
  }

  formdata: FormGroup = new FormGroup({
    // Event registration concept
    eventName: new FormControl({ value: 'IT Career Summit 2026', disabled: true }),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      this.passwordRule,
    ]),

    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required, this.dob2006BelowValidator]),

    address: new FormControl(''),

    // slider
    angularSkillLevel: new FormControl(5),

    // slide toggle for notifications
    notifications: new FormControl(false),

    // ✅ new Material Select (ticket type)
    ticketType: new FormControl('', [Validators.required]),

    // ✅ new Material Chips (interests)
    interests: new FormControl<string[]>([], [Validators.required]),
  });

  onThemeToggle() {
    this.isDarkMode = !this.isDarkMode;
  }

  // chip selection handler (MatChips listbox)
  onInterestsChange(values: string[]) {
    this.formdata.get('interests')?.setValue(values);
    this.formdata.get('interests')?.markAsTouched();
  }

  onClickSubmit(data: any) {
    this.submitted = true;

    if (this.formdata.invalid) {
      this.formdata.markAllAsTouched();
      return;
    }

    // simulate loading
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      // copy values for your output section
      this.userName = data.userName;
      this.email = data.email;
      this.password = data.password;
      this.gender = data.gender;
      this.address = data.address;
      this.angularSkillLevel = data.angularSkillLevel;
      this.birthDate = data.birthDate;

      console.log('Form Submitted!', this.formdata.getRawValue());
    }, 1200);
  }
}
