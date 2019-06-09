import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ACSx290Model } from './acsx290.model';
// import { Registry } from '../registry.model';
import { map } from 'rxjs/operators';

const DB_REGISTRY = 'Registry';
const DB_COLLECTION = 'ACSx290';

@Injectable({
  providedIn: 'root'
})
export class ACSx290Service {
  constructor(private db: AngularFirestore) {}
  currentForm: ACSx290Model;

  saveForm(acsx290Model: ACSx290Model) {
    this.db
      .collection(DB_COLLECTION)
      .add(acsx290Model)
      .then((docRef: DocumentReference) => {
        console.log(docRef ? docRef.id : 'void'); // docRef of type void | DocumentReference

        // // tslint:disable: no-string-literal
        // const registry: Registry = {
        //   hn: sts29Model.sectionA['HN'],
        //   name: sts29Model.sectionA['PatName'],
        //   baseDb: sts29Model.description['baseDb'],
        //   status: 'Completed',
        //   registryId: docRef.id
        // };
        // // tslint:enable: no-string-literal

        // this.db.collection(DB_REGISTRY).add(registry);
      });
  }

  loadForm(registryId: string) {
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
}
