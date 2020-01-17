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
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';

import { Staff } from '../staff.model';
import { CustomValidators } from '../../../../app/shared/classes/custom-validators';

import { User } from '../../../../app/core/auth/user.model';
import * as Auth from '../../../core/auth/auth.data';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { RegSelectChoice } from 'src/app/shared/modules/registry-form/registry-form.model';
import { StaffService } from '../staff.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService]
})
export class StaffProfileComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() staff: Staff;
  @Output() submitStaff: EventEmitter<Staff> = new EventEmitter();
  @Output() deleteStaff: EventEmitter<void> = new EventEmitter();

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  avPositions: string[];
  avPrimaryHospitals: Auth.Hospital[];
  avSecondHospitals: RegSelectChoice[];
  avRegistries: string[];
  avRoles: string[];
  avPermissions: string[];

  staffForm: FormGroup;
  @ViewChild('staffFormDirective', { static: true }) staffFormDirective: FormGroupDirective;

  public selectedStaff: Staff = null;

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private staffService: StaffService,
    private dialogService: DialogService
  ) {}

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
        uniqueId: [null, Validators.required],
        phone: [null],
        email: [null],
        position: [null, Validators.required],
        primaryHospId: [null, Validators.required],
        secondHospIds: [null],
        registries: [null, Validators.required],
        role: [null, Validators.required],
        permission: [null, Validators.required],
        status: [null, Validators.required]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );

    this.staffForm.get('primaryHospId').valueChanges.subscribe(value => {
      this.avSecondHospitals = this.getSecondHospitals();
    });
  }

  ngAfterViewInit() {
    this.resetDropdowns();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.staff) {
      const staff = changes.staff.currentValue as Staff;

      if (this.staffForm === undefined) {
        return;
      }

      if (staff === null) {
        this.staffForm.reset();
        this.staffForm.get('staffId').setValue('(new)');
      } else {
        this.staffForm.patchValue({
          staffId: staff.staffId,
          userName: staff.userName,
          password: null,
          confirmedPassword: null,
          title: staff.title,
          firstName: staff.firstName,
          lastName: staff.lastName,
          uniqueId: staff.uniqueId,
          phone: staff.phone,
          email: staff.email,
          position: staff.position,
          primaryHospId: staff.primaryHospId,
          secondHospIds: staff.secondHospIds,
          registries: staff.registries,
          role: staff.role,
          permission: staff.permission,
          status: staff.status
        });

        const userRoleIndex = Auth.roles.indexOf(this.user.staff.role);
        const staffRoleIndex = Auth.roles.indexOf(staff.role);
        if (staffRoleIndex >= 0 && staffRoleIndex <= userRoleIndex) {
          this.disableForm();
        } else {
          this.enableForm();
        }
      }

      this.selectedStaff = staff;
      this.resetDropdowns();
    }
  }

  private enableForm() {
    this.staffForm.get('staffId').enable();
    this.staffForm.get('userName').enable();
    this.staffForm.get('password').enable();
    this.staffForm.get('confirmedPassword').enable();
    this.staffForm.get('title').enable();
    this.staffForm.get('firstName').enable();
    this.staffForm.get('lastName').enable();
    this.staffForm.get('uniqueId').enable();
    this.staffForm.get('phone').enable();
    this.staffForm.get('email').enable();
    this.staffForm.get('position').enable();
    this.staffForm.get('primaryHospId').enable();
    this.staffForm.get('secondHospIds').enable();
    this.staffForm.get('registries').enable();
    this.staffForm.get('role').enable();
    this.staffForm.get('permission').enable();
    this.staffForm.get('status').enable();
  }

  private disableForm() {
    // this.staffForm.get('staffId').disable();
    // this.staffForm.get('userName').disable();
    // this.staffForm.get('password').disable();
    // this.staffForm.get('confirmedPassword').disable();
    // this.staffForm.get('title').disable();
    // this.staffForm.get('firstName').disable();
    // this.staffForm.get('lastName').disable();
    // this.staffForm.get('phone').disable();
    // this.staffForm.get('email').disable();
    // this.staffForm.get('position').disable();
    // this.staffForm.get('primaryHospId').disable();
    // this.staffForm.get('secondHospIds').disable();
    // this.staffForm.get('registries').disable();
    // this.staffForm.get('role').disable();
    // this.staffForm.get('permission').disable();
    // this.staffForm.get('status').disable();
    this.staffForm.disable();
  }

  private resetDropdowns() {
    this.avPositions = this.getAvailablePositions();
    this.avPrimaryHospitals = this.getAvailableHospitals();
    this.avSecondHospitals = this.getSecondHospitals();
    this.avRegistries = this.getAvailableRegistires();
    this.avRoles = this.getAvailableRoles();
    this.avPermissions = this.getAvailablePermissions();
  }

  private getAvailablePositions(): string[] {
    return Auth.postions;
  }

  private getAvailableHospitals(): Auth.Hospital[] {
    return this.authService
      .getAvailableHospitals(this.user.staff.primaryHospId, this.user.staff.permission)
      .map(hosp => {
        return { group: hosp.group, id: hosp.id, name: `${hosp.name} (${hosp.id})` };
      });
  }

  private getSecondHospitals(): RegSelectChoice[] {
    const selectedPrimaryHosp = this.staffForm.get('primaryHospId').value;
    const userHosps = this.selectedStaff ? this.selectedStaff.secondHospIds : [];

    const avHosps = [...new Set([...userHosps, ...this.avPrimaryHospitals.map(h => h.id)])].sort(
      (a, b) => {
        return (
          Auth.hospitals.findIndex(h => h.id === a) - Auth.hospitals.findIndex(h => h.id === b)
        );
      }
    );

    // if (this.selectedStaff) {
    const secondHospIds = this.staffForm.get('secondHospIds');
    const secondHospIdsValues = secondHospIds.value ? secondHospIds.value : [];
    secondHospIds.setValue(secondHospIdsValues.filter(h => h !== selectedPrimaryHosp));
    // }

    const temp = hosp => {
      if (userHosps.includes(hosp)) {
        if (this.avPrimaryHospitals.map(h => h.id).includes(hosp)) {
          return false;
        }
        return true;
      }
    };

    return avHosps.map(h => {
      const hosp = Auth.hospitals.find(hs => hs.id === h);
      return {
        value: hosp.id,
        label: `${hosp.name} (${hosp.id})`,
        disable: selectedPrimaryHosp === h || temp(h)
      } as RegSelectChoice;
    });
  }

  private getAvailableRegistires(): string[] {
    return this.user.staff.registries;
  }

  private getAvailableRoles(): string[] {
    const userRoleIndex = Auth.roles.indexOf(this.user.staff.role);
    if (!this.selectedStaff || !this.selectedStaff.role) {
      return Auth.roles.slice(userRoleIndex + 1);
    }

    const staffRoleIndex = Auth.roles.indexOf(this.selectedStaff.role);
    if (staffRoleIndex <= userRoleIndex) {
      return Auth.roles;
    } else {
      return Auth.roles.slice(userRoleIndex + 1);
    }
  }

  private getAvailablePermissions(): string[] {
    const userPermIndex = Auth.permissions.indexOf(this.user.staff.permission);
    if (!this.selectedStaff || !this.selectedStaff.role) {
      return Auth.permissions.slice(userPermIndex);
    }

    const staffPermIndex = Auth.permissions.indexOf(this.selectedStaff.permission);
    if (staffPermIndex <= userPermIndex) {
      return Auth.permissions.slice(staffPermIndex);
    } else {
      return Auth.permissions.slice(userPermIndex);
    }
  }

  isStaffFormValid(): boolean {
    if (this.staffForm.value.password === null && this.staffForm.value.confirmedPassword === null) {
      return this.staffForm.valid;
    }
    return (
      this.staffForm.valid &&
      this.staffForm.value.password === this.staffForm.value.confirmedPassword
    );
  }

  async onSubmit() {
    if (!this.staffForm.valid) {
      return;
    }

    const staff: Staff = {
      staffId: this.staffForm.value.staffId.trim(),
      userName: this.staffForm.value.userName ? this.staffForm.value.userName.trim() : null,
      password: this.staffForm.value.password ? this.staffForm.value.password.trim() : null,
      title: this.staffForm.value.title.trim(),
      firstName: this.staffForm.value.firstName.trim(),
      lastName: this.staffForm.value.lastName.trim(),
      uniqueId: this.staffForm.value.uniqueId.trim(),
      phone: this.staffForm.value.phone ? this.staffForm.value.phone.trim() : null,
      email: this.staffForm.value.email ? this.staffForm.value.email.trim() : null,
      position: this.staffForm.value.position,
      primaryHospId: this.staffForm.value.primaryHospId,
      secondHospIds: this.staffForm.value.secondHospIds ? this.staffForm.value.secondHospIds : [],
      registries: this.staffForm.value.registries,
      role: this.staffForm.value.role,
      permission: this.staffForm.value.permission,
      status: this.staffForm.value.status,
      createdAt: this.selectedStaff ? this.selectedStaff.createdAt : this.timestamp,
      createdBy: this.selectedStaff ? this.selectedStaff.createdBy : this.user.staff.staffId,
      modifiedAt: this.timestamp,
      modifiedBy: this.user.staff.staffId
    };

    let searchStaff = await this.staffService.getStaffByUniqueId(staff.uniqueId);
    if (searchStaff[0] && searchStaff[0].staffId !== staff.staffId) {
      this.dialogService.createModalDialog({
        title: '!!Alert!!',
        content: `Duplicate Medical License Number/Staff ID`,
        buttons: ['Retry']
      });

      return;
    }

    searchStaff = await this.staffService.getStaffByUserName(staff.userName);
    if (searchStaff[0] && searchStaff[0].staffId !== staff.staffId) {
      this.dialogService.createModalDialog({
        title: '!!Alert!!',
        content: `Duplicate User Name`,
        buttons: ['Retry']
      });

      return;
    }

    if (this.selectedStaff === null) {
      this.staffService.createStaff(staff);
    } else {
      this.staffService.updateStaff(staff);
      this.selectedStaff = null;
    }
    this.clear();
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
}
