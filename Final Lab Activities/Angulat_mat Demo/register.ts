import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatBadgeModule,
    MatProgressSpinnerModule,

    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;

  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;

  // ✅ Spinner flag
  isLoading = false;

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5),

    // ✅ Slide toggle control
    notifications: new FormControl(false),
  });

  onClickSubmit(data: {
    userName: string;
    email: string;
    password: string;
    gender: string;
    birthDate: Date;
    address: string;
    angularSkillLevel: number;
    notifications: boolean;
  }) {
    this.submitted = true;

    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;

    if (this.formdata.valid) {
      this.isLoading = true;

      // ✅ simulate loading
      setTimeout(() => {
        this.isLoading = false;
        console.log('Form Submitted!', this.formdata.value);
      }, 2000);
    } else {
      console.log('Form is not valid!');
      this.formdata.markAllAsTouched();
    }
  }
}
