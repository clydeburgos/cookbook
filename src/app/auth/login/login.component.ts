import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthModel } from 'src/app/models/auth.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginModel: AuthModel;
  constructor(
    private afAuth: AngularFireAuth, 
    private authService: AuthService,
    private user: UserService,
    private toastr: ToastrService,
    private router: Router) { 
      super();
    }

  ngOnInit() {
    this.loginModel = new AuthModel();
  }

  login() { 
    this.authService.doLogin({ UserName : this.loginModel.UserName, Password: this.loginModel.Password })
    .then((res) => {
      let user = res.user;
      if(user) {

				this.user.setUser({
          username: user.email,
          uid: res.user.uid
        });

        let userModel = {
          Id: user.uid,
          Name: user.displayName,
          Email: user.email,
          PhotuorUrl: user.photoURL,
          AccessToken: this.afAuth.idToken
        }

        super.setUser(userModel);
        super.onLogIn();

				setTimeout(() => {
					this.router.navigate(['/recipes']);
				}, 1000);
      }
    }, (error : any) => {
      this.toastr.error(error.message,'Error')
    })              
    
  }

  googleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      let user = res.user;
      if(user) {

				this.user.setUser({
          username: user.email,
          uid: res.user.uid
        });

        let userModel = {
          Id: user.uid,
          Name: user.displayName,
          Email: user.email,
          PhotuorUrl: user.photoURL,
          AccessToken: this.afAuth.idToken
        }

        super.setUser(userModel);
        super.onLogIn();

				setTimeout(() => {
					this.router.navigate(['/recipes']);
				}, 1000);
      }
    })
  }

}