import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { ACSx290Form } from '../registry/acsx290/acsx290.model';
import { Registry } from '../registry/registry.model';
import { map } from 'rxjs/operators';

const DB_COLLECTION = 'ACSx290';
const DB_REGISTRY = 'Registry';

@Injectable()
export class MyPatientsService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  async loadMyPatients(staffId: string): Promise<Registry[]> {
    const acsxs = await this.loadACSx290s(staffId);
    console.log(acsxs);

    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Registry>(DB_REGISTRY)
          .valueChanges()
          .pipe(map(data => data.filter(a => acsxs.indexOf(a.registryId) >= 0)))
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  //#region Cloud firestore
  private loadACSx290s(staffId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>(DB_COLLECTION, ref => ref.where('sectionI.SurgeonId', '==', staffId))
          .valueChanges()
          .pipe(
            // tslint:disable-next-line: no-string-literal
            map(data => data.map(d => d.sectionA['registryId'] as string))
          )
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }
}
