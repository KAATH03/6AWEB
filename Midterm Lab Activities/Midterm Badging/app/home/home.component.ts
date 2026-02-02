import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  title: string;
  body: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.posts$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
