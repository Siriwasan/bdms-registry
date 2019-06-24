import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Registry } from './registry.model';
import { RegistryService } from './registry.service';

import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

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

  constructor(private registryService: RegistryService, private router: Router) {
    // this.registryService.loadRegistries().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });

    this.registryService.loadRegistries().subscribe(data => {
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
    });
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  click(registry: Registry) {
    if (registry.baseDb === 'STS Adult Cardiac Surgery version 2.9') {
      this.router.navigate(['registry/acsx290', registry.registryId]);
    }
  }

  private decrypt(source: string): string {
    return CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8);
  }
}
