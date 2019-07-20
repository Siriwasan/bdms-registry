import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Staff } from './staff.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const DB_COLLECTION = 'Staff';

@Injectable()
export class StaffService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public loadStaffs() {
    return this.db
      .collection<Staff>(DB_COLLECTION)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(({ payload: { doc } }) => {
            const id = doc.id;
            const data = doc.data();

            // tslint:disable-next-line: no-string-literal
            return { id, ...data };
          })
        )
      );
  }

  public async createStaff(staff: Staff) {
    console.log('create staff');
    const id = await this.generateStaffId(this.getAbbreviation(staff.position));
    staff.staffId = id;

    // await this.db.collection(DB_COLLECTION).add(staff);
    await this.db
      .collection(DB_COLLECTION)
      .doc(id)
      .set(staff);
  }

  public async updateStaff(id: string, staff: Staff) {
    console.log('update staff');

    await this.db.doc(DB_COLLECTION + `/${id}`).update(staff);
  }

  private generateStaffId(position: string) {
    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Staff>(DB_COLLECTION, ref =>
            ref
              .orderBy('staffId', 'desc')
              .startAt(position + '\uf8ff')
              .endAt(position)
              .limit(1)
          )
          .valueChanges()
          .subscribe(
            (data: Staff[]) => {
              if (data.length === 0) {
                resolve(position + '001');
              } else {
                const lastId = data[0].staffId as string;
                let index = +lastId.split(position)[1];
                const nextId = (++index).toString().padStart(3, '0');

                resolve(position + nextId); // first result of query [0]
              }
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  private getAbbreviation(position: string) {
    switch (position) {
      case 'Cardiothoracic Surgeon':
        return 'CS';
      case 'Anesthesiologist':
        return 'AN';
      case 'Registered Nurse':
        return 'RN';
      case 'Cardiothoracic Technician':
        return 'CT';
    }
  }
}
