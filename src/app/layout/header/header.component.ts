import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    super();
  }

  ngOnInit() {
  }

  logout(){
    this.afAuth.auth.signOut();
    super.onLogOut();
    this.router.navigateByUrl('login');
  }

}
