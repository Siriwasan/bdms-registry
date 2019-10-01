import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { ToolsService } from './tools.service';
import { ACSx290Service } from '../registry/acsx290/acsx290.service';
import { CathPci50Service } from '../registry/cath-pci50/cath-pci50.service';

@NgModule({
  declarations: [ToolsComponent],
  imports: [SharedModule, ToolsRoutingModule],
  providers: [ToolsService, ACSx290Service, CathPci50Service]
})
export class ToolsModule {}
