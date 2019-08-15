import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

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
    const hashPassword = this.passwordHashing(password);

    const staffs = await this.db
      .collection<Staff>(DB_COLLECTION, ref =>
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
}
