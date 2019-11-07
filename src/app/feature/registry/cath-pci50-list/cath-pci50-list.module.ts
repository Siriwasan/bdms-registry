import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { CathPci50ListComponent } from './cath-pci50-list.component';

import * as Auth from '../../../core/auth/auth.data';
import { AuthRoleGuard } from '../../../../app/core/auth/auth-role.guard';

const routes: Routes = [
  {
    path: '',
    component: CathPci50ListComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.registry, registry: Auth.pages.cathPci50 }
}
];

@NgModule({
  declarations: [CathPci50ListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [AuthRoleGuard]
})
export class CathPci50ListModule {}
