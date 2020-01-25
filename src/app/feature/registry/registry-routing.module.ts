import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistryComponent } from './registry.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: RegistryComponent,
    children: [
      {
        path: 'acsx290',
        children: [
          {
            path: '',
            loadChildren: () => import('./acsx290/acsx290.module').then(m => m.ACSx290Module)
          }
        ]
      },
      {
        path: 'acsx290-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./acsx290-list/acsx290-list.module').then(m => m.ACSx290ListModule)
          }
        ]
      },
      {
        path: 'cath-pci50',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./cath-pci50/cath-pci50.module').then(m => m.CathPci50Module)
          }
        ]
      },
      {
        path: 'cath-pci50-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./cath-pci50-list/cath-pci50-list.module').then(m => m.CathPci50ListModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  // { path: 'test-form', component: TestFormComponent },
  { path: '', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
