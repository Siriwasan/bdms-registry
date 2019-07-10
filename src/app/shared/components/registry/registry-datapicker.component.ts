import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-datepicker',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <input
        matInput
        [matDatepicker]="picker"
        [placeholder]="placeholder"
        [formControlName]="controlName"
        [required]="require"
      />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
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
  `,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class RegistryDatepickerComponent extends RegistryControlComponent implements OnInit {
  @Input() controlName: string;
  @Input() formGroup: string;
  @Input() placeholder: string;
  @Input() require = true;

  bInfo: boolean;
  self: AbstractControl;

  constructor(protected registryService: RegistryService, private elementRef: ElementRef) {
    super(registryService);
  }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('id', this.controlName);
    this.bInfo = this.hasInfo(this.controlName);

    const section = this.registryService.getControlSection(this.controlName);
    if (section) {
      this.self = this.registryService.getFormGroup(section).get(this.controlName);
    }
  }
}
