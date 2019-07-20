import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';
import { RegistryFormModule } from './modules/registry-form/registry-form.module';

import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { DeactivateGuard } from './guards/deactivate.guard';

@NgModule({
  declarations: [ModalDialogComponent, NoSanitizePipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RegistryFormModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RegistryFormModule,
    NoSanitizePipe
  ],
  providers: [DeactivateGuard],
  entryComponents: [ModalDialogComponent]
})
export class SharedModule {}
