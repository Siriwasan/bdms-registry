import { Injectable } from '@angular/core';
import * as marked from 'marked';

import { DialogService } from '../../shared/services/dialog.service';
import { ValidationMessage, FormValidation, FormCondition, SectionMember } from '../../shared/components/registry/base-registry.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  private dataDict: string;
  private tokens: marked.TokensList;

  private formConditions: FormCondition;
  private validations: FormValidation;
  private sectionMembers: SectionMember[];

  constructor(private dialogService: DialogService) {}

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

  //#region Validations
  public setValidations(validations: FormValidation) {
    this.validations = validations;
  }

  public setFormConditions(formConditions: FormCondition) {
    this.formConditions = formConditions;
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

  public setSectionMembers(sectionMembers: SectionMember[]) {
    this.sectionMembers = sectionMembers;
  }

  private getSectonMember(section: string): SectionMember {
    if (section === null) {
      return this.sectionMembers[0];
    }
    return this.sectionMembers.find(o => o[0] === section);
  }

  private getFormGroup(section: string): FormGroup {
    const sectionMember = this.getSectonMember(section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[1]; // FormGroup
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
  //#endregion Validations
}
