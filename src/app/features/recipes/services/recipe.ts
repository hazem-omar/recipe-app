import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Recipe {

  private baseUrl = 'https://api.spoonacular.com/recipes';
  private apiKey = environment.spoonacularApiKey;

  constructor(private http: HttpClient) {}

  // search recipes
  searchRecipes(query: string): Observable<any> {            // returns observable 'async data' fa lazem n3mel subscribe or async pipe
    return this.http.get(`${this.baseUrl}/complexSearch`, {
      params: {
        query: query,     // ely el user katabo
        number: 12,       // 3adad el recipes elly 3ayzeen ngebha
        apiKey: this.apiKey
      }
    });
  }

  // recipe details
  getRecipeDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/information`, {
      params: {
        apiKey: this.apiKey
      }
    });
  }

  // get all ingredients
  getIngredients(id: number): Observable<any> {
    return this.http.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json`, {
      params: {
        apiKey: this.apiKey
      }
    });
  }
}
