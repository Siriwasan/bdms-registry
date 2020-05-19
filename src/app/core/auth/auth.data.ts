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
  'Other',
];

export interface Hospital {
  group: string;
  id: string;
  name: string;
}

export const hospitals: Hospital[] = [
  { group: 'Group1', id: 'BHT', name: 'Bangkok Heart Hospital' },
  { group: 'Group1', id: 'BHN', name: 'Bangkok Hospital Hua Hin' },
  { group: 'Group1', id: 'BSN', name: 'Bangkok Hospital Sanamchan' },
  { group: 'Group1', id: 'MPH', name: 'Muang Phet Hospital' },
  { group: 'Group1', id: 'MRJ', name: 'Bangkok Hospital Muangraj' },
  { group: 'Group1', id: 'RPH', name: 'Royal Phnom Penh Hospital' },
  { group: 'Group1', id: 'RAH', name: 'Royal Angkor International Hospital' },
  { group: 'Group1', id: 'BGH', name: 'Bangkok Hospital' },
  { group: 'Group1', id: 'WSH', name: 'Wattanosoth Hospital' },
  { group: 'Group2', id: 'SVH', name: 'Samitivej Sukhumvit Hospital' },
  { group: 'Group2', id: 'SNH', name: 'Samitivej Srinakarin Hospital' },
  { group: 'Group2', id: 'SSH', name: 'Samitivej Sriracha Hospital' },
  { group: 'Group2', id: 'STH', name: 'Samitivej Thonburi Hospital' },
  { group: 'Group2', id: 'SCT', name: 'Samitivej Chinatown Hospital' },
  { group: 'Group2', id: 'BNH', name: 'BNH Hospital' },
  { group: 'Group3', id: 'BPH', name: 'Bangkok Hospital Pattaya' },
  { group: 'Group3', id: 'BRH', name: 'Bangkok Hospital Rayong' },
  { group: 'Group3', id: 'BCH', name: 'Bangkok Hospital Chantaburi' },
  { group: 'Group3', id: 'BTH', name: 'Bangkok Hospital Trat' },
  { group: 'Group3', id: 'IKC', name: 'International Clinic Koh Chang' },
  { group: 'Group3', id: 'SRH', name: 'Sri Rayong Hospital' },
  { group: 'Group3', id: 'JTH', name: 'Jomtien Hospital' },
  { group: 'Group4', id: 'BUD', name: 'Bangkok Hospital Udon' },
  { group: 'Group4', id: 'BKH', name: 'Bangkok Hospital Ratchasima' },
  { group: 'Group4', id: 'BKN', name: 'Bangkok Hospital Khon Kaen' },
  { group: 'Group4', id: 'BCM', name: 'Bangkok Hospital Chiang Mai' },
  { group: 'Group4', id: 'BCR', name: 'Bangkok Hospital Chiang Rai' },
  { group: 'Group4', id: 'BHP', name: 'Bangkok Hospital Pakchong' },
  { group: 'Group4', id: 'BPL', name: 'Bangkok Hospital Phitsanulok' },
  { group: 'Group4', id: 'BPD', name: 'Bangkok Hospital Phrapradaeng' },
  { group: 'Group5', id: 'PT1', name: 'Phyathai 1 Hospital' },
  { group: 'Group5', id: 'PT2', name: 'Phyathai 2 Hospital' },
  { group: 'Group5', id: 'PT3', name: 'Phyathai 3 Hospital' },
  { group: 'Group5', id: 'PTS', name: 'Phyathai Sriracha Hospital' },
  { group: 'Group5', id: 'PTN', name: 'Phyathai Nawamin Hospital' },
  { group: 'Group5', id: 'PLP', name: 'Paolo Phaholyothin Hospital' },
  { group: 'Group5', id: 'PLC', name: 'Paolo Hospital Chokechai 4' },
  { group: 'Group5', id: 'PLS', name: 'Paolo Hospital Samutprakarn' },
  { group: 'Group5', id: 'PLR', name: 'Paolo Hospital Rangsit' },
  { group: 'Group6', id: 'BHH', name: 'Bangkok Hospital Hatyai' },
  { group: 'Group6', id: 'BPK', name: 'Bangkok Hospital Phuket' },
  { group: 'Group6', id: 'BPI', name: 'Siriroj International Hospital' },
  { group: 'Group6', id: 'DBK', name: 'Dibuk Hospital' },
  { group: 'Group6', id: 'BSH', name: 'Bangkok Hospital Samui' },
  { group: 'Group6', id: 'BHS', name: 'Bangkok Hospital Surat' },
];

export interface Registry {
  id: string;
  name: string;
}

export const registries: Registry[] = [
  { id: 'ACSx290', name: 'STS Adult Cardiac Surgery v2.9' },
  { id: 'CathPci50', name: 'NCDR CathPCI Registry v5.0' },
];

export const roles = ['Director', 'Administrator', 'Editor', 'Staff'];

export const permissions = ['BDMS', 'Group', 'Hospital'];

export const menus = {
  home: ['Director', 'Administrator', 'Editor', 'Staff'],
  registry: ['Director', 'Administrator', 'Editor'],
  myPatients: ['Director', 'Administrator', 'Staff'],
  staff: ['Director', 'Administrator'],
  tools: ['Director'],
};

export const pages = {
  acsx290: 'ACSx290',
  cathPci50: 'CathPci50',
};
