import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../../app/shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ACSx290Component } from './acsx290.component';

import * as Auth from '../../../core/auth/auth.data';
import { DeactivateGuard } from '../../../../app/shared/guards/deactivate.guard';
import { AuthRoleGuard } from '../../../../app/core/auth/auth-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ACSx290Component,
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.registry, registry: Auth.pages.acsx290 }
},
  {
    path: ':id',
    component: ACSx290Component,
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.registry, registry: Auth.pages.acsx290 }
}
];

@NgModule({
  declarations: [ACSx290Component],
  imports: [SharedModule, RoundProgressModule, RouterModule.forChild(routes)],
  providers: [DeactivateGuard, AuthRoleGuard]
})
export class ACSx290Module {}
