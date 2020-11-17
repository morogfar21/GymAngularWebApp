import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from 'src/app/services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

        //Authguard checks whether the user has the rights to activate choosen route.
        //General Authentication principles.

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.getToken();
        console.log("trying to get token from user");
        if (user) {
            // authorised so return true
            console.log("A user was found and can move on route");
            return true;
        }
        console.log("No user was found.. Redirecting to Login");
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}