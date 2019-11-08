import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Staff } from '../staff/staff.model';
import { RegistryModel } from '../registry/registry.model';
import { ACSx290Model } from '../registry/acsx290/acsx290.model';
import { CathPci50Model } from '../registry/cath-pci50/cath-pci50.model';
import { ACSx290Service } from '../registry/acsx290/acsx290.service';
import { CathPci50Service } from '../registry/cath-pci50/cath-pci50.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

const DB_ACSX = 'ACSx290';
const DB_CATHPCI = 'CathPci50';
const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ToolsService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private acsx290Service: ACSx290Service,
    private cathPci50Service: CathPci50Service,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  loadStaffs(): Promise<Staff[]> {
    return this.db
      .collection<Staff>(DB_STAFF)
      .valueChanges()
      .pipe(
        map(data =>
          data.map(d => {
            d.createdAt =
              d.createdAt !== null ? (d.createdAt as firebase.firestore.Timestamp).toDate().toISOString() : null;
            d.modifiedAt =
              d.modifiedAt !== null ? (d.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString() : null;
            return d;
          })
        ),
        take(1)
      )
      .toPromise();
  }

  async dumpStaffs(data: Staff[]) {
    await data
      .map(d => {
        d.createdAt = firebase.firestore.Timestamp.fromDate(new Date(d.createdAt));
        d.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(d.modifiedAt));

        // staff.staffId = this.migrateStaffId(staff.staffId);
        // staff.createdBy = this.migrateStaffId(staff.createdBy);
        // staff.modifiedBy = this.migrateStaffId(staff.modifiedBy);
        // d.secondHospIds = [];
        return d;
      })
      .forEach(d => {
        this.db
          .collection<Staff>(DB_STAFF)
          .doc(d.staffId)
          .set(d);
      });
  }

  loadRegistries(): Promise<RegistryModel[]> {
    return this.db
      .collection<RegistryModel>(DB_REGISTRY)
      .valueChanges()
      .pipe(
        map(data =>
          data.map(d => {
            d.modifiedAt =
              d.modifiedAt !== null ? (d.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString() : null;
            return d;
          })
        ),
        take(1)
      )
      .toPromise();
  }

  async dumpRegistries(data: RegistryModel[]) {
    console.log(data);

    await data
      .map(d => {
        d.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(d.modifiedAt));

        // registry.baseDbId = 'ACSx290';
        // d.tags = [];
        return d;
      })
      .forEach(d => {
        this.db
          .collection<RegistryModel>(DB_REGISTRY)
          .doc(d.registryId)
          .set(d);
      });
  }

  loadACSx290s(): Promise<ACSx290Model[]> {
    return this.db
      .collection<ACSx290Model>(DB_ACSX)
      .valueChanges()
      .pipe(
        map(data =>
          data.map(d => {
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

  async dumpACSx290s(data: ACSx290Model[]) {
    console.log(data);

    await data
      .map(d => {
        d.detail.createdAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.createdAt));
        d.detail.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.modifiedAt));
        d.detail.deletedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.deletedAt));

        // acsx.detail.baseDbId = 'ACSx290';
        // acsx.detail.createdBy = this.migrateStaffId(acsx.detail.createdBy);
        // acsx.detail.modifiedBy = this.migrateStaffId(acsx.detail.modifiedBy);
        // acsx.detail.deletedBy = this.migrateStaffId(acsx.detail.deletedBy);
        // // tslint:disable: no-string-literal
        // acsx.sectionI['SurgeonId'] = this.migrateStaffId(acsx.sectionI['SurgeonId']);
        // acsx.sectionI['Assist1Id'] = this.migrateStaffId(acsx.sectionI['Assist1Id']);
        // acsx.sectionI['Assist2Id'] = this.migrateStaffId(acsx.sectionI['Assist2Id']);
        // acsx.sectionI['Assist3Id'] = this.migrateStaffId(acsx.sectionI['Assist3Id']);
        // acsx.sectionI['Assist4Id'] = this.migrateStaffId(acsx.sectionI['Assist4Id']);
        // acsx.sectionI['Assist5Id'] = this.migrateStaffId(acsx.sectionI['Assist5Id']);
        // acsx.sectionI['Assist6Id'] = this.migrateStaffId(acsx.sectionI['Assist6Id']);
        // acsx.sectionI['Anesth1Id'] = this.migrateStaffId(acsx.sectionI['Anesth1Id']);
        // acsx.sectionI['Anesth2Id'] = this.migrateStaffId(acsx.sectionI['Anesth2Id']);
        // acsx.sectionI['Scrub1Id'] = this.migrateStaffId(acsx.sectionI['Scrub1Id']);
        // acsx.sectionI['Scrub2Id'] = this.migrateStaffId(acsx.sectionI['Scrub2Id']);
        // acsx.sectionI['Scrub3Id'] = this.migrateStaffId(acsx.sectionI['Scrub3Id']);
        // acsx.sectionI['Scrub4Id'] = this.migrateStaffId(acsx.sectionI['Scrub4Id']);
        // acsx.sectionI['CTT1Id'] = this.migrateStaffId(acsx.sectionI['CTT1Id']);
        // acsx.sectionI['CTT2Id'] = this.migrateStaffId(acsx.sectionI['CTT2Id']);
        // acsx.sectionI['CTT3Id'] = this.migrateStaffId(acsx.sectionI['CTT3Id']);
        // acsx.sectionI['CTT4Id'] = this.migrateStaffId(acsx.sectionI['CTT4Id']);
        // // tslint:enable: no-string-literal

        return d;
      })
      .forEach(d => {
        this.db
          .collection<ACSx290Model>(DB_ACSX)
          // tslint:disable-next-line: no-string-literal
          .doc(d.sectionA['registryId'])
          .set(d);
      });
  }

  loadCathPci50s(): Promise<CathPci50Model[]> {
    return this.db
      .collection<CathPci50Model>(DB_CATHPCI)
      .valueChanges()
      .pipe(
        map(data =>
          data.map(d => {
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

  async dumpCathPci50s(data: CathPci50Model[]) {
    console.log(data);

    await data
      .map(d => {
        d.detail.createdAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.createdAt));
        d.detail.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.modifiedAt));
        d.detail.deletedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.deletedAt));

        return d;
      })
      .forEach(d => {
        this.db
          .collection<CathPci50Model>(DB_CATHPCI)
          // tslint:disable-next-line: no-string-literal
          .doc(d.sectionA['registryId'])
          .set(d);
      });
  }

  private migrateStaffId(oldId: string): string {
    if (!oldId || oldId.trim() === '') {
      return null;
    }

    if (oldId === 'admin') {
      return '00001';
    }

    const oldIdList = [
      'CS009',
      'CS001',
      'CS002',
      'CS003',
      'CS004',
      'CS005',
      'CS006',
      'CS007',
      'CS008',
      'CS010',
      'CS011',
      'CS012',
      'AN001',
      'AN002',
      'RN001',
      'RN002',
      'RN003',
      'RN004',
      'RN005',
      'CT001',
      'CT002',
      'CT003',
      'CT004',
      'CT005'
    ];
    return (oldIdList.indexOf(oldId) + 1).toString().padStart(5, '0');
  }

  public exportAsExcelFile(json: SampleModel[], excelFileName: string): void {
    let index = 1;

    const worksheet1data = JSON.parse(JSON.stringify(json)) as SampleModel[];
    worksheet1data.forEach(o => {
      o.cities.forEach((v, i) => {
        o['city' + (i + 1).toString().padStart(2, '0')] = v;
      });
      delete o.cities;

      o.movies.forEach((v, i) => {
        o['movie' + (i + 1).toString().padStart(2, '0')] = v;
      });
      delete o.movies;

      delete o.cars;
    });

    const worksheet2data = [];
    json.forEach(o => o.cities.forEach(i => worksheet2data.push({ uniqueId: index++, id: o.id, city: i })));

    index = 1;
    const worksheet3data = [];
    json.forEach(o => o.movies.forEach(i => worksheet3data.push({ uniqueId: index++, id: o.id, movie: i })));

    index = 1;
    const worksheet4data = [];
    json.forEach(o =>
      o.cars.forEach(i => worksheet4data.push({ uniqueId: index++, id: o.id, brand: i.brand, color: i.color }))
    );

    const worksheet5data = [];

    let now = moment();
    for (let i = 0; i < 20; i++) {
      worksheet5data.push({
        'toISOString()': now.toISOString(),
        'toISOString(true)': now.toISOString(true),
        'toString()': now.toString(),
        'tocaleString()': now.toLocaleString(),
        'format(YYYY-MM-DDTHH:mm:ssZ)': now.format('YYYY-MM-DDTHH:mm:ssZ'),
        'format(YYYY-MM-DDTHH:mm:ss)': now.format('YYYY-MM-DDTHH:mm:ss'),
        'format(YYYY-MM-DD)': now.format('YYYY-MM-DD'),
        'format(HH:mm:ss)': now.format('HH:mm:ss')
      });
      now = now.add(1, 'day');
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheet1data);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheet2data);
    const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheet3data);
    const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheet4data);
    const worksheet5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheet5data);

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet, cities: worksheet2, movies: worksheet3, cars: worksheet4, date: worksheet5 },
      SheetNames: ['data', 'cities', 'movies', 'cars', 'date']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  rebuildACSx290Tags() {
    this.db
      .collection<ACSx290Model>(DB_ACSX)
      .valueChanges()
      .subscribe(data => {
        data.forEach(d => {
          // tslint:disable-next-line: no-string-literal
          const id = d.sectionA['registryId'];
          const t = this.acsx290Service.createTags(d);

          this.db.doc(DB_REGISTRY + `/${id}`).update({ tags: t });
        });
        console.log(`finished rebuild ${data.length} tags`);
      });
  }

  rebuildCathPci50Tags() {
    this.db
      .collection<CathPci50Model>(DB_CATHPCI)
      .valueChanges()
      .subscribe(data => {
        data.forEach(d => {
          // tslint:disable-next-line: no-string-literal
          const id = d.sectionA['registryId'];
          const t = this.cathPci50Service.createTags(d);

          this.db.doc(DB_REGISTRY + `/${id}`).update({ tags: t });
        });
        console.log(`finished rebuild ${data.length} tags`);
      });
  }

  deleteStaff() {
    this.deleteDocumentInCollection(DB_STAFF);
  }

  deleteRegistry() {
    this.deleteDocumentInCollection(DB_REGISTRY);
  }

  deleteACSx290() {
    this.deleteDocumentInCollection(DB_ACSX);
  }

  deleteCathPci50() {
    this.deleteDocumentInCollection(DB_CATHPCI);
  }

  async deleteDocumentInCollection(collection: string) {
    const batch = this.db.firestore.batch();

    const qry = await this.db.collection(collection).ref.get();

    qry.forEach(doc => {
      console.log(`deleting ${collection} ${doc.id}`);
      batch.delete(doc.ref);
    });

    batch
      .commit()
      .then(res => this.snackBar.open(`Delete ${collection} successful`, null, { duration: 2000 }))
      .catch(err => this.snackBar.open(`Delete ${collection} failed: ${err}`, null, { duration: 2000 }));
  }
}
