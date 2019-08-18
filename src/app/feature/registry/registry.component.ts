import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

import { Registry } from './registry.model';
import { RegistryService } from './registry.service';
import { FileService } from '../../shared/services/file.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../app/core/auth/user.model';
import * as Auth from '../../core/auth/auth.data';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['registryId', 'hn', 'an', 'firstName', 'lastName', 'baseDb', 'completion'];
  dataSource: MatTableDataSource<Registry>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;
  avHospitals: string[][];

  constructor(
    private registryService: RegistryService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    setTimeout(async () => {
      this.store.dispatch(new UI.StartLoading());

      this.avHospitals = this.getAvailableHospitals();

      const data = await this.registryService.loadRegistries(this.avHospitals);
      const decryptData: Registry[] = [];
      data.forEach(d => {
        decryptData.push({
          ...d,
          hn: this.decrypt(d.hn),
          an: this.decrypt(d.an),
          firstName: this.decrypt(d.firstName),
          lastName: this.decrypt(d.lastName)
        });
      });

      console.log('loadRegistry');

      this.dataSource = new MatTableDataSource(decryptData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.store.dispatch(new UI.StopLoading());
    });
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

  click(registry: Registry) {
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

  create() {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/acsx290']);
    }, 300);
  }

  async export() {
    const data = await this.registryService.loadACSx290sForExport();
    this.fileService.saveJSONtoCSV(data, 'acsx.csv');
    console.log('export acsx ' + data.length + ' records');
  }

  private getAvailableHospitals(): string[][] {
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
    return hospitals;
  }
}
