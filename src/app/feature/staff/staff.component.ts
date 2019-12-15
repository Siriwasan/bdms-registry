import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from './staff.model';
import { StaffService } from './staff.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

import { User } from '../../../app/core/auth/user.model';
import * as Auth from '../../core/auth/auth.data';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [AuthService]
})
export class StaffComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'staffId',
    'title',
    'firstName',
    'lastName',
    'position',
    'primaryHospId',
    'status'
  ];
  dataSource: MatTableDataSource<any>;

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) filterInput: ElementRef;

  selectedStaff: Staff;
  staffListSubscription: Subscription;

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;
  avHospitals: Auth.Hospital[];

  constructor(
    private router: Router,
    private staffService: StaffService,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    this.selectedStaff = null;

    this.store.dispatch(new UI.StartLoading());

    this.avHospitals = this.authService.getAvailableHospitals(
      this.user.staff.primaryHospId,
      this.user.staff.permission
    );

    this.staffListSubscription = this.staffService
      .getStaffsByHospitals(this.avHospitals)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.store.dispatch(new UI.StopLoading());
      });
  }

  ngOnDestroy() {
    this.staffListSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  click(staff: Staff) {
    this.selectedStaff = staff;
  }

  create() {
    this.selectedStaff = null;
  }

  submit(staff: Staff) {
    // if (this.selectedStaff === null) {
    //   this.staffService.createStaff(staff);
    // } else {
    //   this.staffService.updateStaff(staff);
    //   this.selectedStaff = null;
    // }
    this.filterInput.nativeElement.value = null;
  }
}
