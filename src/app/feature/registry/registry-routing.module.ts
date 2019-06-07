import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistryComponent } from './registry.component';
import { ACSx290Component } from './acsx290/acsx290.component';

const routes: Routes = [{ path: '', component: RegistryComponent }, { path: 'acsx290', component: ACSx290Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
