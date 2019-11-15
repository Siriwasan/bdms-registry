export const postions = [
  'Cardiothoracic Surgeon',
  'Anesthesiologist',
  'Scrub Nurse',
  'Cardiothoracic Technician',
  'Heart Coordinator',
  'Researcher',
  'Data scientist',
  'Cardiologist',
  'Cardiac Interventionist',
  'Emergency Physician',
  'Interventionist',
  'Other Physician',
  'Other'
];

export interface Hospital {
  group: string;
  id: string;
  name: string;
}

export const hospitals: Hospital[] = [
  { group: 'Group1', id: 'BHT', name: 'Bangkok Heart Hospital' },
  { group: 'Group1', id: 'BSN', name: 'Bangkok Hospital Sanamchan' },
  { group: 'Group1', id: 'RPH', name: 'Royal Phnom Penh Hospital' },
  { group: 'Group2', id: 'SVH', name: 'Samitivej Sukhumvit Hospital' },
  { group: 'Group3', id: 'BPH', name: 'Bangkok Hospital Pattaya' },
  { group: 'Group4', id: 'BUD', name: 'Bangkok Hospital Udon' },
  { group: 'Group4', id: 'BKH', name: 'Bangkok Hospital Ratchasima' },
  { group: 'Group4', id: 'BKN', name: 'Bangkok Hospital Khon Kaen' },
  { group: 'Group4', id: 'BCM', name: 'Bangkok Hospital Chiang Mai' },
  { group: 'Group5', id: 'PT2', name: 'Phyathai 2 Hospital' },
  { group: 'Group6', id: 'BHH', name: 'Bangkok Hospital Hatyai' },
  { group: 'Group6', id: 'BPK', name: 'Bangkok Hospital Phuket' }
];

export interface Registry {
  id: string;
  name: string;
}

export const registries: Registry[] = [
  { id: 'ACSx290', name: 'STS Adult Cardiac Surgery v2.9' },
  { id: 'CathPci50', name: 'NCDR CathPCI Registry v5.0' }
];

export const roles = ['Director', 'Administrator', 'Editor', 'Staff'];

export const permissions = ['BDMS', 'Group', 'Hospital'];

export const menus = {
  registry: ['Director', 'Administrator', 'Editor'],
  myPatients: ['Director', 'Administrator', 'Staff'],
  staff: ['Director', 'Administrator'],
  tools: ['Director']
};

export const pages = {
  acsx290: 'ACSx290',
  cathPci50: 'CathPci50'
};
