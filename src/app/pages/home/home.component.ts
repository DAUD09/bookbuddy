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

  addToFavorites(book: any) {
    // Get existing from localStorage or empty array
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Check if book is already in favorites
    const exists = favorites.some((fav: any)  => fav.id === book.id);
    if (!exists) {
      favorites.push(book);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Book added to favorites!');
    } else {
      alert('This book is already in favorites');
    }
  }

}
