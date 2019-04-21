import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeModel } from 'src/app/models/recipe.model';
import { routerTransition } from 'src/app/app.animations';
import { DataService } from 'src/app/services/data.service';
import { isArray } from 'util';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/component/base.component';
@Component({
  selector: 'app-recipe-create-edit',
  templateUrl: './recipe-create-edit.component.html',
  styleUrls: ['./recipe-create-edit.component.scss'],
  animations: [routerTransition()]
})
export class RecipeCreateEditComponent extends BaseComponent implements OnInit {
  recipeModel: RecipeModel;
  @Input() public recipe;
  @ViewChild('additionalIngredient') additionalIngredientsContEl: ElementRef;
  loading: boolean = false;
  additionalIngredientsCounter: number = 1;
  constructor(
    private dialog: NgbActiveModal, 
    private elem: ElementRef,
    private dataService: DataService,
    private recipeService: RecipeService,
    private toastr: ToastrService) { 
      super();
    }

  ngOnInit() {
    this.recipeModel = new RecipeModel();
    this.recipeModel.UserId = super.getCurrentUserId();
    if(this.recipe) {
      this.recipeModel = this.recipe;
      this.generateIngredientsInput();
    }
  }

  save(){ 
    this.loading = true;
    this.getAllNewItemNameIdValues();
    if(isArray(this.recipeModel.Ingredients)) {
      this.recipeModel.Ingredients = this.recipeModel.Ingredients.join(',');
    }
    
    this.recipeService.saveRecipe(this.recipeModel).subscribe((res) => {
      if(res) {
        this.dataService.publishAddedRecipe(this.recipeModel);
        this.loading = false;
        this.toastr.success('Successfully saved recipe', 'Success');
        this.dialog.close(this.recipeModel);
      }
    }, (error: any) => {
      this.toastr.error('Something went wrong, Please contact administrator.', 'Error');
      console.log(error.message);
    });
  }

  addNewIngredients(event){
    if (event.key === "Enter") { 
      let template = '<div class="mb-2"><input type="text" (keydown)=addNewIngredients($event) placeholder="Pork, Salt, soy sauce..." class="form-control additionalIngredientName"></div>'
      this.additionalIngredientsContEl.nativeElement.insertAdjacentHTML('beforeend', template);
    }
  }

  generateIngredientsInput() {
    if(isArray(this.recipeModel.Ingredients)) {
      this.recipeModel.Ingredients.forEach(element => {
        let template = `<div class="mb-2"><input type="text" value="${element}" (keydown)="addNewIngredients($event)" placeholder="Pork, Salt, soy sauce..." class="form-control additionalIngredientName"></div>`;
        this.additionalIngredientsContEl.nativeElement.insertAdjacentHTML('beforeend', template);
      });
    }
  }

  public getAllNewItemNameIdValues(){
    let elements = this.elem.nativeElement.querySelectorAll('.additionalIngredientName');
    let values = [];
     
    elements.forEach(function(element, i){
        values.push(element.value);
    });

    if(values.length > 0) {
        this.recipeModel.Ingredients = values.join(',');
    }      
}

  close(){
    this.dialog.close();
  }
}
