import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter } from '@coachcare/datepicker';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { MomentDateAdapter } from '@coachcare/datepicker';
import { RegistryFormService } from './registry-form.service';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
const MY_DATE_FORMATS = {
  parse: {
    datetime: ['DD/MM/YYYY H:mm', 'DD/M/YYYY H:mm'],
    date: ['DD/MM/YYYY', 'DD/M/YYYY'],
    time: 'H:mm'
  },
  display: {
    datetime: 'DD/MM/YYYY H:mm',
    date: 'DD/MM/YYYY',
    time: 'H:mm',
    monthDayLabel: 'D MMMM',
    monthDayA11yLabel: 'D MMMM',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    dateA11yLabel: 'LLLL',
    timeLabel: 'HH:mm'
  }
};

export class CustomDateAdapter extends MomentDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}

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
      <mat-datepicker #picker touchUi="false" [type]="type" [twelveHour]="false"></mat-datepicker>
      <mat-hint>
        <a><ng-content></ng-content></a>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="bInfo">info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngIf="self.invalid && (self.dirty || self.touched)">
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
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class RegistryDatePickerComponent extends RegistryControlComponent implements OnInit {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() type = 'date';

  bInfo: boolean;
  self: AbstractControl;

  constructor(
    protected registryFormService: RegistryFormService,
    private elementRef: ElementRef,
    private dateAdapter: DateAdapter<Date>
  ) {
    super(registryFormService);

    dateAdapter.setLocale('th');
  }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('id', this.controlName);
    this.bInfo = this.hasInfo(this.controlName);

    this.self = this.formGroup.get(this.controlName);
  }
}
