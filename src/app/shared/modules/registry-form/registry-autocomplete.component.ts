import { Component, Input, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { RegistryFormService } from './registry-form.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-autocomplete',
  template: `
    <mat-form-field [formGroup]="formGroup" style="width: 100%">
      <input
        type="text"
        matInput
        [placeholder]="placeholder"
        [formControlName]="controlName"
        [required]="require"
        [readonly]="readonly"
        [matAutocomplete]="auto"
      />
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let choice of choices" [value]="choice">
          {{ choice }}
        </mat-option>
      </mat-autocomplete>
      <mat-hint>
        <a><ng-content></ng-content></a>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="bInfo">info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngIf="self.invalid && (self.dirty || self.touched)">
        <div *ngFor="let validation of getValidations(controlName)">
          <div *ngIf="isInvalid(controlName, validation.type)">
            <a>{{ validation.message }}</a>
          </div>
        </div>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="bInfo">info_outline</mat-icon>
      </mat-error>
    </mat-form-field>
  `
})
export class RegistryAutocompleteComponent extends RegistryControlComponent implements OnInit {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() readonly = false;
  @Input() choices: string[];

  bInfo: boolean;
  self: AbstractControl;

  constructor(protected registryFormService: RegistryFormService, private elementRef: ElementRef) {
    super(registryFormService);
  }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('id', this.controlName);
    this.bInfo = this.hasInfo(this.controlName);

    this.self = this.formGroup.get(this.controlName);
  }
}
