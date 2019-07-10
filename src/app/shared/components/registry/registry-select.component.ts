import { Component, Input, EventEmitter, Output, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-select',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <mat-select
        [formControlName]="controlName"
        [required]="require"
        [placeholder]="placeholder"
        (selectionChange)="selectionChange($event)"
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
export class RegistrySelectComponent extends RegistryControlComponent implements OnInit {
  @Input() controlName: string;
  @Input() formGroup: string;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() choices = [];
  @Output() choiceChange: EventEmitter<MatSelectChange> = new EventEmitter();

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

  selectionChange(event: MatSelectChange) {
    this.choiceChange.emit(event);
  }
}
