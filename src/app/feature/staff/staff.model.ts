export interface Staff {
  staffId: string;
  userName?: string;
  password?: string;
  title: string;
  firstName: string;
  lastName: string;
  uniqueId: string; // Medical license number or Staff Id
  phone?: string;
  email?: string;
  position: string;
  primaryHospId: string;
  secondHospIds?: string[];
  registries: string[];
  role: string;
  permission: string;
  status: string;
  createdAt: any;
  createdBy: string;
  modifiedAt: any;
  modifiedBy: string;
}
