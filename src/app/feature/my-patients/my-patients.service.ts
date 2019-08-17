import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Registry } from '../registry/registry.model';
import { AuthService } from '../../../app/core/auth/auth.service';
import { ACSx290Form } from '../registry/acsx290/acsx290.model';

const DB_REGISTRY = 'Registry';

@Injectable()
export class MyPatientsService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public async loadMyPatients(staffId: string): Promise<Registry[]> {
    const acsxs = await this.authService.getAvailableRegistries(staffId);

    return new Promise((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<Registry>(DB_REGISTRY)
          .valueChanges()
          .pipe(map(data => data.filter(a => acsxs.indexOf(a.registryId) >= 0)))
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public async loadMyACSx290sForExport(staffId: string): Promise<ACSx290Form[]> {
    const acsxs = await this.authService.getAvailableRegistries(staffId);

    return new Promise<ACSx290Form[]>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<ACSx290Form>('ACSx290')
          .valueChanges()
          .pipe(
            // tslint:disable-next-line: no-string-literal
            map(data => data.filter(a => acsxs.indexOf(a.sectionA['registryId']) >= 0)),
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
            )
          )
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }
}
