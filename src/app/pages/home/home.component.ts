import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: any[] = [];

  constructor(private http: HttpClient, private firestore: Firestore) {}

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

  async addToFavorites(book: any) {
  const favCol = collection(this.firestore, 'favorites');

  // Optional: prevent duplicates
  const snapshot = await getDocs(favCol);
  const exists = snapshot.docs.some(doc => (doc.data() as any).id === book.id);

  if (!exists) {
    await addDoc(favCol, { id: book.id, volumeInfo: book.volumeInfo });
    alert('Book added to favorites!');
  } else {
    alert('Already in favorites!');
  }
}

}
