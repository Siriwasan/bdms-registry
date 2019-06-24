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

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  displayedColumns: string[] = ['hn', 'name', 'baseDb', 'status'];
  dataSource: MatTableDataSource<Registry>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private registryService: RegistryService, private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    setTimeout(async () => {
      this.store.dispatch(new UI.StartLoading());

      const data = await this.registryService.loadRegistries();
      const decryptData: Registry[] = [];
      data.forEach(d => {
        decryptData.push({
          ...d,
          hn: this.decrypt(d.hn),
          name: this.decrypt(d.name)
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
      this.router.navigate(['registry/acsx290', registry.formId]);
    }
  }

  private decrypt(source: string): string {
    return CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8);
  }
}
