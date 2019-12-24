import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatInput } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { RegistryModel } from '../registry.model';
import { RegistryService } from '../registry.service';
import { FileService } from '../../../shared/services/file.service';

import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

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
  // @Input() databaseId: MatInput;

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  avHospitals: Auth.Hospital[];
  acsx290Data: RegistryModel[];
  dbIdResult: string;

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

      this.acsx290Data = await this.registryService.loadRegistries('ACSx290', this.avHospitals);

      this.store.dispatch(new UI.StopLoading());
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  click(registryId: string) {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/acsx290', registryId]);
    }, 300);
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

  searchDatabaseId(id: string) {
    const registry = this.acsx290Data.find(d => d.registryId === id.trim());

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
