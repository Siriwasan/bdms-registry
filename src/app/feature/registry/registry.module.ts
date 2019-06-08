import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryComponent } from './registry.component';
import { ACSx290Component } from './acsx290/acsx290.component';
import { LoremIpsumComponent } from './acsx290/lorem-ipsum.component';

@NgModule({
  declarations: [RegistryComponent, ACSx290Component, LoremIpsumComponent],
  imports: [
    SharedModule,
    RegistryRoutingModule
  ]
})
export class RegistryModule { }
