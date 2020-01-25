import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AboutComponent } from './feature/about/about.component';
import { AuthRoleGuard } from './core/auth/auth-role.guard';
import { AuthComponent } from './core/auth/auth.component';
import { PageNotFoundComponent } from './feature/page-not-found/page-not-found.component';
import { HomeComponent } from './feature/home/home.component';
import { MyPatientsComponent } from './feature/my-patients/my-patients.component';
import * as Auth from './core/auth/auth.data';
import { PageNotAutherizedComponent } from './feature/page-not-autherized/page-not-autherized.component';
import { AuthRegistryGuard } from './core/auth/auth-registry.guard';

const routes: Routes = [
  {
    path: 'registry',
    loadChildren: () => import('./feature/registry/registry.module').then(m => m.RegistryModule)
    // canActivate: [AuthRoleGuard],
    // data: { roles: Auth.menus.registry }
  },
  {
    path: 'my-patients',
    loadChildren: () =>
      import('./feature/my-patients/my-patients.module').then(m => m.MyPatientsModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('./feature/staff/staff.module').then(m => m.StaffModule),
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.staff }
  },
  {
    path: 'tools',
    loadChildren: () => import('./feature/tools/tools.module').then(m => m.ToolsModule),
    canActivate: [AuthRoleGuard],
    data: { roles: Auth.menus.tools }
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule)
  },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'page-not-autherized', component: PageNotAutherizedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
