import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsComponent } from './feature/tools/tools.component';
import { AboutComponent } from './feature/about/about.component';

const routes: Routes = [{ path: 'tools', component: ToolsComponent }, { path: 'about', component: AboutComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
