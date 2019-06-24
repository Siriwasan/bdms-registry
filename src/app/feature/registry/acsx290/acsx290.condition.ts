import { FormConditions } from '../registry.model';

export const conditions: FormConditions = {
  sectionA: [],
  sectionB: [],
  sectionD: [
    { control: 'DiabCtrl', parentControl: 'Diabetes', conditions: ['Yes'] },
    { control: 'InfEndTy', parentControl: 'InfEndo', conditions: ['Yes'] },
    { control: 'InfEndCult', parentControl: 'InfEndo', conditions: ['Yes'] }
  ],
  sectionE: [
    { control: 'PrCAB', parentControl: 'PrCVInt', conditions: ['Yes'] },
    { control: 'PrValve', parentControl: 'PrCVInt', conditions: ['Yes'] }
  ]
};
