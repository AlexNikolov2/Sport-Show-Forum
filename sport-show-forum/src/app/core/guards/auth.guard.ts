import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private UserService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let { authRequired } = route.data;

    const previousUrl = this.router.routerState.snapshot.url;

    if (
      typeof authRequired === 'boolean' &&
      authRequired == this.UserService.isLoggedIn
    ) {
      return true;
    }

    if (authRequired == true && this.UserService.isLoggedIn == false) {
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: previousUrl.slice(1) },
      });
      return false;
    }

    return this.router.parseUrl('/');
  }
}
