import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Staff } from '../staff.model';

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
    this.staffForm = this.formBuilder.group({
      staffId: ['(new)', Validators.required],
      title: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      position: [null, Validators.required],
      primaryHospId: [null, Validators.required],
      status: [null, Validators.required]
    });
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
        title: staff.title,
        firstName: staff.firstName,
        lastName: staff.lastName,
        position: staff.position,
        primaryHospId: staff.primaryHospId,
        status: staff.status
      });
    }

    this.selectedStaff = staff;
  }

  onSubmit() {
    if (!this.staffForm.valid) {
      return;
    }

    const staff: Staff = {
      staffId: this.staffForm.value.staffId,
      userName: null,
      password: null,
      title: this.staffForm.value.title,
      firstName: this.staffForm.value.firstName,
      lastName: this.staffForm.value.lastName,
      phone: null,
      email: null,
      position: this.staffForm.value.position,
      primaryHospId: this.staffForm.value.primaryHospId,
      secondHospIds: null,
      registries: ['ACSx290'],
      role: null,
      permission: null,
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
}
