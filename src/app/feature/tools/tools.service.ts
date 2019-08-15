import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Staff } from '../staff/staff.model';
import { Registry } from '../registry/registry.model';
import { ACSx290Form } from '../registry/acsx290/acsx290.model';

const DB_COLLECTION = 'ACSx290';
const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';

@Injectable()
export class ToolsService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  loadStaffs(): Promise<Staff[]> {
    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Staff>(DB_STAFF)
          .valueChanges()
          .pipe(
            map(data =>
              data.map(d => {
                d.createdAt =
                  d.createdAt !== null ? (d.createdAt as firebase.firestore.Timestamp).toDate().toISOString() : null;
                d.modifiedAt =
                  d.modifiedAt !== null ? (d.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString() : null;
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

  async dumpStaffs(staffs: Staff[]) {
    console.log(staffs);

    await staffs
      .map(staff => {
        staff.createdAt = firebase.firestore.Timestamp.fromDate(new Date(staff.createdAt));
        staff.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(staff.modifiedAt));
        return staff;
      })
      .forEach(staff => {
        this.db
          .collection<Staff>(DB_STAFF)
          .doc(staff.staffId)
          .set(staff);
      });
  }

  loadRegistries(): Promise<Registry[]> {
    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Registry>(DB_REGISTRY)
          .valueChanges()
          .pipe(
            map(data =>
              data.map(d => {
                d.modifiedAt =
                  d.modifiedAt !== null ? (d.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString() : null;
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

  async dumpRegistries(registries: Registry[]) {
    console.log(registries);

    await registries
      .map(registry => {
        registry.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(registry.modifiedAt));
        return registry;
      })
      .forEach(registry => {
        this.db
          .collection<Registry>(DB_REGISTRY)
          .doc(registry.registryId)
          .set(registry);
      });
  }

  loadACSx290s(): Promise<ACSx290Form[]> {
    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>(DB_COLLECTION)
          .valueChanges()
          .pipe(
            map(data =>
              data.map(d => {
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
    });
  }

  async dumpACSx290s(acsxs: ACSx290Form[]) {
    console.log(acsxs);

    await acsxs
      .map(acsx => {
        acsx.detail.createdAt = firebase.firestore.Timestamp.fromDate(new Date(acsx.detail.createdAt));
        acsx.detail.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(acsx.detail.modifiedAt));
        acsx.detail.deletedAt = firebase.firestore.Timestamp.fromDate(new Date(acsx.detail.deletedAt));
        return acsx;
      })
      .forEach(acsx => {
        this.db
          .collection<ACSx290Form>(DB_COLLECTION)
          // tslint:disable-next-line: no-string-literal
          .doc(acsx.sectionA['registryId'])
          .set(acsx);
      });
  }
}
