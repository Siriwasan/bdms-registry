export const postions = [
  ['CS', 'Cardiothoracic Surgeon'],
  ['AN', 'Anesthesiologist'],
  ['SN', 'Scrub Nurse'],
  ['CT', 'Cardiothoracic Technician'],
  ['HC', 'Heart Coordinator'],
  ['RS', 'Researcher'],
  ['DS', 'Data scientist'],
  ['OT', 'Other']
];

export interface Hospital {
  group: string;
  id: string;
  name: string;
}

export const hospitals: Hospital[] = [
  { group: 'Group1', id: 'BHT', name: 'Bangkok Heart Hospital' },
  { group: 'Group4', id: 'BCM', name: 'Bangkok Chiang Mai Hospital' }
];

export const roles = ['Director', 'Administrator', 'Editor', 'Staff'];

export const permissions = ['BDMS', 'Group', 'Hospital'];

export const menus = {
  registry: ['Director', 'Administrator', 'Editor'],
  myPatients: ['Director', 'Administrator', 'Staff'],
  staff: ['Director', 'Administrator'],
  tools: ['Director']
};
