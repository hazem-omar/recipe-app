import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../../../../shared/components/recipe-card/recipe-card';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe-grid',
  standalone: true,
  imports: [CommonModule, RecipeCard],
  templateUrl: './recipe-grid.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RecipeGrid {
  @Input() recipes: any[] = [];     // bysta2bel data mn bara (search component) msh bygebha benafso mn api
}