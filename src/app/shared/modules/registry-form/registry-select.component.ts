import { Component, Input, EventEmitter, Output, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { RegistryFormService } from './registry-form.service';
import { RegSelectChoice, RegSelectChoiceGroup } from './registry-form.model';

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
        <div *ngIf="group; else no_group">
          <mat-optgroup *ngFor="let group of regSelectChoiceGroups" [label]="group.name">
            <mat-option *ngFor="let choice of group.choices" [value]="choice.value" [disabled]="choice.disable">
              {{ choice.label }}
              <div *ngIf="choice.detailHtml">
                <span class="detail-html" [innerHTML]="choice.detailHtml"></span>
              </div>
            </mat-option>
          </mat-optgroup>
        </div>
        <ng-template #no_group>
          <mat-option *ngFor="let choice of regSelectChoices" [value]="choice.value" [disabled]="choice.disable">
            {{ choice.label }}
            <div *ngIf="choice.detailHtml">
              <span class="detail-html" [innerHTML]="choice.detailHtml"></span>
            </div>
          </mat-option>
        </ng-template>
      </mat-select>
      <mat-hint>
        <a><ng-content></ng-content></a>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="bInfo">info_outline</mat-icon>
      </mat-hint>
      <mat-error *ngIf="self.invalid && (self.dirty || self.touched)">
        <div *ngFor="let validation of getValidations(controlName)">
          <div *ngIf="isInvalid(formGroup, controlName, validation.type)">
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
  @Input() group = false;
  @Input() choices: string[] | number[] | RegSelectChoice[];
  @Output() choiceChange: EventEmitter<MatSelectChange> = new EventEmitter();

  bInfo: boolean;
  self: AbstractControl;
  regSelectChoices: RegSelectChoice[] = [];
  regSelectChoiceGroups: RegSelectChoiceGroup[] = [];

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
      this.regSelectChoiceGroups = [];

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

      if (this.group) {
        // console.log('need group');

        this.regSelectChoices.forEach(
          ((hash: RegSelectChoiceGroup) => {
            return (a: RegSelectChoice) => {
              if (!hash[a.group]) {
                hash[a.group] = { name: a.group, choices: [] };
                this.regSelectChoiceGroups.push(hash[a.group]);
              }
              hash[a.group].choices.push(a);
            };
          })(Object.create(null))
        );
        // console.log(this.regSelectChoiceGroups);
      }
    }
  }

  selectionChange(event: MatSelectChange) {
    this.choiceChange.emit(event);
  }
}
