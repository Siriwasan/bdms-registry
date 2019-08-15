import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Router } from '@angular/router';
import { User } from './user.model';
import { CustomValidators } from '../../../app/shared/classes/custom-validators';
import { StaffService } from '../../../app/feature/staff/staff.service';
import { Staff } from '../../../app/feature/staff/staff.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [StaffService]
})
export class AuthComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  loginFG: FormGroup;
  profileFG: FormGroup;

  constructor(
    private authService: AuthService,
    private staffService: StaffService,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    this.loginFG = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.profileFG = this.formBuilder.group(
      {
        name: [
          this.user.staff.title + ' ' + this.user.staff.firstName + ' ' + this.user.staff.lastName,
          Validators.required
        ],
        phone: [this.user.staff.phone],
        email: [this.user.staff.email],
        position: [this.user.staff.position, Validators.required],
        primaryHospId: [this.user.staff.primaryHospId],
        registries: [this.user.staff.registries],
        password: [null],
        confirmedPassword: [null]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async login() {
    this.store.dispatch(new UI.StartLoading());
    const result = await this.authService.login(this.loginFG.value.userName, this.loginFG.value.password);
    this.store.dispatch(new UI.StopLoading());
    if (result) {
      this.router.navigate(['/about']);
    }
  }

  isProfileFormValid(): boolean {
    if (this.profileFG.value.password === null && this.profileFG.value.confirmedPassword === null) {
      return this.profileFG.valid;
    }
    return this.profileFG.valid && this.profileFG.value.password === this.profileFG.value.confirmedPassword;
  }

  update() {
    const staff: Staff = this.user.staff;
    if (this.profileFG.value.phone) {
      staff.phone = this.profileFG.value.phone;
    }
    if (this.profileFG.value.email) {
      staff.email = this.profileFG.value.email;
    }
    if (this.profileFG.value.password) {
      staff.password = this.profileFG.value.password;
    }
    this.staffService.updateStaff(staff);
  }

  logout() {
    this.authService.logout();
  }
}
