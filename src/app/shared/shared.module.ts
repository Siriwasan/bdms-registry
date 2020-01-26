import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { MaterialModule } from '../shared/material.module';
import { RegistryFormModule } from './modules/registry-form/registry-form.module';

import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { FabSpeedDialModule } from './modules/fab-speed-dial/fab-speed-dial.module';
import { CathPci50ListControlComponent } from '../feature/registry/cath-pci50-list-control/cath-pci50-list-control.component';
import { ACSx290ListControlComponent } from '../feature/registry/acsx290-list-control/acsx290-list-control.component';
import { IsoDatePipe } from './pipes/iso-date.pipe';

@NgModule({
  declarations: [
    ModalDialogComponent,
    NoSanitizePipe,
    IsoDatePipe,
    CathPci50ListControlComponent,
    ACSx290ListControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RegistryFormModule,
    FabSpeedDialModule,
    ChartsModule,
    NgxUiLoaderModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RegistryFormModule,
    NoSanitizePipe,
    IsoDatePipe,
    FabSpeedDialModule,
    CathPci50ListControlComponent,
    ACSx290ListControlComponent,
    ChartsModule,
    NgxUiLoaderModule
  ],
  providers: [],
  entryComponents: [ModalDialogComponent]
})
export class SharedModule {}
