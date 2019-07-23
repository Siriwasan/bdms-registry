import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  displayedColumns: string[] = ['registryId', 'hn', 'an', 'firstName', 'lastName', 'baseDb', 'completion'];
  dataSource: MatTableDataSource<Registry>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private registryService: RegistryService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fileService: FileService
  ) {}

  ngOnInit() {
    setTimeout(async () => {
      this.store.dispatch(new UI.StartLoading());

      const data = await this.registryService.loadRegistries();
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
    data.forEach(d => {
      d.detail.createdAt =
        d.detail.createdAt !== null
          ? (d.detail.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
          : null;
      d.detail.modifiedAt =
        d.detail.modifiedAt !== null
          ? (d.detail.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
          : null;
      d.detail.deletedAt =
        d.detail.deletedAt !== null
          ? (d.detail.deletedAt as firebase.firestore.Timestamp).toDate().toISOString()
          : null;
    });
    console.log(data);
    this.fileService.saveJSONtoCSV(data, 'data.csv');
  }
}
