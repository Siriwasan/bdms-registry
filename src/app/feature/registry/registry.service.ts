import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Registry } from './registry.model';
import { ACSx290Form } from './acsx290/acsx290.model';
import * as Auth from '../../core/auth/auth.data';

const DB_COLLECTION = 'ACSx290';
const DB_CATHPCI = 'CathPci50';
const DB_REGISTRY = 'Registry';

@Injectable()
export class RegistryService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  //#region Cloud firestore
  public loadRegistries(avHospitals: Auth.Hospital[]): Promise<Registry[]> {
    return new Promise((resolve, reject) => {
      const registryList: Observable<Registry[]>[] = [];
      avHospitals.forEach(hosp => {
        registryList.push(
          this.db.collection<Registry>(DB_REGISTRY, ref => ref.where('hospitalId', '==', hosp.id)).valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(registryList)
          .pipe(map(arr => arr.reduce((acc, cur) => acc.concat(cur))))
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

  public loadCathPci50s(avHospitals: Auth.Hospital[]): Promise<Registry[]> {
    return new Promise((resolve, reject) => {
      const registryList: Observable<Registry[]>[] = [];
      avHospitals.forEach(hosp => {
        registryList.push(
          this.db
            .collection<Registry>(DB_REGISTRY, ref =>
              ref.where('hospitalId', '==', hosp.id).where('baseDbId', '==', 'CathPci50')
            )
            .valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(registryList)
          .pipe(map(arr => arr.reduce((acc, cur) => acc.concat(cur))))
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

  public loadACSx290sForExport(avHospitals: Auth.Hospital[]): Promise<ACSx290Form[]> {
    return new Promise<ACSx290Form[]>((resolve, reject) => {
      const acsxList: Observable<ACSx290Form[]>[] = [];
      avHospitals.forEach(hosp => {
        acsxList.push(
          this.db
            .collection<ACSx290Form>(DB_COLLECTION, ref => ref.where('sectionC.HospName', '==', hosp.id))
            .valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(acsxList)
          .pipe(
            map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
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

                d.detail.createdAt =
                  d.detail.createdAt !== null
                    ? (d.detail.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
                    : null;
                d.detail.modifiedAt =
                  d.detail.modifiedAt !== null
                    ? (d.detail.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
                    : null;
                d.detail.deletedAt =
                  d.detail.deletedAt !== null
                    ? (d.detail.deletedAt as firebase.firestore.Timestamp).toDate().toISOString()
                    : null;

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

      //   this.subscriptions.push(
      //     this.db
      //       .collection<ACSx290Form>('ACSx290')
      //       .valueChanges()
      //       .pipe(
      //         map(data =>
      //           data.map(d => {
      //             // tslint:disable: no-string-literal
      //             delete d.sectionA['HN'];
      //             delete d.sectionA['AN'];
      //             delete d.sectionB['PatLName'];
      //             delete d.sectionB['PatFName'];
      //             delete d.sectionB['PatMName'];
      //             delete d.sectionB['DOB'];
      //             delete d.sectionB['SSN'];
      //             delete d.sectionB['PatAddr'];
      //             // tslint:enable: no-string-literal

      //             d.detail.createdAt =
      //               d.detail.createdAt !== null
      //                 ? (d.detail.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
      //                 : null;
      //             d.detail.modifiedAt =
      //               d.detail.modifiedAt !== null
      //                 ? (d.detail.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
      //                 : null;
      //             d.detail.deletedAt =
      //               d.detail.deletedAt !== null
      //                 ? (d.detail.deletedAt as firebase.firestore.Timestamp).toDate().toISOString()
      //                 : null;

      //             return d;
      //           })
      //         )
      //       )
      //       .subscribe(
      //         data => {
      //           resolve(data);
      //         },
      //         error => {
      //           reject(error);
      //         }
      //       )
      //   );
    });
  }
  //#endregion Cloud firestore
}
