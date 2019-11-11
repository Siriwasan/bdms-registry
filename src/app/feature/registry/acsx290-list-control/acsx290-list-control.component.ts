import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { RegistryModel } from '../registry.model';
import { tagPriorities } from '../acsx290/acsx290.tag';

import * as Auth from '../../../core/auth/auth.data';
import { ACSx290ListControlModel } from './acsx290-list-control.model';

@Component({
  selector: 'app-acsx290-list-control',
  templateUrl: './acsx290-list-control.component.html',
  styleUrls: ['./acsx290-list-control.component.scss']
})
export class ACSx290ListControlComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['registryId', 'hn', 'firstName', 'lastName', 'age', 'tags', 'completion'];
  dataSource: MatTableDataSource<ACSx290ListControlModel>;

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
      const decryptData = this.createACSx290ListControlModels(this.data);
      this.dataSource = new MatTableDataSource(decryptData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filter;
    }
  }

  createACSx290ListControlModels(data: RegistryModel[]): ACSx290ListControlModel[] {
    if (!data) {
      return undefined;
    }
    return data.map(d => {
      return {
        ...d,
        hn: this.decrypt(d.hn),
        an: this.decrypt(d.an),
        firstName: this.decrypt(d.firstName),
        lastName: this.decrypt(d.lastName),
        tags: d.tags.map(t => {
          return { tag: t, priority: tagPriorities[t] ? tagPriorities[t] : 'low' };
        })
      } as ACSx290ListControlModel;
    });
  }

  private filter(d: ACSx290ListControlModel, filter: string): boolean {
    if (d.registryId.toLowerCase().includes(filter)) {
      return true;
    }
    if (d.hn.toLowerCase().includes(filter)) {
      return true;
    }
    if (d.firstName.toLowerCase().includes(filter)) {
      return true;
    }
    if (d.lastName.toLowerCase().includes(filter)) {
      return true;
    }
    if (d.tags.length > 0 && d.tags.map(t => t.tag.toLowerCase()).includes(filter)) {
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

  clickItem(registry: RegistryModel) {
    if (this.barClicked) {
      this.barClicked = false;
      return;
    }
    this.clicked.emit(registry.registryId);
  }

  clickTag(tag: string) {
    this.barClicked = true;
    this.filterString = tag;
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
