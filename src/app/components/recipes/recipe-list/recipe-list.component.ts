import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FeedService } from 'src/app/services/feed.service';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { RecipeCreateEditComponent } from '../recipe-create-edit/recipe-create-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends BaseComponent implements OnInit {
  loading: boolean = false;
  recipes: any[] = [];
  constructor(
    private toastr: ToastrService,
    private dataService: DataService, 
    private feedService: FeedService, 
    private recipeService: RecipeService,
    private modal: NgbModal) { 
    super();
    this.dataService.event.subscribe((res : any) => {
      this.loadRecipes(res);
    });
  }

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes(search?: string){
    this.loading = true;
    let id = super.getCurrentUserId();
    let source = search ? this.recipeService.getMyRecipe(id, search) : this.recipeService.getMyRecipe(id);
    source.subscribe((res : any) => {
      if(res) {
        let data = res.map((item) => {
          return {
            Id : item.Id,
            Instructions: item.Instructions,
            Name: item.Name,
            PhotoUrl: item.PhotoUrl,
            UserId: item.UserId,
            Ingredients: item.Ingredients.split(',')
          }
        })
        this.recipes = data;
      }
      this.loading = false;
    });
  }

  delete(id: string) {
    this.recipeService.deleteRecipe(id).subscribe((res) => {
      this.toastr.success('Deleted recipe', 'Success');
      this.loadRecipes();	
    }, (error: any) => {
      this.toastr.error('Something went wrong, please contact administrator.', 'Error')
    });
  }

  edit(recipe) {
    const modal = this.modal.open(RecipeCreateEditComponent, {size : 'lg'});
    modal.componentInstance.recipe = recipe;
  }
}
