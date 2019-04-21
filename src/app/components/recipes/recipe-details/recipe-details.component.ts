import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  loading: boolean = false;
  mode: string = 'view';
  recipeModel: RecipeModel;
  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeModel = new RecipeModel();
    this.route.params.subscribe((param) => {
      if(param["id"]) {
        this.loadRecipe(param["id"]);
      }
    });
  }

  loadRecipe(id: string){
    this.loading = true;
    this.recipeService.getRecipe(id).subscribe((res : any) => {
      if(res) {
        let recipe = res[0];
        let data = {
          Id : recipe.Id,
          Instructions: recipe.Instructions,
          Name: recipe.Name,
          PhotoUrl: recipe.PhotoUrl,
          UserId: recipe.UserId,
          Ingredients: recipe.Ingredients.split(',')
        }
        this.recipeModel = data;
        this.loading = false;
      }
    })
  }

}
