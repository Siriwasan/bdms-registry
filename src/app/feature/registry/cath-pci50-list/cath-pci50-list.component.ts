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
import { tagPriorities } from '../cath-pci50/cath-pci50.tag';

import { User } from '../../../../app/core/auth/user.model';
import * as Auth from '../../../core/auth/auth.data';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-cath-pci50-list',
  templateUrl: './cath-pci50-list.component.html',
  styleUrls: ['./cath-pci50-list.component.scss']
})
export class CathPci50ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['registryId', 'hn', 'firstName', 'lastName', 'age', 'tags', 'completion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;
  avHospitals: Auth.Hospital[];

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

      // const decryptData: any[] = [];
      // data.forEach(d => {
      //   decryptData.push({
      //     ...d,
      //     hn: this.decrypt(d.hn),
      //     an: this.decrypt(d.an),
      //     firstName: this.decrypt(d.firstName),
      //     lastName: this.decrypt(d.lastName),
      //     tags: d.tags.map(t => {
      //       return { tag: t, priority: tagPriorities[t] ? tagPriorities[t] : 'low' };
      //     })
      //   });
      // });

      // const decryptData: any[] = [];
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

  click(registry: any) {
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
}
