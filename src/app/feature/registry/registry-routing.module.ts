import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeactivateGuard } from '../../shared/guards/deactivate.guard';
import { RegistryComponent } from './registry.component';
import { ACSx290Component } from './acsx290/acsx290.component';
import { ACSx290ListComponent } from './acsx290-list/acsx290-list.component';
import { TestFormComponent } from './test-form/test-form.component';
import { CathPci50Component } from './cath-pci50/cath-pci50.component';
import { CathPci50ListComponent } from './cath-pci50-list/cath-pci50-list.component';
import { AuthRegistryGuard } from '../../core/auth/auth-registry.guard';
import * as Auth from '../../core/auth/auth.data';

const routes: Routes = [
  {
    path: 'acsx290-list',
    component: ACSx290ListComponent,
    canActivate: [AuthRegistryGuard],
    data: { registry: Auth.pages.acsx290 }
  },
  {
    path: 'acsx290/:id',
    component: ACSx290Component,
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthRegistryGuard],
    data: { registry: Auth.pages.acsx290 }
  },
  {
    path: 'acsx290',
    component: ACSx290Component,
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthRegistryGuard],
    data: { registry: Auth.pages.acsx290 }
  },
  {
    path: 'cath-pci50-list',
    component: CathPci50ListComponent,
    canActivate: [AuthRegistryGuard],
    data: { registry: Auth.pages.cathPci50 }
  },
  {
    path: 'cath-pci50/:id',
    component: CathPci50Component,
    canActivate: [AuthRegistryGuard],
    data: { registry: Auth.pages.cathPci50 }
  },
  {
    path: 'cath-pci50',
    component: CathPci50Component,
    canActivate: [AuthRegistryGuard],
    data: { registry: Auth.pages.cathPci50 }
  },
  { path: 'test-form', component: TestFormComponent },
  { path: '', component: RegistryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
