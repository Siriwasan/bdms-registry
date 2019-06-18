import { FormGroup, FormGroupDirective } from '@angular/forms';

export interface FormConditions {
  [section: string]: ControlCondition[];
}

export interface ControlCondition {
  control: string;
  parentControl: string;
  conditionValues: string[] | number[];
}

export interface FormValidations {
  [section: string]: {
    [control: string]: ValidationMessage[];
  };
}

export interface ValidationMessage {
  type: string;
  message: string;
}

export type SectionMember = [string, FormGroup, FormGroupDirective, ControlCondition[]];
// Single section:
//   [null, this.formGroup, this.formDirective, formConditions.section]
// Multi section:
//   ['A', this.formGroupA, this.formDirectiveA, formConditions.sectionA]
//   ['B', this.formGroupB, this.formDirectiveB, formConditions.sectionB]
