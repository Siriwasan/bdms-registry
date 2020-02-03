import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

import { MyPatientsService } from './my-patients.service';
import { RegistryModel } from '../registry/registry.model';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../app/core/auth/user.model';
import { FileService } from '../../../app/shared/services/file.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegistryService } from '../registry/registry.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
  providers: [RegistryService, MyPatientsService]
})
export class MyPatientsComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  user: User;
  private userSubscription: Subscription;

  myACSxData: RegistryModel[];
  myCathPciData: RegistryModel[];

  constructor(
    private registryService: RegistryService,
    private myPatientsService: MyPatientsService,
    private store: Store<fromRoot.State>,
    private fileService: FileService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.store.dispatch(new UI.StartLoading());
    this.user$ = this.store.select(fromRoot.getUser);
    // this.userSubscription = this.user$.subscribe(user => {
    //   this.user = user;
    // });
    this.user = await this.user$.pipe(take(1)).toPromise();

    if (this.user && this.user.staff.registries.includes('ACSx290')) {
      this.myACSxData = await this.myPatientsService.loadMyACSx290s(this.user.staff.staffId);
    }

    if (this.user && this.user.staff.registries.includes('CathPci50')) {
      this.myCathPciData = await this.myPatientsService.loadMyCathPci50s(this.user.staff.staffId);
    }

    this.store.dispatch(new UI.StopLoading());
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }

  clickACSx(registryId: string) {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/acsx290', registryId]);
    }, 300);
  }

  clickCathPci(registryId: string) {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.router.navigate(['registry/cath-pci50', registryId]);
    }, 300);
  }

  async exportACSx() {
    const data = await this.myPatientsService.loadMyACSx290sForExport(this.user.staff.staffId);
    this.fileService.saveJSONtoCSV(data, 'my-acsx.csv');
    console.log('export acsx ' + data.length + ' records');
  }

  async exportCathPci() {
    const data = await this.myPatientsService.loadMyCathPci50sForExport(this.user.staff.staffId);
    this.registryService.exportCathPci50AsExcelFile(data, null, 'my-cathpci', this.user);
    console.log('export cathpci ' + data.length + ' records');
  }
}
