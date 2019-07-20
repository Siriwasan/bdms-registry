import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { ACSx290Form } from './acsx290.model';
import { Registry } from '../registry.model';
import { map } from 'rxjs/operators';
import { Staff } from '../../staff/staff.model';

const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';
const DB_COLLECTION = 'ACSx290';

@Injectable({
  providedIn: 'root'
})
export class ACSx290Service implements OnDestroy {
  currentForm: ACSx290Form;
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public async isExistedForm(acsx290Model: ACSx290Form): Promise<boolean> {
    // tslint:disable: no-string-literal
    const hn = acsx290Model.sectionA['HN'] as string;
    const an = acsx290Model.sectionA['AN'] as string;
    // tslint:enable: no-string-literal

    const formId = await this.getFormIdByHnAn(hn, an);
    return formId !== undefined;
  }

  private generateFormId(hospital: string) {
    const year = new Date()
      .getFullYear()
      .toString()
      .substr(-2);
    const prefix = 'ACX-' + hospital + '-' + year;

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

  public async createForm(acsx290Model: ACSx290Form): Promise<string> {
    // const docRef = await this.db.collection(DB_COLLECTION).add(acsx290Model);
    // console.log(docRef ? docRef.id : 'void'); // docRef of type void | DocumentReference

    // tslint:disable: no-string-literal
    const registryId = await this.generateFormId(acsx290Model.sectionC['HospName']);
    acsx290Model.sectionA['registryId'] = registryId;
    // tslint:enable: no-string-literal

    await this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .set(acsx290Model);

    const registry = this.createRegistryModel(registryId, acsx290Model);
    await this.db
      .collection(DB_REGISTRY)
      .doc(registryId)
      .set(registry);

    return registryId; // Registry Id
  }

  public async updateForm(formId: string, acsx290Model: ACSx290Form) {
    await this.db
      .collection(DB_COLLECTION)
      .doc(formId)
      .update(acsx290Model);

    const registry = this.createRegistryModel(formId, acsx290Model);
    // const registryId = await this.getRegistryId(ref => ref.where('formId', '==', formId));
    this.db.doc(DB_REGISTRY + `/${formId}`).update(registry);
  }

  private createRegistryModel(frmId: string, acsx290Model: ACSx290Form): Registry {
    const complete = Math.round((acsx290Model.completion.summary.valid / acsx290Model.completion.summary.total) * 100);

    // tslint:disable: no-string-literal
    return {
      registryId: frmId,
      hn: acsx290Model.sectionA['HN'],
      an: acsx290Model.sectionA['AN'],
      firstName: acsx290Model.sectionB['PatFName'],
      lastName: acsx290Model.sectionB['PatLName'],
      age: acsx290Model.sectionB['Age'],
      baseDb: acsx290Model.detail.baseDb,
      addendum: acsx290Model.detail.addendum,
      completion: complete,
      modifiedAt: acsx290Model.detail.modifiedAt
    };
    // tslint:enable: no-string-literal
  }

  public deleteForm(formId: string) {
    this.db
      .collection(DB_COLLECTION)
      .doc(formId)
      .delete();
  }

  private getFormIdByHnAn(hn: string, an: string) {
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

  public getForm(formId: string) {
    return new Promise<ACSx290Form>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>(DB_COLLECTION)
          .doc(formId)
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

  public getStaffs() {
    return this.db.collection<Staff>(DB_STAFF).valueChanges();
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
