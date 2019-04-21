import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { BaseComponent } from 'src/app/shared/component/base.component';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class AuthService { 
    constructor(
    private afAuth: AngularFireAuth) { 
    }

    doLogin(login: AuthModel){
        return new Promise<any>((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(login.UserName, login.Password)
            .then(res => {
            resolve(res);
            }, err => reject(err))
        });
    };

    doRegister(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(value.UserName, value.Password)
          .then(res => {
            resolve(res);
          }, err => reject(err))
        })
    }

    doGoogleLogin(){
        return new Promise<any>((resolve, reject) => {
          let provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            resolve(res);
          })
        })
      }
}