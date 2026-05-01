import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingList {

  private shoppingListKey = 'shopping_list';     // key for localStorage
  private shoppingListSubject = new BehaviorSubject<any[]>([]);
  shoppingList$ = this.shoppingListSubject.asObservable();

  constructor() {
    this.loadItems();
  }

  private loadItems() {    // awel ma aftah law fe items fe localStorage tet3ered
    const stored = localStorage.getItem(this.shoppingListKey);
    if (stored) {
      this.shoppingListSubject.next(JSON.parse(stored));
    }
  }

  private saveItems(items: any[]) {  // save to localStorage & update UI
    localStorage.setItem(this.shoppingListKey, JSON.stringify(items));
    this.shoppingListSubject.next(items);
  }

  addItems(items: any[]) {  
    const current = this.shoppingListSubject.value;
    this.saveItems([...current, ...items]);
  }

  clearList() {
    this.saveItems([]);
  }

  getItems(): any[] {
    return this.shoppingListSubject.value;
  }
}
