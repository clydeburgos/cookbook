import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeCreateEditComponent } from './recipe-create-edit/recipe-create-edit.component';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from 'src/app/app.animations';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [routerTransition()]
})
export class RecipesComponent implements OnInit {
  @ViewChild('recipeList') recipeList : RecipeListComponent;
  searchInput: string = '';
  constructor(private modal: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addRecipe(){
    this.modal.open(RecipeCreateEditComponent, {size : 'lg'});
  }

  search() {
    this.recipeList.loadRecipes(this.searchInput)
  }
}
