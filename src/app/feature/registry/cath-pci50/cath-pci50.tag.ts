export interface TagCondition {
  section: string;
  control: string;
  values: any[];
  tag: string;
}

export const tagConditions: TagCondition[] = [
  {
    section: 'sectionB',
    control: 'PayorPrim',
    values: ['NHSO (National Health Security Officer)'],
    tag: 'NHSO'
  },
  {
    section: 'sectionI',
    control: 'PCIIndication',
    values: [
      'STEMI - Immediate PCI for Acute STEMI',
      'STEMI - Stable (<= 12 hrs from Sx)',
      'STEMI - Stable (> 12 hrs from Sx)',
      'STEMI - Unstable (> 12 hrs from Sx)',
      'STEMI (after successful lytics) <= 24 hrs',
      'STEMI (after successful lytics) > 24 hrs - 7 days',
      'STEMI - Rescue (After unsuccessful lytics)'
    ],
    tag: 'STEMI'
  },
  { section: 'sectionI', control: 'PCIIndication', values: ['NSTE-ACS'], tag: 'NSTEMI' },
  { section: 'sectionE', control: 'DiagCorAngio', values: ['Yes'], tag: 'CAG' },
  { section: 'sectionE', control: 'PCIProc', values: ['Yes'], tag: 'PCI' },
  {
    section: 'sectionI',
    control: 'PCIProcedureRisk',
    values: ['Complex High Risk Indicated Procedure (CHIP)'],
    tag: 'CHIP'
  },
  {
    section: 'sectionI',
    control: 'PCIProcedureRisk',
    values: ['Simple Low Risk Indicated Procedure (SLIP)'],
    tag: 'SLIP'
  },
  { section: 'sectionJ', control: 'PCIResult', values: ['Clinical Success'], tag: 'Clinical Success' },
  { section: 'sectionJ', control: 'PCIResult', values: ['Procedure Success'], tag: 'Procedure Success' },
  { section: 'sectionJ', control: 'PCIResult', values: ['Angiographic Success'], tag: 'Angiographic Success' },
  { section: 'sectionJ', control: 'PCIResult', values: ['Angiographic Failure'], tag: 'Angiographic Failure' },
  {
    section: 'sectionB',
    control: 'PayorSecond',
    values: ['NHSO (National Health Security Officer)'],
    tag: 'NHSO'
  },
  { section: 'sectionL', control: 'DCStatus', values: ['Deceased'], tag: 'Dead' },
  { section: 'sectionL', control: 'SubmittedDischarge', values: [true], tag: 'D/C' }
];

export const tagPriorities = {
  STEMI: 'high',
  NSTEMI: 'medium',
  Dead: 'high',
  Lost: 'high',
  CHIP: 'high',
  SLIP: 'high',
  'D/C': 'medium',
  '30 d': 'medium',
  '1 y': 'medium',
  '2 y': 'medium',
  '3 y': 'medium',
  '4 y': 'medium',
  '5 y': 'medium',
  '6 y': 'medium',
  '7 y': 'medium',
  '8 y': 'medium',
  '9 y': 'medium',
  '10 y': 'medium'
};
