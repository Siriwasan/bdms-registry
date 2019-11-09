import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';
import { RegistryFormModule } from './modules/registry-form/registry-form.module';

import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { FabSpeedDialModule } from './modules/fab-speed-dial/fab-speed-dial.module';
import { CathPci50ListControlComponent } from '../feature/registry/cath-pci50-list-control/cath-pci50-list-control.component';

@NgModule({
  declarations: [ModalDialogComponent, NoSanitizePipe, CathPci50ListControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RegistryFormModule,
    FabSpeedDialModule
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
    FabSpeedDialModule,
    CathPci50ListControlComponent
  ],
  providers: [],
  entryComponents: [ModalDialogComponent]
})
export class SharedModule {}
