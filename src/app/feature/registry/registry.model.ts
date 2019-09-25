export interface FormDetail {
  baseDbId: string;
  baseDb: string;
  addendum: string;
  createdAt: any;
  createdBy: string;
  modifiedAt: any;
  modifiedBy: string;
  deletedAt: any;
  deletedBy: string;
}

export interface RegistryModel {
  registryId: string;
  hospitalId: string;
  hn: string;
  an: string;
  firstName: string;
  lastName: string;
  age: number;
  baseDbId: string;
  baseDb: string;
  addendum: string;
  completion: number;
  tags: string[];
  modifiedAt: any;
}
