import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { ACSx290ListComponent } from './acsx290-list.component';

import * as Auth from '../../../core/auth/auth.data';
import { AuthRoleGuard } from '../../../../app/core/auth/auth-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ACSx290ListComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.registry, registry: Auth.pages.acsx290 }
}
];

@NgModule({
  declarations: [ACSx290ListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [AuthRoleGuard]
})
export class ACSx290ListModule {}
