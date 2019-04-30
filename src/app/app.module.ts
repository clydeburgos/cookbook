import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { RecipeCreateEditComponent } from './components/recipes/recipe-create-edit/recipe-create-edit.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { DataService } from './services/data.service';
import { LoginComponent } from './auth/login/login.component';
import { environment } from 'src/environments/environment.prod';
import { UserService } from './services/user.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { FeedService } from './services/feed.service';
import { FeedsComponent } from './components/feeds/feeds.component';
import { SpinnerComponent } from './shared/component/spinner/spinner.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { RecipeService } from './services/recipe.service';

import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { JwtHttpInterceptor } from './jwthttpinterceptor';
export function tokenGetter() {
	return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeCreateEditComponent,
    RecipeListComponent,
    LoginComponent,
    FeedsComponent,
    SpinnerComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({
      timeOut: 5000
    }),
    JwtModule.forRoot({
			config: {
        tokenGetter: tokenGetter
			}
		}),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  entryComponents: [ 
    RecipeCreateEditComponent
  ],
  providers: [
    DataService, 
    UserService,
    AuthGuard, AuthService,
    FeedService, RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
