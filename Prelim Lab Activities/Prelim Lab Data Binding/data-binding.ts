import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
  // text interpolation
  message = "Data Binding Demo";
  title = "My First App";
  description:string = "This is my new Angular Application!";

  // propert binding
  imageURL = "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL3JtNjA2ZGVzaWduLXJlbWl4LWJnLTEzLWEuanBn.jpg";
  w = 200;
  h = 150;
  altText = "Angular Logo";
  textColor = "pink"

  isHighlighted = true;
  yourName = "";

  count = 0;
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }

}
