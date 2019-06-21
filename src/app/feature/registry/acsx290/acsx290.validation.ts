import { FormValidations } from '../registry.model';

export const validations: FormValidations = {
  sectionA: {
    HN: [{ type: 'required', message: 'HN is required' }],
    AN: [{ type: 'required', message: 'AN is needed' }]
  },
  sectionB: {
    PatLName: [
      { type: 'required', message: 'PatLName is required' },
      { type: 'minlength', message: 'PatLName must be at least 5' },
      { type: 'maxlength', message: 'PatLName cannot be more than 10' }
    ],
    Gender: [
      { type: 'required', message: 'Sex is required' }
    ]
  },
  sectionD: {
    HeightCM: [
      { type: 'required', message: 'Height is required' },
      { type: 'min', message: 'Height must be at least 20 cm' },
      { type: 'max', message: 'Height cannot be more than 251 cm' }
    ],
    WeightKg: [
      { type: 'required', message: 'Weight is required' },
      { type: 'min', message: 'Weight must be at least 10 kg' },
      { type: 'max', message: 'Weight cannot be more than 250 kg' }
    ]
  },
  sectionE: {
    PrCVInt: [{ type: 'required', message: 'Required' }]
  }
};
