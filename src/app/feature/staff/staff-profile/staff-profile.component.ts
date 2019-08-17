import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { Staff } from '../staff.model';
import { CustomValidators } from '../../../../app/shared/classes/custom-validators';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../app/core/auth/user.model';
import * as Data from '../../../shared/data/position.data';
import * as Auth from '../../../core/auth/auth.data';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit, OnChanges, OnDestroy {
  @Input() staff: Staff;
  @Output() submitStaff: EventEmitter<Staff> = new EventEmitter();
  @Output() deleteStaff: EventEmitter<void> = new EventEmitter();

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  staffForm: FormGroup;
  @ViewChild('staffFormDirective', { static: true }) staffFormDirective: FormGroupDirective;

  private selectedStaff: Staff;

  constructor(private formBuilder: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    this.staffForm = this.formBuilder.group(
      {
        staffId: ['(new)', Validators.required],
        userName: [null],
        password: [null],
        confirmedPassword: [null],
        title: [null, Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phone: [null],
        email: [null],
        position: [null, Validators.required],
        primaryHospId: [null, Validators.required],
        role: [null],
        permission: [null],
        status: [null, Validators.required]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const staff = changes.staff.currentValue as Staff;

    if (this.staffForm === undefined) {
      return;
    }

    if (staff === null) {
      this.staffForm.reset();
      this.staffForm.get('staffId').setValue('(new)');
    } else {
      this.staffForm.setValue({
        staffId: staff.staffId,
        userName: staff.userName,
        password: null,
        confirmedPassword: null,
        title: staff.title,
        firstName: staff.firstName,
        lastName: staff.lastName,
        phone: staff.phone,
        email: staff.email,
        position: staff.position,
        primaryHospId: staff.primaryHospId,
        role: staff.role,
        permission: staff.permission,
        status: staff.status
      });
    }

    this.selectedStaff = staff;
  }

  isStaffFormValid(): boolean {
    if (this.staffForm.value.password === null && this.staffForm.value.confirmedPassword === null) {
      return this.staffForm.valid;
    }
    return this.staffForm.valid && this.staffForm.value.password === this.staffForm.value.confirmedPassword;
  }

  onSubmit() {
    if (!this.staffForm.valid) {
      return;
    }

    const staff: Staff = {
      staffId: this.staffForm.value.staffId,
      userName: this.staffForm.value.userName,
      password: this.staffForm.value.password,
      title: this.staffForm.value.title,
      firstName: this.staffForm.value.firstName,
      lastName: this.staffForm.value.lastName,
      phone: this.staffForm.value.phone,
      email: this.staffForm.value.email,
      position: this.staffForm.value.position,
      primaryHospId: this.staffForm.value.primaryHospId,
      secondHospIds: null,
      registries: ['ACSx290'],
      role: this.staffForm.value.role,
      permission: this.staffForm.value.permission,
      status: this.staffForm.value.status,
      createdAt: this.selectedStaff ? this.selectedStaff.createdAt : null,
      createdBy: this.selectedStaff ? this.selectedStaff.createdBy : null,
      modifiedAt: this.selectedStaff ? this.selectedStaff.modifiedAt : null,
      modifiedBy: this.selectedStaff ? this.selectedStaff.modifiedBy : null
    };

    this.staffFormDirective.resetForm();

    this.staffForm.get('staffId').setValue('(new)');

    this.submitStaff.emit(staff);
  }

  onDelete() {
    console.log('delete staff');
  }

  clear() {
    this.selectedStaff = null;
    this.staffFormDirective.resetForm();
    this.staffForm.get('staffId').setValue('(new)');
    console.log('clear');
  }

  getAvailablePositions(): string[] {
    return Data.postions.map(data => data[1]);
  }

  getAvailableRoles(): string[] {
    const roles = Auth.role;
    const userIndex = roles.indexOf(this.user.staff.role);

    if (!this.selectedStaff || !this.selectedStaff.role) {
      return roles.slice(userIndex + 1);
    }

    const staffIndex = roles.indexOf(this.selectedStaff.role);
    if (userIndex < staffIndex) {
      return roles.slice(userIndex + 1);
    } else {
      return [this.selectedStaff.role];
    }
  }
}
