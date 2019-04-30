import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseAPIRoot: string = environment.baseUrl;
  baseAPIRoute: string = 'api/recipe';
  baseAPIUrl: string = this.baseAPIRoot + this.baseAPIRoute;
  requestOptions: any;
  constructor(private http: HttpClient) { 

}

  getRecipe(id:string){
    return this.http.get(`${this.baseAPIUrl}?$filter=Id eq ${id}`);
  }

  getMyRecipe(id, search?:string){
      let filter = search ? ` and contains(Name, '${search}') or contains(Ingredients, '${search}') or contains(Instructions, '${search}')` : '';
      return this.http.get(`${this.baseAPIUrl}?$filter=UserId eq '${id}' ${filter}`);
  }

  saveRecipe(recipe){
      return this.http.post(`${this.baseAPIUrl}`, recipe);
  }

  deleteRecipe(id) {
      return this.http.delete(`${this.baseAPIUrl}/${id}`);
  }
}
