import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { RegistryService } from '../../../feature/registry/registry.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-input',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <input [type]="type" matInput [placeholder]="placeholder" [formControlName]="controlName" required />
      <mat-hint>
        <a>Please enter a valid input.</a>
        <mat-icon style="cursor: help;" (click)="openInfo()" *ngIf="hasInfo()">info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngFor="let validation of getValidations()">
        <mat-error *ngIf="isInvalid(validation.type)">
          <a>{{ validation.message }}</a>
          <mat-icon style="cursor: help;" (click)="openInfo()" *ngIf="hasInfo()">info_outline</mat-icon>
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

  @ViewChild('art', { static: true }) art: ElementRef;

  constructor(private registryService: RegistryService) {}

  hasInfo(): boolean {
    return this.registryService.hasInfo(this.controlName);
  }

  openInfo() {
    this.registryService.openInfo(this.controlName);
  }

  getValidations() {
    return this.registryService.getValidations(this.controlName);
  }

  public isInvalid(validationType: string): boolean {
    return this.registryService.isInvalid(this.controlName, validationType);
  }
}
