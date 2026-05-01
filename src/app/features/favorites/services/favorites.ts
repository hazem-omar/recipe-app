import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Favorites {

  private favoritesKey = 'recipe_favorites';
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const stored = localStorage.getItem(this.favoritesKey);
    if (stored) {
      this.favoritesSubject.next(JSON.parse(stored));
    }
  }

  private saveFavorites(favorites: number[]) {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  isFavorite(recipeId: number): boolean {
    return this.favoritesSubject.value.includes(recipeId);
  }

  toggleFavorite(recipeId: number) {
    const current = this.favoritesSubject.value;
    const index = current.indexOf(recipeId);

    if (index === -1) {
      this.saveFavorites([...current, recipeId]);
    } else {
      this.saveFavorites(current.filter(id => id !== recipeId));
    }
  }

  getFavorites(): number[] {
    return this.favoritesSubject.value;
  }
}
