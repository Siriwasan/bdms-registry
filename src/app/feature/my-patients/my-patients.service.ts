import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { RegistryModel } from '../registry/registry.model';
import { AuthService } from '../../../app/core/auth/auth.service';
import { ACSx290Model } from '../registry/acsx290/acsx290.model';
import { CathPci50Model } from '../registry/cath-pci50/cath-pci50.model';

const DB_REGISTRY = 'Registry';

@Injectable()
export class MyPatientsService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  public async loadMyACSx290s(staffId: string): Promise<RegistryModel[]> {
    const acsxs = await this.authService.getAvailableACSx290s(staffId);

    return this.db
      .collection<RegistryModel>(DB_REGISTRY)
      .valueChanges()
      .pipe(
        map(data => data.filter(a => acsxs.includes(a.registryId))),
        take(1)
      )
      .toPromise();
  }

  public async loadMyCathPci50s(staffId: string): Promise<RegistryModel[]> {
    const acsxs = await this.authService.getAvailableCathPci50s(staffId);

    return this.db
      .collection<RegistryModel>(DB_REGISTRY)
      .valueChanges()
      .pipe(
        map(data => data.filter(a => acsxs.includes(a.registryId))),
        take(1)
      )
      .toPromise();
  }

  public async loadMyACSx290sForExport(staffId: string): Promise<ACSx290Model[]> {
    const acsxs = await this.authService.getAvailableACSx290s(staffId);

    return this.db
      .collection<ACSx290Model>('ACSx290')
      .valueChanges()
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map(data => data.filter(a => acsxs.includes(a.sectionA['registryId']))),
        map(data =>
          data.map(d => {
            // tslint:disable: no-string-literal
            delete d.sectionA['HN'];
            delete d.sectionA['AN'];
            delete d.sectionB['PatLName'];
            delete d.sectionB['PatFName'];
            delete d.sectionB['PatMName'];
            delete d.sectionB['DOB'];
            delete d.sectionB['SSN'];
            delete d.sectionB['PatAddr'];
            // tslint:enable: no-string-literal

            d.detail.createdAt =
              d.detail.createdAt !== null
                ? (d.detail.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
            d.detail.modifiedAt =
              d.detail.modifiedAt !== null
                ? (d.detail.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
            d.detail.deletedAt =
              d.detail.deletedAt !== null
                ? (d.detail.deletedAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;

            return d;
          })
        ),
        take(1)
      )
      .toPromise();
  }

  public async loadMyCathPci50sForExport(staffId: string): Promise<CathPci50Model[]> {
    const cathpci = await this.authService.getAvailableCathPci50s(staffId);

    return this.db
      .collection<CathPci50Model>('CathPci50')
      .valueChanges()
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map(data => data.filter(a => cathpci.includes(a.sectionA['registryId']))),
        map(data =>
          data.map(d => {
            // tslint:disable: no-string-literal
            delete d.sectionA['HN'];
            delete d.sectionA['AN'];
            delete d.sectionA['LastName'];
            delete d.sectionA['FirstName'];
            delete d.sectionA['MidName'];
            delete d.sectionA['DOB'];
            delete d.sectionA['SSN'];
            delete d.sectionA['ZipCode'];
            // tslint:enable: no-string-literal

            d.detail.createdAt =
              d.detail.createdAt !== null
                ? (d.detail.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
            d.detail.modifiedAt =
              d.detail.modifiedAt !== null
                ? (d.detail.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
            d.detail.deletedAt =
              d.detail.deletedAt !== null
                ? (d.detail.deletedAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;

            return d;
          })
        ),
        take(1)
      )
      .toPromise();
  }
}
