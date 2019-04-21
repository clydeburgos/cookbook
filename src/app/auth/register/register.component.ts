import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthModel } from 'src/app/models/auth.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  loginModel: AuthModel;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { 
      super();
    }

  ngOnInit() {
    this.loginModel = new AuthModel();
  }

  register(){
    if(this.loginModel.Password !== this.loginModel.RetypePassword) {
      this.toastr.error('Please retype your password.', 'Error');
      return false;
    }
    this.authService.doRegister({ UserName : this.loginModel.UserName, Password: this.loginModel.Password })
    .then(res => {
      if(res) {
        this.toastr.success('Account successfully created!', 'Success');
        this.router.navigateByUrl('login');
      }
    }, (error : any) => {
      this.toastr.error(error.message, 'Error');
    });
  }
}
