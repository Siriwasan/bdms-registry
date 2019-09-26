export interface TagCondition {
  section: string;
  control: string;
  values: any[];
  tag: string;
}

export const tagConditions: TagCondition[] = [
  { section: 'sectionK', control: 'VSAVPr', values: ['Replacement'], tag: 'AVR' },
  { section: 'sectionK', control: 'VSAVPr', values: ['Repair/Reconstruction'], tag: 'AV repair' },
  { section: 'sectionK', control: 'VSMVPr', values: ['Repair'], tag: 'MV repair' },
  { section: 'sectionK', control: 'VSMVPr', values: ['Replacement'], tag: 'MVR' },
  { section: 'sectionK', control: 'VSTVPr', values: ['Repair'], tag: 'TV repair' },
  { section: 'sectionK', control: 'VSTVPr', values: ['Replacement'], tag: 'TVR' },
  { section: 'sectionK', control: 'OpPulm', values: ['Repair/Leaflet Reconstruction'], tag: 'PV repair' },
  { section: 'sectionK', control: 'OpPulm', values: ['Replacement'], tag: 'PVR' },
  { section: 'sectionM', control: 'OCarASDSec', values: ['Yes'], tag: 'ASD' },
  { section: 'sectionM', control: 'OCarVSD', values: ['Yes-congenital', 'Yes-acquired'], tag: 'VSD' },
  {
    section: 'sectionI',
    control: 'AortProc',
    values: [
      'Yes, planned',
      'Yes, unplanned due to surgical complication',
      'Yes, unplanned due to unsuspected disease or anatomy'
    ],
    tag: 'Aorta'
  },
  { section: 'sectionM2', control: 'EndovasProc', values: ['Yes'], tag: 'EVAR' },
  { section: 'sectionM', control: 'OCPulThromDis', values: ['Yes, Acute', 'Yes, Chronic'], tag: 'PE' },
  { section: 'sectionI', control: 'AFibProc', values: ['Yes'], tag: 'AF' },
  {
    section: 'sectionL',
    control: 'ECMO',
    values: ['Veno-venous', 'Veno-arterial', 'Veno-venous converted to Veno-arterial'],
    tag: 'ECMO'
  },
  { section: 'sectionL2', control: 'VADImp', values: ['Yes'], tag: 'VAD' },
  {
    section: 'sectionQ',
    control: 'DischMortStat',
    values: ['Died in hospital', 'Discharged alive, died after discharge'],
    tag: 'Dead'
  },
  { section: 'sectionR', control: 'Readmit', values: ['Yes'], tag: 'Readmit' }
];

export const tagPriorities = {
  Dead: 'high'
};
