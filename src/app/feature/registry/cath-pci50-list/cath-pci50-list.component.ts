import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { RegistryService } from '../registry.service';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { User } from '../../../../app/core/auth/user.model';
import * as Auth from '../../../core/auth/auth.data';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RegistryModel } from '../registry.model';

@Component({
  selector: 'app-cath-pci50-list',
  templateUrl: './cath-pci50-list.component.html',
  styleUrls: ['./cath-pci50-list.component.scss'],
  providers: [RegistryService]
})
export class CathPci50ListComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  avHospitals: Auth.Hospital[];
  cathPci50Data: RegistryModel[];
  dbIdResult: string;

  barClicked = false;
  filterString: string = null;

  constructor(
    private registryService: RegistryService,
    private router: Router,
    private store: Store<fromRoot.State>,
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

      this.cathPci50Data = await this.registryService.loadRegistries('CathPci50', this.avHospitals);

      this.store.dispatch(new UI.StopLoading());
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  click(registryId: string) {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/cath-pci50', registryId]);
    }, 300);
  }

  create() {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/cath-pci50']);
    }, 300);
  }

  async export(selectedHospitals: string[]) {
    const data = await this.registryService.loadCathPci50sForExport(selectedHospitals);
    this.registryService.exportCathPci50AsExcelFile(data, 'cathpci', this.user);
    console.log('export cathpci ' + data.length + ' records');
  }

  searchDatabaseId(id: string) {
    const registry = this.cathPci50Data.find(d => d.registryId === id.trim());

    this.dbIdResult = registry
      ? `HN: ${this.decrypt(registry.hn)}  AN: ${this.decrypt(registry.an)}  Name: ${this.decrypt(
          registry.firstName
        )} ${this.decrypt(registry.lastName)}`
      : 'Not found!';
  }

  private decrypt(source: string): string {
    return source
      ? CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8)
      : null;
  }
}
