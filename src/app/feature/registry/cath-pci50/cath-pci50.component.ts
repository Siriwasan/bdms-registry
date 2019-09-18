import { FormGroup, FormGroupDirective, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { RegistryFormComponent } from '../../../shared/modules/registry-form/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { RegistryFormService } from '../../../shared/modules/registry-form/registry-form.service';

import { tableOfContent } from './cath-pci50.toc';
import { FormDetail } from '../registry.model';
import {
  SectionMember,
  FormCompletion,
  FormVisible,
  RegSelectChoice
} from '../../../shared/modules/registry-form/registry-form.model';

import { CathPCI50Form } from './cath-pci50.form';
import { conditions } from './cath-pci50.condition';
import { validations } from './cath-pci50.validation';
import { CathPCI50FormCompletion } from './cath-pci50.model';
import * as cathPci50Data from './cath-pci50.data';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-cath-pci50',
  templateUrl: './cath-pci50.component.html',
  styleUrls: ['./cath-pci50.component.scss']
})
export class CathPci50Component extends RegistryFormComponent implements OnInit, AfterViewInit, OnDestroy {
  toc = tableOfContent;

  // FAB
  public open = false;
  public spin = true;
  public direction = 'up'; // up, down, left, right
  public animationMode = 'fling'; // fling, scale

  public visibles: FormVisible = {};
  public completion: CathPCI50FormCompletion;
  private subscriptions: Subscription[] = [];

  public nativeLesionsTabIndex = 0;
  public availableNVSegmentIDs: RegSelectChoice[][] = [];
  public disableAddNativeLesion = true;

  public graftLesionsTabIndex = 0;
  public availableGraftSegmentIDs: RegSelectChoice[][] = [];
  public disableAddGraftLesion = true;

  public pciLesionsTabIndex = 0;
  public availablePciSegmentIDs: RegSelectChoice[][] = [];
  public disableAddPciLesion = false;

  public pciDevicesTabIndex = 0;
  public lesions: RegSelectChoice[] = [];
  public disableAddPciDevice = false;

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

  get nativeLesions() {
    // tslint:disable-next-line: no-string-literal
    return this.visibles['NativeLesions'] && (this.visibles['NativeLesions'] as FormVisible[]).length > 0;
  }

  get graftLesions() {
    // tslint:disable-next-line: no-string-literal
    return this.visibles['GraftLesions'] && (this.visibles['GraftLesions'] as FormVisible[]).length > 0;
  }

  get pciLesions() {
    // tslint:disable-next-line: no-string-literal
    return this.visibles['PciLesions'] && (this.visibles['PciLesions'] as FormVisible[]).length > 0;
  }

