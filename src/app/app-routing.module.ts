import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './feature/about/about.component';

const routes: Routes = [
  { path: 'tools', loadChildren: () => import('./feature/tools/tools.module').then(m => m.ToolsModule)},
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
