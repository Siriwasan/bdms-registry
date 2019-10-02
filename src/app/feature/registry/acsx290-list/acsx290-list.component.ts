import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { RegistryModel } from '../registry.model';
import { RegistryService } from '../registry.service';
import { FileService } from '../../../shared/services/file.service';
import { tagPriorities } from '../acsx290/acsx290.tag';

import { User } from '../../../../app/core/auth/user.model';
import * as Auth from '../../../core/auth/auth.data';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-acsx290-list',
  templateUrl: './acsx290-list.component.html',
  styleUrls: ['./acsx290-list.component.scss'],
  providers: [AuthService]
})
export class ACSx290ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['registryId', 'hn', 'firstName', 'lastName', 'age', 'tags', 'completion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;
  avHospitals: Auth.Hospital[];

  barClicked = false;
  filterString: string = null;

  constructor(
    private registryService: RegistryService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fileService: FileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    setTimeout(async () => {
      this.store.dispatch(new UI.StartLoading());

      this.avHospitals = this.authService.getAvailableHospitals(
        this.user.staff.primaryHospId,
        this.user.staff.permission
      );

      const data = await this.registryService.loadRegistries('ACSx290', this.avHospitals);
      const decryptData = data.map(d => {
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

      this.dataSource = new MatTableDataSource(decryptData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (d: any, filter: string) => {
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
      };

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
    const data = await this.registryService.loadACSx290sForExport(this.avHospitals);
    this.fileService.saveJSONtoCSV(data, 'acsx.csv');
    console.log('export acsx ' + data.length + ' records');
  }

  clickTag(tag: string) {
    this.barClicked = true;
    this.filterString = tag;
    this.applyFilter(this.filterString);
  }
}
