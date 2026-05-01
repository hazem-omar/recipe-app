import { Routes } from '@angular/router';
import { Search } from './features/recipes/components/search/search';
import { FavoritesPage } from './features/favorites/components/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Search },
  { path: 'favorites', component: FavoritesPage }
];
