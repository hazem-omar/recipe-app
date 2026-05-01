import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingList } from '../../services/shopping-list';

@Component({
  selector: 'app-shopping-list-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list-drawer.html'
})
export class ShoppingListDrawer {

  constructor(public shoppingList: ShoppingList) {}   // for auto update lama list tetghayar
}
