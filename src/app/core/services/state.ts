import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class State {     // when user add ingredients to shopping list, we need to update the shopping list drawer, so we use state management to share data between components

  private shoppingListSubject = new BehaviorSubject<any[]>([]);  // saves data and updates all
  shoppingList$ = this.shoppingListSubject.asObservable();    // $ means observable (byb3at data kol ma tetghayar over time 'live' msh zy el array 7eta wahda)

  addItems(items: any[]) {     //gets the current value of the shopping list and adds new items to it, then updates the observable with the new list

    const current = this.shoppingListSubject.value;

    this.shoppingListSubject.next([
      ...current,
      ...items
    ]);

  }

  clearList() {
    this.shoppingListSubject.next([]);
  }
}