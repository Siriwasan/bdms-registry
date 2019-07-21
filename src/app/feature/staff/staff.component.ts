import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from './staff.model';
import { StaffService } from './staff.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['staffId', 'title', 'firstName', 'lastName', 'position', 'primaryHospId', 'status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedStaff: any;
  staffListSubscription: Subscription;

  constructor(private router: Router, private staffService: StaffService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.selectedStaff = null;

    this.store.dispatch(new UI.StartLoading());

    this.staffListSubscription = this.staffService.loadStaffs().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.store.dispatch(new UI.StopLoading());
    });
  }

  ngOnDestroy() {
    this.staffListSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  click(staff: any) {
    this.selectedStaff = staff;
  }

  create() {
    this.selectedStaff = null;
  }

  submit(staff: Staff) {
    if (this.selectedStaff === null) {
      this.staffService.createStaff(staff);
    } else {
      this.staffService.updateStaff(this.selectedStaff.id, staff);
      this.selectedStaff = null;
    }
  }

  clear() {
    this.selectedStaff = null;
  }
}
