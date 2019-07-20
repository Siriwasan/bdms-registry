import { FormDetail } from '../registry.model';

export interface ACSx290Form {
  detail: FormDetail;
  completion: ACSx290FormCompletion;
  sectionA: object;
  sectionB: object;
  sectionC: object;
  sectionD: object;
  sectionE: object;
  sectionF: object;
  sectionG: object;
  sectionH: object;
  sectionI: object;
  sectionJ: object;
  sectionK: object;
  sectionL: object;
  sectionL2: object;
  sectionM: object;
  sectionM1: object;
  sectionM2: object;
  sectionM3: object;
  sectionN: object;
  sectionO: object;
  sectionP: object;
  sectionQ: object;
  sectionR: object;
  sectionS: object;
}

export interface FormCompletion {
  valid: number;
  total: number;
}

export interface ACSx290FormCompletion {
  summary: FormCompletion;
  sectionA: FormCompletion;
  sectionB: FormCompletion;
  sectionC: FormCompletion;
  sectionD: FormCompletion;
  sectionE: FormCompletion;
  sectionF: FormCompletion;
  sectionG: FormCompletion;
  sectionH: FormCompletion;
  sectionI: FormCompletion;
  sectionJ: FormCompletion;
  sectionK: FormCompletion;
  sectionL: FormCompletion;
  sectionL2: FormCompletion;
  sectionM: FormCompletion;
  sectionM1: FormCompletion;
  sectionM2: FormCompletion;
  sectionM3: FormCompletion;
  sectionN: FormCompletion;
  sectionO: FormCompletion;
  sectionP: FormCompletion;
  sectionQ: FormCompletion;
  sectionR: FormCompletion;
  sectionS: FormCompletion;
}
