import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../../../../shared/components/recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-grid',
  standalone: true,
  imports: [CommonModule, RecipeCard],
  templateUrl: './recipe-grid.html'
})
export class RecipeGrid {
  @Input() recipes: any[] = [];     // bysta2bel data mn bara (search component) msh bygebha benafso mn api
}