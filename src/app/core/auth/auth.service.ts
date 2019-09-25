import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from './auth.actions';

import { User } from './user.model';
import { Staff } from '../../../app/feature/staff/staff.model';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { ACSx290Form } from 'src/app/feature/registry/acsx290/acsx290.model';
import * as AuthData from './auth.data';

const DB_COLLECTION = 'ACSx290';
const DB_STAFF = 'Staff';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<fromRoot.State>, private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

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
      .pipe(first())
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

  public async getAvailableRegistries(staffId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Staff>(DB_STAFF, ref => ref.where('staffId', '==', staffId))
          .valueChanges()
          .subscribe(
            data => {
              resolve(data[0].registries);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  // public async getAvailableACSx290s(staffId: string): Promise<string[]> {
  //   const acsxs = await this.getACSx290s(staffId);
  //   return acsxs;
  // }

  public getAvailableACSx290s(staffId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const inCaseList: Observable<ACSx290Form[]>[] = [];
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
          this.db.collection<ACSx290Form>(DB_COLLECTION, ref => ref.where(a, '==', staffId)).valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(inCaseList)
          .pipe(
            map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
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
