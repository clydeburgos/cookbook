import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate { 
    constructor(
        private router: Router,
    ){}
    canActivate(routeSnap: ActivatedRouteSnapshot){
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if(isLoggedIn && JSON.parse(isLoggedIn)) {
            return true;
        } else {
            this.router.navigateByUrl('login');
        }
    }
}