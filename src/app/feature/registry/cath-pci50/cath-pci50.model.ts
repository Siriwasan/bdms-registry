import { FormDetail } from '../registry.model';
import { FormCompletion } from '../../../shared/modules/registry-form/registry-form.model';

export interface CathPci50Model {
  detail: FormDetail;
  completion: CathPci50Completion;
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
  sectionM: object;
}

export interface CathPci50Completion {
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
  sectionM: FormCompletion;
}
