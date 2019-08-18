import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { Staff } from '../staff.model';
import { CustomValidators } from '../../../../app/shared/classes/custom-validators';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../app/core/auth/user.model';
import * as Auth from '../../../core/auth/auth.data';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() staff: Staff;
  @Output() submitStaff: EventEmitter<Staff> = new EventEmitter();
  @Output() deleteStaff: EventEmitter<void> = new EventEmitter();

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  avPositions: string[];
  avHospitals: any[];
  avRoles: string[];
  avPermissions: string[];

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

  ngAfterViewInit() {
    this.resetDropdowns();
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
    this.resetDropdowns();
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
    this.resetDropdowns();
  }

  private resetDropdowns() {
    this.avPositions = this.getAvailablePositions();
    this.avHospitals = this.getAvailableHospitals();
    this.avRoles = this.getAvailableRoles();
    this.avPermissions = this.getAvailablePermissions();
  }

  private getAvailableHospitals(): any[] {
    const userHosp = this.user.staff.primaryHospId;
    const userHospGroup = Auth.hospitals.find(h => h[1] === userHosp)[0];
    const userPermission = this.user.staff.permission;

    let hospitals: string[][];

    switch (userPermission) {
      case 'BDMS':
        hospitals = Auth.hospitals;
        break;
      case 'Group':
        hospitals = Auth.hospitals.filter(h => h[0] === userHospGroup);
        break;
      case 'Hospital':
        hospitals = Auth.hospitals.filter(h => h[1] === userHosp);
        break;
    }

    const avHospitals = hospitals.map(hosp => {
      return { hospGroup: hosp[0], hospId: hosp[1], hospName: `${hosp[2]} (${hosp[1]})` };
    });
    return avHospitals;
  }

  private getAvailablePositions(): string[] {
    return Auth.postions.map(data => data[1]);
  }

  private getAvailableRoles(): string[] {
    const roles = Auth.roles;
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

  private getAvailablePermissions(): string[] {
    const permissions = Auth.permissions;
    const userIndex = permissions.indexOf(this.user.staff.permission);

    if (!this.selectedStaff || !this.selectedStaff.permission) {
      return permissions.slice(userIndex);
    }

    const staffIndex = permissions.indexOf(this.selectedStaff.permission);
    if (userIndex < staffIndex) {
      return permissions.slice(userIndex);
    } else {
      return [this.selectedStaff.permission];
    }
  }
}
