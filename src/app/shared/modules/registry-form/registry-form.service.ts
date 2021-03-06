import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, ValidationErrors, AbstractControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as marked from 'marked';

import { DialogService } from '../../services/dialog.service';
import {
  ValidationMessage,
  FormValidations,
  FormConditions,
  SectionMember,
  ControlCondition,
  FormCompletion,
  FormVisible
} from './registry-form.model';

@Injectable()
export class RegistryFormService implements OnDestroy {
  //#region Data Dictionary variables
  private dataDict: string;
  private tokens: marked.TokensList;
  //#endregion Data Dictionary variables

  private subscriptions: Subscription[] = [];

  private sectionMembers: SectionMember[];
  private conditions: FormConditions;
  private validations: FormValidations;

  private visibles: FormVisible = {};

  private debug = false;

  constructor(private dialogService: DialogService) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  //#region Registry
  public initializeForm(
    sectionMembers: SectionMember[],
    conditions: FormConditions,
    validations: FormValidations,
    visibles: FormVisible
  ) {
    this.sectionMembers = sectionMembers;
    this.conditions = conditions;
    this.validations = validations;
    this.visibles = visibles;

    // move to child form ngAfterViewInit
    // this.subscribeFormConditions();
  }

  // need to subscribe in ngAfterViewInit
  public subscribeFormConditions() {
    this.getSectionMembers().forEach(sectionMember => {
      this.subscribeValueChanges(sectionMember[1], sectionMember[3], this.visibles); // FormGroup, ControlCondition[]
    });

    // ! initial remove validator in hiding child control
    this.getFormGroups().forEach(formGroup => formGroup.setValue(formGroup.value));

    // this.visibles['DiabCtrl'] = false;
    // console.log(this.visibles);
    // console.log(this.visibles['DiabCtrl']);
  }

  public subscribeValueChanges(formGroup: FormGroup, conditions: ControlCondition[], visible: FormVisible) {
    conditions.forEach(condition => {
      let parentControl: AbstractControl;

      const pCon = condition.parentControl.split(':'); // section : control

      if (pCon.length > 1) {
        parentControl = this.getFormGroup(pCon[0]).get(pCon[1]);
      } else {
        parentControl = formGroup.get(condition.parentControl);
      }

      this.subscriptions.push(
        parentControl.valueChanges.subscribe(value => {
          // this.visibles[condition.control] = true;

          const cCon = condition.control.split(':'); // section : id

          if (cCon.length > 1) {
            const element = cCon[1];
            if (value === null) {
              this.displayElement(element, visible, false);
            } else if (condition.conditions[0] === '!') {
              // NOT condition
              if (Array.isArray(value) && value.length === 0) {
                value = null;
              }

              this.displayElement(element, visible, condition.conditions[1] !== value);
            } else if (condition.conditions[0] === '@') {
              // CONTAIN condition
              this.displayElement(element, visible, value.findIndex(o => o === condition.conditions[1]) >= 0);
            } else {
              this.displayElement(element, visible, condition.conditions.findIndex(o => o === value) >= 0);
            }
          } else {
            let control = formGroup.get(condition.control);

            // ? store original validator
            // tslint:disable-next-line: no-string-literal
            // if (control['vals'] === undefined) {
            //   control = Object.assign(control, { vals: control.validator });
            // }

            if (value === null) {
              this.displayControl(condition.control, control, visible, false);
            } else if (condition.conditions[0] === '!') {
              // NOT condition
              if (Array.isArray(value) && value.length === 0) {
                value = null;
              }

              this.displayControl(condition.control, control, visible, condition.conditions[1] !== value);
            } else if (condition.conditions[0] === '@') {
              // CONTAIN condition
              this.displayControl(
                condition.control,
                control,
                visible,
                value.findIndex(o => o === condition.conditions[1]) >= 0
              );
            } else {
              this.displayControl(
                condition.control,
                control,
                visible,
                condition.conditions.findIndex(o => o === value) >= 0
              );
            }
          }
        })
      );
    });
  }

  private displayElement(element: string, visible: FormVisible, condition: boolean) {
    if (condition) {
      this.expandElement(element, visible);
    } else {
      this.collapseElement(element, visible);
    }
  }

  private expandElement(element: string, visible: FormVisible) {
    const el = document.getElementById(element);
    // el.style.display = '';
    // this.visibles[element] = true;
    visible[element] = true;
  }

  private collapseElement(element: string, visible: FormVisible) {
    const el = document.getElementById(element);
    // el.style.display = 'none';
    // this.visibles[element] = false;
    visible[element] = false;
  }

  private displayControl(controlId: string, control: AbstractControl, visible: FormVisible, condition: boolean) {
    // ! disable will remove control from FormGroup structure
    if (condition) {
      this.expandControl(controlId, control, visible);
    } else {
      this.collapseControl(controlId, control, visible);
    }
  }

