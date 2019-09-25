import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

import { MyPatientsService } from './my-patients.service';
import { RegistryModel } from '../registry/registry.model';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../app/core/auth/user.model';
import { FileService } from '../../../app/shared/services/file.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
  providers: [MyPatientsService]
})
export class MyPatientsComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  displayedColumns: string[] = ['registryId', 'hn', 'an', 'firstName', 'lastName', 'baseDb', 'completion'];
  dataSource: MatTableDataSource<RegistryModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private myPatientsService: MyPatientsService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fileService: FileService
  ) {}

  async ngOnInit() {
    this.store.dispatch(new UI.StartLoading());
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    const data = await this.myPatientsService.loadMyPatients(this.user.staff.staffId);
    const decryptData: RegistryModel[] = [];
    data.forEach(d => {
      decryptData.push({
        ...d,
        hn: this.decrypt(d.hn),
        an: this.decrypt(d.an),
        firstName: this.decrypt(d.firstName),
        lastName: this.decrypt(d.lastName)
      });
    });

    console.log('load my patients');

    this.dataSource = new MatTableDataSource(decryptData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.store.dispatch(new UI.StopLoading());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  click(registry: RegistryModel) {
    if (registry.baseDb === 'STS Adult Cardiac Surgery version 2.9') {
      this.store.dispatch(new UI.StartLoading());
      setTimeout(() => {
        this.router.navigate(['registry/acsx290', registry.registryId]);
      }, 300);
    }
  }

  private decrypt(source: string): string {
    if (source === null) {
      return null;
    }
    return CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8);
  }

  async export() {
    const data = await this.myPatientsService.loadMyACSx290sForExport(this.user.staff.staffId);
    this.fileService.saveJSONtoCSV(data, 'my-registry.csv');
    console.log('export acsx ' + data.length + ' records');
  }
}
