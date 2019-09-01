import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AboutComponent } from './feature/about/about.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthComponent } from './core/auth/auth.component';
import { PageNotFoundComponent } from './feature/page-not-found/page-not-found.component';
import { HomeComponent } from './feature/home/home.component';
import { MyPatientsComponent } from './feature/my-patients/my-patients.component';
import * as Auth from './core/auth/auth.data';
import { PageNotAutherizedComponent } from './feature/page-not-autherized/page-not-autherized.component';

const routes: Routes = [
  {
    path: 'registry',
    loadChildren: () => import('./feature/registry/registry.module').then(m => m.RegistryModule),
    canActivate: [AuthGuard],
    data: {
      roles: Auth.menus.registry
    }
  },
  {
    path: 'my-patients',
    component: MyPatientsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: Auth.menus.myPatients
    }
  },
  {
    path: 'staff',
    loadChildren: () => import('./feature/staff/staff.module').then(m => m.StaffModule),
    canActivate: [AuthGuard],
    data: {
      roles: Auth.menus.staff
    }
  },
  {
    path: 'tools',
    loadChildren: () => import('./feature/tools/tools.module').then(m => m.ToolsModule),
    canActivate: [AuthGuard],
    data: {
      roles: Auth.menus.tools
    }
  },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'page-not-autherized', component: PageNotAutherizedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
