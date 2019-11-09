import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PageNotAutherizedComponent } from './page-not-autherized/page-not-autherized.component';

@NgModule({
  declarations: [AboutComponent, PageNotFoundComponent, HomeComponent, PageNotAutherizedComponent],
  imports: [SharedModule]
})
export class FeatureModule {}
