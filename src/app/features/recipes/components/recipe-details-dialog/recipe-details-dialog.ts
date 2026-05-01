import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../services/recipe';
import { ShoppingList } from '../../../shopping/services/shopping-list';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe-details-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details-dialog.html',
  animations: [
  trigger('zoomIn', [
    transition(':enter', [
      style({ transform: 'scale(0.8)', opacity: 0 }),
      animate('250ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
    ])
  ])
]
})
export class RecipeDetailsDialog implements OnInit {

  recipe: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,       // bsta2bel id mn el recipe elly et3amal click 3leha
    private recipeService: Recipe,     // heya ely hatgeeb el data mn api
    private shoppingList: ShoppingList   // heya ely hatdeef el ingredients lel shopping
  ) {}

  ngOnInit(): void {              // awel function btshtaghal lma el dialog yefta7
    this.recipeService.getRecipeDetails(this.data.id).subscribe(res => {
      this.recipe = res;
    });
  }

  // ------------------------------------------------------------------------------ 

  // add ingredients to shopping list
  addToShoppingList() {
    this.recipeService.getIngredients(this.data.id).subscribe((res: any) => {
      // Transform ingredients to the correct format for the shopping list
      const transformedIngredients = res.ingredients.map((ing: any) => ({
        name: ing.name,
        amount: ing.amount?.us?.value || ing.amount?.metric?.value || 0,
        unit: ing.amount?.us?.unit || ing.amount?.metric?.unit || ''
      }));

      // Create the shopping list item with recipe title and transformed ingredients
      const shoppingListItem = {
        recipeTitle: this.recipe?.title || 'Unknown Recipe',
        ingredients: transformedIngredients
      };

      this.shoppingList.addItems([shoppingListItem]);     // byb3at le el state.ts el item
      alert('Added to shopping list!');
    });
  }
}
