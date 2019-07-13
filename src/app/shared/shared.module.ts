import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';
import { ScrollSpyModule } from './modules/scroll-spy/scroll-spy.module';

import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { RegistryInputComponent } from './components/registry/registry-input.component';
import { RegistrySelectComponent } from './components/registry/registry-select.component';
import { RegistryDatePickerComponent } from './components/registry/registry-date-picker.component';

import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { DeactivateGuard } from './guards/deactivate.guard';

@NgModule({
  declarations: [
    ModalDialogComponent,
    RegistryInputComponent,
    RegistrySelectComponent,
    RegistryDatePickerComponent,
    NoSanitizePipe
  ],
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
    RegistryInputComponent,
    RegistrySelectComponent,
    RegistryDatePickerComponent,
    NoSanitizePipe
  ],
  providers: [DeactivateGuard],
  entryComponents: [ModalDialogComponent]
})
export class SharedModule {}
