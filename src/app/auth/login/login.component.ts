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
    private userService: UserService,
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

				this.userService.setUser({
          username: user.email,
          uid: res.user.uid
        });

        let userModel = {
          Id: user.uid,
          Name: user.displayName,
          Email: user.email,
          PhotuorUrl: user.photoURL,
          RefreshToken: user.refreshToken
        }

        super.setUser(userModel);

        this.fireBaseTokenization().then((res) => {
          this.verifyAuth().then((auth) => {
            super.onLogIn();
            setTimeout(() => {
              this.router.navigate(['/recipes']);
            }, 1000);
          });
        });
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

				this.userService.setUser({
          username: user.email,
          uid: res.user.uid
        });

        let userModel = {
          Id: user.uid,
          Name: user.displayName,
          Email: user.email,
          PhotuorUrl: user.photoURL,
          RefreshToken: user.refreshToken
        }

        super.setUser(userModel);

        this.fireBaseTokenization().then((res) => {
          this.verifyAuth().then((auth) => {
            super.onLogIn();
            setTimeout(() => {
              this.router.navigate(['/recipes']);
            }, 1000);
          });
        });
      }
    })
  }

  fireBaseTokenization(){
    return new Promise((resolve) => {
      this.afAuth.idTokenResult.subscribe((res) => {
          super.setUserToken(res.token);
          resolve(res.token);
      });
    });
  }

  verifyAuth(){
    return new Promise((resolve, reject) => {
      this.userService.verifyAuth().subscribe((res : any) => {
        if(res.token) {
          super.setUserToken(res.token);
          resolve(res.token)
        }
        else {
          reject();
        }
      });
    });
  }
}