import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

import { environment } from '../../../../environments/environment';

import { ACSx290Form } from './acsx290.model';
import { Registry } from '../registry.model';
import { Staff } from '../../staff/staff.model';

const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';
const DB_COLLECTION = 'ACSx290';

@Injectable()
export class ACSx290Service implements OnDestroy {
  currentForm: ACSx290Form;
  private subscriptions: Subscription[] = [];

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public async isExistedForm(data: ACSx290Form): Promise<boolean> {
    // tslint:disable: no-string-literal
    const hn = data.sectionA['HN'] as string;
    const an = data.sectionA['AN'] as string;
    // tslint:enable: no-string-literal

    const registryId = await this.getRegistryIdByHnAn(hn, an);
    return registryId !== undefined;
  }

  private generateRegistryId(hospitalId: string): Promise<string> {
    const year = new Date()
      .getFullYear()
      .toString()
      .substr(-2);
    const prefix = 'ACX-' + hospitalId + '-' + year;

    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>(DB_COLLECTION, ref =>
            ref
              .orderBy('sectionA.registryId', 'desc')
              .startAt(prefix + '\uf8ff')
              .endAt(prefix)
              .limit(1)
          )
          .valueChanges()
          .subscribe(
            (data: ACSx290Form[]) => {
              if (data.length === 0) {
                resolve(prefix + '001');
              } else {
                // tslint:disable-next-line: no-string-literal
                const lastId = data[0].sectionA['registryId'] as string;
                let index = +lastId.split(prefix)[1];
                const nextId = (++index).toString().padStart(3, '0');

                resolve(prefix + nextId); // first result of query [0]
              }
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public async createForm(data: ACSx290Form): Promise<string> {
    // tslint:disable: no-string-literal
    const registryId = await this.generateRegistryId(data.sectionC['HospName']);
    data.sectionA['registryId'] = registryId;
    // tslint:enable: no-string-literal

    await this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .set(data);

    const registry = this.createRegistryModel(registryId, data);
    await this.db
      .collection(DB_REGISTRY)
      .doc(registryId)
      .set(registry);

    return registryId; // Registry Id
  }

  public async updateForm(registryId: string, data: ACSx290Form) {
    await this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .update(data);

    const registry = this.createRegistryModel(registryId, data);
    this.db.doc(DB_REGISTRY + `/${registryId}`).update(registry);
  }

  private createRegistryModel(regisId: string, data: ACSx290Form): Registry {
    const complete = Math.round((data.completion.summary.valid / data.completion.summary.total) * 100);

    // tslint:disable: no-string-literal
    return {
      registryId: regisId,
      hospitalId: data.sectionC['HospName'],
      hn: data.sectionA['HN'],
      an: data.sectionA['AN'],
      firstName: data.sectionB['PatFName'],
      lastName: data.sectionB['PatLName'],
      age: data.sectionB['Age'],
      baseDbId: data.detail.baseDbId,
      baseDb: data.detail.baseDb,
      addendum: data.detail.addendum,
      completion: complete,
      modifiedAt: data.detail.modifiedAt
    };
    // tslint:enable: no-string-literal
  }

  public deleteForm(registryId: string) {
    this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .delete();
  }

  private getRegistryIdByHnAn(hn: string, an: string): Promise<string> {
    const decryptHN = this.decrypt(hn);
    const decryptAN = this.decrypt(an);

    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>(DB_COLLECTION)
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(({ payload: { doc } }) => {
                const id = doc.id;
                const data = doc.data();

                // tslint:disable-next-line: no-string-literal
                return { id, hn: this.decrypt(data.sectionA['HN']), an: this.decrypt(data.sectionA['AN']) };
              })
            ),
            map(forms => forms.find(doc => doc.hn === decryptHN && doc.an === decryptAN))
          )
          .subscribe(
            (data: any) => {
              if (data) {
                resolve(data.id); // Form Id
              } else {
                // reject('not found');
                resolve(undefined);
              }
            },
            error => {
              console.log(error);
              reject(error);
            }
          )
      );
    });
  }

  public getForm(registryId: string): Promise<ACSx290Form> {
    return new Promise<ACSx290Form>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>(DB_COLLECTION)
          .doc(registryId)
          .valueChanges()
          .subscribe(
            (dc: any) => {
              resolve(dc);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public getStaffs(): Promise<Staff[]> {
    // return this.db.collection<Staff>(DB_STAFF).valueChanges();
    return new Promise<Staff[]>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Staff>(DB_STAFF)
          .valueChanges()
          .subscribe(
            (dc: any) => {
              resolve(dc);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public checkNeededDataCompletion(data: ACSx290Form): string {
    let alert = '';
    // tslint:disable: no-string-literal
    const neededData = [
      [data.sectionA['HN'], '<li>HN</li>'],
      [data.sectionA['AN'], '<li>AN</li>'],
      [data.sectionB['PatFName'], '<li>First Name</li>'],
      [data.sectionB['PatLName'], '<li>Last Name</li>'],
      [data.sectionC['HospName'], '<li>Hospital</li>']
    ];
    // tslint:enable: no-string-literal

    neededData.forEach(c => {
      if (this.isNullorEmpty(c[0])) {
        alert += c[1];
      }
    });

    return alert;
  }

  private isNullorEmpty(data: any): boolean {
    return !data || data.trim() === '';
  }

  public encryptSensitiveData(acsx290Model: ACSx290Form) {
    // tslint:disable: no-string-literal
    acsx290Model.sectionA['HN'] = this.encrypt(acsx290Model.sectionA['HN']);
    acsx290Model.sectionA['AN'] = this.encrypt(acsx290Model.sectionA['AN']);
    acsx290Model.sectionB['PatLName'] = this.encrypt(acsx290Model.sectionB['PatLName']);
    acsx290Model.sectionB['PatFName'] = this.encrypt(acsx290Model.sectionB['PatFName']);
    acsx290Model.sectionB['PatMName'] = this.encrypt(acsx290Model.sectionB['PatMName']);
    acsx290Model.sectionB['DOB'] = this.encrypt(acsx290Model.sectionB['DOB']);
    acsx290Model.sectionB['SSN'] = this.encrypt(acsx290Model.sectionB['SSN']);
    acsx290Model.sectionB['PatAddr'] = this.encrypt(acsx290Model.sectionB['PatAddr']);
    // tslint:enable: no-string-literal
  }

  public decryptSenitiveData(acsx290Model: ACSx290Form) {
    // tslint:disable: no-string-literal
    acsx290Model.sectionA['HN'] = this.decrypt(acsx290Model.sectionA['HN']);
    acsx290Model.sectionA['AN'] = this.decrypt(acsx290Model.sectionA['AN']);
    acsx290Model.sectionB['PatLName'] = this.decrypt(acsx290Model.sectionB['PatLName']);
    acsx290Model.sectionB['PatFName'] = this.decrypt(acsx290Model.sectionB['PatFName']);
    acsx290Model.sectionB['PatMName'] = this.decrypt(acsx290Model.sectionB['PatMName']);
    acsx290Model.sectionB['DOB'] = this.decrypt(acsx290Model.sectionB['DOB']);
    acsx290Model.sectionB['SSN'] = this.decrypt(acsx290Model.sectionB['SSN']);
    acsx290Model.sectionB['PatAddr'] = this.decrypt(acsx290Model.sectionB['PatAddr']);
    // tslint:enable: no-string-literal
  }

  private encrypt(source: string): string {
    return CryptoJS.AES.encrypt(source, environment.appKey).toString();
  }

  private decrypt(source: string): string {
    return CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8);
  }
}
