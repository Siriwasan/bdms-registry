import {
  HostListener,
  isDevMode,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { map, first } from 'rxjs/operators';
import * as marked from 'marked';

import { BaseFormComponent } from './base-form.component';
import { DialogService } from '../../services/dialog.service';
import { ScrollSpyService } from '../../modules/scroll-spy/scroll-spy.service';

import {
  FormCondition,
  FormValidation,
  ControlCondition,
  ValidationMessage,
  SectionMember
} from './base-registry.model';

export class BaseRegistryComponent extends BaseFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private formConditions: any;
  private validations: any;
  private sectionMembers: SectionMember[];

  private dataDict: string;
  private tokens: marked.TokensList;

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef
  ) {
    super(changeDetector, scrollSpy, hostElement);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected setSectionMembers(sectionMembers: SectionMember[]) {
    this.sectionMembers = sectionMembers;
  }

  protected initializeForm(formConditions: FormCondition, validations: FormValidation) {
    this.formConditions = formConditions;
    this.validations = validations;
    this.subscribeFormConditions();

    // ! Remove validator in hiding child control
    this.getFormGroups().forEach(formGroup => formGroup.setValue(formGroup.value));
  }

  protected subscribeFormConditions() {
    this.getSectionMembers().forEach(sectionMember => {
      this.subscribeValueChanges(sectionMember[1], sectionMember[3]); // FormGroup - ControlCondition[]
    });
  }

  private subscribeValueChanges(formGroup: FormGroup, conditions: ControlCondition[]) {
    conditions.forEach(condition => {
      formGroup.get(condition.parentControl).valueChanges.subscribe(value => {
        const control = formGroup.get(condition.control);

        if (condition.conditionValues.findIndex(o => o === value) < 0) {
          control.setValidators(null);
          control.reset();
          // control.disable();
        } else {
          control.setValidators(Validators.required);
          // control.enable();
        }
      });
    });
  }

  private getSectonMember(section: string): SectionMember {
    if (section === null) {
      return this.sectionMembers[0];
    }
    return this.sectionMembers.find(o => o[0] === section);
  }

  private getSectionMembers(): SectionMember[] {
    return this.sectionMembers;
  }

  private getFormGroup(section: string): FormGroup {
    const sectionMember = this.getSectonMember(section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[1]; // FormGroup
  }

  private getFormGroups(): FormGroup[] {
    return this.sectionMembers.map(sectionMember => sectionMember[1]);
  }

  private getFormConditions(section: string): ControlCondition[] {
    const sectionMember = this.getSectonMember(section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[3]; // ControlCondition[]
  }

  private getFormDirective(section: string): FormGroupDirective {
    const sectionMember = this.getSectonMember(section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[2]; // FormGroupDirective
  }

  private getFormDirectives(): FormGroupDirective[] {
    return this.sectionMembers.map(sectionMember => sectionMember[2]);
  }

  public isShowControl(control: string): boolean {
    let condition: ControlCondition;
    let section: string;

    Object.entries(this.formConditions).find(([key, value]) => {
      const result = (value as ControlCondition[]).find(o => o.control === control);
      if (result === undefined) {
        return false;
      }
      condition = result;
      section = key === 'section' ? null : key[key.length - 1];
      return true;
    });

    if (condition === undefined) {
      return true;
    }

    const formGroup = this.getFormGroup(section);
    const parentValue = formGroup.get(condition.parentControl).value;
    if (condition.conditionValues.findIndex(o => o === parentValue) < 0) {
      return false;
    }

    return true;
  }

  public getValidations(control: string): ValidationMessage[] {
    let vals: ValidationMessage[];

    Object.entries(this.validations).find(([key, value]) => {
      const result = Object.entries(value).find(([key2, value2]) => key2 === control);
      if (result === undefined) {
        return false;
      }
      vals = result[1];
      return true;
    });
    return vals;
  }

  public isInvalid(control: string, validationType: string): boolean {
    let section: string;

    // find control's section
    Object.entries(this.validations).find(([key, value]) => {
      const result = Object.entries(value).find(([key2, value2]) => key2 === control);
      if (result === undefined) {
        return false;
      }
      section = key === 'section' ? null : key[key.length - 1];
      return true;
    });

    return this.getFormGroup(section)
      .get(control)
      .hasError(validationType);
    // &&       (this.formGroup.get(control).dirty || this.formGroup.get(control).touched)
  }

  public formCompletion(section: string): string {
    let error = 0;
    let total = 0;

    const formGroup = this.getFormGroup(section);

    Object.keys(formGroup.controls).forEach(key => {
      const validationErrors: ValidationErrors = formGroup.get(key).errors;
      if (validationErrors != null) {
        Object.keys(validationErrors).forEach(keyError => {
          // console.log(
          //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          //   controlErrors[keyError]
          // );
        });
        error++;
      }
      if (this.isShowControl(key)) {
        total++;
      }
    });

    return `${total - error}/${total}`;
  }

  protected isFormDirty(): boolean {
    let isDirty = false;
    this.getFormGroups().forEach(formGroup => (isDirty = isDirty || formGroup.dirty));
    return isDirty;
  }

  protected submitAllSections() {
    this.getFormDirectives().forEach(formDirective => formDirective.onSubmit(undefined));
  }

  protected clear() {
    this.getFormDirectives().forEach(formDirective => formDirective.resetForm());
  }

  protected clearErrors() {
    this.getSectionMembers().forEach(sectionMember => sectionMember[2].resetForm(sectionMember[1].value));
  }

  //#region Warning before leaving
  public canDeactivate() {
    // ? Prototype for leaving form after changed
    // ? return confirm('Do you really want to leave?');
    // ? return this.form.submitted || !this.form.dirty;

    if (!this.isFormDirty()) {
      return true;
    }

    const dialogRef = this.dialogService.createModalDialog({
      title: 'Warning!!!',
      content: 'Save before leave',
      buttons: ['Cancel', 'Discard']
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        if (result === 'Cancel') {
          return false;
        }
        if (result === 'Discard') {
          return true;
        }
      }),
      first()
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (!isDevMode()) {
      console.log('Processing beforeunload...');
      event.returnValue = false;
    }
  }
  //#endregion Warning before leaving

  //#region Data Dictionary
  protected setDataDict(dataDict: string) {
    this.dataDict = dataDict;
    this.tokens = marked.lexer(this.dataDict);
  }

  protected hasInfo(control: string) {
    return (
      this.tokens.findIndex(token => {
        if (token.type === 'heading') {
          const heading = token as marked.Tokens.Heading;
          if (heading.depth === 1 && heading.text === control) {
            return true;
          }
        }
        return false;
      }) > -1
    );
  }

  protected openInfo(control: string) {
    this.dialogService.createModalDialog({
      title: null,
      content: this.searhDataDict(control),
      buttons: ['Close']
    });
  }

  private searhDataDict(key: string): string {
    let index = 0;
    const mdBlock: marked.Token[] = [];

    // Seek index of target h1
    while (index < this.tokens.length) {
      const token = this.tokens[index];

      if (token.type === 'heading') {
        const heading = token as marked.Tokens.Heading;

        if (heading.depth === 1 && heading.text === key) {
          break;
        }
      }

      index++;
    }

    // Get block of target h1
    index++;
    while (index < this.tokens.length) {
      // const token = this.tokens[index];
      mdBlock.push(this.tokens[index]);
      index++;

      if (this.tokens[index] === undefined) {
        break;
      }

      if (this.tokens[index].type === 'heading' && (this.tokens[index] as marked.Tokens.Heading).depth === 1) {
        break;
      }
    }

    let tokensList: marked.TokensList;
    tokensList = Object.assign(mdBlock, { links: this.tokens.links });
    return marked.parser(tokensList);
  }
  //#endregion Data Dictionary
}
