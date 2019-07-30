import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Moment } from 'moment';

import { RegistryFormComponent } from '../../../shared/modules/registry-form/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { RegistryFormService } from '../../../shared/modules/registry-form/registry-form.service';
import { FormCompletion } from '../../../shared/modules/registry-form/registry-form.model';

import { ACSx290form } from './acsx290.form';
import { conditions } from './acsx290.condition';
import { validations } from './acsx290.validation';
import { ACSx290Service } from './acsx290.service';
import { tableOfContent } from './acsx290.toc';
import * as acsx290Data from './acsx290.data';
import { ACSx290Form, ACSx290FormCompletion } from './acsx290.model';
import { Staff } from '../../staff/staff.model';
import { SectionMember, FormDetail } from '../registry.model';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss']
})
export class ACSx290Component extends RegistryFormComponent implements OnInit, AfterViewInit, OnDestroy {
  // tslint:disable-next-line: variable-name
  private _fixed = false;

  public open = false;
  public spin = true;
  public direction = 'up'; // up, down, left, right
  public animationMode = 'fling'; // fling, scale

  get fixed(): boolean {
    return this._fixed;
  }

  set fixed(fixed: boolean) {
    this._fixed = fixed;
    if (this._fixed) {
      this.open = true;
    }
  }

  //#region FormGroup and FormDirective

  formDetail: FormDetail;
  formGroupA: FormGroup;
  formGroupB: FormGroup;
  formGroupC: FormGroup;
  formGroupD: FormGroup;
  formGroupE: FormGroup;
  formGroupF: FormGroup;
  formGroupG: FormGroup;
  formGroupH: FormGroup;
  formGroupI: FormGroup;
  formGroupJ: FormGroup;
  formGroupK: FormGroup;
  formGroupL: FormGroup;
  formGroupL2: FormGroup;
  formGroupM: FormGroup;
  formGroupM1: FormGroup;
  formGroupM2: FormGroup;
  formGroupM3: FormGroup;
  formGroupN: FormGroup;
  formGroupO: FormGroup;
  formGroupP: FormGroup;
  formGroupQ: FormGroup;
  formGroupR: FormGroup;
  formGroupS: FormGroup;

  @ViewChild('formDirectiveA', { static: true }) formDirectiveA: FormGroupDirective;
  @ViewChild('formDirectiveB', { static: true }) formDirectiveB: FormGroupDirective;
  @ViewChild('formDirectiveC', { static: true }) formDirectiveC: FormGroupDirective;
  @ViewChild('formDirectiveD', { static: true }) formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE', { static: true }) formDirectiveE: FormGroupDirective;
  @ViewChild('formDirectiveF', { static: true }) formDirectiveF: FormGroupDirective;
  @ViewChild('formDirectiveG', { static: true }) formDirectiveG: FormGroupDirective;
  @ViewChild('formDirectiveH', { static: true }) formDirectiveH: FormGroupDirective;
  @ViewChild('formDirectiveI', { static: true }) formDirectiveI: FormGroupDirective;
  @ViewChild('formDirectiveJ', { static: true }) formDirectiveJ: FormGroupDirective;
  @ViewChild('formDirectiveK', { static: true }) formDirectiveK: FormGroupDirective;
  @ViewChild('formDirectiveL', { static: true }) formDirectiveL: FormGroupDirective;
  @ViewChild('formDirectiveL2', { static: true }) formDirectiveL2: FormGroupDirective;
  @ViewChild('formDirectiveM', { static: true }) formDirectiveM: FormGroupDirective;
  @ViewChild('formDirectiveM1', { static: true }) formDirectiveM1: FormGroupDirective;
  @ViewChild('formDirectiveM2', { static: true }) formDirectiveM2: FormGroupDirective;
  @ViewChild('formDirectiveM3', { static: true }) formDirectiveM3: FormGroupDirective;
  @ViewChild('formDirectiveN', { static: true }) formDirectiveN: FormGroupDirective;
  @ViewChild('formDirectiveO', { static: true }) formDirectiveO: FormGroupDirective;
  @ViewChild('formDirectiveP', { static: true }) formDirectiveP: FormGroupDirective;
  @ViewChild('formDirectiveQ', { static: true }) formDirectiveQ: FormGroupDirective;
  @ViewChild('formDirectiveR', { static: true }) formDirectiveR: FormGroupDirective;
  @ViewChild('formDirectiveS', { static: true }) formDirectiveS: FormGroupDirective;

