import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Favorites } from '../../services/favorites';
import { Recipe } from '../../../../features/recipes/services/recipe';
import { RecipeGrid } from '../../../recipes/components/recipe-grid/recipe-grid';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RecipeGrid, RouterModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesPage implements OnInit {
  favoriteRecipes: any[] = [];
  loading = false;

  constructor(
    private favorites: Favorites,
    private api: Recipe
  ) {}

  ngOnInit() {
    this.favorites.favorites$.subscribe(() => {
      this.loadFavoriteRecipes();
    });
  }

  loadFavoriteRecipes() {
    const favoriteIds = this.favorites.getFavorites();
    
    if (favoriteIds.length === 0) {
      this.favoriteRecipes = [];
      return;
    }

    this.loading = true;
    this.favoriteRecipes = []; // Clear existing recipes to prevent duplicates
    
    favoriteIds.forEach((id: number) => {
      this.api.getRecipeDetails(id).subscribe({
        next: (recipe) => {
          this.favoriteRecipes = [...this.favoriteRecipes, recipe];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    });
  }
}
