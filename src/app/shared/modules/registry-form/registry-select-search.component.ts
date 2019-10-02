import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectChange, MatSelect } from '@angular/material';

import { RegistryControlComponent } from './registry-control.component';
import { AbstractControl } from '@angular/forms';
import { RegistryFormService } from './registry-form.service';
import { RegSelectChoice } from './registry-form.model';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-select-search',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <mat-select
        [formControlName]="controlName"
        [required]="require"
        [placeholder]="placeholder"
        (selectionChange)="selectionChange($event)"
        #singleSelect
      >
        <mat-select-trigger>
          {{ outputLabel }}
        </mat-select-trigger>
        <mat-option>
          <ngx-mat-select-search placeholderLabel="Choose..." noEntriesFoundLabel="No result" [formControl]="filterCtrl"></ngx-mat-select-search>
        </mat-option>
        <mat-option *ngIf="nullOption" [value]="null">--</mat-option>
        <mat-option *ngFor="let choice of filteredChoices | async" [value]="choice.value" [disabled]="choice.disable"
          >{{ choice.label }}
          <div *ngIf="choice.detailHtml">
            <span class="detail-html" [innerHTML]="choice.detailHtml"></span>
          </div>
        </mat-option>
      </mat-select>
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
  styles: [
    `
      .detail-html {
        opacity: 0.7;
        font-size: 12px;
        display: table-cell;
        height: 25px;
        line-height: 0px;
        padding: 0 10px;
      }

      .detail-html span {
        color: red;
      }
    `
  ]
})
export class RegistrySelectSearchComponent extends RegistryControlComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() nullOption = true;
  @Input() choices: string[] | number[] | RegSelectChoice[];
  @Output() choiceChange: EventEmitter<MatSelectChange> = new EventEmitter();

  get outputLabel() {
    if (this.self.value === null) {
      return '';
    }
    return this.regSelectChoices.find(c => c.value === this.self.value).label;
  }

  /** control for the MatSelect filter keyword */
  public filterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredChoices: ReplaySubject<RegSelectChoice[]> = new ReplaySubject<RegSelectChoice[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected onDestroySubject = new Subject<void>();

  bInfo: boolean;
  self: AbstractControl;
  regSelectChoices: RegSelectChoice[] = [];
  htm = '<strong>Test</strong>';

  constructor(protected registryFormService: RegistryFormService, private elementRef: ElementRef) {
    super(registryFormService);
  }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('id', this.controlName);
    this.bInfo = this.hasInfo(this.controlName);
    this.self = this.formGroup.get(this.controlName);

    // listen for search field value changes
    this.filterCtrl.valueChanges.pipe(takeUntil(this.onDestroySubject)).subscribe(() => {
      this.filterBanks();
    });
  }

  ngAfterViewInit() {
    // this.setInitialValue();
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
      this.filteredChoices.next(this.regSelectChoices.slice());
    }
  }

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

  selectionChange(event: MatSelectChange) {
    this.choiceChange.emit(event);
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredChoices
      .pipe(
        take(1),
        takeUntil(this.onDestroySubject)
      )
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: RegSelectChoice, b: RegSelectChoice) => a && b && a.value === b.value;
      });
  }

  protected filterBanks() {
    if (!this.choices) {
      return;
    }
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredChoices.next(this.regSelectChoices.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks)
    this.filteredChoices.next(
      this.regSelectChoices.filter(
        bank =>
          bank.label
            .toString()
            .toLowerCase()
            .indexOf(search) > -1
      )
    );
  }
}
