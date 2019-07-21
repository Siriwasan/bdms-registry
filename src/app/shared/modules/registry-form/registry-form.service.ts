import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, ValidationErrors, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as marked from 'marked';

import { DialogService } from '../../services/dialog.service';
import {
  ValidationMessage,
  FormValidations,
  FormConditions,
  SectionMember,
  ControlCondition,
  FormCompletion
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

  constructor(private dialogService: DialogService) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  //#region Registry
  public initializeForm(sectionMembers: SectionMember[], conditions: FormConditions, validations: FormValidations) {
    this.sectionMembers = sectionMembers;
    this.conditions = conditions;
    this.validations = validations;

    // move to child form ngAfterViewInit
    // this.subscribeFormConditions();
  }

  // need to subscribe in ngAfterViewInit
  public subscribeFormConditions() {
    this.getSectionMembers().forEach(sectionMember => {
      this.subscribeValueChanges(sectionMember[1], sectionMember[3]); // FormGroup, ControlCondition[]
    });

    // ! initial remove validator in hiding child control
    this.getFormGroups().forEach(formGroup => formGroup.setValue(formGroup.value));
  }

  private subscribeValueChanges(formGroup: FormGroup, conditions: ControlCondition[]) {
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
          const cCon = condition.control.split(':');

          if (cCon.length > 1) {
            const element = document.getElementById(cCon[1]);
            if (value !== null && condition.conditions[0] === '!') {
              if (condition.conditions[1] !== value) {
                element.style.display = '';
              } else {
                element.style.display = 'none';
              }
            } else {
              if (condition.conditions.findIndex(o => o === value) < 0) {
                element.style.display = 'none';
              } else {
                element.style.display = '';
              }
            }
          } else {
            let control = formGroup.get(condition.control);

            // store original validator
            // tslint:disable-next-line: no-string-literal
            if (control['vals'] === undefined) {
              control = Object.assign(control, { vals: control.validator });
            }

            const element = document.getElementById(condition.control);

            // disable will remove control from FormGroup

            // in case of NOT conditions
            if (value !== null && condition.conditions[0] === '!') {
              if (condition.conditions[1] !== value) {
                // tslint:disable-next-line: no-string-literal
                control.setValidators(control['vals']);
                control.updateValueAndValidity();

                if (element) {
                  element.style.display = '';
                }
                // control.enable();
              } else {
                control.setValidators(null);
                control.reset();

                if (element) {
                  element.style.display = 'none';
                }
                // control.disable();
              }
            } else {
              if (condition.conditions.findIndex(o => o === value) < 0) {
                control.setValidators(null);
                control.reset();

                if (element) {
                  element.style.display = 'none';
                }
                // control.disable();
              } else {
                // ! bug fixed: remove all validator but cannot keep the old one
                // tslint:disable-next-line: no-string-literal
                control.setValidators(control['vals']);
                control.updateValueAndValidity();

                if (element) {
                  element.style.display = '';
                }
                // control.enable();
              }
            }
          }
        })
      );
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

  public isInvalid(control: string, validationType: string): boolean {
    const section = this.getControlSection(control);

    // console.log(control);

    return this.getFormGroup(section)
      .get(control)
      .hasError(validationType);
    // &&       (this.formGroup.get(control).dirty || this.formGroup.get(control).touched)
  }

  public formCompletion(section: string): string {
    let error = 0;
    let total = 0;

    const formGroup = this.getFormGroup(section);

    // ! ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    // ! need for further correction
    Object.keys(formGroup.controls).forEach(key => {
      const validationErrors: ValidationErrors = formGroup.get(key).errors;
      if (validationErrors !== null) {
        Object.keys(validationErrors).forEach(keyError => {
          // console.log(
          //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          //   controlErrors[keyError]
          // );
        });
        error++;
      }
      // if (this.isShowControl(key)) {
      //   total++;
      // }
      const element = document.getElementById(key);
      if (element && element.style.display === '') {
        total++;
      }
    });

    return `${total - error}/${total}`;
  }

  public getSectionCompletion(section: string): FormCompletion {
    let error = 0;
    let totl = 0;

    const formGroup = this.getFormGroup(section);

    // ! ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    // ! need for further correction
    Object.keys(formGroup.controls).forEach(key => {
      const validationErrors: ValidationErrors = formGroup.get(key).errors;
      if (validationErrors !== null) {
        error++;
      }

      const element = document.getElementById(key);
      if (element && element.style.display === '') {
        totl++;
      }
    });

    return { valid: totl - error, total: totl };
  }

  public isFormDirty(): boolean {
    let isDirty = false;
    this.getFormGroups().forEach(formGroup => (isDirty = isDirty || formGroup.dirty));
    return isDirty;
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