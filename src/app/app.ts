import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ShoppingListDrawer } from './features/shopping/components/shopping-list-drawer/shopping-list-drawer';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ShoppingListDrawer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [ 
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class App {
  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
