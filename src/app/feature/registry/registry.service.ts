import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Registry } from './registry.model';
import { ACSx290Form } from './acsx290/acsx290.model';
import { map } from 'rxjs/operators';

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

  public loadACSx290sForExport(): Promise<ACSx290Form[]> {
    return new Promise<ACSx290Form[]>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>('ACSx290')
          .valueChanges()
          .pipe(
            map(data =>
              data.map(d => {
                // tslint:disable: no-string-literal
                delete d.sectionA['HN'];
                delete d.sectionA['AN'];
                delete d.sectionB['PatLName'];
                delete d.sectionB['PatFName'];
                delete d.sectionB['PatMName'];
                delete d.sectionB['DOB'];
                delete d.sectionB['SSN'];
                delete d.sectionB['PatAddr'];
                // tslint:enable: no-string-literal

                return d;
              })
            )
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
  //#endregion Cloud firestore
}
