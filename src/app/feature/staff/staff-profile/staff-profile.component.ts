import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Staff } from '../staff.model';
import { CustomValidators } from '../../../../app/shared/classes/custom-validators';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit, OnChanges {
  @Input() staff: Staff;
  @Output() submitStaff: EventEmitter<Staff> = new EventEmitter();
  @Output() deleteStaff: EventEmitter<void> = new EventEmitter();

  staffForm: FormGroup;
  @ViewChild('staffFormDirective', { static: true }) staffFormDirective: FormGroupDirective;

  private selectedStaff: Staff;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
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
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
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
}
