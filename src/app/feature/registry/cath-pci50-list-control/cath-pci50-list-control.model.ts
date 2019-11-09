export interface CathPci50ListControlModel {
  registryId: string;
  hospitalId: string;
  hn: string;
  an: string;
  name: string;
  age: number;
  baseDbId: string;
  baseDb: string;
  addendum: string;
  completion: number;
  tags: { tag: string; priority: string }[];
  submitted: { submit: string; label: string; endpoint: string; priority: string }[];
  modifiedAt: any;
}
