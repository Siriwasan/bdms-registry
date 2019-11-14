import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatOption } from '@angular/material';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { RegistryModel } from '../registry.model';
import { tagPriorities } from '../acsx290/acsx290.tag';

import * as Auth from '../../../core/auth/auth.data';
import { ACSx290ListControlModel } from './acsx290-list-control.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acsx290-list-control',
  templateUrl: './acsx290-list-control.component.html',
  styleUrls: ['./acsx290-list-control.component.scss']
})
export class ACSx290ListControlComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns: string[] = ['registryId', 'hn', 'firstName', 'lastName', 'age', 'tags', 'completion'];
  dataSource: MatTableDataSource<ACSx290ListControlModel>;
  controlData: ACSx290ListControlModel[];
  avHospitals: string[];

  searchForm: FormGroup;
  subscriptions: Subscription[] = [];

  @Input() data: RegistryModel[];
  @Output() clicked: EventEmitter<string> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() export: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('allSelected', { static: true }) private allSelected: MatOption;

  barClicked = false;

  get outputLabel() {
    const hospitals = this.searchForm.get('hospitals').value;

    if (hospitals.length <= 0) {
      return '';
    }

    let output = '';
    hospitals.forEach(hosp => {
      if (hosp === 'All') {
        return;
      }
      output = output + hosp + ', ';
    });
    output = output.substring(0, output.length - 2);
    return output;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      hospitals: [[]],
      filters: ['']
    });
    this.subscriptions.push(
      this.searchForm.get('hospitals').valueChanges.subscribe(value => this.selectedHospitalChanged(value)),
      this.searchForm.get('filters').valueChanges.subscribe(value => this.applyFilter())
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && this.data) {
      this.controlData = this.createACSx290ListControlModels(this.data);

      const filterDuplicates = (arr: string[]) => [...new Set(arr)];
      this.avHospitals = filterDuplicates(this.controlData.map(d => d.hospitalId));
      this.searchForm.get('hospitals').setValue(['All', ...this.avHospitals]);

      this.setDataSource(this.controlData);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  selectedHospitalChanged(selectedHospitals: string[]) {
    const filterSelectedHosp = selectedHospitals.filter(v => v !== 'All');
    const data = this.controlData.filter(d => filterSelectedHosp.includes(d.hospitalId));

    this.setDataSource(data);
  }

  setDataSource(data: ACSx290ListControlModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filter;
    this.applyFilter();
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

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.searchForm.get('hospitals').setValue(this.avHospitals);
      this.allSelected.select();
    } else {
      this.searchForm.get('hospitals').setValue([]);
    }
  }

  toggleSingleSelection() {
    const selectedHospitals = this.searchForm.get('hospitals').value.filter(hosp => hosp !== 'All');
    if (!this.allSelected.selected && selectedHospitals.length === this.avHospitals.length) {
      this.allSelected.select();
    } else if (this.allSelected.selected && selectedHospitals.length !== this.avHospitals.length) {
      this.allSelected.deselect();
    }
  }

  private filter(data: ACSx290ListControlModel, filter: string): boolean {
    if (data.registryId.toLowerCase().includes(filter)) {
      return true;
    }
    if (data.hn.toLowerCase().includes(filter)) {
      return true;
    }
    if (data.firstName.toLowerCase().includes(filter)) {
      return true;
    }
    if (data.lastName.toLowerCase().includes(filter)) {
      return true;
    }
    if (data.tags.length > 0 && data.tags.map(t => t.tag.toLowerCase()).includes(filter)) {
      return true;
    }

    return false;
  }

  applyFilter() {
    const filterValue = this.searchForm.get('filters').value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.searchForm.get('filters').setValue('');
    this.applyFilter();
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
    this.searchForm.get('filters').setValue(tag);
    this.applyFilter();
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
