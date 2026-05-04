import { Routes } from '@angular/router';
import { Search } from './features/recipes/components/search/search';
import { FavoritesPage } from './features/favorites/components/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Search , data: { animation: 'SearchPage' } },
  { path: 'favorites', component: FavoritesPage, data: { animation: 'FavoritesPage' } }
];
