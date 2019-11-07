import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CathPci50Component } from './cath-pci50.component';
import { SharedModule } from '../../../../app/shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import * as Auth from '../../../core/auth/auth.data';
import { DeactivateGuard } from '../../../../app/shared/guards/deactivate.guard';
import { AuthRoleGuard } from '../../../../app/core/auth/auth-role.guard';

const routes: Routes = [
  {
    path: '',
    component: CathPci50Component,
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.registry, registry: Auth.pages.cathPci50 }
  },
  {
    path: ':id',
    component: CathPci50Component,
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.registry, registry: Auth.pages.cathPci50 }
  }
];

@NgModule({
  declarations: [CathPci50Component],
  imports: [SharedModule, RoundProgressModule, RouterModule.forChild(routes)],
  providers: [DeactivateGuard, AuthRoleGuard]
})
export class CathPci50Module {}
