import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as CryptoJS from 'crypto-js';

import { Staff } from './staff.model';
import { Subscription, Observable } from 'rxjs';

const DB_COLLECTION = 'Staff';

@Injectable()
export class StaffService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public loadStaffs(): Observable<Staff[]> {
    return this.db.collection<Staff>(DB_COLLECTION).valueChanges();
  }

  public async createStaff(staff: Staff) {
    console.log('create staff');
    const id = await this.generateStaffId(this.getAbbreviation(staff.position));
    staff.staffId = id;
    staff.createdAt = this.timestamp;
    staff.createdBy = 'admin';

    await this.db
      .collection(DB_COLLECTION)
      .doc(id)
      .set(staff);
  }

  public async updateStaff(staff: Staff) {
    console.log('update staff');
    staff.modifiedAt = this.timestamp;
    staff.modifiedBy = 'admin';
    if (!staff.password) {
      delete staff.password;
    } else {
      const hash = CryptoJS.SHA3(staff.password).toString(CryptoJS.enc.Base64);
      console.log(hash);
    }

    await this.db.doc(DB_COLLECTION + `/${staff.staffId}`).update(staff);
  }

  private generateStaffId(position: string): Promise<string> {
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
