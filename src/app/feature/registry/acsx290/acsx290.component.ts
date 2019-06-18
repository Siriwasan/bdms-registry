import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseRegistryComponent } from '../../../shared/components/registry/base-registry.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';

import { ACSx290form } from './acsx290.form';
import { formConditions } from './acsx290.condition';
import { validations } from './acsx290.validation';
import { ACSx290Model } from './acsx290.model';
import { RegistryService } from '../registry.service';

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss']
})
export class ACSx290Component extends BaseRegistryComponent implements OnInit, AfterViewInit, OnDestroy {
  formGroupA: FormGroup;
  formGroupB: FormGroup;
  formGroupD: FormGroup;
  formGroupE: FormGroup;

  @ViewChild('formDirectiveA', { static: true }) formDirectiveA: FormGroupDirective;
  @ViewChild('formDirectiveB', { static: true }) formDirectiveB: FormGroupDirective;
  @ViewChild('formDirectiveD', { static: true }) formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE', { static: true }) formDirectiveE: FormGroupDirective;

  gap = '20px';

  result: ACSx290Model;
  flatResult: object;
  private subscriptions: Subscription[] = [];

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    private formBuilder: FormBuilder,
    public registrySerice: RegistryService
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, registrySerice);
  }

  ngOnInit() {
    super.ngOnInit();

    // this.store.dispatch(new UI.ChangeTitle('STS 2.9'));
    this.createForm();
    this.registrySerice.setDataDict(require('raw-loader!./acsx290.dict.md'));
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    // // Prevent ExpressionChangedAfterItHasBeenCheckedError
    // setTimeout(() => {
    //   this.loadById();
    // });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.forEach(subs => subs.unsubscribe());
    console.log('destroy');
  }

  private createForm() {
    this.formGroupA = this.formBuilder.group(ACSx290form.sectionA);
    this.formGroupB = this.formBuilder.group(ACSx290form.sectionB);
    this.formGroupD = this.formBuilder.group(ACSx290form.sectionD);
    this.formGroupE = this.formBuilder.group(ACSx290form.sectionE);

    this.registrySerice.setSectionMembers([
      ['A', this.formGroupA, this.formDirectiveA, formConditions.sectionA],
      ['B', this.formGroupB, this.formDirectiveB, formConditions.sectionB],
      ['D', this.formGroupD, this.formDirectiveD, formConditions.sectionD],
      ['E', this.formGroupE, this.formDirectiveE, formConditions.sectionE]
    ]);

    this.registrySerice.initializeForm(formConditions, validations);

    this.registrySerice.setDataDict(require('raw-loader!./acsx290.dict.md'));
    this.registrySerice.setValidations(validations);
    this.registrySerice.setFormConditions(formConditions);
    this.registrySerice.setSectionMembers([
      ['A', this.formGroupA, this.formDirectiveA, formConditions.sectionA],
      ['B', this.formGroupB, this.formDirectiveB, formConditions.sectionB],
      ['D', this.formGroupD, this.formDirectiveD, formConditions.sectionD],
      ['E', this.formGroupE, this.formDirectiveE, formConditions.sectionE]
    ]);
  }

  submit() {
    console.log('submit');
    this.registrySerice.submitAllSections();
    this.archiveRegistry();

    // this.sts29Service.saveForm(this.result);
  }

  archiveRegistry() {
    this.result = {
      description: {
        baseDb: 'STS Adult Cardiac Surgery version 2.9',
        addendum: 'BDMS modefied version 1.0'
      },
      sectionA: { ...this.formGroupA.value },
      sectionB: { ...this.formGroupB.value },
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value }
    };
    this.flatResult = {
      ...this.result.description,
      ...this.result.sectionA,
      ...this.result.sectionB,
      ...this.result.sectionD,
      ...this.result.sectionE
    };
  }

  loadById() {
    // if (this.route.snapshot.params.hasOwnProperty('id')) {
    //   this.store.dispatch(new UI.StartLoading());
    //   this.subscriptions.push(
    //     this.route.paramMap
    //       .pipe(switchMap((params: ParamMap) => this.sts29Service.loadForm(params.get('id'))))
    //       .subscribe(data => {
    //         console.log(data);
    //         this.formGroupA.setValue(data.sectionA);
    //         this.formGroupD.setValue(data.sectionD);
    //         this.formGroupE.setValue(data.sectionE);
    //         this.store.dispatch(new UI.StopLoading());
    //       })
    //   );
    // }
  }

  clear() {
    this.registrySerice.clear();
  }

  clearErrors() {
    this.registrySerice.clearErrors();
  }

  openInfo(control: string) {
    this.registrySerice.openInfo(control);
  }

  hasInfo(control: string): boolean {
    return this.registrySerice.hasInfo(control);
  }

  downloadCSV() {
    //   this.archiveRegistry();
    //   this.fileService.saveJSONtoCSV([this.result], 'art.csv');
  }

  downloadJSON() {
    //   this.archiveRegistry();
    //   this.fileService.saveJSONtoFile([this.result]);
  }
}
