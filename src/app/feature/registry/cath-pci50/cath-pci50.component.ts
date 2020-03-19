import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSelectChange } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import * as moment from 'moment';

import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { RegistryFormService } from '../../../shared/modules/registry-form/registry-form.service';

import {
  SectionMember,
  FormCompletion,
  FormVisible,
  RegSelectChoice
} from '../../../shared/modules/registry-form/registry-form.model';
import { RegistryFormComponent } from '../../../shared/modules/registry-form/registry-form.component';
import { FormDetail } from '../registry.model';

import { tableOfContent } from './cath-pci50.toc';
import { CathPci50Service } from './cath-pci50.service';
import { CathPci50Form } from './cath-pci50.form';
import { CathPci50Model } from './cath-pci50.model';
import { conditions } from './cath-pci50.condition';
import { validations } from './cath-pci50.validation';
import { CathPci50Completion } from './cath-pci50.model';
import * as cathPci50Data from './cath-pci50.data';
import * as registryData from '../registry.data';
import { intraCoronaryDevices } from '../../registry/cath-pci50/cath-pci50.device';

import { User } from '../../../../app/core/auth/user.model';
import { AuthService } from 'src/app/core/auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { hospitals } from '../../../core/auth/auth.data';
import { Staff } from '../../staff/staff.model';
import { CathPci50Validator } from './cath-pci50.validator';
import { CathPciReport } from '../reports/cath-pci.report';
import { PdfReportService } from '../reports/pdf-report.service';

const str = {
  nativeLesions: 'NativeLesions',
  nvSegmentID: 'NVSegmentID',
  nvStenosis: 'NVStenosis',
  graftLesions: 'GraftLesions',
  graftSegmentID: 'GraftSegmentID',
  graftStenosis: 'GraftStenosis',
  pciLesions: 'PciLesions',
  lesionCounter: 'LesionCounter',
  segmentID: 'SegmentID',
  pciDevices: 'PciDevices',
  icDevCounter: 'ICDevCounter',
  icDevCounterAssn: 'ICDevCounterAssn',
  followUps: 'FollowUps',
  followUpDate: 'FU_AssessmentDate'
};

