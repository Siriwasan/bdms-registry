import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RegistryFormComponent } from '../../../shared/modules/registry-form/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { RegistryFormService } from '../../../shared/modules/registry-form/registry-form.service';

import { tableOfContent } from './cath-pci50.toc';
import { FormDetail } from '../registry.model';
import { SectionMember, FormCompletion } from '../../../shared/modules/registry-form/registry-form.model';

import { CathPCI50Form } from './cath-pci50.form';
import { conditions } from './cath-pci50.condition';
import { validations } from './cath-pci50.validation';
import { CathPCI50FormCompletion } from './cath-pci50.model';
import * as cathPci50Data from './cath-pci50.data';

@Component({
  selector: 'app-cath-pci50',
  templateUrl: './cath-pci50.component.html',
  styleUrls: ['./cath-pci50.component.scss']
})
export class CathPci50Component extends RegistryFormComponent implements OnInit, AfterViewInit, OnDestroy {
  toc = tableOfContent;
  public visibles: { [id: string]: boolean } = {};
  public completion: CathPCI50FormCompletion;
  private subscriptions: Subscription[] = [];

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
    private formBuilder: FormBuilder
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
      this.subscribeHasLesionChanged('01'),
      this.subscribeHasLesionChanged('02'),
      this.subscribeHasLesionChanged('03'),
      this.subscribeHasLesionChanged('04'),
      this.subscribeHasLesionChanged('05'),
      this.subscribeHasLesionChanged('06'),
      this.subscribeHasLesionChanged('07'),
      this.subscribeHasLesionChanged('08'),
      this.subscribeDCStatusChanged(),
      this.subscribeDCLocationChanged(),
      this.subscribeDCHospiceChanged()
    );

    this.completion = this.getFormCompletion();
    this.calculateCompletion();

    // tslint:disable: no-string-literal
    this.visibles['lesion1'] = true;
    this.visibles['HasLesion01'] = true;
    // tslint:enable: no-string-literal

    // initialize value for complex conditions
    this.formGroupE.get('PCIProc').setValue(null);
    this.formGroupJ.get('HasLesion01').setValue(null);
    this.formGroupL.get('DCStatus').setValue(null);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private createForm() {
    this.formGroupA = this.formBuilder.group(CathPCI50Form.sectionA);
    this.formGroupB = this.formBuilder.group(CathPCI50Form.sectionB);
    this.formGroupC = this.formBuilder.group(CathPCI50Form.sectionC);
    this.formGroupD = this.formBuilder.group(CathPCI50Form.sectionD);
    this.formGroupE = this.formBuilder.group(CathPCI50Form.sectionE);
    this.formGroupF = this.formBuilder.group(CathPCI50Form.sectionF);
    this.formGroupG = this.formBuilder.group(CathPCI50Form.sectionG);
    this.formGroupH = this.formBuilder.group(CathPCI50Form.sectionH);
    this.formGroupI = this.formBuilder.group(CathPCI50Form.sectionI);
    this.formGroupJ = this.formBuilder.group(CathPCI50Form.sectionJ);
    this.formGroupK = this.formBuilder.group(CathPCI50Form.sectionK);
    this.formGroupL = this.formBuilder.group(CathPCI50Form.sectionL);
    this.formGroupM = this.formBuilder.group(CathPCI50Form.sectionM);

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

  private subscribePCIIndicationChanged(): Subscription {
    return this.formGroupI.get('PCIIndication').valueChanges.subscribe(value => {
      this.askCulpritStenosisLesion('01');
      this.askCulpritStenosisLesion('02');
      this.askCulpritStenosisLesion('03');
      this.askCulpritStenosisLesion('04');
      this.askCulpritStenosisLesion('05');
      this.askCulpritStenosisLesion('06');
      this.askCulpritStenosisLesion('07');
      this.askCulpritStenosisLesion('08');
    });
  }

  private subscribeHasLesionChanged(lesionNumber: string): Subscription {
    return this.formGroupJ.get('HasLesion' + lesionNumber).valueChanges.subscribe(value => {
      this.askCulpritStenosisLesion(lesionNumber);

      const lesionString = 'Lesion ' + +lesionNumber;
      if (value === 'Yes') {
        this.associatedLesions.push(lesionString);
      } else {
        const index = this.associatedLesions.indexOf(lesionString);
        if (index >= 0) {
          this.associatedLesions = this.associatedLesions.slice(0, index);

          const lesionsContainedControl = [
            [this.formGroupJ, 'ICDevCounterAssn01'],
            [this.formGroupJ, 'ICDevCounterAssn02'],
            [this.formGroupJ, 'ICDevCounterAssn03'],
            [this.formGroupJ, 'ICDevCounterAssn04'],
            [this.formGroupJ, 'ICDevCounterAssn05'],
            [this.formGroupJ, 'ICDevCounterAssn06'],
            [this.formGroupJ, 'ICDevCounterAssn07'],
            [this.formGroupJ, 'ICDevCounterAssn08'],
            [this.formGroupJ, 'ICDevCounterAssn09'],
            [this.formGroupJ, 'ICDevCounterAssn10'],
            [this.formGroupM, 'M_CABGStentLesions'],
            [this.formGroupM, 'M_PCIStentLesions'],
            [this.formGroupM, 'M_ThrombosisStentLesions']
          ];

          lesionsContainedControl.forEach(control => {
            this.removeLesions(lesionString, control[0] as FormGroup, control[1] as string);
          });
        }
      }
    });
  }

  private askCulpritStenosisLesion(lesionNumber: string) {
    const PCIIndication = this.formGroupI.get('PCIIndication').value;
    const HasLesion = this.formGroupJ.get('HasLesion' + lesionNumber).value;

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

    // tslint:disable: no-string-literal
    if (MIs.indexOf(PCIIndication) >= 0 && HasLesion === 'Yes') {
      this.visibles['CulpritArtery' + lesionNumber] = true;
    } else {
      this.visibles['CulpritArtery' + lesionNumber] = false;
      this.formGroupJ.get('CulpritArtery' + lesionNumber).setValue(null);
    }
    // tslint:enable: no-string-literal
  }

  private removeLesions(lesionString: string, formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    const controlValue = control.value as string[];

    if (!controlValue) {
      return;
    }

    const index = controlValue.indexOf(lesionString);
    if (index >= 0) {
      const result = controlValue.slice(0, index);
      control.setValue(result);
    }
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

      // this.formGroupL.get('DC_ACEI').setValue(null);
      // this.formGroupL.get('DC_Warfarin').setValue(null);
      // this.formGroupL.get('DC_Aspirin').setValue(null);
      // this.formGroupL.get('DC_Vorapaxar').setValue(null);
      // this.formGroupL.get('DC_ARB').setValue(null);
      // this.formGroupL.get('DC_BetaBlocker').setValue(null);
      // this.formGroupL.get('DC_Apixaban').setValue(null);
      // this.formGroupL.get('DC_Dabigatran').setValue(null);
      // this.formGroupL.get('DC_Edoxaban').setValue(null);
      // this.formGroupL.get('DC_Rivaroxaban').setValue(null);
      // this.formGroupL.get('DC_Clopidogrel').setValue(null);
      // this.formGroupL.get('DC_Prasugrel').setValue(null);
      // this.formGroupL.get('DC_Ticagrelor').setValue(null);
      // this.formGroupL.get('DC_Ticlopidine').setValue(null);
      // this.formGroupL.get('DC_Statin').setValue(null);
      // this.formGroupL.get('DC_NonStatin').setValue(null);
      // this.formGroupL.get('DC_Alirocumab').setValue(null);
      // this.formGroupL.get('DC_Evolocumab').setValue(null);
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
}
