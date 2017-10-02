import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ROUTES_CONSTANTS } from '../constants/routes.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (state.url.startsWith(`/${ROUTES_CONSTANTS.LOGIN}`)) {
      return this.canActivateLogin();
    } else {
      return this.canActivateAuthorizedUrl();
    }
  }

  private canActivateLogin(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.router.navigate(['/']);
    }

    return !isAuthenticated;
  }

  private canActivateAuthorizedUrl(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate([`/${ROUTES_CONSTANTS.LOGIN}`]);
    }

    return isAuthenticated;
  }
}
