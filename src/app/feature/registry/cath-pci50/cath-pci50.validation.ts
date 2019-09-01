import { FormValidations } from '../../../shared/modules/registry-form/registry-form.model';

export const validations: FormValidations = {
  sectionA: {
    HN: [
      { type: 'required', message: 'HN is required' },
      { type: 'minlength', message: 'HN must be at least 10' },
      { type: 'maxlength', message: 'HN cannot be more than 10' }
    ],
    AN: [
      { type: 'required', message: 'AN is required' },
      { type: 'minlength', message: 'AN must be at least 12' },
      { type: 'maxlength', message: 'AN cannot be more than 12' }
    ],
    LastName: [{ type: 'required', message: 'Last Name is required' }],
    FirstName: [{ type: 'required', message: 'First Name is required' }]
  },
  sectionB: {},
  sectionC: {},
  sectionD: {},
  sectionE: {},
  sectionF: {},
  sectionG: {},
  sectionH: {},
  sectionI: {},
  sectionJ: {},
  sectionK: {},
  sectionL: {},
  sectionM: {}
};
