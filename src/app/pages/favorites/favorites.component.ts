import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: any[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  removeFavorite(bookId: string) {
    this.favorites = this.favorites.filter(book => book.id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

}
