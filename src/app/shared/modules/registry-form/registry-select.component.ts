import { Component, Input, EventEmitter, Output, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { RegistryFormService } from './registry-form.service';
import { RegSelectChoice } from './registry-form.model';

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
        <mat-option *ngIf="nullOption" [value]="null">--</mat-option>
        <mat-option *ngFor="let choice of regSelectChoices" [value]="choice.value" [disabled]="choice.disable">{{
          choice.label
        }}</mat-option>
      </mat-select>
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
export class RegistrySelectComponent extends RegistryControlComponent implements OnInit, OnChanges {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() nullOption = true;
  @Input() choices: string[] | number[] | RegSelectChoice[];
  @Output() choiceChange: EventEmitter<MatSelectChange> = new EventEmitter();

  bInfo: boolean;
  self: AbstractControl;
  regSelectChoices: RegSelectChoice[] = [];

  constructor(protected registryFormService: RegistryFormService, private elementRef: ElementRef) {
    super(registryFormService);
  }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('id', this.controlName);
    this.bInfo = this.hasInfo(this.controlName);

    this.self = this.formGroup.get(this.controlName);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.choices) {
      this.regSelectChoices = [];
      if (!this.choices) {
        return;
      }
      switch (typeof this.choices[0]) {
        case 'string':
        case 'number':
          this.choices.forEach(c => {
            this.regSelectChoices.push({ label: c, value: c, disable: false });
          });
          break;
        default:
          this.regSelectChoices = this.choices as RegSelectChoice[];
          break;
      }
    }
  }

  selectionChange(event: MatSelectChange) {
    this.choiceChange.emit(event);
  }
}
