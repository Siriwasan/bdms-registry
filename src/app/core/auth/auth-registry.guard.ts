import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthRegistryGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>, private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.store.select(fromRoot.getUser).pipe(
      flatMap(async user => {
        // if (user) {
        //   console.log('registry ' +router.url);

        //   const userRegistries = await this.authService.getAvailableRegistries(user.staff.staffId);
        //   if (route.data.registry && userRegistries.includes(route.data.registry)) {
        //     return true; // Authenticated
        //   }
        //   return this.router.createUrlTree(['/page-not-autherized']); // Authenticated but role is not permit
        // }
        // return this.router.createUrlTree(['/auth']);

        if (user) {
          const targetUrl = router.url.split('/');
          if (targetUrl[1] === 'registry' && targetUrl[2] === 'acsx290') {
            const availableRegistries = await this.authService.getAvailableACSx290s(user.staff.staffId);
            if (availableRegistries.includes(targetUrl[3])) {
              return true; // Autherized
            }
          }
          return this.router.createUrlTree(['/page-not-autherized']); // Authenticated but role is not permit
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
