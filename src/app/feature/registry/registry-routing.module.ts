import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeactivateGuard } from '../../shared/guards/deactivate.guard';
import { RegistryComponent } from './registry.component';
import { ACSx290Component } from './acsx290/acsx290.component';
import { TestFormComponent } from './test-form/test-form.component';

const routes: Routes = [
  { path: 'acsx290/:id', component: ACSx290Component, canDeactivate: [DeactivateGuard] },
  { path: 'acsx290', component: ACSx290Component, canDeactivate: [DeactivateGuard] },
  { path: 'test-form', component: TestFormComponent },
  { path: '', component: RegistryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
