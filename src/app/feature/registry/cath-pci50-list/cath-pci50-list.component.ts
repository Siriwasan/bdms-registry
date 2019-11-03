import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { RegistryService } from '../registry.service';
import { FileService } from '../../../shared/services/file.service';
import { tagPriorities } from '../cath-pci50/cath-pci50.tag';

import { User } from '../../../../app/core/auth/user.model';
import * as Auth from '../../../core/auth/auth.data';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-cath-pci50-list',
  templateUrl: './cath-pci50-list.component.html',
  styleUrls: ['./cath-pci50-list.component.scss'],
  providers: [RegistryService]
})
export class CathPci50ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['registryId', 'hn', 'name', 'age', 'tags', 'submitted', 'completion'];
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

      const data = await this.registryService.loadRegistries('CathPci50', this.avHospitals);
      const decryptData = data.map(d => {
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
        };
      });

      this.dataSource = new MatTableDataSource(decryptData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (d: any, filter: string) => {
        if (
          d.registryId
            .substr(3)
            .toLowerCase()
            .includes(filter)
        ) {
          return true;
        }
        if (d.hn.toLowerCase().includes(filter)) {
          return true;
        }
        if (d.name.toLowerCase().includes(filter)) {
          return true;
        }
        if (d.tags.length > 0 && d.tags.map(t => t.tag.toLowerCase()).includes(filter)) {
          return true;
        }
        if (d.submitted.length > 0 && d.submitted.map(t => t.submit.toLowerCase()).some(res => res.includes(filter))) {
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

  click(registry: any) {
    if (this.barClicked) {
      this.barClicked = false;
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

  create() {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/cath-pci50']);
    }, 300);
  }

  async export() {
    const data = await this.registryService.loadCathPci50sForExport(this.avHospitals);
    // this.fileService.saveJSONtoCSV(data, 'cathpci.csv');
    this.registryService.exportAsExcelFile(data, 'cathpci');
    console.log('export cathpci ' + data.length + ' records');
  }

  clickTag(tag: string) {
    this.barClicked = true;
    this.filterString = tag.split(';')[0];
    this.applyFilter(this.filterString);
  }
}
