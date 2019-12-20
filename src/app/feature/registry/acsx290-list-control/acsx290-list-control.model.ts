export interface ACSx290ListControlModel {
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
  procedureDateTime: string;
  completion: number;
  tags: { tag: string; priority: string }[];
  createdAt: any;
  modifiedAt: any;
}
