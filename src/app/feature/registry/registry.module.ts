import { NgModule } from '@angular/core';

import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { SharedModule } from '../../shared/shared.module';
import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryComponent } from './registry.component';
import { ACSx290Component } from './acsx290/acsx290.component';
import { LoremIpsumComponent } from './test-form/lorem-ipsum.component';
import { TestFormComponent } from './test-form/test-form.component';
import { RegistryService } from './registry.service';
import { DecryptPipe } from './registry.pipe';
import { CathPci50Component } from './cath-pci50/cath-pci50.component';
import { CathPci50ListComponent } from './cath-pci50-list/cath-pci50-list.component';
import { ACSx290ListComponent } from './acsx290-list/acsx290-list.component';

@NgModule({
  declarations: [
    RegistryComponent,
    ACSx290Component,
    LoremIpsumComponent,
    TestFormComponent,
    DecryptPipe,
    CathPci50Component,
    CathPci50ListComponent,
    ACSx290ListComponent
  ],
  imports: [SharedModule, RegistryRoutingModule, RoundProgressModule],
  providers: [RegistryService]
})
export class RegistryModule {}
