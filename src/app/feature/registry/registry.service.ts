import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormGroupDirective, ValidationErrors, FormControl, FormArray } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import * as marked from 'marked';

import { DialogService } from '../../shared/services/dialog.service';
import {
  ValidationMessage,
  FormValidations,
  FormConditions,
  SectionMember,
  ControlCondition,
  Registry
} from './registry.model';
import { ACSx290Model } from './acsx290/acsx290.model';

const DB_REGISTRY = 'Registry';

@Injectable()
export class RegistryService implements OnDestroy {
  //#region Data Dictionary variables
  private dataDict: string;
  private tokens: marked.TokensList;
  //#endregion Data Dictionary variables

  show = false; // add one more property
  private subscriptions: Subscription[] = [];

  private conditions: FormConditions;
  private validations: FormValidations;
  private sectionMembers: SectionMember[];

  constructor(private dialogService: DialogService, private db: AngularFirestore) {}

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

  public subscribeFormConditions() {
    this.getSectionMembers().forEach(sectionMember => {
      this.subscribeValueChanges(sectionMember[1], sectionMember[3]); // FormGroup, ControlCondition[]
    });

    // ! Remove validator in hiding child control
    this.getFormGroups().forEach(formGroup => formGroup.setValue(formGroup.value));
  }

  private subscribeValueChanges(formGroup: FormGroup, conditions: ControlCondition[]) {
    conditions.forEach(condition => {
      this.subscriptions.push(
        formGroup.get(condition.parentControl).valueChanges.subscribe(value => {
          let control = formGroup.get(condition.control);

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

              if (element) {
                element.style.display = '';
              }
              // control.enable();
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
    return this.sectionMembers.map(sectionMember => sectionMember[2]);
  }

  public isShowControl(control: string): boolean {
    let condition: ControlCondition;
    let section: string;

    Object.entries(this.conditions).find(([key, value]) => {
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

    if (parentValue !== null && condition.conditions[0] === '!') {
      if (condition.conditions[1] !== parentValue) {
        return true;
      } else {
        return false;
      }
    }

    if (condition.conditions.findIndex(o => o === parentValue) < 0) {
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

  //#region Cloud firestore
  loadRegistries(): Promise<Registry[]> {
    // return this.db.collection<Registry>(DB_REGISTRY).valueChanges();

    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Registry>(DB_REGISTRY)
          .valueChanges()
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public loadACSx290s(): Promise<ACSx290Model[]> {
    return new Promise<ACSx290Model[]>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Model>('ACSx290')
          .valueChanges()
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }
  //#endregion Cloud firestore
}
