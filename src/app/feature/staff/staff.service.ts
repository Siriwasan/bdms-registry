import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as CryptoJS from 'crypto-js';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

import { Staff } from './staff.model';
import * as Auth from '../../core/auth/auth.data';

const DB_STAFF = 'Staff';

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

  public async createStaff(staff: Staff) {
    let searchStaff = await this.getStaffByUniqueId(staff.uniqueId);
    if (searchStaff[0] && searchStaff[0].staffId !== staff.staffId) {
      console.log('duplicate staff');
      return;
    }

    searchStaff = await this.getStaffByUserName(staff.userName);
    if (searchStaff[0] && searchStaff[0].staffId !== staff.staffId) {
      console.log('duplicate username');
      return;
    }

    console.log('create staff');
    // const id = await this.generateStaffId();
    // staff.staffId = id;

    if (staff.password) {
      staff.password = this.passwordHashing(staff.password);
    }

    // await this.db
    //   .collection(DB_STAFF)
    //   .doc(id)
    //   .set(staff);
    const docRef = await this.db.collection(DB_STAFF).add(staff);
    const stfId = docRef.id;
    this.db.doc(DB_STAFF + `/${stfId}`).update({ staffId: stfId });
  }

  public async updateStaff(staff: Staff) {
    console.log('update staff');

    if (staff.password) {
      staff.password = this.passwordHashing(staff.password);
    } else {
      delete staff.password;
    }

    if (!staff.userName) {
      delete staff.userName;
    }

    await this.db.doc(DB_STAFF + `/${staff.staffId}`).update(staff);
  }

  public getStaffsByHospitals(avHospitals: Auth.Hospital[]): Observable<Staff[]> {
    const staffList: Observable<Staff[]>[] = [];
    avHospitals.forEach(hosp => {
      staffList.push(
        this.db
          .collection<Staff>(DB_STAFF, ref => ref.where('primaryHospId', '==', hosp.id))
          .valueChanges()
      );
    });

    return combineLatest(staffList).pipe(map(arr => arr.reduce((acc, cur) => acc.concat(cur))));
  }

  public getStaffByUniqueId(uniqueId: string): Promise<Staff[]> {
    if (!uniqueId) {
      return;
    }

    return this.db
      .collection<Staff>(DB_STAFF, ref => ref.where('uniqueId', '==', uniqueId))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  public getStaffByUserName(userName: string): Promise<Staff[]> {
    if (!userName) {
      return;
    }

    return this.db
      .collection<Staff>(DB_STAFF, ref => ref.where('userName', '==', userName))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
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
    return this.db
      .collection<Staff>(DB_STAFF, ref => ref.orderBy('staffId', 'desc').limit(1))
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(
        data => {
          if (data.length === 0) {
            return '00001';
          } else {
            const lastId = data[0].staffId as string;
            let index = +lastId;
            const nextId = (++index).toString().padStart(5, '0');

            return nextId; // first result of query [0]
          }
        },
        error => {
          return error;
        }
      );
  }

  private passwordHashing(password: string): string {
    return CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64);
  }
}
