import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    console.log(router);
    return this.store.select(fromRoot.getUser).pipe(
      map(user => {
        if (user) {
          if (route.data.roles && route.data.roles.indexOf(user.staff.role) < 0) {
            return this.router.createUrlTree(['/page-not-autherized']); // Authenticated but role is not permit
          }
          return true; // Authenticated
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
