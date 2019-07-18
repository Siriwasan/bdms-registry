export interface Staff {
  staffId: string;
  userName?: string;
  password?: string;
  title: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  position: string;
  primaryHospId: string;
  secondHospIds?: string[];
  registries: string[];
  role?: string;
  permission?: string;
  status: string;
  createdAt?: any;
  createdBy?: string;
  modifiedAt?: any;
  modifiedBy?: string;
}

export const staffs: Staff[] = [
  {
    staffId: '001',
    title: 'Mr',
    firstName: 'Art',
    lastName: 'AA',
    position: 'CVT',
    primaryHospId: 'BHT',
    registries: ['ACSx290'],
    status: 'Active'
  },
  {
    staffId: '003',
    title: 'Ms',
    firstName: 'Kwan',
    lastName: 'BB',
    position: 'Nurse',
    primaryHospId: 'BHT',
    registries: ['ACSx290'],
    status: 'Active'
  },
  {
    staffId: '003',
    title: 'Mrs',
    firstName: 'Auh',
    lastName: 'CC',
    position: 'Cardiologist',
    primaryHospId: 'BHT',
    registries: ['ACSx290'],
    status: 'Active'
  }
];
