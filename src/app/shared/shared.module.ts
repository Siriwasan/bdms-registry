import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';
import { ScrollSpyModule } from './modules/scroll-spy/scroll-spy.module';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { RegistryInputComponent } from './components/registry/registry-input.component';

@NgModule({
  declarations: [ModalDialogComponent, RegistryInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollSpyModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollSpyModule,
    RegistryInputComponent
  ],
  providers: [],
  entryComponents: [ModalDialogComponent]
})
export class SharedModule {}