  get pciDevices() {
    // tslint:disable: no-string-literal
    const result = this.visibles['PciDevices'] && (this.visibles['PciDevices'] as FormVisible[]).length > 0;

    if (result) {
      this.visibles['StentTechnique'] = true;
      this.visibles['ProxOptimize'] = true;
      this.visibles['FinalKissBalloon'] = true;
      this.formGroupJ.get('StentTechnique').setValue(null);
    } else {
      this.visibles['StentTechnique'] = false;
      this.visibles['ProxOptimize'] = false;
      this.visibles['FinalKissBalloon'] = false;
      this.formGroupJ.get('StentTechnique').setValue(null);
      this.formGroupJ.get('ProxOptimize').setValue(null);
      this.formGroupJ.get('FinalKissBalloon').setValue(null);
    }
    // tslint:enable: no-string-literal

    return true;
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

  gap = '20px';
  segmentNumbers = cathPci50Data.segmentNumbers;
  deathCauses = cathPci50Data.deathCauses;
  J_lesions = cathPci50Data.J_lesions;
  J_devices = cathPci50Data.J_devices;
  K_procedureEvents = cathPci50Data.K_procedureEvents;
  M_followUpEvents = cathPci50Data.M_followUpEvents;
  associatedLesions: string[] = [];

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    protected registryFormService: RegistryFormService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, registryFormService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.createForm();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.registryFormService.subscribeFormConditions();

    this.subscriptions.push(
      this.subscribeCAOutHospitalChanged(),
      this.subscribeCATransferFacChanged(),
      this.subscribeCAInHospChanged(),
      this.subscribePCIProcChanged(),
      this.subscribePCIIndicationChanged(),
      this.subscribeDCStatusChanged(),
      this.subscribeDCLocationChanged(),
      this.subscribeDCHospiceChanged(),
      this.subscribeNVStenosisChanged(),
      this.subscribeGraftStenosisChanged()
    );

    this.completion = this.getFormCompletion();
    this.calculateCompletion();

    // initialize value for complex conditions
    this.formGroupE.get('PCIProc').setValue(null);
    this.formGroupL.get('DCStatus').setValue(null);

    // tslint:disable: no-string-literal
    this.visibles['NativeLesions'] = [];
    this.visibles['GraftLesions'] = [];
    this.visibles['PciLesions'] = [];
    this.visibles['PciDevices'] = [];
    // tslint:enable: no-string-literal
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private createForm() {
    // tslint:disable: no-string-literal
    this.formGroupA = this.formBuilder.group(CathPCI50Form.sectionA);
    this.formGroupB = this.formBuilder.group(CathPCI50Form.sectionB);
    this.formGroupC = this.formBuilder.group(CathPCI50Form.sectionC);
    this.formGroupD = this.formBuilder.group(CathPCI50Form.sectionD);
    this.formGroupE = this.formBuilder.group(CathPCI50Form.sectionE);
    this.formGroupF = this.formBuilder.group(CathPCI50Form.sectionF);
    this.formGroupG = this.formBuilder.group(CathPCI50Form.sectionG);
    CathPCI50Form.sectionH['NativeLesions'] = this.formBuilder.array([]);
    CathPCI50Form.sectionH['GraftLesions'] = this.formBuilder.array([]);
    this.formGroupH = this.formBuilder.group(CathPCI50Form.sectionH);
    this.formGroupI = this.formBuilder.group(CathPCI50Form.sectionI);
    CathPCI50Form.sectionJ['PciLesions'] = this.formBuilder.array([]);
    CathPCI50Form.sectionJ['PciDevices'] = this.formBuilder.array([]);
    this.formGroupJ = this.formBuilder.group(CathPCI50Form.sectionJ);
    this.formGroupK = this.formBuilder.group(CathPCI50Form.sectionK);
    this.formGroupL = this.formBuilder.group(CathPCI50Form.sectionL);
    this.formGroupM = this.formBuilder.group(CathPCI50Form.sectionM);
    // tslint:enable: no-string-literal

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

  private subscribeNVStenosisChanged(): Subscription {
    return this.formGroupH.get('NVStenosis').valueChanges.subscribe(value => {
      if (value === 'Yes') {
        this.addNativeLesion();
      } else {
        this.removeAllNativeLesions();
      }
    });
  }

  private subscribeGraftStenosisChanged(): Subscription {
    return this.formGroupH.get('GraftStenosis').valueChanges.subscribe(value => {
      if (value === 'Yes') {
        this.addGraftLesion();
      } else {
        this.removeAllGraftLesions();
      }
    });
  }

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

    const formArray = this.formGroupJ.get('PciLesions') as FormArray;
    const isMI = MIs.indexOf(PCIIndication) >= 0;

    // tslint:disable: no-string-literal
    for (let i = 0; i < formArray.length; i++) {
      if (isMI) {
        this.visibles['PciLesions'][i]['CulpritArtery'] = true;
      } else {
        this.visibles['PciLesions'][i]['CulpritArtery'] = false;

        const formGroup = formArray.controls[i] as FormGroup;
        formGroup.get('CulpritArtery').setValue(null);
      }
    }
    // tslint:enable: no-string-literal
  }

  private subscribeDCStatusChanged(): Subscription {
    return this.formGroupL.get('DCStatus').valueChanges.subscribe(value => {
      this.dischargeMedications();
    });
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

    // tslint:disable: no-string-literal
    if (
      DCStatus === 'Alive' &&
      (DCLocation === 'Home' ||
        DCLocation === 'Extended care/TCU/rehab' ||
        DCLocation === 'Skilled Nursing facility' ||
        DCLocation === 'Other') &&
      DCHospice === 'No'
    ) {
      this.visibles['DC_Medications'] = true;

      dcMedications.forEach(med => {
        this.visibles[med] = true;
      });
    } else {
      this.visibles['DC_Medications'] = false;

      dcMedications.forEach(med => {
        this.formGroupL.get(med).setValue(null);
        this.visibles[med] = false;
      });
    }
    // tslint:enable: no-string-literal
  }

  public getTOCTitle(section: string): string {
    return this.toc.find(t => t.section === 'section' + section).title;
  }

  private getFormCompletion(): CathPCI50FormCompletion {
    const completion: CathPCI50FormCompletion = {
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

  public calculateCurrent(section: string): string {
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

    const completion = Math.round((this.completion.summary.valid / this.completion.summary.total) * 100);
    return `(${completion}%)`;
  }

  public async submit() {
    console.log('submit');

    // this.registryFormService.submitAllSections();
    // const data = this.archiveForm();

    // const alert = this.acsx290Service.checkNeededDataCompletion(data);
    // if (alert) {
    //   this.dialogService.createModalDialog({
    //     title: '!!Alert!!',
    //     content: `These information must fill before submitting ${alert}`,
    //     buttons: ['OK']
    //   });
    //   return;
    // }

    // this.acsx290Service.encryptSensitiveData(data);

    // this.store.dispatch(new UI.StartLoading());
    // if (this.mode === 'new') {
    //   if (await this.acsx290Service.isExistedForm(data)) {
    //     console.log('repeat form');
    //     this.store.dispatch(new UI.StopLoading());
    //     this.dialogService.createModalDialog({
    //       title: '!!Alert!!',
    //       content: `You can not create ACSx 2.9 registry more than one in same episode`,
    //       buttons: ['OK']
    //     });
    //     return;
    //   }

    //   console.log('new');
    //   this.registryId = await this.acsx290Service.createForm(data);
    //   this.formGroupA.get('registryId').setValue(this.registryId);
    //   this.location.go('/registry/acsx290/' + this.registryId);
    //   this.mode = 'edit';
    // } else {
    //   console.log('edit');
    //   await this.acsx290Service.updateForm(this.registryId, data);
    // }
    // this.store.dispatch(new UI.StopLoading());
    // this.registryFormService.markAllFormsUntouched();
  }

  async submitAndExit() {
    // await this.submit();
    // this.router.navigate(['registry']);
    this.location.back();
  }

  checkValidation() {
    this.registryFormService.submitAllSections();
  }

  clearValidations() {
    this.registryFormService.clearErrors();
  }

  //#region Section H
  public getNativeLesionsTabLabel(index: number): string {
    // tslint:disable-next-line: no-string-literal
    const control = ((this.formGroupH.controls['NativeLesions'] as FormArray).controls[index] as FormGroup).controls;
    const label = control.NVSegmentID.value;
    const stenosis = control.NVCoroVesselStenosis.value;

    return label !== null ? label + (stenosis ? ` (${stenosis}%)` : '') : '(new)';
  }

  public getGraftLesionsTabLabel(index: number): string {
    // tslint:disable-next-line: no-string-literal
    const control = ((this.formGroupH.controls['GraftLesions'] as FormArray).controls[index] as FormGroup).controls;
    const label = control.GraftSegmentID.value;
    const stenosis = control.GraftCoroVesselStenosis.value;

    return label !== null ? label + (stenosis ? ` (${stenosis}%)` : '') : '(new)';
  }

  public NVSegmentIDChanged(event: MatSelectChange, index: number) {
    this.getSegmentNumbersForNV();
    this.checkCanAddNativeLesion();

    this.getSegmentNumbersForPci();
  }

  public GraftSegmentIDChanged(event: MatSelectChange, index: number) {
    this.getSegmentNumbersForNV();
    this.checkCanAddGraftLesion();

    this.getSegmentNumbersForPci();
  }

  addNativeLesion() {
    const length = this.addLesion('NativeLesions', 'NVSegmentID', CathPCI50Form.nativeLesion, conditions.nativeLesion);

    this.nativeLesionsTabIndex = length - 1;
    this.disableAddNativeLesion = true;

    this.arrangeNativeTabs();
    this.getSegmentNumbersForNV();
  }

  addGraftLesion() {
    const length = this.addLesion('GraftLesions', 'GraftSegmentID', CathPCI50Form.graftLesion, conditions.graftLesion);

    this.graftLesionsTabIndex = length - 1;
    this.disableAddGraftLesion = true;

    this.arrangeGraftTabs();
    this.getSegmentNumbersForGraft();
  }

  private addLesion(type: string, segmentID: string, form: any, conditns: any): number {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.value as FormGroup[];

    if (formGroups.findIndex((g: FormGroup) => g[segmentID] === null) >= 0) {
      console.log('still have new');
      return;
    }

    const newGroup = this.formBuilder.group(form);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditns, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);

    (this.visibles[type] as FormVisible[]).push(visible);
    formArray.push(newGroup);

    return formArray.length;
  }

  public removeNativeLesion(index: number) {
    this.removeLesion(index, 'NativeLesions', 'NativeStenosis');

    this.getSegmentNumbersForNV();
    this.checkCanAddNativeLesion();

    this.getSegmentNumbersForPci();
  }

  public removeGraftLesion(index: number) {
    this.removeLesion(index, 'GraftLesions', 'GraftStenosis');

    this.getSegmentNumbersForGraft();
    this.checkCanAddGraftLesion();

    this.getSegmentNumbersForPci();
  }

  private removeLesion(index: number, type: string, stenosis: string) {
    const formArray = this.formGroupH.get(type) as FormArray;

    formArray.removeAt(index);
    (this.visibles[type] as FormVisible[]).splice(index, 1);

    if (formArray.length === 0) {
      this.formGroupH.get(stenosis).setValue('No');
    }
  }

  public removeAllNativeLesions() {
    this.removeAllLesions('NativeLesions');

    this.getSegmentNumbersForPci();
  }

  public removeAllGraftLesions() {
    this.removeAllLesions('GraftLesions');

    this.getSegmentNumbersForPci();
  }

  private removeAllLesions(type: string) {
    const formArray = this.formGroupH.get(type) as FormArray;
    formArray.clear();
    (this.visibles[type] as FormVisible[]) = [];
  }

  public arrangeNativeTabs() {
    this.nativeLesionsTabIndex = this.arrangeTabs('NativeLesions', 'NVSegmentID', this.nativeLesionsTabIndex);
  }

  public arrangeGraftTabs() {
    this.graftLesionsTabIndex = this.arrangeTabs('GraftLesions', 'GraftSegmentID', this.graftLesionsTabIndex);
  }

  private arrangeTabs(type: string, segmentID: string, tabIndex: number): number {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.value as FormGroup[];

    if (formArray.length === 0) {
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

    return formGroups.findIndex(a => a[segmentID] === selectedSegmentID);
  }

  public getSegmentNumbersForNV() {
    this.availableNVSegmentIDs = this.getSegmentNumbers('NativeLesions', 'NVSegmentID');
  }

  public getSegmentNumbersForGraft() {
    this.availableGraftSegmentIDs = this.getSegmentNumbers('GraftLesions', 'GraftSegmentID');
  }

  private getSegmentNumbers(type: string, segmentID: string): RegSelectChoice[][] {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.value as FormGroup[];

    const usedSegmentID = formGroups.map(g => g[segmentID]);
    const allChoices: RegSelectChoice[][] = [];

    formGroups.forEach(group => {
      const GraftSegmentID = group[segmentID];

      allChoices.push(
        this.segmentNumbers.map(s => {
          return {
            label: s,
            value: s,
            disable: usedSegmentID.indexOf(s) >= 0 && GraftSegmentID !== s
          };
        })
      );
    });

    return allChoices;
  }

  private checkCanAddNativeLesion() {
    this.disableAddNativeLesion = this.checkCanAddLesion('NativeLesions', 'NVSegmentID');
  }

  private checkCanAddGraftLesion() {
    this.disableAddGraftLesion = this.checkCanAddLesion('GraftLesions', 'GraftSegmentID');
  }

  private checkCanAddLesion(type: string, segmentID: string): boolean {
    const formArray = this.formGroupH.get(type) as FormArray;
    const formGroups = formArray.value as FormGroup[];

    return formGroups.findIndex((g: FormGroup) => g[segmentID] === null) >= 0;
  }
  //#endregion Section H

  public getPciLesionsTabLabel(index: number): string {
    // tslint:disable-next-line: no-string-literal
    const fg = ((this.formGroupJ.controls['PciLesions'] as FormArray).controls[index] as FormGroup).controls;
    const counter = fg.LesionCounter.value;
    const SegmentID = fg.SegmentID.value;
    return SegmentID !== null && SegmentID.length > 0 ? `Lesion ${counter}` : `Lesion ${counter} *`;
  }

  public PciSegmentIDChanged() {
    this.getSegmentNumbersForPci();
    this.checkCanAddPciLesion();
    this.getLesions();
  }

  public addPciLesion() {
    const formArray = this.formGroupJ.get('PciLesions') as FormArray;
    // const formGroups = formArray.controls as FormGroup[];

    // if (
    //   formGroups.findIndex(
    //     (fg: FormGroup) => fg.get('SegmentID').value === null || fg.get('SegmentID').value.length === 0
    //   ) >= 0
    // ) {
    //   console.log('still have new');
    //   return;
    // }

    const newGroup = this.formBuilder.group(CathPCI50Form.pciLesion);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditions.pciLesion, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);
    newGroup.get('LesionCounter').setValue(formArray.length + 1);

    // tslint:disable-next-line: no-string-literal
    (this.visibles['PciLesions'] as FormVisible[]).push(visible);
    formArray.push(newGroup);

    this.pciLesionsTabIndex = formArray.length - 1;
    this.disableAddPciLesion = true;

    this.getSegmentNumbersForPci();
    this.getLesions();
  }

  public removePciLesion(index: number) {
    const formArray = this.formGroupJ.get('PciLesions') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.removeLesionFromDevices(formGroups[index].get('LesionCounter').value);

    formArray.removeAt(index);
    // tslint:disable-next-line: no-string-literal
    (this.visibles['PciLesions'] as FormVisible[]).splice(index, 1);

    for (let i = 0; i < formGroups.length; i++) {
      this.renameLesionFromDevices(formGroups[i].get('LesionCounter').value, i + 1);
      formGroups[i].get('LesionCounter').setValue(i + 1);
    }

    this.getSegmentNumbersForPci();
    this.checkCanAddPciLesion();
    this.getLesions();
  }

  private getSegmentNumbersForPci() {
    const nativeFormArray = this.formGroupH.get('NativeLesions') as FormArray;
    const nativeFormGroups = nativeFormArray.controls as FormGroup[];
    const nativeSegmentIDs = nativeFormGroups.map(fg => fg.get('NVSegmentID').value);

    const graftFormArray = this.formGroupH.get('GraftLesions') as FormArray;
    const graftFormGroups = graftFormArray.controls as FormGroup[];
    const graftSegmentIDs = graftFormGroups.map(fg => fg.get('GraftSegmentID').value);

    const availableSegmentIDs = [...new Set([...nativeSegmentIDs, ...graftSegmentIDs])]
      .filter(a => a !== null)
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }));

