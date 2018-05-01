import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Get property name on security object to check
    let roles = next.data["roles"] as Array<string>;
    //console.log("Roles in Route module:" + roles);

    if (roles != null) {
      if (!this.authService.isInRole(roles)) {
        console.log("NOT Authorized");

        this.router.navigate(['unauthorized'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
    return true;
  }

}