  private expandControl(controlId: string, control: AbstractControl, visible: FormVisible) {
    const el = document.getElementById(controlId);

    // tslint:disable-next-line: no-string-literal
    // control.setValidators(control['vals']);
    // control.updateValueAndValidity();
    // el.style.display = '';

    // this.visibles[controlId] = true;
    visible[controlId] = true;
  }

  private collapseControl(controlId: string, control: AbstractControl, visible: FormVisible) {
    const el = document.getElementById(controlId);

    // control.setValidators(null);
    control.reset();
    // el.style.display = 'none';
    // this.visibles[controlId] = false;
    visible[controlId] = false;
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

  public getFormGroup(section: string): FormGroup {
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
    console.log(this.sectionMembers);
    return this.sectionMembers.map(sectionMember => sectionMember[2]);
  }

  // public isShowControl(control: string): boolean {
  //   let condition: ControlCondition;
  //   let section: string;

  //   Object.entries(this.conditions).find(([key, value]) => {
  //     const result = (value as ControlCondition[]).find(o => o.control === control);
  //     if (result === undefined) {
  //       return false;
  //     }
  //     condition = result;
  //     section = key === 'section' ? null : key[key.length - 1];
  //     return true;
  //   });

  //   if (condition === undefined) {
  //     return true;
  //   }

  //   const formGroup = this.getFormGroup(section);
  //   const parentValue = formGroup.get(condition.parentControl).value;

  //   if (parentValue !== null && condition.conditions[0] === '!') {
  //     if (condition.conditions[1] !== parentValue) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  //   if (condition.conditions.findIndex(o => o === parentValue) < 0) {
  //     return false;
  //   }

  //   return true;
  // }

  public getValidations(control: string): ValidationMessage[] {
    let vals: ValidationMessage[];

    if (!this.validations) {
      return [];
    }

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

  public getControlSection(control: string): string {
    let section: string;

    // find control's section
    Object.entries(this.validations).find(([key, value]) => {
      const result = Object.entries(value).find(([key2, value2]) => key2 === control);
      if (result === undefined) {
        return false;
      }
      section = key === 'section' ? null : key.substr(7); // 'section'.lenght
      return true;
    });

    return section;
  }

  public isInvalid(formGroup: FormGroup, control: string, validationType: string): boolean {
    // const section = this.getControlSection(control);
    // return this.getFormGroup(section)
    //   .get(control)
    //   .hasError(validationType);
    // // &&       (this.formGroup.get(control).dirty || this.formGroup.get(control).touched)

    return formGroup.get(control).hasError(validationType);
    // &&       (this.formGroup.get(control).dirty || this.formGroup.get(control).touched)
  }

  public getSectionCompletion(section: string): FormCompletion {
    const formGroup = this.getFormGroup(section);
    return this.checkCompletion(formGroup, this.visibles);
  }

  public checkCompletion(formGroup: FormGroup, visible: FormVisible): FormCompletion {
    let val = 0;
    let totl = 0;


    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormArray) {
        (control as FormArray).controls.forEach((fg: FormGroup, index: number) => {
          const completion = this.checkCompletion(fg, visible[key][index]);
          val += completion.valid;
          totl += completion.total;
        });
        return;
      }

      if (visible[key] !== false) {
        val += control.errors ? 0 : 1;
        totl++;
      }
    });

    return { valid: val, total: totl };
  }

  public isFormDirty(): boolean {
    let isDirty = false;
    this.getFormGroups().forEach(formGroup => (isDirty = isDirty || formGroup.dirty));
    return isDirty;
  }

  public disableAllForms() {
    this.getFormGroups().forEach(formGroup => formGroup.disable());
  }

  public markAllFormsUntouched() {
    // this.getFormGroups().forEach(formGroup => this.markAllAsUntouched(formGroup));
    this.getFormGroups().forEach(formGroup => formGroup.markAsPristine());
  }

  public submitAllSections() {
    // this.getFormDirectives().forEach(formDirective => formDirective.onSubmit(undefined));
    // this.getFormGroups().forEach(formGroup => this.validateAllFields(formGroup));
    this.getFormGroups().forEach(formGroup => formGroup.markAllAsTouched());
  }

  // validateAllFields(formGroup: FormGroup | FormArray) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFields(control);
  //     }
  //   });
  // }

  public clear() {
    console.log(this.getFormDirectives());
    this.getFormDirectives().forEach(formDirective => formDirective.resetForm());
  }

  public clearErrors() {
    this.getSectionMembers().forEach(sectionMember => sectionMember[2].resetForm(sectionMember[1].value));
  }
  //#endregion Registry

  //#region Data Dictionary
  public setDataDict(dataDict: string) {
    this.dataDict = dataDict;
    this.tokens = marked.lexer(this.dataDict);
  }

  public hasInfo(control: string) {
    if (!this.tokens) {
      return;
    }

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

  public openInfo(control: string) {
    if (!this.tokens) {
      return;
    }

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

  setDebug() {
    this.debug = true;
  }
}
