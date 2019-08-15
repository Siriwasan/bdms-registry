import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from './auth.actions';

import { User } from './user.model';
import { Staff } from '../../../app/feature/staff/staff.model';

const DB_COLLECTION = 'Staff';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<fromRoot.State>, private db: AngularFirestore) {}

  async login(userName: string, password: string): Promise<boolean> {
    const staffs = await this.db
      .collection<Staff>(DB_COLLECTION, ref =>
        ref
          .where('userName', '==', userName)
          .where('password', '==', password)
          .limit(1)
      )
      .valueChanges()
      .pipe(first())
      .toPromise();

    if (staffs.length < 1) {
      console.log('user name or password not matched!!');
      return false;
    } else {
      console.log(staffs);
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

    // const logged = localStorage.getItem('userData');
    // if (logged === 'true') {
    console.log('autoLogin');
    // const user = new User(userData, 'token', new Date());
    // console.log(user);
    this.store.dispatch(new Auth.Login(user));
    // }
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
    localStorage.removeItem('userData');
  }
}
