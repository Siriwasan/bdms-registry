import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RegistryFormComponent } from '../../../shared/components/registry/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';
import { SectionMember } from '../registry.model';

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

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss']
})
export class ACSx290Component extends RegistryFormComponent implements OnInit, AfterViewInit, OnDestroy {
  formGroupA: FormGroup;
  formGroupB: FormGroup;
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

  @ViewChild('formDirectiveA', { static: true }) formDirectiveA: FormGroupDirective;
  @ViewChild('formDirectiveB', { static: true }) formDirectiveB: FormGroupDirective;
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

  gap = '20px';
  public mode = 'new'; // new, edit
  private formId: string;
  toc = tableOfContent;

  result: ACSx290Model;
  flatResult: object;

  // tslint:disable-next-line: variable-name
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

    const sectionMembers: SectionMember[] = [
      ['A', this.formGroupA, this.formDirectiveA, conditions.sectionA],
      ['B', this.formGroupB, this.formDirectiveB, conditions.sectionB],
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
      ['R', this.formGroupR, this.formDirectiveR, conditions.sectionR]
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

    const acsx290Model: ACSx290Model = {
      detail: {
        baseDb: 'STS Adult Cardiac Surgery version 2.9',
        addendum: 'BDMS ACSx modefied version 0.1',
        createdAt: timestamp,
        createdBy: 'admin',
        modifiedAt: timestamp,
        modifiedBy: 'admin',
        deletedAt: null,
        deletedBy: null
      },
      sectionA: { ...this.formGroupA.value },
      sectionB: { ...this.formGroupB.value },
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value },
      sectionF: { ...this.formGroupF.value },
      sectionG: { ...this.formGroupG.value },
      sectionH: { ...this.formGroupH.value },
      sectionI: { ...this.formGroupI.value },
      sectionJ: { ...this.formGroupJ.value },
      sectionK: { ...this.formGroupK.value },
      sectionL: { ...this.formGroupL.value },
      sectionL2: { ...this.formGroupF.value },
      sectionM: { ...this.formGroupM.value },
      sectionM1: { ...this.formGroupM1.value },
      sectionM2: { ...this.formGroupM2.value },
      sectionM3: { ...this.formGroupM3.value },
      sectionN: { ...this.formGroupN.value },
      sectionO: { ...this.formGroupO.value },
      sectionP: { ...this.formGroupP.value },
      sectionQ: { ...this.formGroupQ.value },
      sectionR: { ...this.formGroupR.value }
    };

    this.result = acsx290Model;

    return acsx290Model;
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

        this.formGroupA.setValue(data.sectionA);
        this.formGroupB.setValue(data.sectionB);
        this.formGroupD.setValue(data.sectionD);
        this.formGroupE.setValue(data.sectionE);
        this.formGroupF.setValue(data.sectionF);
        this.formGroupG.setValue(data.sectionG);
        this.formGroupH.setValue(data.sectionH);
        this.formGroupI.setValue(data.sectionI);
        this.formGroupJ.setValue(data.sectionJ);
        this.formGroupK.setValue(data.sectionK);
        this.formGroupL.setValue(data.sectionL);
        this.formGroupM.setValue(data.sectionM);
        this.formGroupN.setValue(data.sectionN);
        this.formGroupO.setValue(data.sectionO);
        this.formGroupP.setValue(data.sectionP);
        this.formGroupQ.setValue(data.sectionQ);
        this.formGroupR.setValue(data.sectionR);
        this.formGroupL2.setValue(data.sectionL2);
        this.formGroupM1.setValue(data.sectionM1);
        this.formGroupM2.setValue(data.sectionM2);
        this.formGroupM3.setValue(data.sectionM3);

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

  enableSection(enable: boolean) {
    console.log(enable);

    Object.keys(this.formGroupJ.controls).forEach(key => {
      const control = this.formGroupJ.get(key);

      // if (enable) {
      //   control.enable();
      //   if (control['vals'] !== undefined) {
      //     console.log(key);
      //     control.setValidators(control['vals']);
      //   }
      // } else {
      //   control.setValidators(null);
      //   control.reset();
      //   control.disable();
      // }

      if (!enable) {
        control.reset();
      }
    });
  }

  showWhen(control: string, conds: string[]) {
    console.log('showWhen');
    const value = this.formGroupI.get(control).value;

    if (conds.findIndex(o => o === value) < 0) {
      return false;
    }

    return true;
  }

  test() {
    console.log(document.getElementById('HN').style.display);
    document.getElementById('HN').style.display = document.getElementById('HN').style.display === '' ? 'none' : '';
    // this.hidd = true;
  }
}
