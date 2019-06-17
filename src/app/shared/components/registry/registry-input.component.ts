import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-input',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup">
      <input type="number" matInput [placeholder]="placeholder" [formControlName]="controlName" required />
      <mat-hint>
        <a>Please enter a valid input.</a>
        <mat-icon style="cursor: help;">info_outline</mat-icon>
      </mat-hint>
    </mat-form-field>
  `
})
export class RegistryInputComponent {
  @Input() formGroup: string;
  @Input() controlName: string;
  @Input() placeholder: string;
}
