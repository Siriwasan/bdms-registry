import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as moment from 'moment';

import { RegistryFormComponent } from '../../../shared/modules/registry-form/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { RegistryFormService } from '../../../shared/modules/registry-form/registry-form.service';
import {
  FormCompletion,
  SectionMember,
  RegSelectChoice
} from '../../../shared/modules/registry-form/registry-form.model';

import { ACSx290form } from './acsx290.form';
import { conditions } from './acsx290.condition';
import { validations } from './acsx290.validation';
import { ACSx290Service } from './acsx290.service';
import { tableOfContent } from './acsx290.toc';
import * as acsx290Data from './acsx290.data';
import * as registryData from '../registry.data';
import { ACSx290Model, ACSx290Completion } from './acsx290.model';
import { Staff } from '../../staff/staff.model';
import { FormDetail } from '../registry.model';

import * as Auth from '../../../core/auth/auth.data';
import { User } from '../../../../app/core/auth/user.model';
import { AuthService } from 'src/app/core/auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss'],
  providers: [ACSx290Service]
})
export class ACSx290Component extends RegistryFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;
  avHospitals: string[];
  avHospitalsNullOption = true;

  // FAB
  open = false;

  public completion: ACSx290Completion;

  get current() {
    if (!this.completion) {
      return 0;
    }
    return this.completion.summary.valid;
  }

  get max() {
    if (!this.completion) {
      return 1;
    }
    return this.completion.summary.total;
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
  nationality = registryData.nationality;
  H_cathResults = acsx290Data.H_cathResults;
  J_cabg = acsx290Data.J_cabg;
  H_vad = acsx290Data.H_vad;
  M2_priorAoInt = acsx290Data.M2_priorAoInt;
  M2_device = acsx290Data.M2_device;
  // tslint:enable: variable-name

  staffs: Staff[];
  cvt: RegSelectChoice[];
  anesth: RegSelectChoice[];
  sn: RegSelectChoice[];
  ctt: RegSelectChoice[];

  toc = tableOfContent;
  public visibles: { [id: string]: boolean } = {};

  //#endregion

  gap = '20px';
  public mode = 'new'; // new, edit
  private registryId: string;
  private subscriptions: Subscription[] = [];
  result: ACSx290Model;

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
    private location: Location,
    private authService: AuthService
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, registryFormService);
  }

  async ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new UI.ChangeTitle('STS 2.9'));
    this.store.dispatch(new UI.StopLoading());
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    this.createForm();
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();

    this.registryFormService.subscribeFormConditions();

    this.subscriptions.push(
      // this.subscribeOpCABChanged(),
      // this.subscribeOpValveChanged(),
      // this.subscribeOpOCardChanged(),
      // this.subscribeAFibProcChanged(),
      // this.subscribeAortProcChanged(),
      // this.subscribeOCarCongChanged(),
      // this.subscribeOpONCardChanged(),
      // this.subscribeDischMortStatChanged(),

      this.subscribeHospNameChanged(),
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
    // setTimeout(() => {
    //   await this.loadById();
    // });

    this.staffs = await this.acsx290Service.getStaffs();
    this.avHospitals = this.authService
      .getAvailableHospitals(this.user.staff.primaryHospId, this.user.staff.permission)
      .map(hosp => hosp.id);

    await this.loadById();

    this.completion = this.getFormCompletion();
    this.calculateCompletion();

    this.subscriptions.push(
      this.subscribeOpCABChanged(),
      this.subscribeOpValveChanged(),
      this.subscribeOpOCardChanged(),
      this.subscribeAFibProcChanged(),
      this.subscribeAortProcChanged(),
      this.subscribeOCarCongChanged(),
      this.subscribeOpONCardChanged(),
      this.subscribeDischMortStatChanged()
    );

    // console.log(this.sectionMembers);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscriptions.forEach(subs => subs.unsubscribe());
    // console.log('[ACSx290Component]: destroy');
    this.userSubscription.unsubscribe();
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

    this.registryFormService.initializeForm(
      this.sectionMembers,
      conditions,
      validations,
      this.visibles
    );
    this.registryFormService.setDataDict(require('raw-loader!./acsx290.dict.md'));
  }

  private async loadStaffs() {
    this.formGroupI.get('SurgeonId').setValue(null);
    this.formGroupI.get('Assist1Id').setValue(null);
    this.formGroupI.get('Assist2Id').setValue(null);
    this.formGroupI.get('Assist3Id').setValue(null);
    this.formGroupI.get('Assist4Id').setValue(null);
    this.formGroupI.get('Assist5Id').setValue(null);
    this.formGroupI.get('Assist6Id').setValue(null);
    this.formGroupI.get('Anesth1Id').setValue(null);
    this.formGroupI.get('Anesth2Id').setValue(null);
    this.formGroupI.get('Scrub1Id').setValue(null);
    this.formGroupI.get('Scrub2Id').setValue(null);
    this.formGroupI.get('Scrub3Id').setValue(null);
    this.formGroupI.get('Scrub4Id').setValue(null);
    this.formGroupI.get('CTT1Id').setValue(null);
    this.formGroupI.get('CTT2Id').setValue(null);
    this.formGroupI.get('CTT3Id').setValue(null);
    this.formGroupI.get('CTT4Id').setValue(null);

    const hospId = this.formGroupC.get('HospName').value;
    if (!hospId) {
      this.cvt = null;
      this.anesth = null;
      this.sn = null;
      this.ctt = null;
      return;
    }

    const filterStaff = (staff: Staff, positions: string[]) =>
      positions.includes(staff.position) &&
      (staff.primaryHospId === hospId || staff.secondHospIds.includes(hospId));

    const staffToChoice = (staff: Staff) => {
      return {
        value: staff.staffId,
        label: staff.title + ' ' + staff.firstName + ' ' + staff.lastName,
        disable: false
      } as RegSelectChoice;
    };

    this.cvt = this.staffs
      .filter(staff => filterStaff(staff, ['Cardiothoracic Surgeon', 'Interventionist']))
      .map(staffToChoice);
    this.anesth = this.staffs
      .filter(staff => filterStaff(staff, ['Anesthesiologist']))
      .map(staffToChoice);
    this.sn = this.staffs.filter(staff => filterStaff(staff, ['Scrub Nurse'])).map(staffToChoice);
    this.ctt = this.staffs
      .filter(staff => filterStaff(staff, ['Cardiothoracic Technician']))
      .map(staffToChoice);
  }

  private subscribeOpCABChanged(): Subscription {
    return this.formGroupI.get('OpCAB').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('J');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionJ'] = sectionCompletion;
    });
  }

  private subscribeOpValveChanged(): Subscription {
    return this.formGroupI.get('OpValve').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('K');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionK'] = sectionCompletion;
    });
  }

  private subscribeOpOCardChanged(): Subscription {
    return this.formGroupI.get('OpOCard').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('M');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionM'] = sectionCompletion;
    });
  }

  private subscribeAFibProcChanged(): Subscription {
    return this.formGroupI.get('AFibProc').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('M1');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionM1'] = sectionCompletion;
    });
  }

  private subscribeAortProcChanged(): Subscription {
    return this.formGroupI.get('AortProc').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('M2');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionM2'] = sectionCompletion;
    });
  }

  private subscribeOCarCongChanged(): Subscription {
    return this.formGroupM.get('OCarCong').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('M3');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionM3'] = sectionCompletion;
    });
  }

  private subscribeOpONCardChanged(): Subscription {
    return this.formGroupI.get('OpONCard').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('N');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionN'] = sectionCompletion;
    });
  }

  private subscribeDischMortStatChanged(): Subscription {
    return this.formGroupQ.get('DischMortStat').valueChanges.subscribe(value => {
      const sectionCompletion = this.registryFormService.getSectionCompletion('R');
      // tslint:disable-next-line: no-string-literal
      this.completion['sectionR'] = sectionCompletion;
    });
  }

  private subscribeHospNameChanged(): Subscription {
    return this.formGroupC.get('HospName').valueChanges.subscribe(value => {
      this.loadStaffs();

      const el = document.getElementById('beforeSelectStaff');
      if (value) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
    });
  }

  private subscribeDOBChanged(): Subscription {
    return this.formGroupB.get('DOB').valueChanges.subscribe(value => {
      // this.formGroupB.get('Age').markAsTouched();
      // const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // 2017-06-17T00:00:00.000Z

      // if (isoPattern.test(value)) {
      //   return;
      // }

      // if (!value || !this.isMoment(value)) {
      //   this.formGroupB.get('Age').reset();
      //   return;
      // }
      // const dob = value as Moment;
      // const age = -dob.diff(new Date(), 'years', false);
      // this.formGroupB.get('Age').setValue(age);

      const dob = moment(value);
      if (!dob.isValid()) {
        this.formGroupB.get('Age').reset();
        return;
      }

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
    const ORExitDT = moment(this.formGroupI.get('ORExitDT').value);
    const ExtubateDT = moment(this.formGroupI.get('ExtubateDT').value);
    const VentHrsA = this.formGroupO.get('VentHrsA').value;

    if ((ORExitDT && ExtubateDT) || VentHrsA) {
      const VentHrsTot = (ExtubateDT.diff(ORExitDT, 'minutes', false) / 60 + VentHrsA).toFixed(2);
      this.formGroupO.get('VentHrsTot').setValue(VentHrsTot);
    } else {
      this.formGroupO.get('VentHrsTot').reset();
    }
    // this.formGroupO.get('VentHrsTot').markAsTouched();
  }

  public async submit(exit = false) {
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

      this.registryId = await this.acsx290Service.createForm(data);
      console.log(this.registryId);
      this.mode = 'edit';
      this.formGroupA.get('registryId').setValue(this.registryId);
      if (!exit) {
        this.location.go('/registry/acsx290/' + this.registryId);
      }
    } else {
      await this.acsx290Service.updateForm(this.registryId, data);
    }
    this.store.dispatch(new UI.StopLoading());
    this.registryFormService.markAllFormsUntouched();
  }

  private archiveForm(): ACSx290Model {
    const timestamp = this.acsx290Service.timestamp;

    if (this.mode === 'new') {
      this.formDetail = {
        baseDbId: 'ACSx290',
        baseDb: 'STS Adult Cardiac Surgery v2.9',
        addendum: 'BDMS ACSx modefication v0.1',
        createdAt: timestamp,
        createdBy: this.user.staff.staffId,
        modifiedAt: timestamp,
        modifiedBy: this.user.staff.staffId,
        deletedAt: null,
        deletedBy: null
      };
    } else {
      this.formDetail.modifiedAt = timestamp;
      this.formDetail.modifiedBy = this.user.staff.staffId;
    }

    const acsx290Model: ACSx290Model = {
      detail: this.formDetail,
      completion: this.getFormCompletion(),
      sectionA: { ...this.formGroupA.value },
      sectionB: {
        ...this.formGroupB.value,
        DOB: this.serializeDate(this.formGroupB.get('DOB').value)
      },
      sectionC: {
        ...this.formGroupC.value,
        AdmitDt: this.serializeDate(this.formGroupC.get('AdmitDt').value),
        SurgDt: this.serializeDate(this.formGroupC.get('SurgDt').value)
      },
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value },
      sectionF: { ...this.formGroupF.value },
      sectionG: { ...this.formGroupG.value },
      sectionH: {
        ...this.formGroupH.value,
        CarCathDt: this.serializeDate(this.formGroupH.get('CarCathDt').value)
      },
      sectionI: {
        ...this.formGroupI.value,
        PCancCaseDt: this.serializeDate(this.formGroupI.get('PCancCaseDt').value),
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
        PrevVADD: this.serializeDate(this.formGroupL2.get('PrevVADD').value),
        PrevVADExpDt: this.serializeDate(this.formGroupL2.get('PrevVADExpDt').value),
        VImpDt: this.serializeDate(this.formGroupL2.get('VImpDt').value),
        VImpDt2: this.serializeDate(this.formGroupL2.get('VImpDt2').value),
        VImpDt3: this.serializeDate(this.formGroupL2.get('VImpDt3').value),
        VExpDt: this.serializeDate(this.formGroupL2.get('VExpDt').value),
        VExpDt2: this.serializeDate(this.formGroupL2.get('VExpDt2').value),
        VExpDt3: this.serializeDate(this.formGroupL2.get('VExpDt3').value)
      },
      sectionM: { ...this.formGroupM.value },
      sectionM1: { ...this.formGroupM1.value },
      sectionM2: {
        ...this.formGroupM2.value,
        DisOnsetDt: this.serializeDate(this.formGroupM2.get('DisOnsetDt').value)
      },
      sectionM3: { ...this.formGroupM3.value },
      sectionN: { ...this.formGroupN.value },
      sectionO: { ...this.formGroupO.value },
      sectionP: {
        ...this.formGroupP.value,
        DeepSternInfDt: this.serializeDate(this.formGroupP.get('DeepSternInfDt').value)
      },
      sectionQ: {
        ...this.formGroupQ.value,
        LFUDate: this.serializeDate(this.formGroupQ.get('LFUDate').value),
        DischDt: this.serializeDate(this.formGroupQ.get('DischDt').value),
        MtDate: this.serializeDate(this.formGroupQ.get('MtDate').value)
      },
      sectionR: {
        ...this.formGroupR.value,
        ReadmitDt: this.serializeDate(this.formGroupR.get('ReadmitDt').value)
      },
      sectionS: { ...this.formGroupS.value }
    };

    this.result = acsx290Model;

    return acsx290Model;
  }

  private getFormCompletion(): ACSx290Completion {
    const completion: ACSx290Completion = {
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

  private serializeDate(dateTime: any): any {
    const dt = moment.isMoment(dateTime) ? dateTime : moment(dateTime);

    return dt.startOf('day').toISOString(true);
  }

  private serializeDateTime(dateTime: any): any {
    const dt = moment.isMoment(dateTime) ? dateTime : moment(dateTime);
    return dt.toISOString(true);
  }

  private async loadById() {
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.store.dispatch(new UI.StartLoading());

      const registryId = this.route.snapshot.paramMap.get('id');
      const data = await this.acsx290Service.getForm(registryId);
      this.store.dispatch(new UI.StopLoading());

      if (data) {
        this.acsx290Service.decryptSenitiveData(data);
        this.setFormValue(data);

        this.mode = 'edit';
        this.registryId = registryId;
        this.avHospitalsNullOption = false;
        this.avHospitals = Array(this.formGroupC.get('HospName').value);
      } else {
        this.router.navigate(['registry/acsx290']);
      }
    }
  }

  private setFormValue(acsx290Model: ACSx290Model) {
    this.formDetail = acsx290Model.detail;
    this.formGroupA.patchValue(acsx290Model.sectionA);
    this.formGroupB.patchValue(acsx290Model.sectionB);
    this.formGroupC.patchValue(acsx290Model.sectionC);
    this.formGroupD.patchValue(acsx290Model.sectionD);
    this.formGroupE.patchValue(acsx290Model.sectionE);
    this.formGroupF.patchValue(acsx290Model.sectionF);
    this.formGroupG.patchValue(acsx290Model.sectionG);
    this.formGroupH.patchValue(acsx290Model.sectionH);
    this.formGroupI.patchValue(acsx290Model.sectionI);
    this.formGroupJ.patchValue(acsx290Model.sectionJ);
    this.formGroupK.patchValue(acsx290Model.sectionK);
    this.formGroupL.patchValue(acsx290Model.sectionL);
    this.formGroupL2.patchValue(acsx290Model.sectionL2);
    this.formGroupM.patchValue(acsx290Model.sectionM);
    this.formGroupM1.patchValue(acsx290Model.sectionM1);
    this.formGroupM2.patchValue(acsx290Model.sectionM2);
    this.formGroupM3.patchValue(acsx290Model.sectionM3);
    this.formGroupN.patchValue(acsx290Model.sectionN);
    this.formGroupO.patchValue(acsx290Model.sectionO);
    this.formGroupP.patchValue(acsx290Model.sectionP);
    this.formGroupQ.patchValue(acsx290Model.sectionQ);
    this.formGroupR.patchValue(acsx290Model.sectionR);
    this.formGroupS.patchValue(acsx290Model.sectionS);
  }

  async submitAndExit() {
    await this.submit(true);
    this.location.back();
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

  public calculateCurrent(section: string) {
    if (!this.completion) {
      return;
    }

    const current = this.completion['section' + section];
    return current.valid + '/' + current.total;
  }

  private calculateCompletion() {
    this.sectionMembers.forEach(sm => {
      this.subscriptions.push(
        sm[1].valueChanges.subscribe(value => {
          const sectionCompletion = this.registryFormService.getSectionCompletion(sm[0]);
          this.completion['section' + sm[0]] = sectionCompletion;

          const summary: FormCompletion = {
            valid: 0,
            total: 0
          };

          Object.keys(this.completion).forEach(key => {
            if (key !== 'summary') {
              const sectionId = key.substr(7);
              const secCompletion = this.completion['section' + sectionId];
              summary.valid += secCompletion.valid;
              summary.total += secCompletion.total;
            }
          });

          this.completion.summary = summary;
        })
      );
    });
  }

  public displaySummary() {
    if (!this.completion) {
      return '0/0';
    }
    return this.completion.summary.valid + '/' + this.completion.summary.total;
  }

  public displayCompletion() {
    if (!this.completion) {
      return `(0%)`;
    }

    const completion = Math.round(
      (this.completion.summary.valid / this.completion.summary.total) * 100
    );
    return `(${completion}%)`;
  }

  setToDefault(formGroup: FormGroup, controls: string[], val: any) {
    controls.forEach(c => {
      const control = formGroup.get(c);
      if (val && !control.value) {
        control.setValue(val);
      } else if (val === null) {
        control.setValue(null);
      }
    });
  }

  setToDefaultRiskFactors(formGroup: FormGroup, val: any) {
    const controls = [
      'FHCAD',
      'Diabetes',
      'Dyslip',
      'Hypertn',
      'Dialysis',
      'InfEndo',
      'ChrLungD',
      'PFT',
      'ABG',
      'HmO2',
      'BDTx',
      'SlpApn',
      'Pneumonia',
      'IVDrugAb',
      'Depression',
      'LiverDis',
      'ImmSupp',
      'MediastRad',
      'Cancer',
      'PVD',
      'ThAoDisease',
      'Syncope',
      'UnrespStat',
      'ChestWallDef',
      'CVD',
      'FiveMWalkTest',
      'SixMWalkDone'
    ];
    this.setToDefault(formGroup, controls, val);

    formGroup.get('TobaccoUse').setValue(val ? 'Never smoker' : val);
    formGroup.get('Alcohol').setValue(val ? 'None' : val);
  }

  setToDefaultPreopMed(formGroup: FormGroup, val: any) {
    const controls = [
      'MedACEI48',
      'MedAmiodarone',
      'MedBeta',
      'MedBetaTher',
      'MedCChanTher',
      'MedLongActNit',
      'MedNitIV',
      'MedOthAntiang',
      'MedADP5Days',
      'MedASA',
      'MedGP',
      'MedACoag',
      'MedCoum5Days',
      'MedXa5Days',
      'MedNOAC5Days',
      'MedThromIn5Days',
      'MedThrom',
      'MedInotr',
      'MedLipid',
      'MedSter'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultOtherCarProc(formGroup: FormGroup, val: any) {
    const controls = [
      'OCarASDPFO',
      'OCarASDSec',
      'OCarAFibIntraLes',
      'OCarAFibEpLes',
      'OCarAAProc',
      'OCarLeadInsert',
      'OCarACDLE',
      'OCarCong',
      'OCarLVA',
      'OCarStemCell',
      'OCPulThromDis',
      'OCarSubaStenRes',
      'OCarSVR',
      'OCarLasr',
      'OCTumor',
      'OCarCrTx',
      'OCarTrma',
      'OCarVSD',
      'OCarOthr'
    ];
    this.setToDefault(formGroup, controls, val);

    formGroup.get('OCarACD').setValue(val ? 'None' : val);
  }

  setToDefaultPostopSSI(formGroup: FormGroup, val: any) {
    const controls = [
      'CSternalSupInf',
      'DeepSternInf',
      'CIThor',
      'ConduitHarv',
      'CanSite',
      'WoundInter'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultPostopEvent(formGroup: FormGroup, val: any) {
    const controls = [
      'COpReBld',
      'COpReVlv',
      'CReintMI',
      'CAortReint',
      'COpReOth',
      'COpReNon',
      'COpPlndDelay',
      'CSternal',
      'CSepsis',
      'CNStrokP',
      'CNStrokTTIA',
      'CNComa',
      'CNParal',
      'PhrenNrvInj',
      'CNParesis',
      'RecLarynNrvInj',
      'CPVntLng',
      'CPPneum',
      'CVTE',
      'CPlEff',
      'PostOpPneumo',
      'CRenFail',
      'CUltraFil',
      'CRenDial',
      'CVaIlFem',
      'CVaLbIsc',
      'CMAD',
      'COtArrst',
      'COtAortEndo',
      'COtAortRupt',
      'CVaAoDis',
      'COtAortSide',
      'COtAortTear',
      'COtCoag',
      'COtTamp',
      'COtGI',
      'COtLiver',
      'COtMSF',
      'COtAFib',
      'COtOther'
    ];
    this.setToDefault(formGroup, controls, val);

    formGroup.get('CNEnceph').setValue(val ? 'None' : val);
    formGroup.get('CRhythmDis').setValue(val ? 'None' : val);
  }

  setToDefaultDischargeMed(formGroup: FormGroup, val: any) {
    const controls = [
      'DCASA',
      'DCADP',
      'DCOthAntiplat',
      'DCDirThromIn',
      'DCCoum',
      'DCFactorXa',
      'DCNovOrAnti',
      'DCOthAnticoag',
      'DCACE',
      'DCAmiodarone',
      'DCBeta',
      'DCLipLowStat',
      'DCLipLowNonStat'
    ];
    this.setToDefault(formGroup, controls, val);
  }
}
