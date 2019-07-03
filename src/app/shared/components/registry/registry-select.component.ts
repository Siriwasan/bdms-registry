import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-select',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <mat-select
        [formControlName]="id"
        [required]="require"
        [placeholder]="placeholder"
        (selectionChange)="selectionChange($event)"
      >
        <mat-option *ngFor="let choice of choices" [value]="choice">{{ choice }}</mat-option>
      </mat-select>
      <mat-hint>
        <a><ng-content></ng-content></a>
        <mat-icon style="cursor: help;" (click)="openInfo(id)" *ngIf="hasInfo(id)">info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngFor="let validation of getValidations(id)">
        <mat-error *ngIf="isInvalid(id, validation.type)">
          <a>{{ validation.message }}</a>
          <mat-icon style="cursor: help;" (click)="openInfo(id)" *ngIf="hasInfo(id)">info_outline</mat-icon>
        </mat-error>
      </mat-error>
    </mat-form-field>
  `
})
export class RegistrySelectComponent extends RegistryControlComponent {
  @Input() id: string;
  @Input() formGroup: string;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() choices = [];
  @Output() choiceChange: EventEmitter<MatSelectChange> = new EventEmitter();

  constructor(protected registryService: RegistryService) {
    super(registryService);
  }

  selectionChange(event: MatSelectChange) {
    this.choiceChange.emit(event);
  }
}
