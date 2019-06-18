import { Component, Input } from '@angular/core';

import { RegistryService } from '../../../feature/registry/registry.service';
import { ValidationMessage } from './registry-base.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-input',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <input [type]="type" matInput [placeholder]="placeholder" [formControlName]="controlName" required />
      <mat-hint>
        <a>Please enter a valid input.</a>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="hasInfo(controlName)"
          >info_outline</mat-icon
        >
      </mat-hint>
      <mat-error *ngFor="let validation of getValidations(controlName)">
        <mat-error *ngIf="isInvalid(controlName, validation.type)">
          <a>{{ validation.message }}</a>
          <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="hasInfo(controlName)"
            >info_outline</mat-icon
          >
        </mat-error>
      </mat-error>
    </mat-form-field>
  `
})
export class RegistryInputComponent {
  @Input() formGroup: string;
  @Input() controlName: string;
  @Input() type: string;
  @Input() placeholder: string;

  constructor(private registryService: RegistryService) {}

  public hasInfo = (control: string) => this.registryService.hasInfo(control);
  public openInfo = (control: string) => this.registryService.openInfo(control);
  public getValidations = (control: string): ValidationMessage[] => this.registryService.getValidations(control);
  public isInvalid = (control: string, validationType: string): boolean =>
    this.registryService.isInvalid(control, validationType);
}
