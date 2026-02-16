import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-demo',
  imports: [FormsModule],
  templateUrl: './template-demo.html',
  styleUrls: ['./template-demo.css'],
})
export class TemplateDemo {
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      gender: this.gender,
      status: this.status,
      comments: this.comments
    });
  }
}
