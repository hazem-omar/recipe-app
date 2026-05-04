import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingList } from '../../services/shopping-list';
import { trigger, transition, style, animate } from '@angular/animations';
import { UnitConverterPipe } from '../../../../shared/pipes/unit-converter-pipe';


@Component({
  selector: 'app-shopping-list-drawer',
  standalone: true,
  imports: [CommonModule, UnitConverterPipe],
  templateUrl: './shopping-list-drawer.html',
  animations: [
  trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('300ms ease-out', style({ transform: 'translateX(0)' }))
    ])
  ])
]
})
export class ShoppingListDrawer {

  constructor(public shoppingList: ShoppingList) {}   // for auto update lama list tetghayar
}
