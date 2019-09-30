import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { RegistryModel } from './registry.model';
import { ACSx290Form } from './acsx290/acsx290.model';
import * as Auth from '../../core/auth/auth.data';
import { CathPci50Model } from './cath-pci50/cath-pci50.model';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const DB_COLLECTION = 'ACSx290';
const DB_CATHPCI = 'CathPci50';
const DB_REGISTRY = 'Registry';

@Injectable()
export class RegistryService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  //#region Cloud firestore
  public loadRegistries(registry: string, avHospitals: Auth.Hospital[]): Promise<RegistryModel[]> {
    return new Promise((resolve, reject) => {
      const registryList: Observable<RegistryModel[]>[] = [];
      avHospitals.forEach(hosp => {
        registryList.push(
          this.db
            .collection<RegistryModel>(DB_REGISTRY, ref =>
              ref.where('hospitalId', '==', hosp.id).where('baseDbId', '==', registry)
            )
            .valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(registryList)
          .pipe(map(arr => arr.reduce((acc, cur) => acc.concat(cur))))
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

  public loadACSx290sForExport(avHospitals: Auth.Hospital[]): Promise<ACSx290Form[]> {
    return new Promise<ACSx290Form[]>((resolve, reject) => {
      const acsxList: Observable<ACSx290Form[]>[] = [];
      avHospitals.forEach(hosp => {
        acsxList.push(
          this.db
            .collection<ACSx290Form>(DB_COLLECTION, ref => ref.where('sectionC.HospName', '==', hosp.id))
            .valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(acsxList)
          .pipe(
            map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
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

      //   this.subscriptions.push(
      //     this.db
      //       .collection<ACSx290Form>('ACSx290')
      //       .valueChanges()
      //       .pipe(
      //         map(data =>
      //           data.map(d => {
      //             // tslint:disable: no-string-literal
      //             delete d.sectionA['HN'];
      //             delete d.sectionA['AN'];
      //             delete d.sectionB['PatLName'];
      //             delete d.sectionB['PatFName'];
      //             delete d.sectionB['PatMName'];
      //             delete d.sectionB['DOB'];
      //             delete d.sectionB['SSN'];
      //             delete d.sectionB['PatAddr'];
      //             // tslint:enable: no-string-literal

      //             d.detail.createdAt =
      //               d.detail.createdAt !== null
      //                 ? (d.detail.createdAt as firebase.firestore.Timestamp).toDate().toISOString()
      //                 : null;
      //             d.detail.modifiedAt =
      //               d.detail.modifiedAt !== null
      //                 ? (d.detail.modifiedAt as firebase.firestore.Timestamp).toDate().toISOString()
      //                 : null;
      //             d.detail.deletedAt =
      //               d.detail.deletedAt !== null
      //                 ? (d.detail.deletedAt as firebase.firestore.Timestamp).toDate().toISOString()
      //                 : null;

      //             return d;
      //           })
      //         )
      //       )
      //       .subscribe(
      //         data => {
      //           resolve(data);
      //         },
      //         error => {
      //           reject(error);
      //         }
      //       )
      //   );
    });
  }

  public loadCathPci50sForExport(avHospitals: Auth.Hospital[]): Promise<CathPci50Model[]> {
    return new Promise<CathPci50Model[]>((resolve, reject) => {
      const dataList: Observable<CathPci50Model[]>[] = [];
      avHospitals.forEach(hosp => {
        dataList.push(
          this.db
            .collection<CathPci50Model>('CathPci50', ref => ref.where('sectionB.HospName', '==', hosp.id))
            .valueChanges()
        );
      });

      this.subscriptions.push(
        combineLatest(dataList)
          .pipe(
            map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
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
  //#endregion Cloud firestore

  public exportAsExcelFile(json: CathPci50Model[], excelFileName: string): void {
    const flatten = (obj, prefix = '', res = {}) =>
      Object.entries(obj).reduce((r, [key, val]) => {
        const k = `${prefix}${key}`;
        if (val && typeof val === 'object') {
          flatten(val, `${k}.`, r);
        } else {
          // res[k] = val ? val : 'null';
          res[k] = val;
        }
        return r;
      }, res);

    console.log(json);

    // tslint:disable: variable-name
    const ECGFindings = this.SimpleFieldToSheet('sectionD', 'ECGFindings', json);
    const NSVTType = this.SimpleFieldToSheet('sectionD', 'NSVTType', json);
    const ConcomProcType = this.SimpleFieldToSheet('sectionE', 'ConcomProcType', json);
    const CathLabVisitIndication = this.SimpleFieldToSheet('sectionG', 'CathLabVisitIndication', json);
    const CVInstabilityType = this.SimpleFieldToSheet('sectionG', 'CVInstabilityType', json);
    const OrganTransplantType = this.SimpleFieldToSheet('sectionG', 'OrganTransplantType', json);
    const NativeLesions = this.ComplexFieldToSheet('sectionH', 'NativeLesions', json);
    const GraftLesions = this.ComplexFieldToSheet('sectionH', 'GraftLesions', json);
    const PciLesions = this.ComplexFieldToSheet('sectionJ', 'PciLesions', json);
    const SegmentID = this.VerySimpleFieldToSheet('SegmentID', PciLesions, 'LesionCounter');
    const GuidewireAcross = this.VerySimpleFieldToSheet('GuidewireAcross', PciLesions);
    const ComplicationPCI = this.VerySimpleFieldToSheet('ComplicationPCI', PciLesions);
    const PciDevices = this.ComplexFieldToSheet('sectionJ', 'PciDevices', json);
    const ICDevCounterAssn = this.VerySimpleFieldToSheet('ICDevCounterAssn', PciDevices, 'ICDevCounter');
    const K_MIFollowCriteria = this.SimpleFieldToSheet(
      'sectionK',
      'K_MyocardialInfarctionFollowCriteria',
      json
    );
    const HospInterventionType = this.SimpleFieldToSheet('sectionL', 'HospInterventionType', json);
    const DC_MedReconciled = this.SimpleFieldToSheet('sectionL', 'DC_MedReconciled', json);
    const FollowUps = this.ComplexFieldToSheet('sectionM', 'FollowUps', json);
    const FU_Method = this.VerySimpleFieldToSheet('FU_Method', FollowUps);
    const M_CABGStentLesions = this.VerySimpleFieldToSheet('M_CABGStentLesions', FollowUps);
    const M_PCIStentLesions = this.VerySimpleFieldToSheet('M_PCIStentLesions', FollowUps);
    const M_ThrombosisStentLesions = this.VerySimpleFieldToSheet('M_ThrombosisStentLesions', FollowUps);
    // tslint:enable: variable-name

    const mainData = [];
    json.forEach(j => mainData.push(flatten(j)));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mainData);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ECGFindings);
    const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(NSVTType);
    const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ConcomProcType);
    const worksheet5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(CathLabVisitIndication);
    const worksheet6: XLSX.WorkSheet = XLSX.utils.json_to_sheet(CVInstabilityType);
    const worksheet7: XLSX.WorkSheet = XLSX.utils.json_to_sheet(OrganTransplantType);
    const worksheet8: XLSX.WorkSheet = XLSX.utils.json_to_sheet(NativeLesions);
    const worksheet9: XLSX.WorkSheet = XLSX.utils.json_to_sheet(GraftLesions);
    const worksheet10: XLSX.WorkSheet = XLSX.utils.json_to_sheet(PciLesions);
    const worksheet11: XLSX.WorkSheet = XLSX.utils.json_to_sheet(SegmentID);
    const worksheet12: XLSX.WorkSheet = XLSX.utils.json_to_sheet(GuidewireAcross);
    const worksheet13: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ComplicationPCI);
    const worksheet14: XLSX.WorkSheet = XLSX.utils.json_to_sheet(PciDevices);
    const worksheet15: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ICDevCounterAssn);
    const worksheet16: XLSX.WorkSheet = XLSX.utils.json_to_sheet(K_MIFollowCriteria);
    const worksheet17: XLSX.WorkSheet = XLSX.utils.json_to_sheet(HospInterventionType);
    const worksheet18: XLSX.WorkSheet = XLSX.utils.json_to_sheet(DC_MedReconciled);
    const worksheet19: XLSX.WorkSheet = XLSX.utils.json_to_sheet(FollowUps);
    const worksheet20: XLSX.WorkSheet = XLSX.utils.json_to_sheet(FU_Method);
    const worksheet21: XLSX.WorkSheet = XLSX.utils.json_to_sheet(M_CABGStentLesions);
    const worksheet22: XLSX.WorkSheet = XLSX.utils.json_to_sheet(M_PCIStentLesions);
    const worksheet23: XLSX.WorkSheet = XLSX.utils.json_to_sheet(M_ThrombosisStentLesions);

    const workbook: XLSX.WorkBook = {
      Sheets: {
        data: worksheet,
        ECGFindings: worksheet2,
        NSVTType: worksheet3,
        ConcomProcType: worksheet4,
        CathLabVisitIndication: worksheet5,
        CVInstabilityType: worksheet6,
        OrganTransplantType: worksheet7,
        NativeLesions: worksheet8,
        GraftLesions: worksheet9,
        PciLesions: worksheet10,
        SegmentID: worksheet11,
        GuidewireAcross: worksheet12,
        ComplicationPCI: worksheet13,
        PciDevices: worksheet14,
        ICDevCounterAssn: worksheet15,
        K_MIFollowCriteria: worksheet16,
        HospInterventionType: worksheet17,
        DC_MedReconciled: worksheet18,
        FollowUps: worksheet19,
        FU_Method: worksheet20,
        M_CABGStentLesions: worksheet21,
        M_PCIStentLesions: worksheet22,
        M_ThrombosisStentLesions: worksheet23
      },
      SheetNames: [
        'data',
        'ECGFindings',
        'NSVTType',
        'ConcomProcType',
        'CathLabVisitIndication',
        'CVInstabilityType',
        'OrganTransplantType',
        'NativeLesions',
        'GraftLesions',
        'PciLesions',
        'SegmentID',
        'GuidewireAcross',
        'ComplicationPCI',
        'PciDevices',
        'ICDevCounterAssn',
        'K_MIFollowCriteria',
        'HospInterventionType',
        'DC_MedReconciled',
        'FollowUps',
        'FU_Method',
        'M_CABGStentLesions',
        'M_PCIStentLesions',
        'M_ThrombosisStentLesions'
      ]
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private VerySimpleFieldToSheet(control: string, data: any[], subId = null) {
    const sheetData = [];
    data.map((record: any) => {
      const fields = record[control] as string[];
      if (!fields) {
        return;
      }
      fields.forEach((field: any) => {
        // tslint:disable-next-line: no-string-literal
        const n = { registryId: record['registryId'] };
        if (subId) {
          n[subId] = record[subId];
        }
        n[control] = field;
        sheetData.push(n);
      });
      record[control] = `see '${control}' sheet`;
    });
    return sheetData;
  }

  private SimpleFieldToSheet(section: string, control: string, data: CathPci50Model[]) {
    const sheetData = [];
    data.map(record => {
      const fields = record[section][control] as string[];
      if (!fields) {
        return;
      }
      fields.forEach(field => {
        // tslint:disable-next-line: no-string-literal
        const n = { registryId: record.sectionA['registryId'] };
        n[control] = field;
        sheetData.push(n);
      });
      record[section][control] = `see '${control}' sheet`;
    });
    return sheetData;
  }

  private ComplexFieldToSheet(section: string, control: string, data: CathPci50Model[]) {
    const sheetData = [];

    data.map(record => {
      const fields = record[section][control] as [];
      if (fields.length <= 0) {
        return;
      }
      fields.forEach((field: any) => {
        // tslint:disable-next-line: no-string-literal
        const n = { registryId: record.sectionA['registryId'], ...field };
        sheetData.push(n);
      });
      record[section][control] = `see '${control}' sheet`;
    });
    return sheetData;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
