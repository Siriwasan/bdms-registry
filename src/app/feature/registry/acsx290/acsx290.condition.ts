import { FormConditions } from '../../../shared/components/registry/registry-base.model';

export const formConditions: FormConditions = {
  sectionA: [],
  sectionB: [],
  sectionD: [
    { control: 'DiabCtrl', parentControl: 'Diabetes', conditionValues: ['Yes'] },
    { control: 'InfEndTy', parentControl: 'InfEndo', conditionValues: ['Yes'] },
    { control: 'InfEndCult', parentControl: 'InfEndo', conditionValues: ['Yes'] }
  ],
  sectionE: [
    { control: 'PrCAB', parentControl: 'PrCVInt', conditionValues: ['Yes'] },
    { control: 'PrValve', parentControl: 'PrCVInt', conditionValues: ['Yes'] }
  ]
};
