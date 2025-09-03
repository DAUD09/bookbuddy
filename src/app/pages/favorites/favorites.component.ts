import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs, addDoc, deleteDoc, doc } from '@angular/fire/firestore' ;

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    const favCol = collection(this.firestore, 'favorites');
    const snapshot = await getDocs(favCol);
    this.favorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async removeFavorite(bookId: string) {
    await deleteDoc(doc(this.firestore, 'favorites', bookId));
    await this.loadFavorites();

  }

}
