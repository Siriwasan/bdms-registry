import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './feature/about/about.component';

const routes: Routes = [
  { path: 'tools', loadChildren: () => import('./feature/tools/tools.module').then(m => m.ToolsModule) },
  { path: 'registry', loadChildren: () => import('./feature/registry/registry.module').then(m => m.RegistryModule) },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: AboutComponent } // PageNotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
