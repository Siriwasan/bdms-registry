import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';

import { RegistryService } from '../registry.service';

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
  displayedColumns: string[] = ['registryId', 'hn', 'name', 'age', 'tags', 'submitted', 'completion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;
  avHospitals: Auth.Hospital[];

  controlData: RegistryModel[];

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

      this.controlData = await this.registryService.loadRegistries('CathPci50', this.avHospitals);

      this.store.dispatch(new UI.StopLoading());
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  create() {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/cath-pci50']);
    }, 300);
  }

  async export() {
    const data = await this.registryService.loadCathPci50sForExport(this.avHospitals);
    this.registryService.exportCathPci50AsExcelFile(data, 'cathpci');
    console.log('export cathpci ' + data.length + ' records');
  }
}
