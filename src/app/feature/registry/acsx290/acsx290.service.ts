import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { ACSx290Model } from './acsx290.model';
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
  currentForm: ACSx290Model;
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public async isExistedForm(acsx290Model: ACSx290Model): Promise<boolean> {
    // tslint:disable: no-string-literal
    const hn = acsx290Model.sectionA['HN'] as string;
    const an = acsx290Model.sectionA['AN'] as string;
    // tslint:enable: no-string-literal

    const formId = await this.getFormIdByHnAn(hn, an);
    return formId !== undefined;
  }

  public async saveForm(acsx290Model: ACSx290Model): Promise<string> {
    // const docRef = await this.db.collection(DB_COLLECTION).add(acsx290Model);
    // console.log(docRef ? docRef.id : 'void'); // docRef of type void | DocumentReference

    await this.db
      .collection(DB_COLLECTION)
      .doc(acsx290Model.sectionA['CaseNo'])
      .set(acsx290Model);
    const docRefid = acsx290Model.sectionA['CaseNo'];

    const registry = this.createRegistry(docRefid, acsx290Model);
    await this.db.collection(DB_REGISTRY).add(registry);

    return docRefid; // Registry Id
  }

  private createRegistry(frmId: string, acsx290Model: ACSx290Model): Registry {
    // tslint:disable: no-string-literal
    return {
      hn: acsx290Model.sectionA['HN'],
      name: acsx290Model.sectionB['PatLName'],
      baseDb: acsx290Model.detail.baseDb,
      addendum: acsx290Model.detail.addendum,
      completion: 100,
      modifiedAt: acsx290Model.detail.modifiedAt,
      formId: frmId
    };
    // tslint:enable: no-string-literal
  }

  public async updateForm(formId: string, acsx290Model: ACSx290Model) {
    await this.db
      .collection(DB_COLLECTION)
      .doc(formId)
      .update(acsx290Model);

    const registry = this.createRegistry(formId, acsx290Model);
    const registryId = await this.getRegistryId(ref => ref.where('formId', '==', formId));
    this.db.doc(DB_REGISTRY + `/${registryId}`).update(registry);
  }

  private getFormIdByHnAn(hn: string, an: string) {
    const decryptHN = this.decrypt(hn);
    const decryptAN = this.decrypt(an);

    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Model>(DB_COLLECTION)
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
            map(registries => registries.find(doc => doc.hn === decryptHN && doc.an === decryptAN))
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

  private getRegistryId(search: any) {
    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Registry>(DB_REGISTRY, search)
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              })
            )
          )
          .subscribe(
            (dc: any) => {
              resolve(dc[0].id); // first result of query [0]
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public getFormById(formId: string) {
    return new Promise<ACSx290Model>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Model>(DB_COLLECTION)
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

  public deleteForm(formId: string) {
    this.db
      .collection(DB_COLLECTION)
      .doc(formId)
      .delete();
  }

  public getStaffs() {
    return this.db.collection<Staff>(DB_STAFF).valueChanges();
  }

  // ? Prototype for mapping before query
  // public loadForm(registryId: string) {
  //   console.log('loadForm');
  //   return this.db
  //     .collection<ACSx290Model>(DB_COLLECTION)
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions =>
  //         actions.map(({ payload: { doc } }) => {
  //           const id = doc.id;
  //           const data = doc.data();
  //           return { id, ...data };
  //         })
  //       ),
  //       map(registries => registries.find(doc => doc.id === registryId))
  //     );
  // }

  public encryptSensitiveData(acsx290Model: ACSx290Model) {
    // tslint:disable: no-string-literal
    acsx290Model.sectionA['HN'] = this.encrypt(acsx290Model.sectionA['HN']);
    acsx290Model.sectionA['AN'] = this.encrypt(acsx290Model.sectionA['AN']);
    acsx290Model.sectionB['PatLName'] = this.encrypt(acsx290Model.sectionB['PatLName']);
    // tslint:enable: no-string-literal
  }

  public decryptSenitiveData(data: object) {
    // tslint:disable: no-string-literal
    data['sectionA']['HN'] = this.decrypt(data['sectionA']['HN']);
    data['sectionA']['AN'] = this.decrypt(data['sectionA']['AN']);
    data['sectionB']['PatLName'] = this.decrypt(data['sectionB']['PatLName']);
    // tslint:enable: no-string-literal
  }

  private encrypt(source: string): string {
    return CryptoJS.AES.encrypt(source, environment.appKey).toString();
  }

  private decrypt(source: string): string {
    return CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8);
  }
}
