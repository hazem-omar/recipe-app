import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RecipeDetailsDialog } from '../../../features/recipes/components/recipe-details-dialog/recipe-details-dialog';
import { Favorites } from '../../../features/favorites/services/favorites';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.html',
})
export class RecipeCard implements OnInit, OnDestroy {
  @Input() recipe: any;    // byakhod data mn barra (recipe grid) msh bygebha benafso mn api

  isFavorite = false;
  private favoritesSubscription?: Subscription;

  constructor(
    private dialog: MatDialog,
    private favorites: Favorites
  ) {}

  ngOnInit() {
    if (this.recipe?.id) {
      this.isFavorite = this.favorites.isFavorite(this.recipe.id);
      
      this.favoritesSubscription = this.favorites.favorites$.subscribe(() => {    // law fe ay change fe favorites hay3ml auto update lel card deh
        if (this.recipe?.id) {
          this.isFavorite = this.favorites.isFavorite(this.recipe.id);
        }
      });
    }
  }

  ngOnDestroy() {
    this.favoritesSubscription?.unsubscribe();
  }

  toggleFavorite() {
    if (this.recipe?.id) {
      this.favorites.toggleFavorite(this.recipe.id);
    }
  }

  openDetails() {
    this.dialog.open(RecipeDetailsDialog, {
      data: { id: this.recipe.id }
    });
  }
}
