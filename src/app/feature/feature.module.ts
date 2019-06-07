import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ToolsComponent } from './tools/tools.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [ToolsComponent, AboutComponent],
  imports: [SharedModule]
})
export class FeatureModule {}
