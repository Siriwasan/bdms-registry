import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { environment } from '../../../../environments/environment';

import { CathPci50Model } from './cath-pci50.model';
import { tagConditions } from './cath-pci50.tag';
import { RegistryModel } from '../registry.model';
import { Moment, utc } from 'moment';
import { Staff } from '../../staff/staff.model';

const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';
const DB_COLLECTION = 'CathPci50';

@Injectable()
export class CathPci50Service implements OnDestroy {
  // currentForm: ACSx290Form;
  private subscriptions: Subscription[] = [];

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public async createForm(data: CathPci50Model): Promise<string> {
    // tslint:disable: no-string-literal
    const registryId = await this.generateRegistryId(data.sectionB['HospName']);
    data.sectionA['registryId'] = registryId;
    // tslint:enable: no-string-literal

    await this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .set(data);

    const registry = this.createRegistryModel(registryId, data);
    await this.db
      .collection(DB_REGISTRY)
      .doc(registryId)
      .set(registry);

    return registryId; // Registry Id
  }

  public async updateForm(registryId: string, data: CathPci50Model) {
    await this.db
      .collection(DB_COLLECTION)
      .doc(registryId)
      .update(data);

    const registry = this.createRegistryModel(registryId, data);
    this.db.doc(DB_REGISTRY + `/${registryId}`).update(registry);
  }

  private generateRegistryId(hospitalId: string): Promise<string> {
    const year = new Date()
      .getFullYear()
      .toString()
      .substr(-2);
    const prefix = 'PCI-' + hospitalId + '-' + year;

    return new Promise<string>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<CathPci50Model>(DB_COLLECTION, ref =>
            ref
              .orderBy('sectionA.registryId', 'desc')
              .startAt(prefix + '\uf8ff')
              .endAt(prefix)
              .limit(1)
          )
          .valueChanges()
          .subscribe(
            (data: CathPci50Model[]) => {
              if (data.length === 0) {
                resolve(prefix + '001');
              } else {
                // tslint:disable-next-line: no-string-literal
                const lastId = data[0].sectionA['registryId'] as string;
                let index = +lastId.split(prefix)[1];
                const nextId = (++index).toString().padStart(3, '0');

                resolve(prefix + nextId); // first result of query [0]
              }
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  private createRegistryModel(regisId: string, data: CathPci50Model): RegistryModel {
    const complete = Math.round((data.completion.summary.valid / data.completion.summary.total) * 100);

    // tslint:disable: no-string-literal
    return {
      registryId: regisId,
      hospitalId: data.sectionB['HospName'],
      hn: data.sectionA['HN'],
      an: data.sectionA['AN'],
      firstName: data.sectionA['FirstName'],
      lastName: data.sectionA['LastName'],
      age: data.sectionA['Age'],
      baseDbId: data.detail.baseDbId,
      baseDb: data.detail.baseDb,
      addendum: data.detail.addendum,
      completion: complete,
      tags: this.createTags(data),
      modifiedAt: data.detail.modifiedAt
    };
    // tslint:enable: no-string-literal
  }

  public createTags(data: CathPci50Model): string[] {
    const tags: string[] = [];

    tagConditions.forEach(con => {
      if (con.values.includes(data[con.section][con.control])) {
        tags.push(con.tag);
      }
    });

    // tslint:disable: no-string-literal
    const procDate = utc(data.sectionE['ProcedureStartDateTime']);

    data.sectionM['FollowUps'].forEach(d => {
      const fuDate = utc(d['FU_AssessmentDate']);
      const period = this.getFollowUpPeriod(procDate, fuDate);
      if (period !== '') {
        tags.push(period);
      }

      if (d['FU_Status'] === 'Deceased') {
        tags.push('Dead');
      } else if (d['FU_Status'] === 'Lost to Follow-up') {
        tags.push('Lost');
      }
    });
    // tslint:enable: no-string-literal

    return tags;
  }

  private getFollowUpPeriod(procDate: Moment, fuDate: Moment): string {
    let period = '';

    if (!procDate.isValid() || !fuDate.isValid()) {
      return period;
    }

    const dateDiff = fuDate.diff(procDate, 'days', false);

    if (dateDiff <= 34) {
      period = '30 d';
    } else {
      const years = Math.ceil((dateDiff - 60) / 365);
      period = `${years} y`;
    }

    return period;
  }

  public getForm(registryId: string): Promise<CathPci50Model> {
    return new Promise<CathPci50Model>((resolve, reject) => {
      this.subscriptions.push(
        this.db
          .collection<CathPci50Model>(DB_COLLECTION)
          .doc(registryId)
          .valueChanges()
          .subscribe(
            (dc: any) => {
              resolve(dc);
            },
            error => {
              reject(error);
            }
          )
      );
    });
  }

  public checkNeededDataCompletion(data: CathPci50Model): string {
    let alert = '';
    // tslint:disable: no-string-literal
    const neededData = [
      [data.sectionA['HN'], '<li>HN</li>'],
      [data.sectionA['AN'], '<li>AN</li>'],
      [data.sectionA['FirstName'], '<li>First Name</li>'],
      [data.sectionA['LastName'], '<li>Last Name</li>'],
      [data.sectionB['HospName'], '<li>Hospital</li>']
    ];
    // tslint:enable: no-string-literal

    neededData.forEach(d => {
      if (this.isNullorEmpty(d[0])) {
        alert += d[1];
      }
    });

    return alert;
  }

  private isNullorEmpty(data: any): boolean {
    return !data || data.trim() === '';
  }

  public encryptSensitiveData(data: CathPci50Model) {
    // tslint:disable: no-string-literal
    data.sectionA['HN'] = this.encrypt(data.sectionA['HN']);
    data.sectionA['AN'] = this.encrypt(data.sectionA['AN']);
    data.sectionA['LastName'] = this.encrypt(data.sectionA['LastName']);
    data.sectionA['FirstName'] = this.encrypt(data.sectionA['FirstName']);
    data.sectionA['MidName'] = this.encrypt(data.sectionA['MidName']);
    data.sectionA['DOB'] = this.encrypt(data.sectionA['DOB']);
    data.sectionA['SSN'] = this.encrypt(data.sectionA['SSN']);
    data.sectionA['ZipCode'] = this.encrypt(data.sectionA['ZipCode']);
    // tslint:enable: no-string-literal
  }

  public decryptSenitiveData(data: CathPci50Model) {
    // tslint:disable: no-string-literal
    data.sectionA['HN'] = this.decrypt(data.sectionA['HN']);
    data.sectionA['AN'] = this.decrypt(data.sectionA['AN']);
    data.sectionA['LastName'] = this.decrypt(data.sectionA['LastName']);
    data.sectionA['FirstName'] = this.decrypt(data.sectionA['FirstName']);
    data.sectionA['MidName'] = this.decrypt(data.sectionA['MidName']);
    data.sectionA['DOB'] = this.decrypt(data.sectionA['DOB']);
    data.sectionA['SSN'] = this.decrypt(data.sectionA['SSN']);
    data.sectionA['ZipCode'] = this.decrypt(data.sectionA['ZipCode']);
    // tslint:enable: no-string-literal
  }

  private encrypt(source: string): string {
    return CryptoJS.AES.encrypt(source, environment.appKey).toString();
  }

  private decrypt(source: string): string {
    return CryptoJS.AES.decrypt(source, environment.appKey).toString(CryptoJS.enc.Utf8);
  }

  getStaffs(): Observable<Staff[]> {
    return this.db.collection<Staff>(DB_STAFF).valueChanges();
  }
}
