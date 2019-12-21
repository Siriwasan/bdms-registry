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

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
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
              d.createdAt !== null
                ? (d.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
            d.modifiedAt =
              d.modifiedAt !== null
                ? (d.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
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

        // d.staffId = this.migrateStaffId(d.staffId);
        // d.createdBy = this.migrateStaffId(d.createdBy);
        // d.modifiedBy = this.migrateStaffId(d.modifiedBy);
        // d.secondHospIds = [];
        return d;
      })
      .forEach(async d => {
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
              d.modifiedAt !== null
                ? (d.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
                : null;
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
        // d.detail.deletedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.deletedAt));

        // // tslint:disable: no-string-literal
        // d.sectionI['SurgeonId'] = this.migrateStaffId(d.sectionI['SurgeonId']);
        // d.sectionI['Assist1Id'] = this.migrateStaffId(d.sectionI['Assist1Id']);
        // d.sectionI['Assist2Id'] = this.migrateStaffId(d.sectionI['Assist2Id']);
        // d.sectionI['Assist3Id'] = this.migrateStaffId(d.sectionI['Assist3Id']);
        // d.sectionI['Assist4Id'] = this.migrateStaffId(d.sectionI['Assist4Id']);
        // d.sectionI['Assist5Id'] = this.migrateStaffId(d.sectionI['Assist5Id']);
        // d.sectionI['Assist6Id'] = this.migrateStaffId(d.sectionI['Assist6Id']);
        // d.sectionI['Anesth1Id'] = this.migrateStaffId(d.sectionI['Anesth1Id']);
        // d.sectionI['Anesth2Id'] = this.migrateStaffId(d.sectionI['Anesth2Id']);
        // d.sectionI['Scrub1Id'] = this.migrateStaffId(d.sectionI['Scrub1Id']);
        // d.sectionI['Scrub2Id'] = this.migrateStaffId(d.sectionI['Scrub2Id']);
        // d.sectionI['Scrub3Id'] = this.migrateStaffId(d.sectionI['Scrub3Id']);
        // d.sectionI['Scrub4Id'] = this.migrateStaffId(d.sectionI['Scrub4Id']);
        // d.sectionI['CTT1Id'] = this.migrateStaffId(d.sectionI['CTT1Id']);
        // d.sectionI['CTT2Id'] = this.migrateStaffId(d.sectionI['CTT2Id']);
        // d.sectionI['CTT3Id'] = this.migrateStaffId(d.sectionI['CTT3Id']);
        // d.sectionI['CTT4Id'] = this.migrateStaffId(d.sectionI['CTT4Id']);
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
        // d.detail.deletedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.deletedAt));

        // // tslint:disable: no-string-literal
        // d.sectionB['AdmProvider'] = this.migrateStaffId(d.sectionB['AdmProvider']);
        // d.sectionB['AttProvider'] = this.migrateStaffId(d.sectionB['AttProvider']);
        // d.sectionE['DCathProvider'] = this.migrateStaffId(d.sectionE['DCathProvider']);
        // d.sectionE['PCIProvider'] = this.migrateStaffId(d.sectionE['PCIProvider']);
        // d.sectionE['PCIProvider2'] = this.migrateStaffId(d.sectionE['PCIProvider2']);
        // d.sectionL['DCProvider'] = this.migrateStaffId(d.sectionL['DCProvider']);
        // // tslint:enable: no-string-literal

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

    const oldIdList = [
      { new: '0vc6tBiWWw5XeW6agKd3', old: '00063' },
      { new: '10l0ghBcIjOyr6Ro2jVl', old: '00064' },
      { new: '1Y7f2yXdk8wLdM5Kq2Lf', old: '00052' },
      { new: '35xMMEDw86fOdIN96GTw', old: '00092' },
      { new: '3BOf2Hce7u0X7l4dsPu9', old: '00023' },
      { new: '3jiz8Qf2URiYTofPX1zl', old: '00079' },
      { new: '3kdSttzJG1yjUJkwMTI1', old: '00031' },
      { new: '3udqTdnuBGuY8Nuy5WGX', old: '00103' },
      { new: '4jge9myt9qveF5LRRrUW', old: '00053' },
      { new: '4oLelEDPeasPUaQqU7RX', old: '00025' },
      { new: '5DRdgH9GGlTMaERtPNAD', old: '00027' },
      { new: '6g740BgB6pnpQ9A4Idbj', old: '00040' },
      { new: '7YuSq797vdQkbzFyvlsS', old: '00059' },
      { new: '8NvOqjzKC8XmZTZRvNCH', old: '00067' },
      { new: '8mzEvSG6nkePMT7ahfNg', old: '00042' },
      { new: '8nqWLVTGGH8ZWv0zCESu', old: '00001' },
      { new: '8rdfHnf31aGVg2mtX4xY', old: '00039' },
      { new: 'AJrCzd1PeNogVxfHRTgI', old: '00076' },
      { new: 'BRO5PlXV0gUuAZCyXgW7', old: '00061' },
      { new: 'BjX5vhibrURdCveEBt3q', old: '00094' },
      { new: 'Bzwp2lffAb9OXP2j29Rr', old: '00038' },
      { new: 'CB07OQ5KBEuahdxWVQSR', old: '00087' },
      { new: 'E1rJN6jhoiZ3en6uTemU', old: '00041' },
      { new: 'E3fFBs9g1g1XBXE8Ntqe', old: '00062' },
      { new: 'G0l7ITY85R0gf4VmAk6f', old: '00098' },
      { new: 'GymywppMg2AoicW28Fek', old: '00075' },
      { new: 'InDDyi4yhbOeznJn6DiV', old: '00020' },
      { new: 'J60w8MZikuoU6g71ks1D', old: '00035' },
      { new: 'JnaglLEbvbLCy4Rg9vBU', old: '00003' },
      { new: 'JncoCN3P8Sojuws6JPOv', old: '00047' },
      { new: 'Jr3pyyCBGEa6UO3tK6mT', old: '00097' },
      { new: 'L3OuTX6jP6wqNANa3mrk', old: '00033' },
      { new: 'LUdXDiA98fStMtKNpBrt', old: '00082' },
      { new: 'LaUhX96eok35p3RPxlTe', old: '00010' },
      { new: 'MHdFXZ4Vxdm3jMz3KWz8', old: '00091' },
      { new: 'NaNnEM1J6ZuKmXcjTVXU', old: '00101' },
      { new: 'NzkddA9RZpXP9ZaPaQEH', old: '00074' },
      { new: 'OgVzESM4ki1Zma5URgO1', old: '00011' },
      { new: 'OzaXS7fSOQtAUglR5Hap', old: '00043' },
      { new: 'Q3xm0F8myVFDp5J3mCqT', old: '00095' },
      { new: 'QWmUBNRDNuiYzsHmpcLP', old: '00068' },
      { new: 'R88ItfCAsXGCNGXnIZ0v', old: '00030' },
      { new: 'ROpuKRor7Nlg70tAig2T', old: '00084' },
      { new: 'UKDrg0VrgOtl2vmsrig5', old: '00013' },
      { new: 'UVbfNYldTiPoaYAFTvso', old: '00022' },
      { new: 'UsHOa5zHq9QYgXW4Ejze', old: '00018' },
      { new: 'X6NkW4cl049Obu058bi2', old: '00060' },
      { new: 'XPNuTMwpBrrFTNXydXXC', old: '00007' },
      { new: 'XiP3hjxoHSSTwHZjM2IJ', old: '00058' },
      { new: 'aWquL3UPteit3twyWWWa', old: '00100' },
      { new: 'bUqEA68NE4vgwHppWfa1', old: '00056' },
      { new: 'bV8VEw4fYzGio9ndW1u4', old: '00021' },
      { new: 'bfJBmZTECojVxMObXT7s', old: '00049' },
      { new: 'biKwuwcrPejffFIHhjGi', old: '00096' },
      { new: 'c2UodDPttFkvhMdk0HlJ', old: '00069' },
      { new: 'cR7VmJWrOtFX5CKnVvrM', old: '00004' },
      { new: 'chOzT28w940mkTkgzIpW', old: '00086' },
      { new: 'diNcVgoPrVxs4eg329g6', old: '00015' },
      { new: 'drahZApYKAeqOKv1c33e', old: '00006' },
      { new: 'dtdYfrflNa7ihX3C0dx2', old: '00054' },
      { new: 'e8EQiF6uDW3aHTwFZIlL', old: '00089' },
      { new: 'eWvC6E0FxrMhki69c6pd', old: '00077' },
      { new: 'f9xnVr8r3tkK5OytQpWe', old: '00036' },
      { new: 'fL2FbZ8NdgxtG82T0R0C', old: '00104' },
      { new: 'g8BlaVczu5C5hCVmdiY5', old: '00037' },
      { new: 'gJrPwr6mjGF6x8k3Rlg0', old: '00055' },
      { new: 'hbIRuJwMgVvGpCWUJkwc', old: '00085' },
      { new: 'hryRFbHamThQ6hnsFSie', old: '00002' },
      { new: 'hwFqVaiQZ211ueCsZIWt', old: '00070' },
      { new: 'iGkgQWpPiymLrxqxouSt', old: '00078' },
      { new: 'iaYdtUeQARhYep28tgH4', old: '00066' },
      { new: 'inMNXO24SZXtzC4IAZKJ', old: '00057' },
      { new: 'jmdFKics3fquBENM4wW4', old: '00102' },
      { new: 'jyGoRgJQe7mWRu0xRcII', old: '00019' },
      { new: 'kCfcjZiNmn0KmB32lKVf', old: '00088' },
      { new: 'kQq8lS6R3Rye7uc1SYLr', old: '00048' },
      { new: 'kuC2Df4q59l98n5w9UWc', old: '00016' },
      { new: 'l2pf3OuH5CZtM0iEb8nT', old: '00014' },
      { new: 'lRP2i0qKBYoSosPHU0ho', old: '00080' },
      { new: 'mUh8B5QpZXuJWUeYAGAX', old: '00044' },
      { new: 'n0VDK8cTWRSSqwlcZjmI', old: '00045' },
      { new: 'pXgynvoLeaNkWfqE18Hh', old: '00065' },
      { new: 'qfxs4JjFj05DSmQ0dpdy', old: '00034' },
      { new: 'stC6iXyYVraCEze2XoBB', old: '00050' },
      { new: 'tCMTod5KPQdL446DOCLV', old: '00081' },
      { new: 'tYvKpBvsYJ7wvfqQFRgX', old: '00051' },
      { new: 'twGwZP4YQANhErtQ5PXF', old: '00008' },
      { new: 'uXfwzHuuG0rRdTgHdTl7', old: '00073' },
      { new: 'uhTI5hTLsDuc8mwwPErV', old: '00090' },
      { new: 'uzIhYkUrHDw6bsUorDfX', old: '00099' },
      { new: 'uzznUoT3gPuWxPe4vA0V', old: '00026' },
      { new: 'v8uRnMHIcCyDrPTZiFUc', old: '00105' },
      { new: 'vEWLnTO1zgeawMsbBUK0', old: '00046' },
      { new: 'vPlZ5AoXyBF8sh5JPGUS', old: '00072' },
      { new: 'wR4DTCpSm4cDE8obLuLP', old: '00028' },
      { new: 'wTTT5kF4cJjUgfsRQgoy', old: '00083' },
      { new: 'wcXekD1QSxFStUyOeArg', old: '00017' },
      { new: 'x9AF1d5XVCoGhjJSFiCe', old: '00029' },
      { new: 'xJBZh3apXez8l6gGph5t', old: '00005' },
      { new: 'yV5qfoqqOTnovEP1dFCd', old: '00071' },
      { new: 'ycBngtHHLObLaQ0ptEXJ', old: '00093' },
      { new: 'zItRtTdl41Mj3APSKHrM', old: '00032' },
      { new: 'zRUhiFPOJ35npB1JaUxH', old: '00012' },
      { new: 'ze5ioFlKksgKqK6dV7s0', old: '00009' },
      { new: 'znmCuZE2MQ7cw12yGiNW', old: '00024' }
    ];
    const mapping = oldIdList.find(a => a.old === oldId);
    return mapping ? mapping.new : null;
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
    json.forEach(o =>
      o.cities.forEach(i => worksheet2data.push({ uniqueId: index++, id: o.id, city: i }))
    );

    index = 1;
    const worksheet3data = [];
    json.forEach(o =>
      o.movies.forEach(i => worksheet3data.push({ uniqueId: index++, id: o.id, movie: i }))
    );

    index = 1;
    const worksheet4data = [];
    json.forEach(o =>
      o.cars.forEach(i =>
        worksheet4data.push({ uniqueId: index++, id: o.id, brand: i.brand, color: i.color })
      )
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
      Sheets: {
        data: worksheet,
        cities: worksheet2,
        movies: worksheet3,
        cars: worksheet4,
        date: worksheet5
      },
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

  async deleteStaff() {
    await this.deleteDocumentInCollection(DB_STAFF);
  }

  async deleteRegistry() {
    await this.deleteDocumentInCollection(DB_REGISTRY);
  }

  async deleteACSx290() {
    await this.deleteDocumentInCollection(DB_ACSX);
  }

  async deleteCathPci50() {
    await this.deleteDocumentInCollection(DB_CATHPCI);
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
      .catch(err =>
        this.snackBar.open(`Delete ${collection} failed: ${err}`, null, { duration: 2000 })
      );
  }

  async migrateACSx290s(data: ACSx290Model[]) {
    console.log(data);

    await data
      .map(d => {
        d.detail.createdAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.createdAt));
        d.detail.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.modifiedAt));
        d.detail.deletedAt = null;
        return d;
      })
      .forEach(async d => {
        const docRef = await this.db.collection<ACSx290Model>(DB_ACSX).add(d);
        const registryId = docRef.id;
        this.db.doc(DB_ACSX + `/${registryId}`).update({ 'sectionA.registryId': registryId });

        const registry = this.acsx290Service.createRegistryModel(registryId, d);
        await this.db
          .collection(DB_REGISTRY)
          .doc(registryId)
          .set(registry);
      });
  }

  async migrateCathPci50s(data: CathPci50Model[]) {
    console.log(data);

    await data
      .map(d => {
        d.detail.createdAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.createdAt));
        d.detail.modifiedAt = firebase.firestore.Timestamp.fromDate(new Date(d.detail.modifiedAt));
        d.detail.deletedAt = null;
        return d;
      })
      .forEach(async d => {
        const docRef = await this.db.collection<CathPci50Model>(DB_CATHPCI).add(d);
        const registryId = docRef.id;
        this.db.doc(DB_CATHPCI + `/${registryId}`).update({ 'sectionA.registryId': registryId });

        const registry = this.cathPci50Service.createRegistryModel(registryId, d);
        await this.db
          .collection(DB_REGISTRY)
          .doc(registryId)
          .set(registry);
      });
  }

  // chekcStaffs() {
  //   return this.db
  //     .collection<Staff>(DB_STAFF)
  //     .valueChanges()
  //     .pipe(
  //       map(data =>
  //         data.map(d => {
  //           const ids = d.staffId.split('-');
  //           return { new: ids[0], old: ids[1] };
  //         })
  //       ),
  //       take(1)
  //     )
  //     .toPromise();
  // }
}
