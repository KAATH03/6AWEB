import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  posts$!: Observable<Post[]>;

  constructor(private http: HttpClient) {
    this.posts$ = this.http
      .get<Post[]>(this.url)
      .pipe(shareReplay(1));
  }
}
