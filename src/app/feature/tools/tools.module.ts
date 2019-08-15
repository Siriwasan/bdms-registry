import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { ToolsService } from './tools.service';

@NgModule({
  declarations: [ToolsComponent],
  imports: [SharedModule, ToolsRoutingModule],
  providers: [ToolsService]
})
export class ToolsModule {}
