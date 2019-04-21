import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreateEditComponent } from './recipe-create-edit.component';

describe('RecipeCreateEditComponent', () => {
  let component: RecipeCreateEditComponent;
  let fixture: ComponentFixture<RecipeCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
