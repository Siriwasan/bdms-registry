import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Registry } from './registry.model';
import { ACSx290Form } from './acsx290/acsx290.model';

const DB_REGISTRY = 'Registry';

@Injectable()
export class RegistryService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  //#region Cloud firestore
  loadRegistries(): Promise<Registry[]> {
    // return this.db.collection<Registry>(DB_REGISTRY).valueChanges();

    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Registry>(DB_REGISTRY)
          .valueChanges()
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

  public loadACSx290s(): Promise<ACSx290Form[]> {
    return new Promise<ACSx290Form[]>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>('ACSx290')
          .valueChanges()
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
  //#endregion Cloud firestore
}
