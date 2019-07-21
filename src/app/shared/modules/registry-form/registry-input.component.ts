import { Component, Input, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { RegistryFormService } from './registry-form.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-input',
  template: `
    <mat-form-field [formGroup]="formGroup" style="width: 100%">
      <input
        *ngIf="type === 'number'"
        type="number"
        matInput
        [placeholder]="placeholder"
        [formControlName]="controlName"
        [required]="require"
        [readonly]="readonly"
      />
      <input
        *ngIf="type !== 'number'"
        type="text"
        matInput
        [placeholder]="placeholder"
        [formControlName]="controlName"
        [required]="require"
        [readonly]="readonly"
      />
      <mat-hint>
        <a><ng-content></ng-content></a>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="bInfo">info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngIf="self?.invalid && (self?.dirty || self?.touched)">
        <div *ngFor="let validation of getValidations(controlName)">
          <div *ngIf="isInvalid(controlName, validation.type)">
            <a>{{ validation.message }}</a>
            <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="bInfo">info_outline</mat-icon>
          </div>
        </div>
      </mat-error>
    </mat-form-field>
  `
})
export class RegistryInputComponent extends RegistryControlComponent implements OnInit {
  @Input() controlName: string;
  @Input() formGroup: string;
  @Input() type = 'number';
  @Input() placeholder: string;
  @Input() require = true;
  @Input() readonly = false;

  bInfo: boolean;
  self: AbstractControl;

  constructor(protected registryFormService: RegistryFormService, private elementRef: ElementRef) {
    super(registryFormService);
  }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('id', this.controlName);
    this.bInfo = this.hasInfo(this.controlName);

    const section = this.registryFormService.getControlSection(this.controlName);
    if (section) {
      this.self = this.registryFormService.getFormGroup(section).get(this.controlName);
    }
  }
}