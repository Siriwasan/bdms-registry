import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from './auth.actions';

import { User } from './user.model';
import { Staff } from '../../../app/feature/staff/staff.model';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { ACSx290Model } from 'src/app/feature/registry/acsx290/acsx290.model';
import * as AuthData from './auth.data';
import { CathPci50Model } from 'src/app/feature/registry/cath-pci50/cath-pci50.model';

const DB_ACSX = 'ACSx290';
const DB_CATHPCI = 'CathPci50';
const DB_STAFF = 'Staff';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<fromRoot.State>, private db: AngularFirestore) {}

  async login(userName: string, password: string): Promise<boolean> {
    const hashPassword = this.passwordHashing(password);

    const staffs = await this.db
      .collection<Staff>(DB_STAFF, ref =>
        ref
          .where('userName', '==', userName)
          .where('password', '==', hashPassword)
          .limit(1)
      )
      .valueChanges()
      .pipe(take(1))
      .toPromise();

    if (staffs.length < 1) {
      console.log('username or password not matched!!');
      return false;
    } else {
      const staff = staffs[0];
      staff.userName = null;
      staff.password = null;
      const user = new User(staff, 'token', new Date());
      this.store.dispatch(new Auth.Login(user));
      localStorage.setItem('userData', JSON.stringify(user));
      return true;
    }
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData')) as User;
    if (!user) {
      return;
    }

    console.log('autoLogin');
    this.store.dispatch(new Auth.Login(user));
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
    localStorage.removeItem('userData');
  }

  private passwordHashing(password: string): string {
    return CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64);
  }

  // public getAvailableRegistries(staffId: string): Promise<string[]> {
  //   return new Promise((resolve, reject) => {
  //     this.subscriptions.push(
  //       this.db
  //         .collection<Staff>(DB_STAFF, ref => ref.where('staffId', '==', staffId))
  //         .valueChanges()
  //         .subscribe(
  //           data => {
  //             resolve(data[0].registries);
  //           },
  //           error => {
  //             reject(error);
  //           }
  //         )
  //     );
  //   });
  // }

  public getAvailableRegistries(staffId: string): Promise<string[]> {
    return this.db
      .collection<Staff>(DB_STAFF, ref => ref.where('staffId', '==', staffId))
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(data => {
        if (data.length > 0) {
          return data[0].registries;
        }
        return [];
      });
  }

  public getAvailableACSx290s(staffId: string): Promise<string[]> {
    const inCaseList: Observable<ACSx290Model[]>[] = [];
    const availableStaffForm = [
      'sectionI.SurgeonId',
      'sectionI.Assist1Id',
      'sectionI.Assist2Id',
      'sectionI.Assist3Id',
      'sectionI.Assist4Id',
      'sectionI.Assist5Id',
      'sectionI.Assist6Id',
      'sectionI.Anesth1Id',
      'sectionI.Anesth2Id',
      'sectionI.Scrub1Id',
      'sectionI.Scrub2Id',
      'sectionI.Scrub3Id',
      'sectionI.Scrub4Id',
      'sectionI.CTT1Id',
      'sectionI.CTT2Id',
      'sectionI.CTT3Id',
      'sectionI.CTT4Id'
    ];

    availableStaffForm.forEach(a => {
      inCaseList.push(
        this.db
          .collection<ACSx290Model>(DB_ACSX, ref => ref.where(a, '==', staffId))
          .valueChanges()
      );
    });

    return combineLatest(inCaseList)
      .pipe(
        map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
        // tslint:disable-next-line: no-string-literal
        map(data => data.map(d => d.sectionA['registryId'] as string)),
        take(1)
      )
      .toPromise();
  }

  public getAvailableCathPci50s(staffId: string): Promise<string[]> {
    const inCaseList: Observable<CathPci50Model[]>[] = [];
    const availableStaffForm = [
      'sectionB.AdmProvider',
      'sectionB.AttProvider',
      'sectionE.DCathProvider',
      'sectionE.PCIProvider',
      'sectionL.DCProvider'
    ];

    availableStaffForm.forEach(a => {
      inCaseList.push(
        this.db
          .collection<CathPci50Model>(DB_CATHPCI, ref => ref.where(a, '==', staffId))
          .valueChanges()
      );
    });

    return combineLatest(inCaseList)
      .pipe(
        map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
        // tslint:disable-next-line: no-string-literal
        map(data => data.map(d => d.sectionA['registryId'] as string)),
        take(1)
      )
      .toPromise();
  }

  public getAvailableHospitals(userHosp: string, userPermission: string): AuthData.Hospital[] {
    const userHospGroup = AuthData.hospitals.find(hosp => hosp.id === userHosp).group;

    let hospitals: AuthData.Hospital[];

    switch (userPermission) {
      case 'BDMS':
        hospitals = AuthData.hospitals;
        break;
      case 'Group':
        hospitals = AuthData.hospitals.filter(hosp => hosp.group === userHospGroup);
        break;
      case 'Hospital':
        hospitals = AuthData.hospitals.filter(hosp => hosp.id === userHosp);
        break;
    }
    return hospitals;
  }
}
