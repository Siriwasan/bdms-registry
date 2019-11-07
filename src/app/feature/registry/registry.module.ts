import { NgModule } from '@angular/core';

import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { SharedModule } from '../../shared/shared.module';
import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryComponent } from './registry.component';
import { LoremIpsumComponent } from './test-form/lorem-ipsum.component';
import { TestFormComponent } from './test-form/test-form.component';
import { RegistryService } from './registry.service';
import { DecryptPipe } from './registry.pipe';
import { FeatureModule } from '../feature.module';

@NgModule({
  declarations: [
    RegistryComponent,
    LoremIpsumComponent,
    TestFormComponent,
    DecryptPipe,
  ],
  imports: [SharedModule, FeatureModule, RegistryRoutingModule, RoundProgressModule],
  providers: [RegistryService]
})
export class RegistryModule {}
