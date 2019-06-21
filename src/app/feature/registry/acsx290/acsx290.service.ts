import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ACSx290Model } from './acsx290.model';
// import { Registry } from '../registry.model';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

const DB_REGISTRY = 'Registry';
const DB_COLLECTION = 'ACSx290';

@Injectable({
  providedIn: 'root'
})
export class ACSx290Service {
  constructor(private db: AngularFirestore, private store: Store<fromRoot.State>) {}
  currentForm: ACSx290Model;

  saveForm(acsx290Model: ACSx290Model) {
    this.store.dispatch(new UI.StartLoading());

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

        this.store.dispatch(new UI.StopLoading());
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
