import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AboutComponent, PageNotFoundComponent],
  imports: [SharedModule]
})
export class FeatureModule {}
