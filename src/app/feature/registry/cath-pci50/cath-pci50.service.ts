import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';

import { CathPCI50Model } from './cath-pci50.model';

const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';
const DB_COLLECTION = 'CathPci50';

@Injectable()
export class CathPci50Service implements OnDestroy {
  // currentForm: ACSx290Form;
  private subscriptions: Subscription[] = [];

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public async createForm(data: CathPCI50Model): Promise<string> {
    // // tslint:disable: no-string-literal
    // const registryId = await this.generateRegistryId(data.sectionC['HospName']);
    // data.sectionA['registryId'] = registryId;
    // // tslint:enable: no-string-literal

    // await this.db
    //   .collection(DB_COLLECTION)
    //   .doc(registryId)
    //   .set(data);

    await this.db.collection(DB_COLLECTION).add(data);

    // const registry = this.createRegistryModel(registryId, data);
    // await this.db
    //   .collection(DB_REGISTRY)
    //   .doc(registryId)
    //   .set(registry);

    // return registryId; // Registry Id
    return '';
  }
}
