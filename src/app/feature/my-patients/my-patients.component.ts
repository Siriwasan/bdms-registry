import { Component, OnInit, ViewChild, OnDestroy, ViewChildren, QueryList } from '@angular/core';
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
import { tagPriorities as acsx290Tags } from '../registry/acsx290/acsx290.tag';
import { tagPriorities as cathPci50Tags } from '../registry/cath-pci50/cath-pci50.tag';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
  providers: [MyPatientsService]
})
export class MyPatientsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['registryId', 'hn', 'firstName', 'lastName', 'age', 'tags', 'completion'];

  dataSource: MatTableDataSource<any>;
  cathPciDataSource: MatTableDataSource<any>;

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  barClicked = false;
  barClicked2 = false;
  filterString: string = null;
  filterString2: string = null;

  private filterFunc = (d: any, filter: string) => {
    if (d.registryId.substr(3).toLowerCase().includes(filter)) {
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

  constructor(
    private myPatientsService: MyPatientsService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fileService: FileService
  ) {}

  async ngOnInit() {
    this.store.dispatch(new UI.StartLoading());
    this.user$ = this.store.select(fromRoot.getUser);
    // this.userSubscription = this.user$.subscribe(user => {
    //   this.user = user;
    // });
    this.user = await this.user$.pipe(first()).toPromise();

    const data = await this.myPatientsService.loadMyPatients(this.user.staff.staffId);
    const decryptData = this.decryptRegistry(data, acsx290Tags);
    this.dataSource = new MatTableDataSource(decryptData);
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource.sort = this.sort.toArray()[0];
    this.dataSource.filterPredicate = this.filterFunc;

    const data2 = await this.myPatientsService.loadMyCathPci50s(this.user.staff.staffId);
    const decryptData2 = this.decryptRegistry(data2, cathPci50Tags);
    this.cathPciDataSource = new MatTableDataSource(decryptData2);
    this.cathPciDataSource.paginator = this.paginator.toArray()[1];
    this.cathPciDataSource.sort = this.sort.toArray()[1];
    this.cathPciDataSource.filterPredicate = this.filterFunc;

    this.store.dispatch(new UI.StopLoading());
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }

  private decryptRegistry(data: RegistryModel[], tagPriorities: any) {
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
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(filterValue: string) {
    this.cathPciDataSource.filter = filterValue.trim().toLowerCase();

    if (this.cathPciDataSource.paginator) {
      this.cathPciDataSource.paginator.firstPage();
    }
  }

  click(registry: RegistryModel) {
    if (this.barClicked) {
      this.barClicked = false;
      return;
    }
    if (registry.baseDbId === 'ACSx290') {
      this.store.dispatch(new UI.StartLoading());
      setTimeout(() => {
        this.router.navigate(['registry/acsx290', registry.registryId]);
      }, 300);
    }
  }

  click2(registry: RegistryModel) {
    if (this.barClicked2) {
      this.barClicked2 = false;
      return;
    }
    if (registry.baseDbId === 'CathPci50') {
      this.store.dispatch(new UI.StartLoading());
      setTimeout(() => {
        this.router.navigate(['registry/cath-pci50', registry.registryId]);
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

  clickTag(tag: string) {
    this.barClicked = true;
    this.filterString = tag;
    this.applyFilter(this.filterString);
  }

  clickTag2(tag: string) {
    this.barClicked2 = true;
    this.filterString2 = tag;
    this.applyFilter2(this.filterString2);
  }
}
