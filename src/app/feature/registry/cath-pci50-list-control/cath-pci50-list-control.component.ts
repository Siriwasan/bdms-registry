import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { RegistryService } from '../registry.service';
import { tagPriorities } from '../cath-pci50/cath-pci50.tag';

import * as Auth from '../../../core/auth/auth.data';
import { RegistryModel } from '../registry.model';
import { CathPci50ListControlModel } from './cath-pci50-list-control.model';

@Component({
  selector: 'app-cath-pci50-list-control',
  templateUrl: './cath-pci50-list-control.component.html',
  styleUrls: ['./cath-pci50-list-control.component.scss'],
  providers: [RegistryService]
})
export class CathPci50ListControlComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['registryId', 'hn', 'name', 'age', 'tags', 'submitted', 'completion'];
  dataSource: MatTableDataSource<CathPci50ListControlModel>;

  @Input() data: RegistryModel[];
  @Output() clicked: EventEmitter<string> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() export: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  avHospitals: Auth.Hospital[];

  barClicked = false;
  filterString: string = null;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      const decryptData = this.createCathPci50ListControlModels(this.data);
      this.dataSource = new MatTableDataSource(decryptData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filter;
    }
  }

  createCathPci50ListControlModels(data: RegistryModel[]): CathPci50ListControlModel[] {
    if (!data) {
      return undefined;
    }
    return data.map(d => {
      return {
        ...d,
        hn: this.decrypt(d.hn),
        an: this.decrypt(d.an),
        name: this.decrypt(d.firstName) + ' ' + this.decrypt(d.lastName),
        tags: d.tags.map(t => {
          return { tag: t, priority: tagPriorities[t] ? tagPriorities[t] : 'low' };
        }),
        submitted: d.submitted.map(t => {
          const s = t.split('-');
          if (s[1] === 'DP') {
            t = t + ';' + t.substring(0, t.length - 1) + ';' + s[0] + '-P';
          }
          return {
            submit: t,
            label: s[0],
            endpoint: s.length > 1 ? s[1] : null,
            priority: tagPriorities[s[0]] ? tagPriorities[s[0]] : 'low'
          };
        })
      } as CathPci50ListControlModel;
    });
  }

  private filter(data: CathPci50ListControlModel, filter: string): boolean {
    if (
      data.registryId
        .substr(3)
        .toLowerCase()
        .includes(filter)
    ) {
      return true;
    }
    if (data.hn.toLowerCase().includes(filter)) {
      return true;
    }
    if (data.name.toLowerCase().includes(filter)) {
      return true;
    }
    if (data.tags.length > 0 && data.tags.map(t => t.tag.toLowerCase()).includes(filter)) {
      return true;
    }
    if (
      data.submitted.length > 0 &&
      data.submitted.map(t => t.submit.toLowerCase()).some(res => res.includes(filter))
    ) {
      return true;
    }

    return false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.filterString = '';
    this.applyFilter(this.filterString);
  }

  clickItem(registry: CathPci50ListControlModel) {
    if (this.barClicked) {
      this.barClicked = false;
      return;
    }
    this.clicked.emit(registry.registryId);
  }

  clickTag(tag: string) {
    this.barClicked = true;
    this.filterString = tag.split(';')[0];
    this.applyFilter(this.filterString);
  }

  private decrypt(source: string): string {
    return source ? CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8) : null;
  }

  createRegistry() {
    this.create.emit(null);
  }

  exportRegistries() {
    this.export.emit(null);
  }
}
