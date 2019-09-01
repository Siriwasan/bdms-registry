import { Component, Input, EventEmitter, Output, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { RegistryFormService } from './registry-form.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-select-multiple',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <mat-select
        [formControlName]="controlName"
        [required]="require"
        [placeholder]="placeholder"
        (selectionChange)="selectionChange($event)"
        multiple
      >
        <mat-option *ngFor="let choice of choices" [value]="choice">{{ choice }}</mat-option>
      </mat-select>
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
export class RegistrySelectMultipleComponent extends RegistryControlComponent implements OnInit {
  @Input() controlName: string;
  @Input() formGroup: string;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() choices = [];
  @Output() choiceChange: EventEmitter<MatSelectChange> = new EventEmitter();

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

  selectionChange(event: MatSelectChange) {
    this.choiceChange.emit(event);
  }
}
