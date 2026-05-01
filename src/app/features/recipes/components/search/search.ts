import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of } from 'rxjs';
import { Recipe } from '../../services/recipe';
import { CommonModule } from '@angular/common';
import { RecipeGrid } from '../recipe-grid/recipe-grid';

@Component({
  selector: 'app-search', 
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecipeGrid],
  templateUrl: './search.html',
})
export class Search implements OnInit {

  searchControl = new FormControl('');
  recipes: any[] = [];
  loading = false;
  error = false;
  initialLoadDone = false;

  constructor(private recipeService: Recipe) {}

  ngOnInit() {
    this.loadInitialRecipes();

    this.searchControl.valueChanges.pipe(    // RxJS Flow 
      debounceTime(400),         // wait for 4 secs before sending request
      switchMap(value => {       // law user katab bsor3a msh hayb3at request le kol 7arf hayb3at ba3d ma ywa2af 4 secs
        this.loading = true;
        this.error = false;
        return this.recipeService.searchRecipes(value || '').pipe(
          catchError(err => {
            this.error = true;
            this.loading = false;
            return of({ results: [] });
          })
        );
      })
    ).subscribe((res: any) => {
      this.loading = false;
      this.recipes = res.results || [];       // el data et7afazet wa btrouh le html 3shan tet3ered as a grid
      this.initialLoadDone = true;
    });
  }

  loadInitialRecipes() {                 // btgeeb recipes eftradeya awel ma el user yefta7 el page 3ashan y3rdha le user
    this.loading = true;
    this.recipeService.searchRecipes('').pipe(
      catchError(err => {
        this.error = true;
        this.loading = false;
        return of({ results: [] });
      })
    ).subscribe((res: any) => {
      this.loading = false;
      this.recipes = res.results || [];
      this.initialLoadDone = true;
    });
  }
}
