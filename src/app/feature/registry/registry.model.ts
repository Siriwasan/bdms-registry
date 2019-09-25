import { FormGroup, FormGroupDirective } from '@angular/forms';
import * as firebase from 'firebase/app';

// export interface FormConditions {
//   [section: string]: ControlCondition[];
// }

// export interface ControlCondition {
//   control: string;
//   parentControl: string;
//   conditions: string[] | number[];
// }

// export interface FormValidations {
//   [section: string]: {
//     [control: string]: ValidationMessage[];
//   };
// }

// export interface ValidationMessage {
//   type: string;
//   message: string;
// }

// export type SectionMember = [string, FormGroup, FormGroupDirective, ControlCondition[]];
// // Single section:
// //   [null, this.formGroup, this.formDirective, formConditions.section]
// // Multi section:
// //   ['A', this.formGroupA, this.formDirectiveA, formConditions.sectionA]
// //   ['B', this.formGroupB, this.formDirectiveB, formConditions.sectionB]

// export interface TableOfCentent {
//   section: string;
//   title: string;
// }

export interface FormDetail {
  baseDbId: string;
  baseDb: string;
  addendum: string;
  createdAt: any;
  createdBy: string;
  modifiedAt: any;
  modifiedBy: string;
  deletedAt: any;
  deletedBy: string;
}

export interface RegistryModel {
  registryId: string;
  hospitalId: string;
  hn: string;
  an: string;
  firstName: string;
  lastName: string;
  age: number;
  baseDbId: string;
  baseDb: string;
  addendum: string;
  completion: number;
  tags: string[];
  modifiedAt: any;
}
