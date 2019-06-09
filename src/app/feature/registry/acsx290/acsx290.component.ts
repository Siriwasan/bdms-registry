import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';

import { BaseRegistryComponent } from '../../../shared/components/base-registry/base-registry.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';

import { ACSx290form } from './acsx290.form';
import { formConditions } from './acsx290.condition';
import { validations } from './acsx290.validation';
import { ACSx290Model } from './acsx290.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss']
})
export class ACSx290Component extends BaseRegistryComponent implements OnInit, AfterViewInit, OnDestroy {
  formGroupA: FormGroup;
  formGroupD: FormGroup;
  formGroupE: FormGroup;

  @ViewChild('formDirectiveA', { static: true }) formDirectiveA: FormGroupDirective;
  @ViewChild('formDirectiveD', { static: true }) formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE', { static: true }) formDirectiveE: FormGroupDirective;

  result: ACSx290Model;
  flatResult: object;
  private subscriptions: Subscription[] = [];

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    private formBuilder: FormBuilder
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement);
  }

  ngOnInit() {
    super.ngOnInit();

    // this.store.dispatch(new UI.ChangeTitle('STS 2.9'));
    this.createForm();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    // // Prevent ExpressionChangedAfterItHasBeenCheckedError
    // setTimeout(() => {
    //   this.loadById();
    // });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private createForm() {
    this.formGroupA = this.formBuilder.group(ACSx290form.sectionA);
    this.formGroupD = this.formBuilder.group(ACSx290form.sectionD);
    this.formGroupE = this.formBuilder.group(ACSx290form.sectionE);

    this.setSectionMembers([
      ['A', this.formGroupA, this.formDirectiveA, formConditions.sectionA],
      ['D', this.formGroupD, this.formDirectiveD, formConditions.sectionD],
      ['E', this.formGroupE, this.formDirectiveE, formConditions.sectionE]
    ]);

    this.initializeForm(formConditions, validations);
  }

  submit() {
    console.log('submit');
    this.submitAllSections();
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
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value }
    };
    this.flatResult = {
      ...this.result.description,
      ...this.result.sectionA,
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
    super.clear();
  }

  clearErrors() {
    super.clearErrors();
  }

  clickInfo() {
    this.openDialog();
  }

  openDialog() {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;

    // this.dialog.open(RegistryInfoDialogComponent, dialogConfig);
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
