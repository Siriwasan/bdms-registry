import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';

@NgModule({
  declarations: [ToolsComponent],
  imports: [
    SharedModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