@Component({
  selector: 'app-cath-pci50',
  templateUrl: './cath-pci50.component.html',
  styleUrls: ['./cath-pci50.component.scss'],
  providers: [CathPci50Service, CathPci50Validator]
})
export class CathPci50Component extends RegistryFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  gap = '20px';
  result: CathPci50Model;

  // USER
  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  // FORM DATA
  mode = 'new'; // new, edit
  private registryId: string;
  visibles: FormVisible = {};
  completion: CathPci50Completion;
  followUpCompletions: FormCompletion[] = [];
  disableSubmitDischarge: boolean;
  submittedDischarge = false;
  disableSubmitFollowUps: boolean[] = [];
  submittedFollowUps: boolean[] = [];

  staffs: Staff[];
  admitPhysician: RegSelectChoice[];
  cardioAndIntervention: RegSelectChoice[];
  intervention: RegSelectChoice[];
  dischargePhysician: RegSelectChoice[];

  avCoroDevices: RegSelectChoice[];
  eventCoroDevices: RegSelectChoice[];

  avHospitalsNullOption = true;
  avHospitals: RegSelectChoice[];
  bdmsHospitals: RegSelectChoice[];
  toc = tableOfContent;
  nationality = registryData.nationality;
  segmentNumbers = cathPci50Data.segmentNumbers;
  deathCauses = cathPci50Data.deathCauses;
  J_lesions = cathPci50Data.J_lesions;
  J_devices = cathPci50Data.J_devices;
  K_procedureEvents = cathPci50Data.K_procedureEvents;
  M_followUpEvents = cathPci50Data.M_followUpEvents;
  associatedLesions: string[] = [];

  symptomDTtype = 'datetime';
  private redoPCI = { status: false, lastAn: '' };

  // FAB
  open = false;

  get current() {
    return this.completion ? this.completion.summary.valid : 0;
  }

  get max() {
    return this.completion ? this.completion.summary.total : 1;
  }

  get progressSummary() {
    if (!this.completion) {
      return '0/0';
    }
    return this.completion.summary.valid + '/' + this.completion.summary.total;
  }

  get progressCompletion() {
    if (!this.completion) {
      return `(0%)`;
    }

    const completion = Math.floor(
      (this.completion.summary.valid / this.completion.summary.total) * 100
    );
    return `(${completion}%)`;
  }

  // SUBFORM
  disableAddNativeLesion = false;
  nativeLesionsTabIndex = 0;
  availableNVSegmentIDs: RegSelectChoice[][] = [];

  disableAddGraftLesion = false;
  graftLesionsTabIndex = 0;
  availableGraftSegmentIDs: RegSelectChoice[][] = [];

  disableAddPciLesion = false;
  pciLesionsTabIndex = 0;
  availablePciSegmentIDs: RegSelectChoice[][] = [];

  disableAddPciDevice = false;
  pciDevicesTabIndex = 0;
  lesions: RegSelectChoice[] = [];

  disableAddFollowUp = false;
  followUpsTabIndex = 0;

  get nativeLesions() {
    return (
      this.visibles[str.nativeLesions] &&
      (this.visibles[str.nativeLesions] as FormVisible[]).length > 0
    );
  }

  get nativeLesionsControls() {
    return (this.formGroupH.get(str.nativeLesions) as FormArray).controls;
  }

  get graftLesions() {
    return (
      this.visibles[str.graftLesions] &&
      (this.visibles[str.graftLesions] as FormVisible[]).length > 0
    );
  }

  get graftLesionsControls() {
    return (this.formGroupH.get(str.graftLesions) as FormArray).controls;
  }

  get pciLesions() {
    return (
      this.visibles[str.pciLesions] && (this.visibles[str.pciLesions] as FormVisible[]).length > 0
    );
  }

  get pciLesionsControls() {
    return (this.formGroupJ.get(str.pciLesions) as FormArray).controls;
  }

  get pciDevicesControls() {
    return (this.formGroupJ.get(str.pciDevices) as FormArray).controls;
  }

  get followUps() {
    return this.visibles.FollowUps && (this.visibles.FollowUps as FormVisible[]).length > 0;
  }

  get followUpsControls() {
    return (this.formGroupM.get(str.followUps) as FormArray).controls;
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
  formGroupM: FormGroup;

  @ViewChild('formDirectiveA', { static: true })
  formDirectiveA: FormGroupDirective;
  @ViewChild('formDirectiveB', { static: true })
  formDirectiveB: FormGroupDirective;
  @ViewChild('formDirectiveC', { static: true })
  formDirectiveC: FormGroupDirective;
  @ViewChild('formDirectiveD', { static: true })
  formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE', { static: true })
  formDirectiveE: FormGroupDirective;
  @ViewChild('formDirectiveF', { static: true })
  formDirectiveF: FormGroupDirective;
  @ViewChild('formDirectiveG', { static: true })
  formDirectiveG: FormGroupDirective;
  @ViewChild('formDirectiveH', { static: true })
  formDirectiveH: FormGroupDirective;
  @ViewChild('formDirectiveI', { static: true })
  formDirectiveI: FormGroupDirective;
  @ViewChild('formDirectiveJ', { static: true })
  formDirectiveJ: FormGroupDirective;
  @ViewChild('formDirectiveK', { static: true })
  formDirectiveK: FormGroupDirective;
  @ViewChild('formDirectiveL', { static: true })
  formDirectiveL: FormGroupDirective;
  @ViewChild('formDirectiveM', { static: true })
  formDirectiveM: FormGroupDirective;

  private sectionMembers: SectionMember[];
  //#endregion

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
    private cathPci50Service: CathPci50Service,
    private location: Location,
    private authService: AuthService,
    private pdfReportService: PdfReportService
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, registryFormService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new UI.ChangeTitle('CathPci 5.0'));
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
      this.subscribeDOBChanged(),
      this.subscribeHospNameChanged(),
      this.subscribeCAOutHospitalChanged(),
      this.subscribeCATransferFacChanged(),
      this.subscribeCAInHospChanged(),
      this.subscribePCIProcChanged(),
      this.subscribePCIIndicationChanged(),
      this.subscribeSymptomOnsetChanged(),
      this.subscribeDCStatusChanged(),
      this.subscribeDCLocationChanged(),
      this.subscribeDCHospiceChanged()
      // this.subscribeNVStenosisChanged(),
      // this.subscribeGraftStenosisChanged()
    );

    // initialize value for complex conditions
    // this.formGroupE.get('PCIProc').setValue(null);
    // this.formGroupL.get('DCStatus').setValue(null);

    this.visibles[str.nativeLesions] = [];
    this.visibles[str.graftLesions] = [];
    this.visibles[str.pciLesions] = [];
    this.visibles[str.pciDevices] = [];
    this.visibles[str.followUps] = [];

    this.staffs = await this.cathPci50Service.getStaffs();

    this.avHospitals = this.authService
      .getAvailableHospitals(this.user.staff.primaryHospId, this.user.staff.permission)
      .map(hosp => {
        return {
          value: hosp.id,
          label: hosp.name + ' (' + hosp.id + ')',
          group: hosp.group,
          disable: false
        } as RegSelectChoice;
      });

    this.bdmsHospitals = hospitals.map(hosp => {
      return {
        value: hosp.id,
        label: hosp.name + ' (' + hosp.id + ')',
        group: hosp.group,
        disable: false
      } as RegSelectChoice;
    });

    const deviceMap = m => {
      return {
        value: m.id,
        label: m.deviceName,
        // detailHtml: `<span>Type:<i>${m.deviceType}</i></span> <span>Brand:<i>${m.brand}</i></span>`,
        detailHtml: `<span>Type:<i>${m.deviceType}</i>&emsp;Brand:<i>${m.brand}</i></span>`,
        disable: false
      } as RegSelectChoice;
    };
    this.avCoroDevices = intraCoronaryDevices.map(deviceMap);
    this.eventCoroDevices = intraCoronaryDevices
      .filter(m => m.deviceType.includes('Stent'))
      .map(deviceMap);

    this.completion = this.initializeFormCompletion();
    // this.completion = this.getFormCompletion();
    this.subscribeCompletionCalculation();

    // this.cathPci50Validator.setService(this.registryFormService);
    CathPci50Validator.setServiceForValidators(this.registryFormService);

    this.formGroupA.get('registryId').setValue('(new)');
    this.formGroupL.get('SubmittedDischarge').setValue(false, { onlySelf: true });
    await this.loadById();
    if (this.formGroupL.get('SubmittedDischarge').value) {
      this.submittedDischarge = true;
      this.disableAllAdmissionForm();
    }

    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    formArray.controls.forEach((formGroup: FormGroup, index) => {
      if (formGroup.get('SubmittedFollowUp').value) {
        this.submittedFollowUps[index] = true;
        formGroup.disable({ emitEvent: false });
      }
    });
    this.formGroupM.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.forEach(subs => subs.unsubscribe());
    this.userSubscription.unsubscribe();
  }

  getTOCTitle(section: string): string {
    return this.toc.find(t => t.section === 'section' + section).title;
  }

  private createForm() {
    this.formGroupA = this.formBuilder.group(CathPci50Form.sectionA);
    this.formGroupB = this.formBuilder.group(CathPci50Form.sectionB);
    this.formGroupC = this.formBuilder.group(CathPci50Form.sectionC);
    this.formGroupD = this.formBuilder.group(CathPci50Form.sectionD);
    this.formGroupE = this.formBuilder.group(CathPci50Form.sectionE);
    this.formGroupF = this.formBuilder.group(CathPci50Form.sectionF);
    this.formGroupG = this.formBuilder.group(CathPci50Form.sectionG);
    CathPci50Form.sectionH[str.nativeLesions] = this.formBuilder.array([]);
    CathPci50Form.sectionH[str.graftLesions] = this.formBuilder.array([]);
    this.formGroupH = this.formBuilder.group(CathPci50Form.sectionH);
    this.formGroupI = this.formBuilder.group(CathPci50Form.sectionI);
    CathPci50Form.sectionJ[str.pciLesions] = this.formBuilder.array([]);
    CathPci50Form.sectionJ[str.pciDevices] = this.formBuilder.array([]);
    this.formGroupJ = this.formBuilder.group(CathPci50Form.sectionJ);
    this.formGroupK = this.formBuilder.group(CathPci50Form.sectionK);
    this.formGroupL = this.formBuilder.group(CathPci50Form.sectionL);
    CathPci50Form.sectionM[str.followUps] = this.formBuilder.array([]);
    this.formGroupM = this.formBuilder.group(CathPci50Form.sectionM);

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
      ['M', this.formGroupM, this.formDirectiveM, conditions.sectionM]
    ];

    this.registryFormService.initializeForm(
      this.sectionMembers,
      conditions,
      validations,
      this.visibles
    );
    this.registryFormService.setDataDict(require('raw-loader!./cath-pci50.dict.md'));
  }

  private async loadStaffs() {
    // console.log('loadStaffs');
    this.formGroupB.get('AdmProvider').setValue(null);
    this.formGroupB.get('AttProvider').setValue(null);
    this.formGroupE.get('DCathProvider').setValue(null);
    this.formGroupE.get('PCIProvider').setValue(null);
    this.formGroupL.get('DCProvider').setValue(null);

    const hospId = this.formGroupB.get('HospName').value;
    if (!hospId) {
      this.admitPhysician = null;
      this.cardioAndIntervention = null;
      this.intervention = null;
      return;
    }

    const filterStaff = (staff: Staff, positions: string[]) =>
      positions.includes(staff.position) &&
      (staff.primaryHospId === hospId || staff.secondHospIds.includes(hospId));

    const staffToChoice = (staff: Staff) => {
      return {
        value: staff.staffId,
        label: staff.title + ' ' + staff.firstName + ' ' + staff.lastName,
        group: staff.position,
        disable: false
      } as RegSelectChoice;
    };

    this.admitPhysician = this.staffs
      .filter(staff =>
        filterStaff(staff, [
          'Emergency Physician',
          'Cardiologist',
          'Cardiac Interventionist',
          'Cardiothoracic Surgeon',
          'Other Physician'
        ])
      )
      .map(staffToChoice);
    this.cardioAndIntervention = this.staffs
      .filter(staff => filterStaff(staff, ['Cardiologist', 'Cardiac Interventionist']))
      .map(staffToChoice);
    this.intervention = this.staffs
      .filter(staff => filterStaff(staff, ['Cardiac Interventionist']))
      .map(staffToChoice);
    this.dischargePhysician = this.staffs
      .filter(staff =>
        filterStaff(staff, [
          'Emergency Physician',
          'Cardiologist',
          'Cardiac Interventionist',
          'Cardiothoracic Surgeon',
          'Other Physician'
        ])
      )
      .map(staffToChoice);
  }

  private async loadById() {
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.store.dispatch(new UI.StartLoading());

      const registryId = this.route.snapshot.paramMap.get('id');
      const data = await this.cathPci50Service.getForm(registryId);
      this.store.dispatch(new UI.StopLoading());

      if (data) {
        this.cathPci50Service.decryptSenitiveData(data);
        this.setFormValue(data);

        this.mode = 'edit';
        this.registryId = registryId;
        this.avHospitalsNullOption = false;
        this.avHospitals = hospitals
          .filter(hosp => hosp.id === this.formGroupB.get('HospName').value)
          .map(hosp => {
            return {
              value: hosp.id,
              label: hosp.name + ' (' + hosp.id + ')',
              group: hosp.group,
              disable: false
            } as RegSelectChoice;
          });
      } else {
        this.router.navigate(['registry/cath-pci50']);
      }
    } else {
      this.formGroupA.enable();
      this.formGroupB.enable();
      this.formGroupC.enable();
      this.formGroupD.enable();
      this.formGroupE.enable();
      this.formGroupF.enable();
      this.formGroupG.enable();
      this.formGroupH.enable();
      this.formGroupI.enable();
      this.formGroupJ.enable();
      this.formGroupK.enable();
      this.formGroupL.enable();
    }
  }

  private setFormValue(data: CathPci50Model) {
    // this.completion = data.completion;
    this.formDetail = data.detail;
    this.formGroupA.patchValue(data.sectionA);

    // * need to set HospName before load staff to prevent null default
    // this.formGroupB.get('HospName').patchValue(data.sectionB['HospName']);
    this.formGroupB.patchValue(data.sectionB);
    // tslint:disable: no-string-literal
    // this.formGroupB.get('HospName').patchValue(data.sectionB['HospName']);
    // this.formGroupB.get('PayorPrim').patchValue(data.sectionB['PayorPrim']);
    // this.formGroupB.get('PayorSecond').patchValue(data.sectionB['PayorSecond']);
    // this.formGroupB.get('ArrivalDateTime').patchValue(data.sectionB['ArrivalDateTime']);
    this.formGroupB.get('AdmProvider').patchValue(data.sectionB['AdmProvider']);
    this.formGroupB.get('AttProvider').patchValue(data.sectionB['AttProvider']);
    // this.formGroupB.get('AdmType').patchValue(data.sectionB['AdmType']);
    // this.formGroupB.get('EnrolledStudy').patchValue(data.sectionB['EnrolledStudy']);
    // tslint:enable: no-string-literal

    this.formGroupC.patchValue(data.sectionC);
    this.formGroupD.patchValue(data.sectionD);
    this.formGroupE.patchValue(data.sectionE);
    this.formGroupF.patchValue(data.sectionF);
    this.formGroupG.patchValue(data.sectionG);

    data.sectionH[str.nativeLesions].forEach(_ =>
      this.addLesion(
        str.nativeLesions,
        str.nvSegmentID,
        CathPci50Form.nativeLesion,
        conditions.nativeLesion
      )
    );
    data.sectionH[str.graftLesions].forEach(_ =>
      this.addLesion(
        str.graftLesions,
        str.graftSegmentID,
        CathPci50Form.graftLesion,
        conditions.graftLesion
      )
    );
    this.formGroupH.patchValue(data.sectionH);

    this.getSegmentIDsForNV();
    this.getSegmentIDsForGraft();
    this.disableAddNativeLesion = false;
    this.disableAddGraftLesion = false;

    this.formGroupI.patchValue(data.sectionI);

    data.sectionJ[str.pciLesions].forEach(_ => this.addPciLesion());
    data.sectionJ[str.pciDevices].forEach(_ => this.addPciDevice());
    this.formGroupJ.patchValue(data.sectionJ);

    this.getSegmentIDsForPci();
    this.getLesionsForDevices();
    this.pciLesionsTabIndex = 0;
    this.disableAddPciLesion = false;
    this.pciDevicesTabIndex = 0;
    this.disableAddPciDevice = false;

    this.formGroupK.patchValue(data.sectionK);
    this.formGroupL.patchValue(data.sectionL);

    data.sectionM[str.followUps].forEach(_ => this.addFollowUp());
    this.formGroupM.patchValue(data.sectionM);
  }

  private subscribeDOBChanged(): Subscription {
    return this.formGroupA.get('DOB').valueChanges.subscribe(value => {
      const dob = moment(value);
      if (!dob.isValid()) {
        this.formGroupA.get('Age').reset();
        return;
      }

      const age = -dob.diff(new Date(), 'years', false);
      this.formGroupA.get('Age').setValue(age);
      this.formGroupA.get('Age').markAsTouched();
    });
  }

  private subscribeHospNameChanged(): Subscription {
    return this.formGroupB.get('HospName').valueChanges.subscribe(value => {
      this.loadStaffs();
    });
  }

  private subscribeCAOutHospitalChanged(): Subscription {
    return this.formGroupC.get('CAOutHospital').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
      this.dischargeLevelOfConsciousness();
    });
  }

  private subscribeCATransferFacChanged(): Subscription {
    return this.formGroupC.get('CATransferFac').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
      this.dischargeLevelOfConsciousness();
    });
  }

  private subscribeCAInHospChanged(): Subscription {
    return this.formGroupE.get('CAInHosp').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
      this.dischargeLevelOfConsciousness();
    });
  }

  private subscribePCIProcChanged(): Subscription {
    return this.formGroupE.get('PCIProc').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
      this.checkCauseOfDeath();
    });
  }

  private postCardiacArrestCare() {
    const CAOutHospital = this.formGroupC.get('CAOutHospital').value;
    const CATransferFac = this.formGroupC.get('CATransferFac').value;
    const CAInHosp = this.formGroupE.get('CAInHosp').value;
    const PCIProc = this.formGroupE.get('PCIProc').value;

    // tslint:disable: no-string-literal
    if (
      (CAOutHospital === 'Yes' || CATransferFac === 'Yes' || CAInHosp === 'Yes') &&
      PCIProc === 'Yes'
    ) {
      this.visibles['HypothermiaInduced'] = true;
      this.visibles['LOCProc'] = true;
    } else {
      this.visibles['HypothermiaInduced'] = false;
      this.formGroupI.get('HypothermiaInduced').setValue(null);
      this.visibles['LOCProc'] = false;
      this.formGroupI.get('LOCProc').setValue(null);
    }
    // tslint:enable: no-string-literal
  }

  private checkCauseOfDeath() {
    const PCIProc = this.formGroupE.get('PCIProc').value;
    const DCStatus = this.formGroupL.get('DCStatus').value;

    // tslint:disable: no-string-literal
    if (PCIProc === 'Yes' && DCStatus === 'Deceased') {
      this.visibles['DeathCause'] = true;
    } else {
      this.visibles['DeathCause'] = false;
      this.formGroupL.get('DeathCause').setValue(null);
    }
    // tslint:enable: no-string-literal
  }

  private dischargeLevelOfConsciousness() {
    const CAOutHospital = this.formGroupC.get('CAOutHospital').value;
    const CATransferFac = this.formGroupC.get('CATransferFac').value;
    const CAInHosp = this.formGroupE.get('CAInHosp').value;
    const DCStatus = this.formGroupL.get('DCStatus').value;

    // tslint:disable: no-string-literal
    if (
      (CAOutHospital === 'Yes' || CATransferFac === 'Yes' || CAInHosp === 'Yes') &&
      DCStatus === 'Deceased'
    ) {
      this.visibles['DC_LOC'] = true;
    } else {
      this.visibles['DC_LOC'] = false;
      this.formGroupL.get('DC_LOC').setValue(null);
    }
    // tslint:enable: no-string-literal
  }

  // private subscribeNVStenosisChanged(): Subscription {
  //   return this.formGroupH.get(str.nvStenosis).valueChanges.subscribe(value => {
  //     if (value === 'Yes') {
  //       console.log('NVStenosisChanged');
  //       this.addNativeLesion();
  //     } else {
  //       this.removeAllNativeLesions();
  //     }
  //   });
  // }

  // private subscribeGraftStenosisChanged(): Subscription {
  //   return this.formGroupH.get(str.graftStenosis).valueChanges.subscribe(value => {
  //     if (value === 'Yes') {
  //       this.addGraftLesion();
  //     } else {
  //       this.removeAllGraftLesions();
  //     }
  //   });
  // }

  private subscribePCIIndicationChanged(): Subscription {
    return this.formGroupI.get('PCIIndication').valueChanges.subscribe(value => {
      this.checkCulpritStenosisLesion();
    });
  }

  private checkCulpritStenosisLesion() {
    const PCIIndication = this.formGroupI.get('PCIIndication').value;

    const MIs = [
      'STEMI - Immediate PCI for Acute STEMI',
      'STEMI - Stable (<= 12 hrs from Sx)',
      'STEMI - Stable (> 12 hrs from Sx)',
      'STEMI - Unstable (> 12 hrs from Sx)',
      'STEMI (after successful lytics) <= 24 hrs',
      'STEMI (after successful lytics) > 24 hrs - 7 days',
      'STEMI - Rescue (After unsuccessful lytics)',
      'NSTE-ACS'
    ];

    const formArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    const isMI = MIs.includes(PCIIndication);

    // tslint:disable: no-string-literal
    for (let i = 0; i < formArray.length; i++) {
      if (isMI) {
        this.visibles[str.pciLesions][i]['CulpritArtery'] = true;
      } else {
        this.visibles[str.pciLesions][i]['CulpritArtery'] = false;

        const formGroup = formArray.controls[i] as FormGroup;
        formGroup.get('CulpritArtery').setValue(null);
      }
    }
    // tslint:enable: no-string-literal
  }

  private subscribeSymptomOnsetChanged(): Subscription {
    return this.formGroupI.get('SymptomOnset').valueChanges.subscribe(value => {
      this.symptomDTtype = value === 'Unknown' ? 'date' : 'datetime';
    });
  }

  private subscribeDCStatusChanged(): Subscription {
    return this.formGroupL.get('DCStatus').valueChanges.subscribe(value => {
      this.dischargeMedications();
      this.dischargeLevelOfConsciousness();
      this.checkCauseOfDeath();

      // if (value === 'Alive') {
      //   this.addFollowUp();
      // } else {
      //   this.removeAllFollowUps();
      // }
    });
  }

  PCIProcChanged(event: MatSelectChange) {
    this.followUp();

    // ! correct uncover bug
    this.formGroupJ.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  DCStatusChanged(event: MatSelectChange) {
    this.followUp();
  }

  private followUp() {
    const PCIProc = this.formGroupE.get('PCIProc').value;
    const DCStatus = this.formGroupL.get('DCStatus').value;
    if (DCStatus === 'Alive' && PCIProc === 'Yes') {
      this.addFollowUp();
    } else {
      this.removeAllFollowUps();
    }
  }

  private subscribeDCLocationChanged(): Subscription {
    return this.formGroupL.get('DCLocation').valueChanges.subscribe(value => {
      this.dischargeMedications();
    });
  }

  private subscribeDCHospiceChanged(): Subscription {
    return this.formGroupL.get('DCHospice').valueChanges.subscribe(value => {
      this.dischargeMedications();
    });
  }

  private dischargeMedications() {
    const DCStatus = this.formGroupL.get('DCStatus').value;
    const DCLocation = this.formGroupL.get('DCLocation').value;
    const DCHospice = this.formGroupL.get('DCHospice').value;

    const dcMedications = [
      'DC_ACEI',
      'DC_Warfarin',
      'DC_Aspirin',
      'DC_Vorapaxar',
      'DC_ARB',
      'DC_BetaBlocker',
      'DC_Apixaban',
      'DC_Dabigatran',
      'DC_Edoxaban',
      'DC_Rivaroxaban',
      'DC_Clopidogrel',
      'DC_Prasugrel',
      'DC_Ticagrelor',
      'DC_Ticlopidine',
      'DC_Statin',
      'DC_NonStatin',
      'DC_Alirocumab',
      'DC_Evolocumab',
      'DC_MedReconCompleted'
    ];

    if (
      DCStatus === 'Alive' &&
      ['Home', 'Extended care/TCU/rehab', 'Skilled Nursing facility', 'Other'].includes(
        DCLocation
      ) &&
      DCHospice === 'No'
    ) {
      // tslint:disable-next-line: no-string-literal
      this.visibles['DC_Medications'] = true;

      dcMedications.forEach(med => {
        this.visibles[med] = true;
      });
    } else {
      // tslint:disable-next-line: no-string-literal
      this.visibles['DC_Medications'] = false;

      dcMedications.forEach(med => {
        this.formGroupL.get(med).setValue(null);
        this.visibles[med] = false;
      });
    }
  }

  private initializeFormCompletion() {
    return {
      summary: { valid: 0, total: 0 },
      sectionA: { valid: 0, total: 0 },
      sectionB: { valid: 0, total: 0 },
      sectionC: { valid: 0, total: 0 },
      sectionD: { valid: 0, total: 0 },
      sectionE: { valid: 0, total: 0 },
      sectionF: { valid: 0, total: 0 },
      sectionG: { valid: 0, total: 0 },
      sectionH: { valid: 0, total: 0 },
      sectionI: { valid: 0, total: 0 },
      sectionJ: { valid: 0, total: 0 },
      sectionK: { valid: 0, total: 0 },
      sectionL: { valid: 0, total: 0 },
      sectionM: { valid: 0, total: 0 }
    };
  }

  displaySummary(section: string): string {
    if (!this.completion) {
      return;
    }

    const current = this.completion['section' + section];
    return current.valid + '/' + current.total;
  }

  private subscribeCompletionCalculation() {
    this.sectionMembers.forEach(sm => {
      this.subscriptions.push(
        sm[1].valueChanges.subscribe(value => {
          if (sm[1].disabled) {
            return;
          }

          let newCompletion: FormCompletion;
          if (sm[0] === 'M') {
            newCompletion = this.getSectionMCompletion();
          } else {
            newCompletion = this.registryFormService.getSectionCompletion(sm[0]);
          }
          const oldCompletion = this.completion['section' + sm[0]] as FormCompletion;
          this.completion['section' + sm[0]] = newCompletion;

          this.completion.summary.valid =
            this.completion.summary.valid - oldCompletion.valid + newCompletion.valid;
          this.completion.summary.total =
            this.completion.summary.total - oldCompletion.total + newCompletion.total;

          this.checkCanSubmitDischarge();
        })
      );
    });
  }

  private getSectionMCompletion(): FormCompletion {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    const completion: FormCompletion = { valid: 0, total: 0 };

    formArray.controls.forEach((formGroup: FormGroup, index) => {
      if (formGroup.disabled) {
        completion.valid += this.followUpCompletions[index].valid;
        completion.total += this.followUpCompletions[index].total;
        this.disableSubmitFollowUps[index] = !(
          this.followUpCompletions[index].valid === this.followUpCompletions[index].total &&
          (index > 0 ? this.submittedFollowUps[index - 1] : this.submittedDischarge)
        );
        return;
      }
      const c = this.registryFormService.checkCompletion(
        formGroup,
        this.visibles[str.followUps][index]
      );
      this.followUpCompletions[index] = c;
      completion.valid += c.valid;
      completion.total += c.total;
      this.disableSubmitFollowUps[index] = !(
        c.valid === c.total &&
        (index > 0 ? this.submittedFollowUps[index - 1] : this.submittedDischarge)
      );
    });
    return completion;
  }

  private checkCanSubmitDischarge() {
    const summary: FormCompletion = {
      valid: 0,
      total: 0
    };

    Object.keys(this.completion).forEach(key => {
      if (key !== 'summary' && key !== 'sectionM') {
        const sectionCompletion = this.completion[key] as FormCompletion;
        summary.valid += sectionCompletion.valid;
        summary.total += sectionCompletion.total;
      }
    });

    const percentDischargeCompletion = Math.floor((summary.valid / summary.total) * 100);
    this.disableSubmitDischarge = percentDischargeCompletion !== 100;
  }

  async submit(exit = false) {
    this.registryFormService.submitAllSections();
    const data = this.archiveForm();

    const alert = this.cathPci50Service.checkNeededDataCompletion(data);
    if (alert) {
      this.dialogService.createModalDialog({
        title: '!!Alert!!',
        content: `These information must fill before submitting ${alert}`,
        buttons: ['OK'],
        style: 'warn'
      });
      return;
    }

    this.cathPci50Service.encryptSensitiveData(data);

    this.store.dispatch(new UI.StartLoading());
    if (this.mode === 'new') {
      //   if (await this.acsx290Service.isExistedForm(data)) {
      //     console.log('repeat form');
      //     this.store.dispatch(new UI.StopLoading());
      //     this.dialogService.createModalDialog({
      //       title: '!!Alert!!',
      //       content: `You can not create ACSx 2.9 registry more than one in same episode`,
      //       buttons: ['OK']
      //     });
      //     return;
      // }

      this.registryId = await this.cathPci50Service.createForm(data);
      this.mode = 'edit';
      this.formGroupA.get('registryId').setValue(this.registryId);
      if (!exit) {
        this.location.go('/registry/cath-pci50/' + this.registryId);
      }
    } else {
      await this.cathPci50Service.updateForm(this.registryId, data);
    }
    this.store.dispatch(new UI.StopLoading());
    this.registryFormService.markAllFormsUntouched();
  }

  async submitAndExit() {
    await this.submit(true);
    this.location.back();
  }

  private archiveForm(): CathPci50Model {
    const timestamp = this.cathPci50Service.timestamp;

    this.clearSubforms();

    if (this.mode === 'new') {
      this.formDetail = {
        baseDbId: 'CathPci50',
        baseDb: 'NCDR CathPCI Registry v5.0',
        addendum: 'BDMS CathPCI modefication v0.1',
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

    const formGroupAvalue = this.formGroupA.getRawValue();
    const formGroupBvalue = this.formGroupB.getRawValue();
    const formGroupCvalue = this.formGroupC.getRawValue();
    const formGroupDvalue = this.formGroupD.getRawValue();
    const formGroupEvalue = this.formGroupE.getRawValue();
    const formGroupIvalue = this.formGroupI.getRawValue();
    const formGroupJvalue = this.formGroupJ.getRawValue();
    const formGroupKvalue = this.formGroupK.getRawValue();
    const formGroupLvalue = this.formGroupL.getRawValue();
    const formGroupMvalue = this.formGroupM.getRawValue();

    const cathPci50Model: CathPci50Model = {
      detail: this.formDetail,
      completion: this.completion,
      sectionA: {
        ...formGroupAvalue,
        DOB: this.serializeDate(formGroupAvalue.DOB)
      },
      sectionB: {
        ...formGroupBvalue,
        ArrivalDateTime: this.serializeDateTime(formGroupBvalue.ArrivalDateTime)
      },
      sectionC: {
        ...formGroupCvalue,
        HxMIDate: this.serializeDate(formGroupCvalue.HxMIDate),
        HxPCIDate: this.serializeDate(formGroupCvalue.HxPCIDate),
        HxCABGDate: this.serializeDate(formGroupCvalue.HxCABGDate)
      },
      sectionD: {
        ...formGroupDvalue,
        StressTestDate: this.serializeDate(formGroupDvalue.StressTestDate),
        CardiacCTADate: this.serializeDate(formGroupDvalue.CardiacCTADate),
        CalciumScoreDate: this.serializeDate(formGroupDvalue.CalciumScoreDate),
        PriorDxAngioDate: this.serializeDate(formGroupDvalue.PriorDxAngioDate)
      },
      sectionE: {
        ...formGroupEvalue,
        ProcedureStartDateTime: this.serializeDateTime(formGroupEvalue.ProcedureStartDateTime),
        ProcedureEndDateTime: this.serializeDateTime(formGroupEvalue.ProcedureEndDateTime)
      },
      sectionF: { ...this.formGroupF.value },
      sectionG: { ...this.formGroupG.value },
      sectionH: { ...this.formGroupH.value },
      sectionI: {
        ...formGroupIvalue,
        SymptomDateTime: this.serializeDateTime(formGroupIvalue.SymptomDateTime),
        ThromDateTime: this.serializeDateTime(formGroupIvalue.ThromDateTime),
        SubECGDateTime: this.serializeDateTime(formGroupIvalue.SubECGDateTime),
        EDPresentDateTime: this.serializeDateTime(formGroupIvalue.EDPresentDateTime),
        FirstDevActiDateTime: this.serializeDateTime(formGroupIvalue.FirstDevActiDateTime)
      },
      sectionJ: {
        ...formGroupJvalue,
        PciLesions: this.serializePciLesions(formGroupJvalue.PciLesions)
      },
      sectionK: {
        ...formGroupKvalue,
        K_BleedingAccessSiteDT: this.serializeDateTime(formGroupKvalue.K_BleedingAccessSiteDT),
        K_BleedingGIDT: this.serializeDateTime(formGroupKvalue.K_BleedingGIDT),
        K_BleedingGUDT: this.serializeDateTime(formGroupKvalue.K_BleedingGUDT),
        K_BleedingHematomaDT: this.serializeDateTime(formGroupKvalue.K_BleedingHematomaDT),
        K_BleedingOtherDT: this.serializeDateTime(formGroupKvalue.K_BleedingOtherDT),
        K_BleedingRetroDT: this.serializeDateTime(formGroupKvalue.K_BleedingRetroDT),
        K_CardiacArrestDT: this.serializeDateTime(formGroupKvalue.K_CardiacArrestDT),
        K_CardiacTamponadeDT: this.serializeDateTime(formGroupKvalue.K_CardiacTamponadeDT),
        K_CardiogenicShockDT: this.serializeDateTime(formGroupKvalue.K_CardiogenicShockDT),
        K_HeartFailureDT: this.serializeDateTime(formGroupKvalue.K_HeartFailureDT),
        K_MyocardialInfarctionDT: this.serializeDateTime(formGroupKvalue.K_MyocardialInfarctionDT),
        K_NewDialysisDT: this.serializeDateTime(formGroupKvalue.K_NewDialysisDT),
        K_OtherVascularDT: this.serializeDateTime(formGroupKvalue.K_OtherVascularDT),
        K_StrokeHemorrhageDT: this.serializeDateTime(formGroupKvalue.K_StrokeHemorrhageDT),
        K_StrokeIschemicDT: this.serializeDateTime(formGroupKvalue.K_StrokeIschemicDT),
        K_StrokeUndeterminedDT: this.serializeDateTime(formGroupKvalue.K_StrokeUndeterminedDT)
      },
      sectionL: {
        ...formGroupLvalue,
        CABGDateTime: this.serializeDateTime(formGroupLvalue.CABGDateTime),
        DCDateTime: this.serializeDateTime(formGroupLvalue.DCDateTime)
      },
      sectionM: {
        ...formGroupMvalue,
        FollowUps: this.serializeFollowUps(formGroupMvalue.FollowUps)
      }
    };

    this.result = cathPci50Model;

    return cathPci50Model;
  }

  private clearSubforms() {
    this.arrangeNativeTabs();
    this.arrangeGraftTabs();
    this.arrangePciTabs();
    this.arrangePciDeviceTabs();
    this.arrangeFollowUpTabs();
  }

  private serializePciLesions(data: any[]): any[] {
    // tslint:disable: no-string-literal
    const result = [];

    for (const d of data) {
      result.push({
        ...d,
        PrevTreatedLesionDate: this.serializeDate(d['PrevTreatedLesionDate'])
      });
    }
    return result;
    // tslint:enable: no-string-literal
  }

  private serializeFollowUps(data: any[]): any[] {
    // tslint:disable: no-string-literal
    const result = [];

    for (const d of data) {
      result.push({
        ...d,
        FU_AssessmentDate: this.serializeDate(d['FU_AssessmentDate']),
        FU_DeathDate: this.serializeDate(d['FU_DeathDate']),
        M_BleedingEventDT: this.serializeDate(d['M_BleedingEventDT']),
        M_CABGStentDT: this.serializeDate(d['M_CABGStentDT']),
        M_CABGNonStentDT: this.serializeDate(d['M_CABGNonStentDT']),
        M_NSTEMIDT: this.serializeDate(d['M_NSTEMIDT']),
        M_QwaveDT: this.serializeDate(d['M_QwaveDT']),
        M_STEMIDT: this.serializeDate(d['M_STEMIDT']),
        M_MIUnknownDT: this.serializeDate(d['M_MIUnknownDT']),
        M_PCINonStentDT: this.serializeDate(d['M_PCINonStentDT']),
        M_PCIStentDT: this.serializeDate(d['M_PCIStentDT']),
        M_ReadmissionDT: this.serializeDate(d['M_ReadmissionDT']),
        M_StrokeHemorrhageDT: this.serializeDate(d['M_StrokeHemorrhageDT']),
        M_StrokeIschemicDT: this.serializeDate(d['M_StrokeIschemicDT']),
        M_StrokeUndeterminedDT: this.serializeDate(d['M_StrokeUndeterminedDT']),
        M_ThrombosisStentDT: this.serializeDate(d['M_ThrombosisStentDT']),
        M_ThrombosisNonStentDT: this.serializeDate(d['M_ThrombosisNonStentDT'])
      });
    }
    return result;
    // tslint:enable: no-string-literal
  }

  private serializeDate(dateTime: any): any {
    const dt = moment.isMoment(dateTime) ? dateTime : moment(dateTime);

    return dt.startOf('day').toISOString(true);
  }

  private serializeDateTime(dateTime: any): any {
    const dt = moment.isMoment(dateTime) ? dateTime : moment(dateTime);
    return dt.toISOString(true);
  }

  checkValidation() {
    this.registryFormService.submitAllSections();
  }

  clearValidations() {
    this.clearSubforms();
    this.registryFormService.clearErrors();
  }

  //#region Section H
  getNativeLesionsTabLabel(index: number): string {
    const control = ((this.formGroupH.get(str.nativeLesions) as FormArray).controls[
      index
    ] as FormGroup).controls;
    const label = control.NVSegmentID.value;
    const stenosis = control.NVCoroVesselStenosis.value;

    return label !== null ? label + (stenosis ? ` (${stenosis}%)` : '') : '(new) *';
  }

  getGraftLesionsTabLabel(index: number): string {
    const control = ((this.formGroupH.get(str.graftLesions) as FormArray).controls[
      index
    ] as FormGroup).controls;
    const label = control.GraftSegmentID.value;
    const stenosis = control.GraftCoroVesselStenosis.value;

    return label !== null ? label + (stenosis ? ` (${stenosis}%)` : '') : '(new) *';
  }

  NVStenosisChanged(event: MatSelectChange) {
    if (event.value === 'Yes') {
      this.addNativeLesion();
    } else {
      this.removeAllNativeLesions();
    }
  }

  GraftStenosisChanged(event: MatSelectChange) {
    if (event.value === 'Yes') {
      this.addGraftLesion();
    } else {
      this.removeAllGraftLesions();
    }
  }

  NVSegmentIDChanged(event: MatSelectChange, index: number) {
    this.getSegmentIDsForNV();
    this.checkCanAddNativeLesion();

    this.getSegmentIDsForPci();
  }

  GraftSegmentIDChanged(event: MatSelectChange, index: number) {
    this.getSegmentIDsForGraft();
    this.checkCanAddGraftLesion();

    this.getSegmentIDsForPci();
  }

  addNativeLesion() {
    this.arrangeNativeTabs();

    const length = this.addLesion(
      str.nativeLesions,
      str.nvSegmentID,
      CathPci50Form.nativeLesion,
      conditions.nativeLesion
    );
    this.nativeLesionsTabIndex = length - 1;

    this.disableAddNativeLesion = true;
    this.getSegmentIDsForNV();
  }

  addGraftLesion() {
    this.arrangeGraftTabs();

    const length = this.addLesion(
      str.graftLesions,
      str.graftSegmentID,
      CathPci50Form.graftLesion,
      conditions.graftLesion
    );
    this.graftLesionsTabIndex = length - 1;

    this.disableAddGraftLesion = true;
    this.getSegmentIDsForGraft();
  }

  private addLesion(type: string, segmentID: string, form: any, conditns: any): number {
    const formArray = this.formGroupH.get(type) as FormArray;
    // const formGroups = formArray.controls as FormGroup[];

    // if (formGroups.findIndex((g: FormGroup) => g.get(segmentID).value === null) >= 0) {
    //   console.log('still have new');
    //   return;
    // }

    const newGroup = this.formBuilder.group(form);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditns, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);

    (this.visibles[type] as FormVisible[]).push(visible);
    formArray.push(newGroup);

    return formArray.length;
  }

  removeNativeLesion(index: number) {
    this.dialogService
      .createModalDialog({
        title: '!!Delete Native Lesion!!',
        content: 'คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่',
        buttons: ['ลบเลย', 'ยกเลิก'],
        style: 'alert'
      })
      .afterClosed()
      .subscribe(result => {
        if (result === 'ลบเลย') {
          this.removeLesion(index, str.nativeLesions, str.nvStenosis);

          this.getSegmentIDsForNV();
          this.checkCanAddNativeLesion();

          this.getSegmentIDsForPci();
        }
      });
  }

  removeGraftLesion(index: number) {
    this.dialogService
      .createModalDialog({
        title: '!!Delete Graft Lesion!!',
        content: 'คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่',
        buttons: ['ลบเลย', 'ยกเลิก'],
        style: 'alert'
      })
      .afterClosed()
      .subscribe(result => {
        if (result === 'ลบเลย') {
          this.removeLesion(index, str.graftLesions, str.graftStenosis);

          this.getSegmentIDsForGraft();
          this.checkCanAddGraftLesion();

          this.getSegmentIDsForPci();
        }
      });
  }

  private removeLesion(index: number, type: string, stenosis: string) {
    const formArray = this.formGroupH.get(type) as FormArray;

    formArray.removeAt(index);
    (this.visibles[type] as FormVisible[]).splice(index, 1);

    if (formArray.length === 0) {
      this.formGroupH.get(stenosis).setValue('No');
    }
  }

  removeAllNativeLesions() {
    this.removeAllLesions(str.nativeLesions);

    this.getSegmentIDsForPci();
  }

  removeAllGraftLesions() {
    this.removeAllLesions(str.graftLesions);

    this.getSegmentIDsForPci();
  }

  private removeAllLesions(type: string) {
    const formArray = this.formGroupH.get(type) as FormArray;
    formArray.clear();
    (this.visibles[type] as FormVisible[]) = [];
  }

  // private removeNewNativeLesions() {
  //   this.removeNewLesions(str.nativeLesions, str.nvSegmentID, str.nvStenosis);
  // }

  // private removeNewGraftLesions() {
  //   this.removeNewLesions(str.graftLesions, str.graftSegmentID, str.graftStenosis);
  // }

  private removeNewLesions(type: string, segmentID: string, stenosis: string) {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formGroups.forEach((fg, index) => {
      const value = fg.get(segmentID).value;

      if (value === null) {
        this.removeLesion(index, type, stenosis);
      }
    });

    this.disableAddNativeLesion = false;
  }

  arrangeNativeTabs() {
    this.nativeLesionsTabIndex = this.arrangeTabs(
      str.nativeLesions,
      str.nvSegmentID,
      str.nvStenosis,
      this.nativeLesionsTabIndex
    );
  }

  arrangeGraftTabs() {
    this.graftLesionsTabIndex = this.arrangeTabs(
      str.graftLesions,
      str.graftSegmentID,
      str.graftStenosis,
      this.graftLesionsTabIndex
    );
  }

  private arrangeTabs(type: string, segmentID: string, stenosis: string, tabIndex: number): number {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.value;

    if (formArray.length <= 0) {
      return;
    }

    const selectedSegmentID = formGroups[tabIndex][segmentID];

    formGroups.sort((a, b) => {
      const valueA = a[segmentID];
      const valueB = b[segmentID];
      if (!a[segmentID]) {
        return 1;
      }
      if (!b[segmentID]) {
        return -1;
      }
      return valueA.localeCompare(valueB, 'en', {
        numeric: true,
        sensitivity: 'base'
      });
    });
    formArray.setValue(formGroups);

    this.removeNewLesions(type, segmentID, stenosis);

    return formGroups.findIndex(a => a[segmentID] === selectedSegmentID);
  }

  getSegmentIDsForNV() {
    this.availableNVSegmentIDs = this.getSegmentIDs(str.nativeLesions, str.nvSegmentID);
  }

  getSegmentIDsForGraft() {
    this.availableGraftSegmentIDs = this.getSegmentIDs(str.graftLesions, str.graftSegmentID);
  }

  private getSegmentIDs(type: string, segmentID: string): RegSelectChoice[][] {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    const usedSegmentIDs = formGroups.map(fg => fg.get(segmentID).value);
    const availableSegmentIDs: RegSelectChoice[][] = [];

    formGroups.forEach(fg => {
      const selectedSegmentID = fg.get(segmentID).value;

      availableSegmentIDs.push(
        this.segmentNumbers.map(s => {
          return {
            label: s,
            value: s,
            disable: usedSegmentIDs.includes(s) && selectedSegmentID !== s
          };
        })
      );
    });

    return availableSegmentIDs;
  }

  private checkCanAddNativeLesion() {
    this.disableAddNativeLesion = this.checkCanAddLesion(str.nativeLesions, str.nvSegmentID);
  }

  private checkCanAddGraftLesion() {
    this.disableAddGraftLesion = this.checkCanAddLesion(str.graftLesions, str.graftSegmentID);
  }

  private checkCanAddLesion(type: string, segmentID: string): boolean {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    return formGroups.findIndex((g: FormGroup) => g.get(segmentID).value === null) >= 0;
  }
  //#endregion Section H

  //#region Section J
  getPciLesionsTabLabel(index: number): string {
    const fg = ((this.formGroupJ.get(str.pciLesions) as FormArray).controls[index] as FormGroup)
      .controls;
    const counter = fg.LesionCounter.value;
    const SegmentID = fg.SegmentID.value as Array<string>;

    if (SegmentID === null || SegmentID.length === 0) {
      return `Lesion ${counter} *`;
    }

    const labelTitle = `Lesion ${counter}`;
    let detail = '';
    for (const s of SegmentID) {
      detail += s.split(' - ')[1] + ', ';
    }
    return detail
      ? `${labelTitle}<span>(${detail.substring(0, detail.length - 2)})</span>`
      : labelTitle;
  }

  PciSegmentIDChanged() {
    this.getSegmentIDsForPci();
    this.checkCanAddPciLesion();

    this.getLesionsForDevices();
  }

  addPciLesion() {
    const formArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    // const formGroups = formArray.controls as FormGroup[];

    // if (formGroups.findIndex(fg => fg.get(str.segmentID).value === null || fg.get(str.segmentID).value.length === 0) >= 0) {
    //   console.log('still have new');
    //   return;
    // }

    const newGroup = this.formBuilder.group(CathPci50Form.pciLesion);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditions.pciLesion, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);
    newGroup.get(str.lesionCounter).setValue(formArray.length + 1);

    (this.visibles.PciLesions as FormVisible[]).push(visible);
    formArray.push(newGroup);

    // initialize conditions
    this.formGroupH.get('GraftStenosis').setValue(this.formGroupH.get('GraftStenosis').value);
    this.checkCulpritStenosisLesion();

    this.pciLesionsTabIndex = formArray.length - 1;
    this.disableAddPciLesion = true;

    this.getSegmentIDsForPci();
    this.getLesionsForDevices();
  }

  removePciLesion(index: number) {
    this.dialogService
      .createModalDialog({
        title: '!!Delete PCI Lesion!!',
        content: 'คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่',
        buttons: ['ลบเลย', 'ยกเลิก'],
        style: 'alert'
      })
      .afterClosed()
      .subscribe(result => {
        if (result === 'ลบเลย') {
          this.deletePciLesion(index);
        }
      });
  }

  deletePciLesion(index: number) {
    const formArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.removeLesionFromDevices(formGroups[index].get(str.lesionCounter).value);

    formArray.removeAt(index);
    (this.visibles.PciLesions as FormVisible[]).splice(index, 1);

    for (let i = 0; i < formGroups.length; i++) {
      this.renameLesionFromDevices(formGroups[i].get(str.lesionCounter).value, i + 1);
      formGroups[i].get(str.lesionCounter).setValue(i + 1);
    }

    this.getSegmentIDsForPci();
    this.checkCanAddPciLesion();
    this.getLesionsForDevices();
  }

  private getSegmentIDsForPci() {
    const nativeFormArray = this.formGroupH.get(str.nativeLesions) as FormArray;
    const nativeFormGroups = nativeFormArray.controls as FormGroup[];
    const nativeSegmentIDs = nativeFormGroups.map(fg => fg.get(str.nvSegmentID).value);

    const graftFormArray = this.formGroupH.get(str.graftLesions) as FormArray;
    const graftFormGroups = graftFormArray.controls as FormGroup[];
    const graftSegmentIDs = graftFormGroups.map(fg => fg.get(str.graftSegmentID).value);

    const availableSegmentIDs = [...new Set([...nativeSegmentIDs, ...graftSegmentIDs])]
      .filter(a => a !== null)
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }));

    const pciFormArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    const pciFormGroups = pciFormArray.controls as FormGroup[];
    const usedSegmentIDs: string[] = [];

    pciFormGroups.forEach(fg => {
      const SegmentID = fg.get(str.segmentID).value;
      if (SegmentID) {
        usedSegmentIDs.push(...SegmentID);
      }
    });

    const allChoices: RegSelectChoice[][] = [];

    pciFormGroups.forEach(fg => {
      let SegmentID = fg.get(str.segmentID).value as string[];
      if (SegmentID) {
        SegmentID.forEach((seg, index) => {
          if (!availableSegmentIDs.includes(seg)) {
            SegmentID.splice(index, 1);
          }
        });
        fg.get(str.segmentID).setValue(SegmentID);
      } else {
        SegmentID = [];
      }

      allChoices.push(
        availableSegmentIDs.map(s => {
          return {
            label: s,
            value: s,
            disable: usedSegmentIDs.includes(s) && !SegmentID.includes(s)
          };
        })
      );
    });

    if (allChoices.length <= 0) {
      console.log('no segment lesion');
    }

    this.availablePciSegmentIDs = allChoices;
  }

  private checkCanAddPciLesion() {
    const formArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.disableAddPciLesion =
      formGroups.findIndex((fg: FormGroup) => {
        const SegmentID = fg.get(str.segmentID).value;
        return SegmentID === null || SegmentID.length === 0;
      }) >= 0;
  }

  arrangePciTabs() {
    const formArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    if (formArray.length <= 0) {
      return;
    }

    for (let i = formGroups.length - 1; i >= 0; i--) {
      const SegmentID = formGroups[i].get(str.segmentID).value;

      if (SegmentID === null || SegmentID.length === 0) {
        // formArray.removeAt(i);
        // // tslint:disable-next-line: no-string-literal
        // (this.visibles[str.pciLesions] as FormVisible[]).splice(i, 1);
        this.deletePciLesion(i);
      }
    }

    formGroups.forEach((fg, index) => {
      fg.get(str.lesionCounter).setValue(index + 1);
    });

    this.disableAddPciLesion = false;
  }

  getPciDevicesTabLabel(index: number): string {
    const fg = ((this.formGroupJ.get(str.pciDevices) as FormArray).controls[index] as FormGroup)
      .controls;
    const counter = fg.ICDevCounter.value;
    const ICDevID = fg.ICDevID.value;

    if (ICDevID === null) {
      return `Device ${counter} *`;
    }

    const labelTitle = `Device ${counter}`;
    let detail = '';
    const deviceName = intraCoronaryDevices.find(d => d.id === ICDevID).deviceName;
    detail = deviceName.length > 20 ? deviceName.substring(0, 20) + '...' : deviceName;
    return detail ? `${labelTitle}<span>(${detail})</span>` : labelTitle;
  }

  ICDevIDChanged() {
    this.checkCanAddPciDevice();
  }

  addPciDevice() {
    const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
    // const formGroups = formArray.controls as FormGroup[];

    // if (formGroups.findIndex(fg => fg.get('ICDevID').value === null) >= 0) {
    //   console.log('still have new');
    //   return;
    // }

    const newGroup = this.formBuilder.group(CathPci50Form.pciDevice);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditions.pciDevice, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);
    newGroup.get(str.icDevCounter).setValue(formArray.length + 1);

    (this.visibles.PciDevices as FormVisible[]).push(visible);
    formArray.push(newGroup);

    this.pciDevicesTabIndex = formArray.length - 1;
    this.disableAddPciDevice = true;
  }

  removePciDevice(index: number) {
    this.dialogService
      .createModalDialog({
        title: '!!Delete PCI Device!!',
        content: 'คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่',
        buttons: ['ลบเลย', 'ยกเลิก'],
        style: 'alert'
      })
      .afterClosed()
      .subscribe(result => {
        if (result === 'ลบเลย') {
          const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
          const formGroups = formArray.controls as FormGroup[];

          formArray.removeAt(index);
          (this.visibles.PciDevices as FormVisible[]).splice(index, 1);

          for (let i = 0; i < formGroups.length; i++) {
            formGroups[i].get(str.icDevCounter).setValue(i + 1);
          }

          this.checkCanAddPciDevice();
        }
      });
  }

  // checkPciTechnique() {
  //   const result =
  //     this.visibles[str.pciDevices] &&
  //     (this.visibles[str.pciDevices] as FormVisible[]).length > 0;
  //   const pciTechniques = ['ProxOptimize', 'FinalKissBalloon', 'PCIResult'];

  //   if (result) {
  //     pciTechniques.forEach(t => {
  //       this.visibles[t] = result;
  //     });
  //     this.formGroupJ.setValue(this.formGroupJ.value);
  //   } else {
  //     pciTechniques.forEach(t => {
  //       this.visibles[t] = result;
  //       this.formGroupJ.get(t).setValue(null);
  //     });
  //   }
  // }

  private getLesionsForDevices() {
    const formArray = this.formGroupJ.get(str.pciLesions) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.lesions = formGroups.map(fg => {
      const LesionCounter = fg.get(str.lesionCounter).value;
      const SegmentIDs = fg.get(str.segmentID).value;

      return {
        value: LesionCounter,
        label: `Lesion ${LesionCounter}`,
        altLabel: `Lesion ${LesionCounter} (${SegmentIDs})`,
        disable: false
      } as RegSelectChoice;
    });
  }

  private checkCanAddPciDevice() {
    const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.disableAddPciDevice = formGroups.findIndex(fg => fg.get('ICDevID').value === null) >= 0;
  }

  arrangePciDeviceTabs() {
    const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    if (formArray.length <= 0) {
      return;
    }

    for (let i = formGroups.length - 1; i >= 0; i--) {
      const value = formGroups[i].get('ICDevID').value;

      if (value === null) {
        formArray.removeAt(i);
        (this.visibles.PciDevices as FormVisible[]).splice(i, 1);
      }
    }

    for (let i = 0; i < formGroups.length; i++) {
      formGroups[i].get(str.icDevCounter).setValue(i + 1);
    }

    this.disableAddPciDevice = false;
  }

  removeLesionFromDevices(lesion: string) {
    const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formGroups.forEach(fg => {
      const ICDevCounterAssn = fg.get(str.icDevCounterAssn).value as string[];
      if (ICDevCounterAssn) {
        ICDevCounterAssn.forEach((assn, index) => {
          if (assn === lesion) {
            ICDevCounterAssn.splice(index, 1);
          }
        });
        fg.get(str.icDevCounterAssn).setValue(ICDevCounterAssn);
      }
    });
  }

  renameLesionFromDevices(oldName: number, newName: number) {
    const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formGroups.forEach(fg => {
      const ICDevCounterAssn = fg.get(str.icDevCounterAssn).value as number[];
      if (ICDevCounterAssn) {
        ICDevCounterAssn.forEach((assn, index) => {
          if (assn === oldName) {
            ICDevCounterAssn[index] = newName;
          }
        });
        fg.get(str.icDevCounterAssn).setValue(ICDevCounterAssn);
      }
    });
  }
  //#endregion Section J

  //#region Section M
  getFollowUpsTabLabel(index: number): string {
    const fg = ((this.formGroupM.get(str.followUps) as FormArray).controls[index] as FormGroup)
      .controls;
    const fuDate = moment(fg.FU_AssessmentDate.value);
    const procDate = moment(this.formGroupE.get('ProcedureStartDateTime').value);

    if (!fuDate.isValid()) {
      return '(Plan F/U) *';
    }

    const date = fuDate.utcOffset(7).format('D/M/YYYY');

    if (!procDate.isValid()) {
      return date;
    }

    const period = this.getFollowUpPeriod(procDate, fuDate);
    return `${date}<span>(${period})</span>`;
  }

  private getFollowUpPeriod(procDate: moment.Moment, fuDate: moment.Moment): string {
    let period = 'n/a';
    const dateDiff = fuDate.diff(procDate, 'days', false);

    if (dateDiff > 0 && dateDiff <= 44) {
      period = '30 days';
    } else {
      const years = Math.round(dateDiff / 365);
      if (years > 0 && dateDiff >= years * 365 - 60 && dateDiff <= years * 365 + 60) {
        period = `${years} years`;
      }
    }
    return period;
  }

  // FollowUpDateChanged() {
  //   // this.getSegmentNumbersForPci();
  //   // this.checkCanAddPciLesion();
  //   // this.getLesions();
  // }

  addFollowUp() {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    // const formGroups = formArray.controls as FormGroup[];

    // if (formGroups.findIndex(fg => fg.get(str.segmentID).value === null || fg.get(str.segmentID).value.length === 0) >= 0) {
    //   console.log('still have new');
    //   return;
    // }

    // this.removeInvalidFollowUps();
    this.arrangeFollowUpTabs();

    const newGroup = this.formBuilder.group(CathPci50Form.followUp);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditions.followUp, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);
    newGroup.get('SubmittedFollowUp').setValue(false, { onlySelf: true });

    (this.visibles.FollowUps as FormVisible[]).push(visible);
    formArray.push(newGroup);
    this.followUpCompletions.push({ valid: 0, total: 0 });
    this.disableSubmitFollowUps.push(false);
    this.submittedFollowUps.push(false);

    // this.followUpsTabIndex = formArray.length - 1;
    // this.disableAddFollowUp = true;
  }

  FU_StatusChanged(event: MatSelectChange, index: number) {
    if (event.value === 'Alive') {
      this.removeInvalidFollowUps();
      this.addFollowUp();
    } else {
      this.removeFollowUpsNextTo(index);
    }
  }

  removeFollowUp(index: number) {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    // const formGroups = formArray.controls as FormGroup[];

    formArray.removeAt(index);
    (this.visibles[str.followUps] as FormVisible[]).splice(index, 1);
    this.followUpCompletions.splice(index, 1);
    this.disableSubmitFollowUps.splice(index, 1);
    this.submittedFollowUps.splice(index, 1);
  }

  private removeFollowUpsNextTo(index: number) {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    const length = formArray.length;

    for (let i = length - 1; i > index; i--) {
      this.removeFollowUp(i);
    }
  }

  private removeAllFollowUps() {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    formArray.clear();
    (this.visibles[str.followUps] as FormVisible[]) = [];
    this.followUpCompletions = [];
    this.disableSubmitFollowUps = [];
    this.submittedFollowUps = [];
  }

  private removeInvalidFollowUps() {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    for (let i = formGroups.length - 1; i >= 0; i--) {
      const fuDate = formGroups[i].get(str.followUpDate).value;

      if (fuDate === null) {
        this.removeFollowUp(i);
      }
    }
  }

  arrangeFollowUpTabs() {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;
    const formGroups = formArray.getRawValue();

    if (formArray.length <= 0) {
      return;
    }

    formGroups.sort((a, b) => {
      const dateA = moment(a[str.followUpDate]);
      const dateB = moment(b[str.followUpDate]);

      if (!dateA.isValid()) {
        return 1;
      }
      if (!dateB.isValid()) {
        return -1;
      }
      return dateA.isBefore(dateB) ? -1 : 1;
    });
    formArray.setValue(formGroups);
  }

  //#endregion Section M

  async submitDischarge() {
    this.formGroupL.get('SubmittedDischarge').patchValue(true, { onlySelf: true });
    await this.submit();
    this.submittedDischarge = true;
    this.disableAllAdmissionForm();
    this.formGroupM.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  async unSubmitDischarge() {
    this.formGroupL.get('SubmittedDischarge').patchValue(false, { onlySelf: true });
    this.submittedDischarge = false;
    this.enableAllAdmissionForm();
    this.unSubmitFollowUpsFrom(0);
    await this.submit();
    this.formGroupM.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  async submitFollowUp(formGroup: FormGroup, index: number) {
    formGroup.get('SubmittedFollowUp').patchValue(true, { onlySelf: true });
    await this.submit();
    this.submittedFollowUps[index] = true;
    formGroup.disable({ emitEvent: false });
    this.formGroupM.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  async unSubmitFollowUp(formGroup: FormGroup, index: number) {
    this.unSubmitFollowUpsFrom(index);
    await this.submit();
    this.formGroupM.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  private unSubmitFollowUpsFrom(index: number) {
    const formArray = this.formGroupM.get(str.followUps) as FormArray;

    for (let i = index; i < formArray.length; i++) {
      const formGroup = formArray.controls[i];
      if (formGroup.disabled) {
        formGroup.get('SubmittedFollowUp').patchValue(false, { onlySelf: true });
        this.submittedFollowUps[i] = false;
        formGroup.enable({ emitEvent: false });
      }
    }
  }

  private enableAllAdmissionForm() {
    this.formGroupA.enable({ emitEvent: false });
    this.formGroupB.enable({ emitEvent: false });
    this.formGroupC.enable({ emitEvent: false });
    this.formGroupD.enable({ emitEvent: false });
    this.formGroupE.enable({ emitEvent: false });
    this.formGroupF.enable({ emitEvent: false });
    this.formGroupG.enable({ emitEvent: false });
    this.formGroupH.enable({ emitEvent: false });
    this.formGroupI.enable({ emitEvent: false });
    this.formGroupJ.enable({ emitEvent: false });
    this.formGroupK.enable({ emitEvent: false });
    this.formGroupL.enable({ emitEvent: false });
  }

  private disableAllAdmissionForm() {
    this.formGroupA.disable({ emitEvent: false });
    this.formGroupB.disable({ emitEvent: false });
    this.formGroupC.disable({ emitEvent: false });
    this.formGroupD.disable({ emitEvent: false });
    this.formGroupE.disable({ emitEvent: false });
    this.formGroupF.disable({ emitEvent: false });
    this.formGroupG.disable({ emitEvent: false });
    this.formGroupH.disable({ emitEvent: false });
    this.formGroupI.disable({ emitEvent: false });
    this.formGroupJ.disable({ emitEvent: false });
    this.formGroupK.disable({ emitEvent: false });
    this.formGroupL.disable({ emitEvent: false });
  }

  debugFormService() {
    // this.registryFormService.setDebug();
    this.formGroupB.enable();
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
      'Hypertension',
      'Dyslipidemia',
      'HxMI',
      'PriorPCI',
      'FamilyHxCAD',
      'HxCVD',
      'PriorPAD',
      'HxChronicLungDisease',
      'PriorCABG',
      'CAOutHospital',
      'CATransferFac',
      'Diabetes',
      'CurrentDialysis'
    ];
    this.setToDefault(formGroup, controls, val);

    formGroup.get('TobaccoUse').setValue(val ? 'Never' : val);
  }

  setToDefaultPreProcMeds(formGroup: FormGroup, val: any) {
    const controls = [
      'PreProcMedASA',
      'PreProcMedBetaBlocker',
      'PreProcMedCaBlocker',
      'PreProcMedAntiArrhythmic',
      'PreProcMedLongActNitrate',
      'PreProcMedRanolazine',
      'PreProcMedStatin',
      'PreProcMedNonStatin',
      'PreProcMedPCSK9'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultPreProcLabs(formGroup: FormGroup, val: any) {
    const controls = [
      'PreProcTnILab',
      'PreProcTnTLab',
      'PreProcCreatLab',
      'HGBLab',
      'LipidsTCLab',
      'LipidsHDLLab'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultPostProcLabs(formGroup: FormGroup, val: any) {
    const controls = ['PostProcTnILab', 'PostProcTnTLab', 'PostProcCreatLab', 'PostProcHgbLab'];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultPciMeds(formGroup: FormGroup, val: any) {
    const controls = [
      'Argatroban',
      'Bivalirudin',
      'Fondaparinux',
      'HeparinDerivative',
      'LMWH',
      'UFH',
      'Warfarin',
      'Vorapaxar',
      'GPIIbIIIa',
      'Apixaban',
      'Dabigatran',
      'Edoxaban',
      'Rivaroxaban',
      'Cangrelor',
      'Clopidogrel',
      'Prasugrel',
      'Ticagrelor'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultPeriProcEvents(formGroup: FormGroup, val: any) {
    const controls = [
      'K_BleedingAccessSite',
      'K_BleedingGI',
      'K_BleedingGU',
      'K_BleedingHematoma',
      'K_BleedingOther',
      'K_BleedingRetro',
      'K_CardiacArrest',
      'K_CardiacTamponade',
      'K_CardiogenicShock',
      'K_HeartFailure',
      'K_MyocardialInfarction',
      'K_NewDialysis',
      'K_OtherVascular',
      'K_StrokeHemorrhage',
      'K_StrokeIschemic',
      'K_StrokeUndetermined',
      'PostTransfusion'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultDcMeds(formGroup: FormGroup, val: any) {
    const controls = [
      'DC_ACEI',
      'DC_Warfarin',
      'DC_Aspirin',
      'DC_Vorapaxar',
      'DC_ARB',
      'DC_BetaBlocker',
      'DC_Apixaban',
      'DC_Dabigatran',
      'DC_Edoxaban',
      'DC_Rivaroxaban',
      'DC_Clopidogrel',
      'DC_Prasugrel',
      'DC_Ticagrelor',
      'DC_Ticlopidine',
      'DC_Statin',
      'DC_NonStatin',
      'DC_Alirocumab',
      'DC_Evolocumab'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultFollowUpEvents(formGroup: FormGroup, val: any) {
    const controls = [
      'M_BleedingEvent',
      'M_CABGStent',
      'M_CABGNonStent',
      'M_NSTEMI',
      'M_Qwave',
      'M_STEMI',
      'M_MIUnknown',
      'M_PCINonStent',
      'M_PCIStent',
      'M_Readmission',
      'M_StrokeHemorrhage',
      'M_StrokeIschemic',
      'M_StrokeUndetermined',
      'M_ThrombosisStent',
      'M_ThrombosisNonStent'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  setToDefaultFollowUpMedications(formGroup: FormGroup, val: any) {
    const controls = [
      'FU_ACEI',
      'FU_Warfarin',
      'FU_Aspirin',
      'FU_Vorapaxar',
      'FU_ARB',
      'FU_BetaBlocker',
      'FU_Apixaban',
      'FU_Dabigatran',
      'FU_Edoxaban',
      'FU_Rivaroxaban',
      'FU_Clopidogrel',
      'FU_Prasugrel',
      'FU_Ticagrelor',
      'FU_Ticlopidine',
      'FU_Statin',
      'FU_NonStatin',
      'FU_Alirocumab',
      'FU_Evolocumab'
    ];
    this.setToDefault(formGroup, controls, val);
  }

  private getProvider(staffId: string): string {
    const staff = this.staffs.find(stf => stf.staffId === staffId);
    return staff ? staff.title + ' ' + staff.firstName + ' ' + staff.lastName : null;
  }

  private getDevice(deviceId: number): string {
    const device = intraCoronaryDevices.find(dv => dv.id === deviceId);
    return device.deviceName + ', ' + device.brand;
  }

  async printPDF() {
    const data = this.archiveForm();
    // tslint:disable-next-line: no-string-literal
    const fileName = `${data.sectionB['HospName']}-${data.sectionA['HN']}-${data.sectionA['AN']}`;

    // tslint:disable: no-string-literal
    data.sectionB['AdmProvider'] = this.getProvider(data.sectionB['AdmProvider']);
    data.sectionB['AttProvider'] = this.getProvider(data.sectionB['AttProvider']);
    data.sectionE['DCathProvider'] = this.getProvider(data.sectionE['DCathProvider']);
    data.sectionE['PCIProvider'] = this.getProvider(data.sectionE['PCIProvider']);
    data.sectionE['PCIProvider2'] = this.getProvider(data.sectionE['PCIProvider2']);
    data.sectionL['DCProvider'] = this.getProvider(data.sectionL['DCProvider']);

    const hsp = this.avHospitals.find(hosp => hosp.value === data.sectionB['HospName']);
    if (hsp) {
      data.sectionB['HospName'] = hsp.label;
    }

    const bdmsNetwork = hospitals.find(hosp => hosp.id === data.sectionB['BDMSNetwork']);
    data.sectionB['BDMSNetwork'] = bdmsNetwork
      ? bdmsNetwork.name + ' (' + bdmsNetwork.id + ')'
      : null;

    data.sectionJ['PciDevices'].forEach(
      device => (device.ICDevID = this.getDevice(device.ICDevID))
    );

    data.sectionM['FollowUps'].forEach(
      fu =>
        (fu['FollowUpPeriod'] = fu.FU_AssessmentDate
          ? this.getFollowUpPeriod(
              moment(data.sectionE['ProcedureStartDateTime']),
              moment(fu.FU_AssessmentDate)
            )
          : null)
    );
    // tslint:enable: no-string-literal

    const password = this.randomPdfPassword();

    this.dialogService
      .createModalDialog({
        title: '!!Security Alert!!',
        content: `You need this password to open PDF file:<br><center><h1>${password}</h1></center>`,
        buttons: ['OK'],
        style: 'notice'
      })
      .afterClosed()
      .subscribe(async o => {
        const report = new CathPciReport(
          data,
          this.user.staff.title + ' ' + this.user.staff.firstName + ' ' + this.user.staff.lastName,
          moment().format('D/M/YYYY H:mm'),
          this.user.staff.staffId,
          moment().toISOString(true),
          password
        );
        this.pdfReportService.downloadPdf(await report.getDocDefinition(), fileName);
      });
  }

  private randomPdfPassword(): string {
    const first = Math.floor(Math.random() * 100);
    const second = Math.floor(Math.random() * 100);

    return first.toString().padStart(2, '0') + ':' + second.toString().padStart(2, '0');
  }

  async AnFocusOut() {
    const an = this.formGroupA.get('AN').value;
    if (this.redoPCI.lastAn !== an || !this.redoPCI.status) {
      const data = await this.cathPci50Service.getCathPciByAn(an);
      // tslint:disable: no-string-literal
      if (data && data.sectionA['registryId'] !== this.formGroupA.get('registryId').value) {
        this.dialogService
          .createModalDialog({
            title: '!!Replicate Data!!',
            content:
              `พบข้อมูลผู้ป่วยที่ AN ตรงกัน กรุณาตรวจสอบให้แน่ใจอีกครั้งก่อนทำการใส่ข้อมูล<br>` +
              `หากเป็น Redo PCI ระบบจะใส่ข้อมูล Section A-D ให้อัตโนมัติ<br><br>` +
              `${data.sectionA['FirstName']} ${data.sectionA['LastName']}<br>` +
              `HN: ${data.sectionA['HN']}<br>` +
              `AN: ${data.sectionA['AN']}<br>` +
              `Birth Date: ${moment(data.sectionA['DOB']).format('D/M/YYYY')}<br>` +
              `Procedure Date: ${moment(data.sectionE['ProcedureStartDateTime']).format(
                'D/M/YYYY H:mm'
              )}`,
            buttons: ['แน่ใจ! เป็นเคส Redo PCI', 'อุ๊บส์! สงสัยจะซ้ำ'],
            style: 'warn'
          })
          .afterClosed()
          .subscribe(result => {
            if (result === 'แน่ใจ! เป็นเคส Redo PCI') {
              this.redoPCI.status = true;
              this.copySectionAtoDdata(data);
            }
          });
      } else {
        this.redoPCI.status = false;
      }
      // tslint:enable: no-string-literal
    }
    this.redoPCI.lastAn = an;
  }

  private copySectionAtoDdata(data: CathPci50Model) {
    // tslint:disable: no-string-literal
    this.formGroupI.get('PciProcType').patchValue('Redo PCI');
    this.formGroupI.get('PreviousCathLabVisit').patchValue(data.sectionA['registryId']);
    delete data.sectionA['registryId'];

    this.formGroupA.patchValue(data.sectionA);
    this.formGroupB.patchValue(data.sectionB);
    this.formGroupB.get('AdmProvider').patchValue(data.sectionB['AdmProvider']);
    this.formGroupB.get('AttProvider').patchValue(data.sectionB['AttProvider']);
    this.formGroupC.patchValue(data.sectionC);
    this.formGroupD.patchValue(data.sectionD);
    // tslint:enable: no-string-literal
  }
}
