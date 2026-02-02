import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataService } from '../data.service';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncatePipe],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  private data = inject(DataService);

  search = new FormControl('');

  filtered$ = combineLatest([
    this.data.posts$,
    this.search.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([posts, text]) => {
      if (!text || text.trim() === '') {
        return posts; // show all posts when search is empty
      }

      const query = text.toLowerCase();
      return posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
      );
    })
  );

  constructor() {
  }
}
