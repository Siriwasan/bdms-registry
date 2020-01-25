import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { CathPci50ChartComponent } from './cath-pci50-chart/cath-pci50-chart.component';

import * as Auth from '../../core/auth/auth.data';
import { AuthRoleGuard } from '../../../app/core/auth/auth-role.guard';
import { RegistryService } from '../registry/registry.service';
import { Acsx290ChartComponent } from './acsx290-chart/acsx290-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.home }
  }
];

@NgModule({
  declarations: [HomeComponent, CathPci50ChartComponent, Acsx290ChartComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [RegistryService]
})
export class HomeModule {}
