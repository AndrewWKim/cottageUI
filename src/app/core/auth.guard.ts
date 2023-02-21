import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from 'app/core/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private auth: AuthenticationService) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}
