import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AboutComponent } from './feature/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'tools', loadChildren: () => import('./feature/tools/tools.module').then(m => m.ToolsModule) },
  { path: 'registry', loadChildren: () => import('./feature/registry/registry.module').then(m => m.RegistryModule) },
  { path: 'staff', loadChildren: () => import('./feature/staff/staff.module').then(m => m.StaffModule) },
  { path: 'about', component: AboutComponent },
  { path: '**', component: AboutComponent } // PageNotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
