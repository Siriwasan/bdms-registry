import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { ACSx290Model } from './acsx290.model';
import { Registry } from '../registry.model';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';
import { resolve, reject } from 'q';

const DB_REGISTRY = 'Registry';
const DB_COLLECTION = 'ACSx290';

@Injectable({
  providedIn: 'root'
})
export class ACSx290Service {
  constructor(private db: AngularFirestore, private store: Store<fromRoot.State>) {}
  currentForm: ACSx290Model;

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public async saveForm(regId: string, acsx290Model: ACSx290Model): Promise<string> {
    this.store.dispatch(new UI.StartLoading());

    // const a = await this.getACSx290Registry(ref => ref.where('sectionA.HN', '==', '333'));
    // console.log(a);

    const docRef = await this.db.collection(DB_COLLECTION).add(acsx290Model);
    console.log(docRef ? docRef.id : 'void'); // docRef of type void | DocumentReference

    const registry = this.createRegistry(docRef.id, acsx290Model);
    await this.db.collection(DB_REGISTRY).add(registry);

    this.store.dispatch(new UI.StopLoading());
    return docRef.id;
  }

  private createRegistry(id: string, acsx290Model: ACSx290Model): Registry {
    // tslint:disable: no-string-literal
    return {
      hn: acsx290Model.sectionA['HN'],
      name: acsx290Model.sectionB['PatLName'],
      baseDb: acsx290Model.detail.baseDb,
      addendum: acsx290Model.detail.addendum,
      completion: 100,
      modifiedAt: acsx290Model.detail.modifiedAt,
      registryId: id
    };
    // tslint:enable: no-string-literal
  }

  public async updateForm(regId: string, acsx290Model: ACSx290Model) {
    console.log('update form');
    // const hn = acsx290Model.sectionA['HN'] as string;
    // const an = acsx290Model.sectionA['AN'] as string;
    // const a = await this.getACSx290Registry(hn, an);

    // this.getACSx290RegistryById(regId);

    await this.db
      .collection(DB_COLLECTION)
      .doc(regId)
      .update(acsx290Model);

    const registry = this.createRegistry(regId, acsx290Model);
    const id = await this.getRegistryListId(ref => ref.where('registryId', '==', regId));
    this.db.doc(DB_REGISTRY + `/${id}`).update(registry);
  }

  private getACSx290Registry(hn: string, an: string) {
    const decryptHN = this.decrypt(hn);
    const decryptAN = this.decrypt(an);

    return this.db
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
      .subscribe((dc: any) => {
        console.log(dc); // first result of query [0]
      });
  }

  private getRegistryListId(search: any) {
    return new Promise<string>(resolve => {
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
        .subscribe((dc: any) => {
          resolve(dc[0].id); // first result of query [0]
        });
    }).catch(error => {
      reject(null);
    });
  }

  public getACSx290RegistryById(registryId: string) {
    return new Promise<ACSx290Model>((resolve, reject) => {
      this.db
        .collection<ACSx290Model>(DB_COLLECTION)
        .doc(registryId)
        .valueChanges()
        .subscribe((dc: any) => {
          resolve(dc);
        });
    }).catch(error => {
      reject(null);
    });
  }

  public deleteForm(registryId: string) {
    this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .delete();
  }

  public loadForm(registryId: string) {
    console.log('loadForm');
    return this.db
      .collection<ACSx290Model>(DB_COLLECTION)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(({ payload: { doc } }) => {
            const id = doc.id;
            const data = doc.data();
            return { id, ...data };
          })
        ),
        map(registries => registries.find(doc => doc.id === registryId))
      );
  }

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
