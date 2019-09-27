import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../../material.module';
import { ScrollSpyModule } from '../scroll-spy/scroll-spy.module';

import { RegistryInputComponent } from './registry-input.component';
import { RegistrySelectComponent } from './registry-select.component';
import { RegistrySelectMultipleComponent } from './registry-select-multiple.component';
import { RegistryDatePickerComponent } from './registry-date-picker.component';
import { RegistryAutocompleteComponent } from './registry-autocomplete.component';
import { RegistryFormService } from './registry-form.service';

@NgModule({
  declarations: [
    RegistryInputComponent,
    RegistrySelectComponent,
    RegistrySelectMultipleComponent,
    RegistryDatePickerComponent,
    RegistryAutocompleteComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule, ScrollSpyModule],
  exports: [
    RegistryInputComponent,
    RegistrySelectComponent,
    RegistrySelectMultipleComponent,
    RegistryDatePickerComponent,
    RegistryAutocompleteComponent,
    ScrollSpyModule
  ],
  providers: []
})
export class RegistryFormModule {}