    const pciFormArray = this.formGroupJ.get('PciLesions') as FormArray;
    const pciFormGroups = pciFormArray.controls as FormGroup[];
    const usedSegmentIDs: string[] = [];

    pciFormGroups.forEach(fg => {
      const SegmentID = fg.get('SegmentID').value;
      if (SegmentID) {
        usedSegmentIDs.push(...SegmentID);
      }
    });

    const allChoices: RegSelectChoice[][] = [];

    pciFormGroups.forEach(fg => {
      let SegmentID = fg.get('SegmentID').value as string[];
      if (SegmentID) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < SegmentID.length; i++) {
          const seg = SegmentID[i];

          if (availableSegmentIDs.indexOf(seg) < 0) {
            SegmentID.splice(i, 1);
          }
        }
        fg.get('SegmentID').setValue(SegmentID);
      } else {
        SegmentID = [];
      }

      allChoices.push(
        availableSegmentIDs.map(s => {
          return {
            label: s,
            value: s,
            disable: usedSegmentIDs.indexOf(s) >= 0 && SegmentID.indexOf(s) < 0
          };
        })
      );
    });

    this.availablePciSegmentIDs = allChoices;
  }

  private checkCanAddPciLesion() {
    const formArray = this.formGroupJ.get('PciLesions') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.disableAddPciLesion =
      formGroups.findIndex((fg: FormGroup) => {
        const SegmentID = fg.get('SegmentID').value;
        return SegmentID === null || SegmentID.length === 0;
      }) >= 0;
  }

  public arrangePciTabs() {
    const formArray = this.formGroupJ.get('PciLesions') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    if (formArray.length === 0) {
      return;
    }

    console.log(formGroups);

    for (let i = formGroups.length - 1; i >= 0; i--) {
      const value = formGroups[i].get('SegmentID').value;

      if (value === null || value.length === 0) {
        // formArray.removeAt(i);
        // // tslint:disable-next-line: no-string-literal
        // (this.visibles['PciLesions'] as FormVisible[]).splice(i, 1);
        this.removePciLesion(i);
      }
    }

    for (let i = 0; i < formGroups.length; i++) {
      formGroups[i].get('LesionCounter').setValue(i + 1);
    }

    this.disableAddPciLesion = false;
  }

  public getPciDevicesTabLabel(index: number): string {
    // tslint:disable-next-line: no-string-literal
    const fg = ((this.formGroupJ.controls['PciDevices'] as FormArray).controls[index] as FormGroup).controls;
    const counter = fg.ICDevCounter.value;
    const ICDevID = fg.ICDevID.value;
    return ICDevID !== null ? `Device ${counter}` : `Device ${counter} *`;
  }

  public ICDevIDChanged() {
    // this.getSegmentNumbersForPci();
    this.checkCanAddPciDevice();
  }

  public addPciDevice() {
    const formArray = this.formGroupJ.get('PciDevices') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    // tslint:disable-next-line: no-string-literal
    if (formGroups.findIndex((g: FormGroup) => g['ICDevID'] === null) >= 0) {
      console.log('still have new');
      return;
    }

    const newGroup = this.formBuilder.group(CathPCI50Form.pciDevice);
    const visible: FormVisible = {};
    this.registryFormService.subscribeValueChanges(newGroup, conditions.pciDevice, visible);

    // ! initial remove validator in hiding child control
    newGroup.setValue(newGroup.value);
    newGroup.get('ICDevCounter').setValue(formArray.length + 1);

    // tslint:disable-next-line: no-string-literal
    (this.visibles['PciDevices'] as FormVisible[]).push(visible);
    formArray.push(newGroup);

    this.pciDevicesTabIndex = formArray.length - 1;
    this.disableAddPciDevice = true;

    // this.getSegmentNumbersForPci();
  }

  public removePciDevice(index: number) {
    const formArray = this.formGroupJ.get('PciDevices') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formArray.removeAt(index);
    // tslint:disable-next-line: no-string-literal
    (this.visibles['PciDevices'] as FormVisible[]).splice(index, 1);

    for (let i = 0; i < formGroups.length; i++) {
      formGroups[i].get('ICDevCounter').setValue(i + 1);
    }

    // this.getSegmentNumbersForPci();
    this.checkCanAddPciDevice();
  }

  private getLesions() {
    const formArray = this.formGroupJ.get('PciLesions') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.lesions = formGroups.map(fg => {
      const v = fg.get('LesionCounter').value;
      return {
        label: `Lesion ${v}`,
        value: v,
        disable: false
      };
    });
  }

  private checkCanAddPciDevice() {
    const formArray = this.formGroupJ.get('PciDevices') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    this.disableAddPciDevice = formGroups.findIndex((fg: FormGroup) => fg.get('ICDevID') === null) >= 0;
  }

  public arrangePciDeviceTabs() {
    const formArray = this.formGroupJ.get('PciDevices') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    if (formArray.length === 0) {
      return;
    }

    for (let i = formGroups.length - 1; i >= 0; i--) {
      const value = formGroups[i].get('ICDevID').value;

      if (value === null) {
        formArray.removeAt(i);
        // tslint:disable-next-line: no-string-literal
        (this.visibles['PciDevices'] as FormVisible[]).splice(i, 1);
      }
    }

    for (let i = 0; i < formGroups.length; i++) {
      formGroups[i].get('ICDevCounter').setValue(i + 1);
    }

    this.disableAddPciDevice = false;
  }

  removeLesionFromDevices(lesion: string) {
    const formArray = this.formGroupJ.get('PciDevices') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formGroups.forEach(fg => {
      const ICDevCounterAssn = fg.get('ICDevCounterAssn').value as string[];
      if (ICDevCounterAssn) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < ICDevCounterAssn.length; i++) {
          if (ICDevCounterAssn[i] === lesion) {
            ICDevCounterAssn.splice(i, 1);
          }
        }
        fg.get('ICDevCounterAssn').setValue(ICDevCounterAssn);
      }
    });
  }

  renameLesionFromDevices(oldName: number, newName: number) {
    const formArray = this.formGroupJ.get('PciDevices') as FormArray;
    const formGroups = formArray.controls as FormGroup[];

    formGroups.forEach(fg => {
      const ICDevCounterAssn = fg.get('ICDevCounterAssn').value as number[];
      if (ICDevCounterAssn) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < ICDevCounterAssn.length; i++) {
          if (ICDevCounterAssn[i] === oldName) {
            ICDevCounterAssn[i] = newName;
          }
        }
        fg.get('ICDevCounterAssn').setValue(ICDevCounterAssn);
      }
    });
  }
}
