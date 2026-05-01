import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ShoppingListDrawer } from './features/shopping/components/shopping-list-drawer/shopping-list-drawer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ShoppingListDrawer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
