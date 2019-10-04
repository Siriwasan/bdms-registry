import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSelectChange } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { utc, Moment, isMoment } from 'moment';

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
import { Staff } from '../../staff/staff.model';

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
  providers: [CathPci50Service]
})
export class CathPci50Component extends RegistryFormComponent implements OnInit, AfterViewInit, OnDestroy {
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

  staffs: Staff[];
  admitPhysician: RegSelectChoice[];
  cardioAndIntervention: RegSelectChoice[];
  intervention: RegSelectChoice[];

  avCoroDevices: RegSelectChoice[];
  avHospitals: string[];
  toc = tableOfContent;
  nationality = registryData.nationality;
  segmentNumbers = cathPci50Data.segmentNumbers;
  deathCauses = cathPci50Data.deathCauses;
  J_lesions = cathPci50Data.J_lesions;
  J_devices = cathPci50Data.J_devices;
  K_procedureEvents = cathPci50Data.K_procedureEvents;
  M_followUpEvents = cathPci50Data.M_followUpEvents;
  associatedLesions: string[] = [];

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

    const completion = Math.round((this.completion.summary.valid / this.completion.summary.total) * 100);
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
    return this.visibles[str.nativeLesions] && (this.visibles[str.nativeLesions] as FormVisible[]).length > 0;
  }

  get nativeLesionsControls() {
    return (this.formGroupH.get(str.nativeLesions) as FormArray).controls;
  }

  get graftLesions() {
    return this.visibles[str.graftLesions] && (this.visibles[str.graftLesions] as FormVisible[]).length > 0;
  }

  get graftLesionsControls() {
    return (this.formGroupH.get(str.graftLesions) as FormArray).controls;
  }

  get pciLesions() {
    return this.visibles[str.pciLesions] && (this.visibles[str.pciLesions] as FormVisible[]).length > 0;
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
  @ViewChild('formDirectiveM', { static: true }) formDirectiveM: FormGroupDirective;

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
    private authService: AuthService
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

    this.avHospitals = this.authService
      .getAvailableHospitals(this.user.staff.primaryHospId, this.user.staff.permission)
      .map(hosp => hosp.id);
    this.avCoroDevices = intraCoronaryDevices.map(m => {
      return {
        value: m.id,
        label: m.deviceName,
        // detailHtml: `<span>Type:<i>${m.deviceType}</i></span> <span>Brand:<i>${m.brand}</i></span>`,
        detailHtml: `<span>Type:<i>${m.deviceType}</i>&emsp;Brand:<i>${m.brand}</i></span>`,
        disable: false
      } as RegSelectChoice;
    });

    this.formGroupA.get('registryId').setValue('(new)');
    this.staffs = await this.cathPci50Service.getStaffs();
    await this.loadById();

    this.completion = this.getFormCompletion();
    this.subscribeCompletionCalculation();

    this.checkPciTechnique();
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

    this.registryFormService.initializeForm(this.sectionMembers, conditions, validations, this.visibles);
    this.registryFormService.setDataDict(require('raw-loader!./cath-pci50.dict.md'));
  }

  private async loadStaffs() {
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
      positions.includes(staff.position) && (staff.primaryHospId === hospId || staff.secondHospIds.includes(hospId));

    const staffToChoice = (staff: Staff) => {
      return {
        value: staff.staffId,
        label: staff.title + ' ' + staff.firstName + ' ' + staff.lastName,
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
    this.intervention = this.staffs.filter(staff => filterStaff(staff, ['Cardiac Interventionist'])).map(staffToChoice);
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
      } else {
        this.router.navigate(['registry/cath-pci50']);
      }
    }
  }

  private setFormValue(data: CathPci50Model) {
    this.formDetail = data.detail;
    this.formGroupA.setValue(data.sectionA);
    this.formGroupB.setValue(data.sectionB);
    this.formGroupC.setValue(data.sectionC);
    this.formGroupD.setValue(data.sectionD);
    this.formGroupE.setValue(data.sectionE);
    this.formGroupF.setValue(data.sectionF);
    this.formGroupG.setValue(data.sectionG);

    data.sectionH[str.nativeLesions].forEach(_ =>
      this.addLesion(str.nativeLesions, str.nvSegmentID, CathPci50Form.nativeLesion, conditions.nativeLesion)
    );
    data.sectionH[str.graftLesions].forEach(_ =>
      this.addLesion(str.graftLesions, str.graftSegmentID, CathPci50Form.graftLesion, conditions.graftLesion)
    );
    this.formGroupH.setValue(data.sectionH);

    this.getSegmentIDsForNV();
    this.getSegmentIDsForGraft();
    this.disableAddNativeLesion = false;
    this.disableAddGraftLesion = false;

    this.formGroupI.setValue(data.sectionI);

    data.sectionJ[str.pciLesions].forEach(_ => this.addPciLesion());
    data.sectionJ[str.pciDevices].forEach(_ => this.addPciDevice());
    this.formGroupJ.setValue(data.sectionJ);

    this.getSegmentIDsForPci();
    this.getLesionsForDevices();
    this.pciLesionsTabIndex = 0;
    this.disableAddPciLesion = false;
    this.pciDevicesTabIndex = 0;
    this.disableAddPciDevice = false;

    this.formGroupK.setValue(data.sectionK);
    this.formGroupL.setValue(data.sectionL);

    data.sectionM[str.followUps].forEach(_ => this.addFollowUp());
    this.formGroupM.setValue(data.sectionM);
  }

  private subscribeDOBChanged(): Subscription {
    return this.formGroupA.get('DOB').valueChanges.subscribe(value => {
      const dob = utc(value);
      if (!dob.isValid()) {
        this.formGroupA.get('Age').reset();
        return;
      }

      const age = -dob.diff(new Date(), 'years', false);
      this.formGroupA.get('Age').setValue(age);
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
    });
  }

  private subscribeCATransferFacChanged(): Subscription {
    return this.formGroupC.get('CATransferFac').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
    });
  }

  private subscribeCAInHospChanged(): Subscription {
    return this.formGroupE.get('CAInHosp').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
    });
  }

  private subscribePCIProcChanged(): Subscription {
    return this.formGroupE.get('PCIProc').valueChanges.subscribe(value => {
      this.postCardiacArrestCare();
    });
  }

  private postCardiacArrestCare() {
    const CAOutHospital = this.formGroupC.get('CAOutHospital').value;
    const CATransferFac = this.formGroupC.get('CATransferFac').value;
    const CAInHosp = this.formGroupE.get('CAInHosp').value;
    const PCIProc = this.formGroupE.get('PCIProc').value;

    // tslint:disable: no-string-literal
    if (CAOutHospital === 'Yes' || CATransferFac === 'Yes' || CAInHosp === 'Yes' || PCIProc === 'Yes') {
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

  private subscribeDCStatusChanged(): Subscription {
    return this.formGroupL.get('DCStatus').valueChanges.subscribe(value => {
      this.dischargeMedications();

      // if (value === 'Alive') {
      //   this.addFollowUp();
      // } else {
      //   this.removeAllFollowUps();
      // }
    });
  }

  DCStatusChanged(event: MatSelectChange) {
    if (event.value === 'Alive') {
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
      (DCLocation === 'Home' ||
        DCLocation === 'Extended care/TCU/rehab' ||
        DCLocation === 'Skilled Nursing facility' ||
        DCLocation === 'Other') &&
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

  private getFormCompletion(): CathPci50Completion {
    const completion: CathPci50Completion = {
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
      sectionM: null
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
          const oldCompletion = this.completion['section' + sm[0]] as FormCompletion;
          const newCompletion = this.registryFormService.getSectionCompletion(sm[0]);
          this.completion['section' + sm[0]] = newCompletion;

          // const summary: FormCompletion = {
          //   valid: 0,
          //   total: 0
          // };

          // Object.keys(this.completion).forEach(key => {
          //   if (key !== 'summary') {
          //     const sectionId = key.substr(7);
          //     const secCompletion = this.completion['section' + sectionId];
          //     summary.valid += secCompletion.valid;
          //     summary.total += secCompletion.total;
          //   }
          // });

          // this.completion.summary = summary;
          this.completion.summary.valid = this.completion.summary.valid - oldCompletion.valid + newCompletion.valid;
          this.completion.summary.total = this.completion.summary.total - oldCompletion.total + newCompletion.total;
        })
      );
    });
  }

  async submit(exit = false) {
    this.registryFormService.submitAllSections();
    const data = this.archiveForm();

    const alert = this.cathPci50Service.checkNeededDataCompletion(data);
    if (alert) {
      this.dialogService.createModalDialog({
        title: '!!Alert!!',
        content: `These information must fill before submitting ${alert}`,
        buttons: ['OK']
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

    const cathPci50Model: CathPci50Model = {
      detail: this.formDetail,
      completion: this.getFormCompletion(),
      sectionA: {
        ...this.formGroupA.value,
        DOB: this.serializeDateTime(this.formGroupA.get('DOB').value)
      },
      sectionB: {
        ...this.formGroupB.value,
        ArrivalDateTime: this.serializeDateTime(this.formGroupB.get('ArrivalDateTime').value)
      },
      sectionC: {
        ...this.formGroupC.value,
        HxMIDate: this.serializeDateTime(this.formGroupC.get('HxMIDate').value),
        HxPCIDate: this.serializeDateTime(this.formGroupC.get('HxPCIDate').value),
        HxCABGDate: this.serializeDateTime(this.formGroupC.get('HxCABGDate').value)
      },
      sectionD: {
        ...this.formGroupD.value,
        StressTestDate: this.serializeDateTime(this.formGroupD.get('StressTestDate').value),
        CardiacCTADate: this.serializeDateTime(this.formGroupD.get('CardiacCTADate').value),
        CalciumScoreDate: this.serializeDateTime(this.formGroupD.get('CalciumScoreDate').value),
        PriorDxAngioDate: this.serializeDateTime(this.formGroupD.get('PriorDxAngioDate').value)
      },
      sectionE: {
        ...this.formGroupE.value,
        ProcedureStartDateTime: this.serializeDateTime(this.formGroupE.get('ProcedureStartDateTime').value),
        ProcedureEndDateTime: this.serializeDateTime(this.formGroupE.get('ProcedureEndDateTime').value)
      },
      sectionF: { ...this.formGroupF.value },
      sectionG: { ...this.formGroupG.value },
      sectionH: { ...this.formGroupH.value },
      sectionI: {
        ...this.formGroupI.value,
        SymptomDate: this.serializeDateTime(this.formGroupI.get('SymptomDate').value),
        SymptomTime: this.serializeDateTime(this.formGroupI.get('SymptomTime').value),
        ThromDateTime: this.serializeDateTime(this.formGroupI.get('ThromDateTime').value),
        SubECGDateTime: this.serializeDateTime(this.formGroupI.get('SubECGDateTime').value),
        EDPresentDateTime: this.serializeDateTime(this.formGroupI.get('EDPresentDateTime').value),
        FirstDevActiDateTime: this.serializeDateTime(this.formGroupI.get('FirstDevActiDateTime').value)
      },
      sectionJ: {
        ...this.formGroupJ.value,
        PciLesions: this.serializePciLesions(this.formGroupJ.value.PciLesions)
      },
      sectionK: {
        ...this.formGroupK.value,
        K_BleedingAccessSiteDT: this.serializeDateTime(this.formGroupK.get('K_BleedingAccessSiteDT').value),
        K_BleedingGIDT: this.serializeDateTime(this.formGroupK.get('K_BleedingGIDT').value),
        K_BleedingGUDT: this.serializeDateTime(this.formGroupK.get('K_BleedingGUDT').value),
        K_BleedingHematomaDT: this.serializeDateTime(this.formGroupK.get('K_BleedingHematomaDT').value),
        K_BleedingOtherDT: this.serializeDateTime(this.formGroupK.get('K_BleedingOtherDT').value),
        K_BleedingRetroDT: this.serializeDateTime(this.formGroupK.get('K_BleedingRetroDT').value),
        K_CardiacArrestDT: this.serializeDateTime(this.formGroupK.get('K_CardiacArrestDT').value),
        K_CardiacTamponadeDT: this.serializeDateTime(this.formGroupK.get('K_CardiacTamponadeDT').value),
        K_CardiogenicShockDT: this.serializeDateTime(this.formGroupK.get('K_CardiogenicShockDT').value),
        K_HeartFailureDT: this.serializeDateTime(this.formGroupK.get('K_HeartFailureDT').value),
        K_MyocardialInfarctionDT: this.serializeDateTime(this.formGroupK.get('K_MyocardialInfarctionDT').value),
        K_NewDialysisDT: this.serializeDateTime(this.formGroupK.get('K_NewDialysisDT').value),
        K_OtherVascularDT: this.serializeDateTime(this.formGroupK.get('K_OtherVascularDT').value),
        K_StrokeHemorrhageDT: this.serializeDateTime(this.formGroupK.get('K_StrokeHemorrhageDT').value),
        K_StrokeIschemicDT: this.serializeDateTime(this.formGroupK.get('K_StrokeIschemicDT').value),
        K_StrokeUndeterminedDT: this.serializeDateTime(this.formGroupK.get('K_StrokeUndeterminedDT').value)
      },
      sectionL: {
        ...this.formGroupL.value,
        CABGDateTime: this.serializeDateTime(this.formGroupL.get('CABGDateTime').value),
        DCDateTime: this.serializeDateTime(this.formGroupL.get('DCDateTime').value)
      },
      sectionM: {
        ...this.formGroupM.value,
        FollowUps: this.serializeFollowUps(this.formGroupM.value.FollowUps)
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
        PrevTreatedLesionDate: this.serializeDateTime(d['PrevTreatedLesionDate'])
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
        FU_AssessmentDate: this.serializeDateTime(d['FU_AssessmentDate']),
        FU_DeathDate: this.serializeDateTime(d['FU_DeathDate']),
        M_BleedingEventDT: this.serializeDateTime(d['M_BleedingEventDT']),
        M_CABGStentDT: this.serializeDateTime(d['M_CABGStentDT']),
        M_CABGNonStentDT: this.serializeDateTime(d['M_CABGNonStentDT']),
        M_NSTEMIDT: this.serializeDateTime(d['M_NSTEMIDT']),
        M_QwaveDT: this.serializeDateTime(d['M_QwaveDT']),
        M_STEMIDT: this.serializeDateTime(d['M_STEMIDT']),
        M_MIUnknownDT: this.serializeDateTime(d['M_MIUnknownDT']),
        M_PCINonStentDT: this.serializeDateTime(d['M_PCINonStentDT']),
        M_PCIStentDT: this.serializeDateTime(d['M_PCIStentDT']),
        M_ReadmissionDT: this.serializeDateTime(d['M_ReadmissionDT']),
        M_StrokeHemorrhageDT: this.serializeDateTime(d['M_StrokeHemorrhageDT']),
        M_StrokeIschemicDT: this.serializeDateTime(d['M_StrokeIschemicDT']),
        M_StrokeUndeterminedDT: this.serializeDateTime(d['M_StrokeUndeterminedDT']),
        M_ThrombosisStentDT: this.serializeDateTime(d['M_ThrombosisStentDT']),
        M_ThrombosisNonStentDT: this.serializeDateTime(d['M_ThrombosisNonStentDT'])
      });
    }
    return result;
    // tslint:enable: no-string-literal
  }

  private serializeDateTime(dateTime: any): any {
    return isMoment(dateTime) ? dateTime.toISOString() : dateTime;
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
    const control = ((this.formGroupH.get(str.nativeLesions) as FormArray).controls[index] as FormGroup).controls;
    const label = control.NVSegmentID.value;
    const stenosis = control.NVCoroVesselStenosis.value;

    return label !== null ? label + (stenosis ? ` (${stenosis}%)` : '') : '(new) *';
  }

  getGraftLesionsTabLabel(index: number): string {
    const control = ((this.formGroupH.get(str.graftLesions) as FormArray).controls[index] as FormGroup).controls;
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
    this.removeLesion(index, str.nativeLesions, str.nvStenosis);

    this.getSegmentIDsForNV();
    this.checkCanAddNativeLesion();

    this.getSegmentIDsForPci();
  }

  removeGraftLesion(index: number) {
    this.removeLesion(index, str.graftLesions, str.graftStenosis);

    this.getSegmentIDsForGraft();
    this.checkCanAddGraftLesion();

    this.getSegmentIDsForPci();
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
      return valueA.localeCompare(valueB, 'en', { numeric: true, sensitivity: 'base' });
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
    const fg = ((this.formGroupJ.get(str.pciLesions) as FormArray).controls[index] as FormGroup).controls;
    const counter = fg.LesionCounter.value;
    const SegmentID = fg.SegmentID.value;
    return SegmentID !== null && SegmentID.length > 0 ? `Lesion ${counter}` : `Lesion ${counter} *`;
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

    this.pciLesionsTabIndex = formArray.length - 1;
    this.disableAddPciLesion = true;

    this.getSegmentIDsForPci();
    this.getLesionsForDevices();
  }

  removePciLesion(index: number) {
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
        this.removePciLesion(i);
      }
    }

    formGroups.forEach((fg, index) => {
      fg.get(str.lesionCounter).setValue(index + 1);
    });

    this.disableAddPciLesion = false;
  }

  getPciDevicesTabLabel(index: number): string {
    const fg = ((this.formGroupJ.get(str.pciDevices) as FormArray).controls[index] as FormGroup).controls;
    const counter = fg.ICDevCounter.value;
    const ICDevID = fg.ICDevID.value;
    return ICDevID !== null ? `Device ${counter}` : `Device ${counter} *`;
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

    this.checkPciTechnique();
  }

  removePciDevice(index: number) {
    const formArray = this.formGroupJ.get(str.pciDevices) as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formArray.removeAt(index);
    (this.visibles.PciDevices as FormVisible[]).splice(index, 1);

    for (let i = 0; i < formGroups.length; i++) {
      formGroups[i].get(str.icDevCounter).setValue(i + 1);
    }

    this.checkCanAddPciDevice();

    this.checkPciTechnique();
  }

  checkPciTechnique() {
    const result = this.visibles[str.pciDevices] && (this.visibles[str.pciDevices] as FormVisible[]).length > 0;
    const pciTechniques = ['StentTechnique', 'ProxOptimize', 'FinalKissBalloon', 'PCIResult'];

    if (result) {
      pciTechniques.forEach(t => {
        this.visibles[t] = result;
      });
      this.formGroupJ.setValue(this.formGroupJ.value);
    } else {
      pciTechniques.forEach(t => {
        this.visibles[t] = result;
        this.formGroupJ.get(t).setValue(null);
      });
    }
  }

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
    this.checkPciTechnique();
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
    const fg = ((this.formGroupM.get(str.followUps) as FormArray).controls[index] as FormGroup).controls;
    const fuDate = utc(fg.FU_AssessmentDate.value);
    const procDate = utc(this.formGroupE.get('ProcedureStartDateTime').value);

    if (!fuDate.isValid()) {
      return '(Plan F/U) *';
    }

    const date = fuDate.utcOffset(7).format('DD/MM/YYYY');

    if (!procDate.isValid()) {
      return date;
    }

    const period = this.getFollowUpPeriod(procDate, fuDate);
    return `${date}<span>(${period})</span>`;
  }

  private getFollowUpPeriod(procDate: Moment, fuDate: Moment): string {
    let period = '';
    const dateDiff = fuDate.diff(procDate, 'days', false);

    if (dateDiff <= 34) {
      period = '30 days';
    } else {
      const years = Math.ceil((dateDiff - 60) / 365);
      period = `${years} years`;
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

    (this.visibles.FollowUps as FormVisible[]).push(visible);
    formArray.push(newGroup);

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
    const formGroups = formArray.value;

    if (formArray.length <= 0) {
      return;
    }

    formGroups.sort((a, b) => {
      const dateA = utc(a[str.followUpDate]);
      const dateB = utc(b[str.followUpDate]);

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
}
