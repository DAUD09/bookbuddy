import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchBooks('harry potter');
  }

  searchBooks(query: string) {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}';
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        this.books = data.items || [];
      },
      error: (err) => {
        console.error('Error fetching books', err);
      }
    });
  }

}