  private sectionMembers: SectionMember[];
  //#endregion

  //#region form data

  // tslint:disable: variable-name
  H_cathResults = acsx290Data.H_cathResults;
  J_cabg = acsx290Data.J_cabg;
  H_vad = acsx290Data.H_vad;
  M2_priorAoInt = acsx290Data.M2_priorAoInt;
  M2_device = acsx290Data.M2_device;
  // tslint:enable: variable-name

  cvt: Staff[];
  anesth: Staff[];
  rn: Staff[];
  ctt: Staff[];

  toc = tableOfContent;

  //#endregion

  gap = '20px';
  public mode = 'new'; // new, edit
  private registryId: string;
  private subscriptions: Subscription[] = [];
  result: ACSx290Form;

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    protected registryFormService: RegistryFormService,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    private acsx290Service: ACSx290Service,
    private location: Location
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, registryFormService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new UI.ChangeTitle('STS 2.9'));
    this.store.dispatch(new UI.StopLoading());
    this.createForm();
    this.loadStaffs();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.registryFormService.subscribeFormConditions();

    this.subscriptions.push(
      this.subscribeDOBChanged(),
      this.subscribeHeightCMChanged(),
      this.subscribeWeightKgChanged(),
      this.subscribeDHCATmChanged(),
      this.subscribeCPerfTimeChanged(),
      this.subscribeORExitDTChanged(),
      this.subscribeExtubateDTChanged(),
      this.subscribeVentHrsAChanged()
    );

    this.formGroupA.get('registryId').setValue('(new)');

    // Prevent ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.loadById();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscriptions.forEach(subs => subs.unsubscribe());
    // console.log('[ACSx290Component]: destroy');
  }

  private createForm() {
    this.formGroupA = this.formBuilder.group(ACSx290form.sectionA);
    this.formGroupB = this.formBuilder.group(ACSx290form.sectionB);
    this.formGroupC = this.formBuilder.group(ACSx290form.sectionC);
    this.formGroupD = this.formBuilder.group(ACSx290form.sectionD);
    this.formGroupE = this.formBuilder.group(ACSx290form.sectionE);
    this.formGroupF = this.formBuilder.group(ACSx290form.sectionF);
    this.formGroupG = this.formBuilder.group(ACSx290form.sectionG);
    this.formGroupH = this.formBuilder.group(ACSx290form.sectionH);
    this.formGroupI = this.formBuilder.group(ACSx290form.sectionI);
    this.formGroupJ = this.formBuilder.group(ACSx290form.sectionJ);
    this.formGroupK = this.formBuilder.group(ACSx290form.sectionK);
    this.formGroupL = this.formBuilder.group(ACSx290form.sectionL);
    this.formGroupL2 = this.formBuilder.group(ACSx290form.sectionL2);
    this.formGroupM = this.formBuilder.group(ACSx290form.sectionM);
    this.formGroupM1 = this.formBuilder.group(ACSx290form.sectionM1);
    this.formGroupM2 = this.formBuilder.group(ACSx290form.sectionM2);
    this.formGroupM3 = this.formBuilder.group(ACSx290form.sectionM3);
    this.formGroupN = this.formBuilder.group(ACSx290form.sectionN);
    this.formGroupO = this.formBuilder.group(ACSx290form.sectionO);
    this.formGroupP = this.formBuilder.group(ACSx290form.sectionP);
    this.formGroupQ = this.formBuilder.group(ACSx290form.sectionQ);
    this.formGroupR = this.formBuilder.group(ACSx290form.sectionR);
    this.formGroupS = this.formBuilder.group(ACSx290form.sectionS);

    this.sectionMembers = [
      ['A', this.formGroupA, this.formDirectiveA, conditions.sectionA],
      ['B', this.formGroupB, this.formDirectiveB, conditions.sectionB],
      ['C', this.formGroupC, this.formDirectiveC, conditions.sectionC],
      ['D', this.formGroupD, this.formDirectiveD, conditions.sectionD],
      ['E', this.formGroupE, this.formDirectiveE, conditions.sectionE],
      ['F', this.formGroupF, this.formDirectiveF, conditions.sectionF],
      ['G', this.formGroupG, this.formDirectiveG, conditions.sectionG],
      ['H', this.formGroupH, this.formDirectiveH, conditions.sectionH],
      ['I', this.formGroupI, this.formDirectiveI, conditions.sectionI],
      ['J', this.formGroupJ, this.formDirectiveJ, conditions.sectionJ],
      ['K', this.formGroupK, this.formDirectiveK, conditions.sectionK],
      ['L', this.formGroupL, this.formDirectiveL, conditions.sectionL],
      ['L2', this.formGroupL2, this.formDirectiveL2, conditions.sectionL2],
      ['M', this.formGroupM, this.formDirectiveM, conditions.sectionM],
      ['M1', this.formGroupM1, this.formDirectiveM1, conditions.sectionM1],
      ['M2', this.formGroupM2, this.formDirectiveM2, conditions.sectionM2],
      ['M3', this.formGroupM3, this.formDirectiveM3, conditions.sectionM3],
      ['N', this.formGroupN, this.formDirectiveN, conditions.sectionN],
      ['O', this.formGroupO, this.formDirectiveO, conditions.sectionO],
      ['P', this.formGroupP, this.formDirectiveP, conditions.sectionP],
      ['Q', this.formGroupQ, this.formDirectiveQ, conditions.sectionQ],
      ['R', this.formGroupR, this.formDirectiveR, conditions.sectionR],
      ['S', this.formGroupS, this.formDirectiveS, conditions.sectionS]
    ];

    this.registryFormService.initializeForm(this.sectionMembers, conditions, validations);
    this.registryFormService.setDataDict(require('raw-loader!./acsx290.dict.md'));
  }

  private loadStaffs() {
    this.subscriptions.push(
      this.acsx290Service.getStaffs().subscribe(staffs => {
        this.cvt = staffs.filter(e => e.position === 'Cardiothoracic Surgeon');
        this.anesth = staffs.filter(e => e.position === 'Anesthesiologist');
        this.rn = staffs.filter(e => e.position === 'Registered Nurse');
        this.ctt = staffs.filter(e => e.position === 'Cardiothoracic Technician');
      })
    );
  }

  private subscribeDOBChanged(): Subscription {
    return this.formGroupB.get('DOB').valueChanges.subscribe(value => {
      // this.formGroupB.get('Age').markAsTouched();
      const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // 2017-06-17T00:00:00.000Z

      if (isoPattern.test(value)) {
        return;
      }

      if (!value || !this.isMoment(value)) {
        this.formGroupB.get('Age').reset();
        return;
      }
      const dob = value as Moment;
      const age = -dob.diff(new Date(), 'years', false);
      this.formGroupB.get('Age').setValue(age);
    });
  }

  private subscribeHeightCMChanged(): Subscription {
    return this.formGroupD.get('HeightCM').valueChanges.subscribe(value => {
      this.calculateBMI();
    });
  }

  private subscribeWeightKgChanged(): Subscription {
    return this.formGroupD.get('WeightKg').valueChanges.subscribe(value => {
      this.calculateBMI();
    });
  }

  private calculateBMI() {
    const HeightCM = this.formGroupD.get('HeightCM').value;
    const WeightKg = this.formGroupD.get('WeightKg').value;

    if (HeightCM && WeightKg) {
      const BMI = +(WeightKg / (HeightCM / 100) / (HeightCM / 100)).toFixed(2);
      this.formGroupD.get('BMI').setValue(BMI);
    } else {
      this.formGroupD.get('BMI').reset();
    }
    // this.formGroupD.get('BMI').markAsTouched();
  }

  private subscribeDHCATmChanged(): Subscription {
    return this.formGroupI.get('DHCATm').valueChanges.subscribe(value => {
      this.calculateTotCircArrTm();
    });
  }

  private subscribeCPerfTimeChanged(): Subscription {
    return this.formGroupI.get('CPerfTime').valueChanges.subscribe(value => {
      this.calculateTotCircArrTm();
    });
  }

  private calculateTotCircArrTm() {
    const DHCATm = this.formGroupI.get('DHCATm').value;
    const CPerfTime = this.formGroupI.get('CPerfTime').value;

    if (DHCATm || CPerfTime) {
      const TotCircArrTm = DHCATm + CPerfTime;
      this.formGroupI.get('TotCircArrTm').setValue(TotCircArrTm);
    } else {
      this.formGroupI.get('TotCircArrTm').reset();
    }
    // this.formGroupI.get('TotCircArrTm').markAsTouched();
  }

  private subscribeORExitDTChanged(): Subscription {
    return this.formGroupI.get('ORExitDT').valueChanges.subscribe(value => {
      this.calculateVentHrsTot();
    });
  }

  private subscribeExtubateDTChanged(): Subscription {
    return this.formGroupI.get('ExtubateDT').valueChanges.subscribe(value => {
      this.calculateVentHrsTot();
    });
  }

  private subscribeVentHrsAChanged(): Subscription {
    return this.formGroupO.get('VentHrsA').valueChanges.subscribe(value => {
      this.calculateVentHrsTot();
    });
  }

  private calculateVentHrsTot() {
    const ORExitDT = this.formGroupI.get('ORExitDT').value as Moment;
    const ExtubateDT = this.formGroupI.get('ExtubateDT').value as Moment;
    const VentHrsA = this.formGroupO.get('VentHrsA').value;

    if ((ORExitDT && ExtubateDT) || VentHrsA) {
      const VentHrsTot = (ExtubateDT.diff(ORExitDT, 'minutes', false) / 60 + VentHrsA).toFixed(2);
      this.formGroupO.get('VentHrsTot').setValue(VentHrsTot);
    } else {
      this.formGroupO.get('VentHrsTot').reset();
    }
    // this.formGroupO.get('VentHrsTot').markAsTouched();
  }

  public async submit() {
    console.log('submit');

    this.registryFormService.submitAllSections();
    const data = this.archiveForm();

    const alert = this.acsx290Service.checkNeededDataCompletion(data);
    if (alert) {
      this.dialogService.createModalDialog({
        title: '!!Alert!!',
        content: `These information must fill before submitting ${alert}`,
        buttons: ['OK']
      });
      return;
    }

    this.acsx290Service.encryptSensitiveData(data);

    this.store.dispatch(new UI.StartLoading());
    if (this.mode === 'new') {
      if (await this.acsx290Service.isExistedForm(data)) {
        console.log('repeat form');
        this.store.dispatch(new UI.StopLoading());
        this.dialogService.createModalDialog({
          title: '!!Alert!!',
          content: `You can not create ACSx 2.9 registry more than one in same episode`,
          buttons: ['OK']
        });
        return;
      }

      console.log('new');
      this.registryId = await this.acsx290Service.createForm(data);
      this.formGroupA.get('registryId').setValue(this.registryId);
      this.location.go('/registry/acsx290/' + this.registryId);
      this.mode = 'edit';
    } else {
      console.log('edit');
      await this.acsx290Service.updateForm(this.registryId, data);
    }
    this.store.dispatch(new UI.StopLoading());
    this.registryFormService.markAllFormsUntouched();
  }

  private archiveForm(): ACSx290Form {
    const timestamp = this.acsx290Service.timestamp;

    if (this.mode === 'new') {
      this.formDetail = {
        baseDb: 'STS Adult Cardiac Surgery version 2.9',
        addendum: 'BDMS ACSx modefication version 0.1',
        createdAt: timestamp,
        createdBy: 'admin',
        modifiedAt: timestamp,
        modifiedBy: 'admin',
        deletedAt: null,
        deletedBy: null
      };
    } else {
      this.formDetail.modifiedAt = timestamp;
    }

    const acsx290Model: ACSx290Form = {
      detail: this.formDetail,
      completion: this.getFormCompletion(),
      sectionA: { ...this.formGroupA.value },
      sectionB: {
        ...this.formGroupB.value,
        DOB: this.serializeDateTime(this.formGroupB.get('DOB').value)
      },
      sectionC: {
        ...this.formGroupC.value,
        AdmitDt: this.serializeDateTime(this.formGroupC.get('AdmitDt').value),
        SurgDt: this.serializeDateTime(this.formGroupC.get('SurgDt').value)
      },
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value },
      sectionF: { ...this.formGroupF.value },
      sectionG: { ...this.formGroupG.value },
      sectionH: {
        ...this.formGroupH.value,
        CarCathDt: this.serializeDateTime(this.formGroupH.get('CarCathDt').value)
      },
      sectionI: {
        ...this.formGroupI.value,
        PCancCaseDt: this.serializeDateTime(this.formGroupI.get('PCancCaseDt').value),
        OREntryDT: this.serializeDateTime(this.formGroupI.get('OREntryDT').value),
        ORExitDT: this.serializeDateTime(this.formGroupI.get('ORExitDT').value),
        IntubateDT: this.serializeDateTime(this.formGroupI.get('IntubateDT').value),
        ExtubateDT: this.serializeDateTime(this.formGroupI.get('ExtubateDT').value),
        SIStartDT: this.serializeDateTime(this.formGroupI.get('SIStartDT').value),
        SIStopDT: this.serializeDateTime(this.formGroupI.get('SIStopDT').value),
        AnesEndDT: this.serializeDateTime(this.formGroupI.get('AnesEndDT').value)
      },
      sectionJ: { ...this.formGroupJ.value },
      sectionK: { ...this.formGroupK.value },
      sectionL: { ...this.formGroupL.value },
      sectionL2: {
        ...this.formGroupL2.value,
        PrevVADD: this.serializeDateTime(this.formGroupL2.get('PrevVADD').value),
        PrevVADExpDt: this.serializeDateTime(this.formGroupL2.get('PrevVADExpDt').value),
        VImpDt: this.serializeDateTime(this.formGroupL2.get('VImpDt').value),
        VImpDt2: this.serializeDateTime(this.formGroupL2.get('VImpDt2').value),
        VImpDt3: this.serializeDateTime(this.formGroupL2.get('VImpDt3').value),
        VExpDt: this.serializeDateTime(this.formGroupL2.get('VExpDt').value),
        VExpDt2: this.serializeDateTime(this.formGroupL2.get('VExpDt2').value),
        VExpDt3: this.serializeDateTime(this.formGroupL2.get('VExpDt3').value)
      },
      sectionM: { ...this.formGroupM.value },
      sectionM1: { ...this.formGroupM1.value },
      sectionM2: {
        ...this.formGroupM2.value,
        DisOnsetDt: this.serializeDateTime(this.formGroupM2.get('DisOnsetDt').value)
      },
      sectionM3: { ...this.formGroupM3.value },
      sectionN: { ...this.formGroupN.value },
      sectionO: { ...this.formGroupO.value },
      sectionP: {
        ...this.formGroupP.value,
        DeepSternInfDt: this.serializeDateTime(this.formGroupP.get('DeepSternInfDt').value)
      },
      sectionQ: {
        ...this.formGroupQ.value,
        LFUDate: this.serializeDateTime(this.formGroupQ.get('LFUDate').value),
        DischDt: this.serializeDateTime(this.formGroupQ.get('DischDt').value),
        MtDate: this.serializeDateTime(this.formGroupQ.get('MtDate').value)
      },
      sectionR: {
        ...this.formGroupR.value,
        ReadmitDt: this.serializeDateTime(this.formGroupR.get('ReadmitDt').value)
      },
      sectionS: { ...this.formGroupS.value }
    };

    this.result = acsx290Model;

    return acsx290Model;
  }

  private getFormCompletion(): ACSx290FormCompletion {
    const completion: ACSx290FormCompletion = {
      summary: null,
      sectionA: null,
      sectionB: null,
      sectionC: null,
      sectionD: null,
      sectionE: null,
      sectionF: null,
      sectionG: null,
      sectionH: null,
      sectionI: null,
      sectionJ: null,
      sectionK: null,
      sectionL: null,
      sectionL2: null,
      sectionM: null,
      sectionM1: null,
      sectionM2: null,
      sectionM3: null,
      sectionN: null,
      sectionO: null,
      sectionP: null,
      sectionQ: null,
      sectionR: null,
      sectionS: null
    };

    const summary: FormCompletion = {
      valid: 0,
      total: 0
    };

    Object.keys(completion).forEach(key => {
      if (key !== 'summary') {
        const sectionCompletion = this.registryFormService.getSectionCompletion(key.substr(7));
        completion[key] = sectionCompletion;
        summary.valid += sectionCompletion.valid;
        summary.total += sectionCompletion.total;
      }
    });

    completion.summary = summary;

    return completion;
  }

  private isMoment(dateTime: any): dateTime is Moment {
    return dateTime !== null && (dateTime as Moment).toISOString !== undefined;
  }

  private serializeDateTime(dateTime: any): any {
    return this.isMoment(dateTime) ? dateTime.toISOString() : dateTime;
  }

  private async loadById() {
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.store.dispatch(new UI.StartLoading());

      const registryId = this.route.snapshot.paramMap.get('id');
      const data = await this.acsx290Service.getForm(registryId);
      this.store.dispatch(new UI.StopLoading());

      if (data) {
        console.log(data);
        this.acsx290Service.decryptSenitiveData(data);
        this.setFormValue(data);

        this.mode = 'edit';
        this.registryId = registryId;
      } else {
        this.router.navigate(['registry/acsx290']);
      }
    }
  }

  private setFormValue(acsx290Model: ACSx290Form) {
    this.formDetail = acsx290Model.detail;
    this.formGroupA.setValue(acsx290Model.sectionA);
    this.formGroupB.setValue(acsx290Model.sectionB);
    this.formGroupC.setValue(acsx290Model.sectionC);
    this.formGroupD.setValue(acsx290Model.sectionD);
    this.formGroupE.setValue(acsx290Model.sectionE);
    this.formGroupF.setValue(acsx290Model.sectionF);
    this.formGroupG.setValue(acsx290Model.sectionG);
    this.formGroupH.setValue(acsx290Model.sectionH);
    this.formGroupI.setValue(acsx290Model.sectionI);
    this.formGroupJ.setValue(acsx290Model.sectionJ);
    this.formGroupK.setValue(acsx290Model.sectionK);
    this.formGroupL.setValue(acsx290Model.sectionL);
    this.formGroupL2.setValue(acsx290Model.sectionL2);
    this.formGroupM.setValue(acsx290Model.sectionM);
    this.formGroupM1.setValue(acsx290Model.sectionM1);
    this.formGroupM2.setValue(acsx290Model.sectionM2);
    this.formGroupM3.setValue(acsx290Model.sectionM3);
    this.formGroupN.setValue(acsx290Model.sectionN);
    this.formGroupO.setValue(acsx290Model.sectionO);
    this.formGroupP.setValue(acsx290Model.sectionP);
    this.formGroupQ.setValue(acsx290Model.sectionQ);
    this.formGroupR.setValue(acsx290Model.sectionR);
    this.formGroupS.setValue(acsx290Model.sectionS);
  }

  async submitAndExit() {
    await this.submit();
    this.router.navigate(['registry']);
  }

  clear() {
    this.registryFormService.clear();
  }

  checkValidation() {
    this.registryFormService.submitAllSections();
  }

  clearValidations() {
    this.registryFormService.clearErrors();
  }

  downloadCSV() {
    //   this.archiveRegistry();
    //   this.fileService.saveJSONtoCSV([this.result], 'art.csv');
  }

  downloadJSON() {
    //   this.archiveRegistry();
    //   this.fileService.saveJSONtoFile([this.result]);
  }

  doAction(action: string) {
    console.log(action);
  }
}
