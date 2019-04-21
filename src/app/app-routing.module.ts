import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { FeedsComponent } from './components/feeds/feeds.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', component: FeedsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'recipes', component: RecipesComponent, pathMatch: 'full', canActivate: [AuthGuard], 
    // children : 
    // [
    //   { 
    //     path: 'recipes/:id', 
    //     component: RecipesComponent, 
    //     canActivate: [AuthGuard] 
    //   }
    // ]
  },
  { path: 'recipes/:id', component: RecipeDetailsComponent, pathMatch: 'full', canActivate: [AuthGuard]}, 
  { path: 'feeds', component: FeedsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
