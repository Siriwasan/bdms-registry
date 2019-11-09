import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { MyPatientsComponent } from './my-patients.component';

import * as Auth from '../../core/auth/auth.data';
import { AuthRoleGuard } from '../../../app/core/auth/auth-role.guard';

const routes: Routes = [
  {
    path: '',
    component: MyPatientsComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.myPatients }
}
];

@NgModule({
  declarations: [MyPatientsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: []
})
export class MyPatientsModule {}
