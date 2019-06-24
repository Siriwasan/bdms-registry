import { FormGroup, FormGroupDirective } from '@angular/forms';
import * as firebase from 'firebase/app';

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

export interface RegistryDetail {
  baseDb: string;
  addendum: string;
  createdAt: firebase.firestore.FieldValue;
  createdBy: string;
  modifiedAt: firebase.firestore.FieldValue;
  modifiedBy: string;
  deletedAt: firebase.firestore.FieldValue;
  deletedBy: string;
}

export interface Registry {
  hn: string;
  name: string;
  baseDb: string;
  addendum: string;
  completion: number;
  modifiedAt: firebase.firestore.FieldValue;
  registryId: string;
}
