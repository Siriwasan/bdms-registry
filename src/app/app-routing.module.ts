import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AboutComponent } from './feature/about/about.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthComponent } from './core/auth/auth.component';
import { PageNotFoundComponent } from './feature/page-not-found/page-not-found.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {
    path: 'tools',
    loadChildren: () => import('./feature/tools/tools.module').then(m => m.ToolsModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['Director']
    }
  },
  {
    path: 'registry',
    loadChildren: () => import('./feature/registry/registry.module').then(m => m.RegistryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'staff',
    loadChildren: () => import('./feature/staff/staff.module').then(m => m.StaffModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['Director', 'Administrator']
    }
  },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
