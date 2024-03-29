import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { ViewUserMenu } from './services/user/viewusermenu';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isLoggedIn() && this.isAuthorized(route.url[0].path)) {
            return true;
        } else {
            this.router.navigate(['/user-login']);
            return false;
        }
    }

    isLoggedIn() {
      const day = moment.unix(Number(localStorage.getItem('exp')));
      return moment().isBefore(day);
    }

    isAuthorized(path: string) {
        let authorized = true;
        let lstViewUserMenu: ViewUserMenu[] = JSON.parse(localStorage.getItem('menu'));
        lstViewUserMenu.forEach((eMenu) => {
            if ((path.includes(eMenu.tbmName.toLowerCase()) && path != 'user-profile') && eMenu.tbumView == 0) {
                authorized = false;
            }        
        });
        return authorized;
    }
}
