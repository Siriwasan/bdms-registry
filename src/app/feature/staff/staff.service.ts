import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as CryptoJS from 'crypto-js';

import { Staff } from './staff.model';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public getStaffs(avHospitals: string[][]): Observable<Staff[]> {
    const staffList: Observable<Staff[]>[] = [];
    avHospitals.forEach(a => {
      staffList.push(
        this.db.collection<Staff>(DB_COLLECTION, ref => ref.where('primaryHospId', '==', a[1])).valueChanges()
      );
    });

    return combineLatest(staffList).pipe(map(arr => arr.reduce((acc, cur) => acc.concat(cur))));
  }

  public async createStaff(staff: Staff) {
    console.log('create staff');
    const id = await this.generateStaffId();
    staff.staffId = id;
    staff.createdAt = this.timestamp;
    staff.createdBy = '00001';

    if (staff.password) {
      staff.password = this.passwordHashing(staff.password);
    }

    await this.db
      .collection(DB_COLLECTION)
      .doc(id)
      .set(staff);
  }

  public async updateStaff(staff: Staff) {
    console.log('update staff');
    staff.modifiedAt = this.timestamp;
    staff.modifiedBy = '00001';

    if (staff.password) {
      staff.password = this.passwordHashing(staff.password);
    } else {
      delete staff.password;
    }

    if (!staff.userName) {
      delete staff.userName;
    }

    await this.db.doc(DB_COLLECTION + `/${staff.staffId}`).update(staff);
  }

  // private generateStaffId(position: string): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     this.subscriptions.push(
  //       this.db
  //         .collection<Staff>(DB_COLLECTION, ref =>
  //           ref
  //             .orderBy('staffId', 'desc')
  //             .startAt(position + '\uf8ff')
  //             .endAt(position)
  //             .limit(1)
  //         )
  //         .valueChanges()
  //         .subscribe(
  //           (data: Staff[]) => {
  //             if (data.length === 0) {
  //               resolve(position + '001');
  //             } else {
  //               const lastId = data[0].staffId as string;
  //               let index = +lastId.split(position)[1];
  //               const nextId = (++index).toString().padStart(3, '0');

  //               resolve(position + nextId); // first result of query [0]
  //             }
  //           },
  //           error => {
  //             reject(error);
  //           }
  //         )
  //     );
  //   });
  // }

  private generateStaffId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Staff>(DB_COLLECTION, ref => ref.orderBy('staffId', 'desc').limit(1))
          .valueChanges()
          .subscribe(
            (data: Staff[]) => {
              if (data.length === 0) {
                resolve('00001');
              } else {
                const lastId = data[0].staffId as string;
                let index = +lastId;
                const nextId = (++index).toString().padStart(5, '0');

                resolve(nextId); // first result of query [0]
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
      case 'Scrub Nurse':
        return 'SN';
      case 'Heart Coordinator':
        return 'HC';
      case 'Researcher':
        return 'RS';
      case 'Register':
        return 'RG';
    }
  }

  private passwordHashing(password: string): string {
    return CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64);
  }
}
