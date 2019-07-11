import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RegistryFormComponent } from '../../../shared/components/registry/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { SectionMember, FormDetail } from '../registry.model';

import { ACSx290form } from './acsx290.form';
import { conditions } from './acsx290.condition';
import { validations } from './acsx290.validation';
import { ACSx290Model } from './acsx290.model';
import { ACSx290Service } from './acsx290.service';
import { tableOfContent } from './acsx290.toc';
import { RegistryService } from '../registry.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';
import { Moment } from 'moment';

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss']
})
export class ACSx290Component extends RegistryFormComponent implements OnInit, AfterViewInit, OnDestroy {
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

  gap = '20px';
  public mode = 'new'; // new, edit
  private formId: string;
  toc = tableOfContent;

  result: ACSx290Model;
  flatResult: object;

  // tslint:disable: variable-name
  H_cathResults = [
    ['Left Main', 'PctStenLMain', 'GrftStenLMain', 'StntStenLMain', 'FFRLMain', 'IFRLMain'],
    ['Proximal LAD', 'PctStenProxLAD', 'GrftStenProxLAD', 'StntStenProxLAD', 'FFRProxLAD', 'IFRProxLAD'],
    ['Mid LAD', 'PctStenMidLAD', 'GrftStenMidLAD', 'StntStenMidLAD', 'FFRMidLAD', 'IFRMidLAD'],
    ['Distal LAD', 'PctStenDistLAD', 'GrftStenDistLAD', 'StntStenDistLAD', 'FFRDistLAD', 'IFRDistLAD'],
    ['Diagonal 1', 'PctStenDiag1', 'GrftStenDiag1', 'StntStenDiag1', 'FFRDiag1', 'IFRDiag1'],
    ['Diagonal 2', 'PctStenDiag2', 'GrftStenDiag2', 'StntStenDiag2', 'FFRDiag2', 'IFRDiag2'],
    ['Diagonal 3', 'PctStenDiag3', 'GrftStenDiag3', 'StntStenDiag3', 'FFRDiag3', 'IFRDiag3'],
    ['Circumflex', 'PctStenCircflx', 'GrftStenCircflx', 'StntStenCircflx', 'FFRCircflx', 'IFRCircflx'],
    ['Obtuse Marginal 1', 'PctStenOM1', 'GrftStenOM1', 'StntStenOM1', 'FFROM1', 'IFROM1'],
    ['Obtuse Marginal 2', 'PctStenOM2', 'GrftStenOM2', 'StntStenOM2', 'FFROM2', 'IFROM2'],
    ['Obtuse Marginal 3', 'PctStenOM3', 'GrftStenOM3', 'StntStenOM3', 'FFROM3', 'IFROM3'],
    ['Ramus', 'PctStenRamus', 'GrftStenRamus', 'StntStenRamus', 'FFRRamus', 'IFRRamus'],
    ['RCA', 'PctStenRCA', 'GrftStenRCA', 'StntStenRCA', 'FFRRCA', 'IFRRCA'],
    ['Acute Marginal (AM)', 'PctStenAM', 'GrftStenAM', 'StntStenAM', 'FFRAM', 'IFRAM'],
    ['Posterior Descending (PDA)', 'PctStenPDA', 'GrftStenPDA', 'StntStenPDA', 'FFRPDA', 'IFRPDA'],
    ['Posterolateral (PLB)', 'PctStenPLB', 'GrftStenPLB', 'StntStenPLB', 'FFRPLB', 'IFRPLB']
  ];
  J_cabg = [
    [
      'CABG NUMBER 1',
      'CAB01',
      'CABDistSite01',
      'CABProximalSite01',
      'CABConduit01',
      'CABDistPos01',
      'CABEndArt01',
      'CABVeinPatAng01'
    ],
    [
      'CABG NUMBER 2',
      'CAB02',
      'CABDistSite02',
      'CABProximalSite02',
      'CABConduit02',
      'CABDistPos02',
      'CABEndArt02',
      'CABVeinPatAng02'
    ],
    [
      'CABG NUMBER 3',
      'CAB03',
      'CABDistSite03',
      'CABProximalSite03',
      'CABConduit03',
      'CABDistPos03',
      'CABEndArt03',
      'CABVeinPatAng03'
    ],
    [
      'CABG NUMBER 4',
      'CAB04',
      'CABDistSite04',
      'CABProximalSite04',
      'CABConduit04',
      'CABDistPos04',
      'CABEndArt04',
      'CABVeinPatAng04'
    ],
    [
      'CABG NUMBER 5',
      'CAB05',
      'CABDistSite05',
      'CABProximalSite05',
      'CABConduit05',
      'CABDistPos05',
      'CABEndArt05',
      'CABVeinPatAng05'
    ],
    [
      'CABG NUMBER 6',
      'CAB06',
      'CABDistSite06',
      'CABProximalSite06',
      'CABConduit06',
      'CABDistPos06',
      'CABEndArt06',
      'CABVeinPatAng06'
    ],
    [
      'CABG NUMBER 7',
      'CAB07',
      'CABDistSite07',
      'CABProximalSite07',
      'CABConduit07',
      'CABDistPos07',
      'CABEndArt07',
      'CABVeinPatAng07'
    ],
    [
      'CABG NUMBER 8',
      'CAB08',
      'CABDistSite08',
      'CABProximalSite08',
      'CABConduit08',
      'CABDistPos08',
      'CABEndArt08',
      'CABVeinPatAng08'
    ],
    [
      'CABG NUMBER 9',
      'CAB09',
      'CABDistSite09',
      'CABProximalSite09',
      'CABConduit09',
      'CABDistPos09',
      'CABEndArt09',
      'CABVeinPatAng09'
    ],
    [
      'CABG NUMBER 10',
      'CAB10',
      'CABDistSite10',
      'CABProximalSite10',
      'CABConduit10',
      'CABDistPos10',
      'CABEndArt10',
      'CABVeinPatAng10'
    ]
  ];
  H_vad = [
    [
      'Initial implant',
      'VImp',
      'VADImpTmg',
      'VImpDt',
      'VADInd',
      'VImpTy',
      'VProdTy',
      'VImpUDI',
      'VExp',
      'VExpRsn',
      'VExpDt'
    ],
    [
      '2nd device implanted',
      'VImp2',
      'VADImpTmg2',
      'VImpDt2',
      'VADInd2',
      'VImpTy2',
      'VProdTy2',
      'VImpUDI2',
      'VExp2',
      'VExpRsn2',
      'VExpDt2'
    ],
    [
      '3rd device implanted',
      'VImp3',
      'VADImpTmg3',
      'VImpDt3',
      'VADInd3',
      'VImpTy3',
      'VProdTy3',
      'VImpUDI3',
      'VExp3',
      'VExpRsn3',
      'VExpDt3'
    ]
  ];
  M2_priorAoInt = [
    ['Root', 'PriorRepRoot', 'PriorRepTyRoot', 'PriorFailRoot', 'PriorProgRoot'],
    ['Ascending', 'PriorRepAsc', 'PriorRepTyAsc', 'PriorFailAsc', 'PriorProgAsc'],
    ['Arch', 'PriorRepArch', 'PriorRepTyArch', 'PriorFailArch', 'PriorProgArch'],
    ['Descending', 'PriorRepDesc', 'PriorRepTyDesc', 'PriorFailDesc', 'PriorProgDesc'],
    ['Suprarenal abdominal', 'PriorRepSupraAb', 'PriorRepTySupraAb', 'PriorFailSupraAb', 'PriorProgSupraAb'],
    ['Infrarenal abdominal', 'PriorRepInfraAb', 'PriorRepTyInfraAb', 'PriorFailInfraAb', 'PriorProgInfraAb']
  ];
  M2_device = [
    ['ADevLoc02', 'ADevDelMeth02', 'ADevOut02', 'ADevModel02', 'ADevUDI02'],
    ['ADevLoc03', 'ADevDelMeth03', 'ADevOut03', 'ADevModel03', 'ADevUDI03'],
    ['ADevLoc04', 'ADevDelMeth04', 'ADevOut04', 'ADevModel04', 'ADevUDI04'],
    ['ADevLoc05', 'ADevDelMeth05', 'ADevOut05', 'ADevModel05', 'ADevUDI05'],
    ['ADevLoc06', 'ADevDelMeth06', 'ADevOut06', 'ADevModel06', 'ADevUDI06'],
    ['ADevLoc07', 'ADevDelMeth07', 'ADevOut07', 'ADevModel07', 'ADevUDI07'],
    ['ADevLoc08', 'ADevDelMeth08', 'ADevOut08', 'ADevModel08', 'ADevUDI08'],
    ['ADevLoc09', 'ADevDelMeth09', 'ADevOut09', 'ADevModel09', 'ADevUDI09'],
    ['ADevLoc10', 'ADevDelMeth10', 'ADevOut10', 'ADevModel10', 'ADevUDI10'],
    ['ADevLoc11', 'ADevDelMeth11', 'ADevOut11', 'ADevModel11', 'ADevUDI11'],
    ['ADevLoc12', 'ADevDelMeth12', 'ADevOut12', 'ADevModel12', 'ADevUDI12'],
    ['ADevLoc13', 'ADevDelMeth13', 'ADevOut13', 'ADevModel13', 'ADevUDI13'],
    ['ADevLoc14', 'ADevDelMeth14', 'ADevOut14', 'ADevModel14', 'ADevUDI14'],
    ['ADevLoc15', 'ADevDelMeth15', 'ADevOut15', 'ADevModel15', 'ADevUDI15']
  ];
  // tslint:enable: variable-name

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    protected registryService: RegistryService,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    private acsx290Service: ACSx290Service
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, registryService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new UI.ChangeTitle('STS 2.9'));

    this.createForm();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.registryService.subscribeFormConditions();

    // Prevent ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.loadById();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
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

    const sectionMembers: SectionMember[] = [
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

    this.registryService.initializeForm(sectionMembers, conditions, validations);
    this.registryService.setDataDict(require('raw-loader!./acsx290.dict.md'));
  }

  public async submit() {
    console.log('submit');
    this.registryService.submitAllSections();
    const data = this.archiveForm();

    this.acsx290Service.encryptSensitiveData(data);

    this.store.dispatch(new UI.StartLoading());
    if (this.mode === 'new') {
      if (await this.acsx290Service.isExistedForm(data)) {
        console.log('repeat form');
        this.store.dispatch(new UI.StopLoading());
        return;
      }

      console.log('new');
      this.formId = await this.acsx290Service.saveForm(data);
      this.mode = 'edit';
    } else {
      console.log('edit');
      await this.acsx290Service.updateForm(this.formId, data);
    }
    this.store.dispatch(new UI.StopLoading());
  }

  private archiveForm(): ACSx290Model {
    const timestamp = this.acsx290Service.timestamp;

    if (this.mode === 'new') {
      this.formDetail = {
        baseDb: 'STS Adult Cardiac Surgery version 2.9',
        addendum: 'BDMS ACSx modefied version 0.1',
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

    const acsx290Model: ACSx290Model = {
      detail: this.formDetail,
      sectionA: { ...this.formGroupA.value },
      sectionB: {
        ...this.formGroupB.value,
        DOB: this.serializeDateTime(this.formGroupB.get('DOB').value)
      },
      sectionC: { ...this.formGroupC.value },
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
        PCancCaseDt: this.serializeDateTime(this.formGroupI.get('PCancCaseDt').value)
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

  private isMoment(dateTime: any): dateTime is Moment {
    return dateTime !== null && (dateTime as Moment).toISOString !== undefined;
  }

  private serializeDateTime(dateTime: any): any {
    return this.isMoment(dateTime) ? dateTime.toISOString() : dateTime;
  }

  async loadById() {
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.store.dispatch(new UI.StartLoading());

      const formId = this.route.snapshot.paramMap.get('id');
      const data = await this.acsx290Service.getFormById(formId);
      this.store.dispatch(new UI.StopLoading());

      if (data) {
        console.log(data);
        this.acsx290Service.decryptSenitiveData(data);

        this.formDetail = data.detail;
        this.formGroupA.setValue(data.sectionA);
        this.formGroupB.setValue(data.sectionB);
        this.formGroupC.setValue(data.sectionC);
        this.formGroupD.setValue(data.sectionD);
        this.formGroupE.setValue(data.sectionE);
        this.formGroupF.setValue(data.sectionF);
        this.formGroupG.setValue(data.sectionG);
        this.formGroupH.setValue(data.sectionH);
        this.formGroupI.setValue(data.sectionI);
        this.formGroupJ.setValue(data.sectionJ);
        this.formGroupK.setValue(data.sectionK);
        this.formGroupL.setValue(data.sectionL);
        this.formGroupL2.setValue(data.sectionL2);
        this.formGroupM.setValue(data.sectionM);
        this.formGroupM1.setValue(data.sectionM1);
        this.formGroupM2.setValue(data.sectionM2);
        this.formGroupM3.setValue(data.sectionM3);
        this.formGroupN.setValue(data.sectionN);
        this.formGroupO.setValue(data.sectionO);
        this.formGroupP.setValue(data.sectionP);
        this.formGroupQ.setValue(data.sectionQ);
        this.formGroupR.setValue(data.sectionR);
        this.formGroupS.setValue(data.sectionS);

        this.mode = 'edit';
        this.formId = formId;
      } else {
        this.router.navigate(['registry/acsx290']);
      }
    }
  }

  clear() {
    this.registryService.clear();
  }

  clearErrors() {
    this.registryService.clearErrors();
  }

  openInfo(control: string) {
    this.registryService.openInfo(control);
  }

  hasInfo(control: string): boolean {
    return this.registryService.hasInfo(control);
  }

  downloadCSV() {
    //   this.archiveRegistry();
    //   this.fileService.saveJSONtoCSV([this.result], 'art.csv');
  }

  downloadJSON() {
    //   this.archiveRegistry();
    //   this.fileService.saveJSONtoFile([this.result]);
  }

  enableSection(sectionId: string, value: string, conds: string[]) {
    // if (value !== null && conds[0] === '!') {
    //   if (conds[1] !== value) {
    //     document.getElementById(sectionId).style.display = '';
    //     return true;
    //   } else {
    //     document.getElementById(sectionId).style.display = 'none';
    //     return false;
    //   }
    // } else {
    //   if (conds.findIndex(o => o === value) < 0) {
    //     document.getElementById(sectionId).style.display = 'none';
    //     return false;
    //   } else {
    //     document.getElementById(sectionId).style.display = '';
    //   }
    // }
  }
}
