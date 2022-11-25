import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    async canActivate( route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        (window as any).routeSnapShot = state.url;
        if ((window as any).autoLogin === undefined) {
            this.router.navigate(['/login']);
            return false;
        } else {
            const currentUser = await this.authenticationService.currentUserValue;
            if (currentUser) {
                return true;
            }
            this.router.navigate(['/login'])
            return false;
        }
    }
}