import { Component, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-input',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <input
        *ngIf="type === 'number'"
        type="number"
        matInput
        [placeholder]="placeholder"
        [formControlName]="id"
        [required]="require"
      />
      <input
        *ngIf="type !== 'number'"
        type="text"
        matInput
        [placeholder]="placeholder"
        [formControlName]="id"
        [required]="require"
      />
      <mat-hint>
        <a><ng-content></ng-content></a>
        <mat-icon style="cursor: help;" (click)="openInfo(id)" *ngIf="hasInfo(id)"
          >info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngFor="let validation of getValidations(id)">
        <mat-error *ngIf="isInvalid(id, validation.type)">
          <a>{{ validation.message }}</a>
          <mat-icon style="cursor: help;" (click)="openInfo(id)" *ngIf="hasInfo(id)"
            >info_outline</mat-icon>
        </mat-error>
      </mat-error>
    </mat-form-field>
  `
})
export class RegistryInputComponent extends RegistryControlComponent implements AfterViewInit {
  @Input() id: string;
  @Input() formGroup: string;
  @Input() type = 'number';
  @Input() placeholder: string;
  @Input() require = true;

  constructor(protected registryService: RegistryService
    // private cdRef: ChangeDetectorRef
    ) {
    super(registryService);
  }

  ngAfterViewInit() {
    // this.cdRef.detectChanges();
  }
}
