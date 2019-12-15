import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { RegistryModel } from './registry.model';
import { ACSx290Model } from './acsx290/acsx290.model';
import * as Auth from '../../core/auth/auth.data';
import { CathPci50Model } from './cath-pci50/cath-pci50.model';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const DB_ACSX = 'ACSx290';
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

    return combineLatest(registryList)
      .pipe(
        map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
        take(1)
      )
      .toPromise();
  }

  public loadACSx290sForExport(avHospitals: Auth.Hospital[]): Promise<ACSx290Model[]> {
    const acsxList: Observable<ACSx290Model[]>[] = [];
    avHospitals.forEach(hosp => {
      acsxList.push(
        this.db
          .collection<ACSx290Model>(DB_ACSX, ref => ref.where('sectionC.HospName', '==', hosp.id))
          .valueChanges()
      );
    });

    return combineLatest(acsxList)
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
        ),
        take(1)
      )
      .toPromise();
  }

  public loadCathPci50sForExport(avHospitals: Auth.Hospital[]): Promise<CathPci50Model[]> {
    const dataList: Observable<CathPci50Model[]>[] = [];
    avHospitals.forEach(hosp => {
      dataList.push(
        this.db
          .collection<CathPci50Model>('CathPci50', ref =>
            ref.where('sectionB.HospName', '==', hosp.id)
          )
          .valueChanges()
      );
    });

    return combineLatest(dataList)
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
        ),
        take(1)
      )
      .toPromise();
  }
  //#endregion Cloud firestore

  public exportCathPci50AsExcelFile(json: CathPci50Model[], excelFileName: string): void {
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
    const ECGFindings = this.FieldToSheet('sectionD', 'ECGFindings', json);
    const NSVTType = this.FieldToSheet('sectionD', 'NSVTType', json);
    const ConcomProcType = this.FieldToSheet('sectionE', 'ConcomProcType', json);
    const CathLabVisitIndication = this.FieldToSheet('sectionG', 'CathLabVisitIndication', json);
    const CVInstabilityType = this.FieldToSheet('sectionG', 'CVInstabilityType', json);
    const OrganTransplantType = this.FieldToSheet('sectionG', 'OrganTransplantType', json);
    const NativeLesions = this.ArrayToSheet('sectionH', 'NativeLesions', json);
    const GraftLesions = this.ArrayToSheet('sectionH', 'GraftLesions', json);
    const CHIP = this.ArrayToSheet('sectionI', 'CHIP', json);
    const PciLesions = this.ArrayToSheet('sectionJ', 'PciLesions', json);
    const SegmentID = this.SubArrayToSheet('SegmentID', PciLesions, 'LesionCounter');
    const GuidewireAcross = this.SubArrayToSheet('GuidewireAcross', PciLesions, 'LesionCounter');
    const IntraCoroMeasurementSite = this.SubArrayToSheet(
      'IntraCoroMeasurementSite',
      PciLesions,
      'LesionCounter'
    );
    const MB_MeasurementType = this.SubArrayToSheet(
      'MB_MeasurementType',
      PciLesions,
      'LesionCounter'
    );
    const SB_MeasurementType = this.SubArrayToSheet(
      'SB_MeasurementType',
      PciLesions,
      'LesionCounter'
    );
    const StentDeployedStrategy = this.SubArrayToSheet(
      'StentDeployedStrategy',
      PciLesions,
      'LesionCounter'
    );
    const ComplicationPCIDetail = this.SubArrayToSheet(
      'ComplicationPCIDetail',
      PciLesions,
      'LesionCounter'
    );
    const PciDevices = this.ArrayToSheet('sectionJ', 'PciDevices', json);
    const ICDevCounterAssn = this.SubArrayToSheet('ICDevCounterAssn', PciDevices, 'ICDevCounter');
    const K_MIFollowCriteria = this.FieldToSheet(
      'sectionK',
      'K_MyocardialInfarctionFollowCriteria',
      json
    );
    const HospInterventionType = this.FieldToSheet('sectionL', 'HospInterventionType', json);
    const DC_MedReconciled = this.FieldToSheet('sectionL', 'DC_MedReconciled', json);
    const FollowUps = this.ArrayToSheet('sectionM', 'FollowUps', json);
    const FU_Method = this.SubArrayToSheet('FU_Method', FollowUps, 'FU_AssessmentDate');
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
    const worksheet10: XLSX.WorkSheet = XLSX.utils.json_to_sheet(CHIP);
    const worksheet11: XLSX.WorkSheet = XLSX.utils.json_to_sheet(PciLesions);
    const worksheet12: XLSX.WorkSheet = XLSX.utils.json_to_sheet(SegmentID);
    const worksheet13: XLSX.WorkSheet = XLSX.utils.json_to_sheet(GuidewireAcross);
    const worksheet14: XLSX.WorkSheet = XLSX.utils.json_to_sheet(IntraCoroMeasurementSite);
    const worksheet15: XLSX.WorkSheet = XLSX.utils.json_to_sheet(MB_MeasurementType);
    const worksheet16: XLSX.WorkSheet = XLSX.utils.json_to_sheet(SB_MeasurementType);
    const worksheet17: XLSX.WorkSheet = XLSX.utils.json_to_sheet(StentDeployedStrategy);
    const worksheet18: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ComplicationPCIDetail);
    const worksheet19: XLSX.WorkSheet = XLSX.utils.json_to_sheet(PciDevices);
    const worksheet20: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ICDevCounterAssn);
    const worksheet21: XLSX.WorkSheet = XLSX.utils.json_to_sheet(K_MIFollowCriteria);
    const worksheet22: XLSX.WorkSheet = XLSX.utils.json_to_sheet(HospInterventionType);
    const worksheet23: XLSX.WorkSheet = XLSX.utils.json_to_sheet(DC_MedReconciled);
    const worksheet24: XLSX.WorkSheet = XLSX.utils.json_to_sheet(FollowUps);
    const worksheet25: XLSX.WorkSheet = XLSX.utils.json_to_sheet(FU_Method);

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
        CHIP: worksheet10,
        PciLesions: worksheet11,
        SegmentID: worksheet12,
        GuidewireAcross: worksheet13,
        IntraCoroMeasurementSite: worksheet14,
        MB_MeasurementType: worksheet15,
        SB_MeasurementType: worksheet16,
        StentDeployedStrategy: worksheet17,
        ComplicationPCIDetail: worksheet18,
        PciDevices: worksheet19,
        ICDevCounterAssn: worksheet20,
        K_MIFollowCriteria: worksheet21,
        HospInterventionType: worksheet22,
        DC_MedReconciled: worksheet23,
        FollowUps: worksheet24,
        FU_Method: worksheet25
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
        'CHIP',
        'PciLesions',
        'SegmentID',
        'GuidewireAcross',
        'IntraCoroMeasurementSite',
        'MB_MeasurementType',
        'SB_MeasurementType',
        'StentDeployedStrategy',
        'ComplicationPCIDetail',
        'PciDevices',
        'ICDevCounterAssn',
        'K_MIFollowCriteria',
        'HospInterventionType',
        'DC_MedReconciled',
        'FollowUps',
        'FU_Method'
      ]
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private SubArrayToSheet(control: string, data: any[], subId = null) {
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

  private FieldToSheet(section: string, control: string, data: CathPci50Model[]) {
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

  private ArrayToSheet(section: string, control: string, data: CathPci50Model[]) {
    const sheetData = [];

    data.map(record => {
      const fields = record[section][control] as [];
      if (!fields || fields.length <= 0) {
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
    // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
