import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface ShoppingItem {
  recipeTitle: string;
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingList {

  private shoppingListKey = 'shopping_list';

  private shoppingListSubject = new BehaviorSubject<ShoppingItem[]>([]);
  shoppingList$ = this.shoppingListSubject.asObservable();

  constructor() {
    this.loadItems();
  }

  // -----------------------------
  // LOAD FROM LOCAL STORAGE
  // -----------------------------
  private loadItems() {
    try {
      const stored = localStorage.getItem(this.shoppingListKey);

      if (stored) {
        const parsed = JSON.parse(stored);
        this.shoppingListSubject.next(parsed);
      }

    } catch (err) {
      console.error('Invalid localStorage data', err);
      this.shoppingListSubject.next([]);
    }
  }

  // -----------------------------
  // SAVE TO LOCAL STORAGE
  // -----------------------------
  private saveItems(items: ShoppingItem[]) {
    localStorage.setItem(this.shoppingListKey, JSON.stringify(items));
    this.shoppingListSubject.next(items);
  }

  // -----------------------------
  // ADD ITEMS (MERGE LOGIC)
  // -----------------------------
  addItems(items: ShoppingItem[]) {

    const current = this.shoppingListSubject.value;
    const updated = [...current];

    items.forEach(newItem => {

      const existing = updated.find(
        i => i.recipeTitle === newItem.recipeTitle
      );

      if (existing) {
        existing.ingredients.push(...newItem.ingredients);
      } else {
        updated.push(newItem);
      }

    });

    this.saveItems(updated);
  }

  // -----------------------------
  // REMOVE BY RECIPE TITLE
  // -----------------------------
  removeRecipe(recipeTitle: string) {
    const updated = this.shoppingListSubject.value
      .filter(item => item.recipeTitle !== recipeTitle);

    this.saveItems(updated);
  }

  // -----------------------------
  // CLEAR ALL
  // -----------------------------
  clearList() {
    this.saveItems([]);
  }

  // -----------------------------
  // GET CURRENT VALUE
  // -----------------------------
  getItems(): ShoppingItem[] {
    return this.shoppingListSubject.value;
  }
}