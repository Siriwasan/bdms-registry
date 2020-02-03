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
import { intraCoronaryDevices } from '../registry/cath-pci50/cath-pci50.device';
import { User } from 'src/app/core/auth/user.model';
import { Staff } from '../staff/staff.model';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const DB_ACSX = 'ACSx290';
const DB_CATHPCI = 'CathPci50';
const DB_REGISTRY = 'Registry';
const DB_STAFF = 'Staff';

@Injectable()
export class RegistryService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  //#region Cloud firestore
  public loadAllRegistries(registry: string): Promise<RegistryModel[]> {
    return this.db
      .collection<RegistryModel>(DB_REGISTRY, ref => ref.where('baseDbId', '==', registry))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

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

  public loadACSx290sForExport(avHospitals: string[]): Promise<ACSx290Model[]> {
    const acsxList: Observable<ACSx290Model[]>[] = [];
    avHospitals.forEach(hosp => {
      acsxList.push(
        this.db
          .collection<ACSx290Model>(DB_ACSX, ref => ref.where('sectionC.HospName', '==', hosp))
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

  public loadCathPci50sForExport(avHospitals: string[]): Promise<CathPci50Model[]> {
    const dataList: Observable<CathPci50Model[]>[] = [];
    avHospitals.forEach(hosp => {
      dataList.push(
        this.db
          .collection<CathPci50Model>(DB_CATHPCI, ref => ref.where('sectionB.HospName', '==', hosp))
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

            // calculated fields
            d.sectionH['NativeLesionNumber'] = d.sectionH['NativeLesions']
              ? (d.sectionH['NativeLesions'] as []).length
              : null;
            d.sectionH['GraftLesionNumber'] = d.sectionH['GraftLesion']
              ? (d.sectionH['GraftLesion'] as []).length
              : null;
            d.sectionJ['PciLesionNumber'] = d.sectionJ['PciLesions']
              ? (d.sectionJ['PciLesions'] as []).length
              : null;
            d.sectionJ['PciDeviceNumber'] = d.sectionJ['PciDevices']
              ? (d.sectionJ['PciDevices'] as []).length
              : null;
            d.sectionM['FollowUpNumber'] = d.sectionM['FollowUps']
              ? (d.sectionM['FollowUps'] as []).length
              : null;

            // tslint:enable: no-string-literal

            return d;
          })
        ),
        take(1)
      )
      .toPromise();
  }

  public async loadStaffsForCathPci50Export(avHospitals: string[]): Promise<Staff[]> {
    // should be same as cath-pci50.component.ts:loadStaffs()
    const physician = [
      'Emergency Physician',
      'Cardiologist',
      'Cardiac Interventionist',
      'Cardiothoracic Surgeon',
      'Other Physician'
    ];

    const staffs = await this.db
      .collection<Staff>(DB_STAFF)
      .valueChanges()
      .pipe(take(1))
      .toPromise();

    return staffs.filter(staff => {
      if (!physician.includes(staff.position)) {
        return false;
      }
      if (avHospitals.includes(staff.primaryHospId)) {
        return true;
      }
      for (const hosp of avHospitals) {
        if (staff.secondHospIds.includes(hosp)) {
          return true;
        }
      }
      return false;
    });
  }
  //#endregion Cloud firestore

  public exportCathPci50AsExcelFile(
    data: CathPci50Model[],
    staffs: Staff[],
    excelFileName: string,
    user: User
  ): void {
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

    console.log(data);

    // json.

    // tslint:disable: variable-name
    const Completion = this.CompletionToSheet(data);
    const ECGFindings = this.FieldToSheet('sectionD', 'ECGFindings', data);
    const NSVTType = this.FieldToSheet('sectionD', 'NSVTType', data);
    const ConcomProcType = this.FieldToSheet('sectionE', 'ConcomProcType', data);
    const CathLabVisitIndication = this.FieldToSheet('sectionG', 'CathLabVisitIndication', data);
    const CVInstabilityType = this.FieldToSheet('sectionG', 'CVInstabilityType', data);
    const OrganTransplantType = this.FieldToSheet('sectionG', 'OrganTransplantType', data);
    const NativeLesions = this.ArrayToSheet('sectionH', 'NativeLesions', data);
    const GraftLesions = this.ArrayToSheet('sectionH', 'GraftLesions', data);
    const CHIP = this.FieldToSheet('sectionI', 'CHIP', data);
    const PciLesions = this.ArrayToSheet('sectionJ', 'PciLesions', data);
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
    const PciDevices = this.ArrayToSheet('sectionJ', 'PciDevices', data);
    const ICDevCounterAssn = this.SubArrayToSheet('ICDevCounterAssn', PciDevices, 'ICDevCounter');
    const K_MIFollowCriteria = this.FieldToSheet(
      'sectionK',
      'K_MyocardialInfarctionFollowCriteria',
      data
    );
    const HospInterventionType = this.FieldToSheet('sectionL', 'HospInterventionType', data);
    const DC_MedReconciled = this.FieldToSheet('sectionL', 'DC_MedReconciled', data);
    const FollowUps = this.ArrayToSheet('sectionM', 'FollowUps', data);
    const FU_Method = this.SubArrayToSheet('FU_Method', FollowUps, 'FU_AssessmentDate');
    // tslint:enable: variable-name

    const mainData = [];
    data.forEach(j => {
      delete j.completion;
      mainData.push(flatten(j));
    });

    const mappedStaffs = staffs
      ? staffs.map(s => {
          return {
            staffId: s.staffId,
            title: s.title,
            firstName: s.firstName,
            lastName: s.lastName,
            position: s.position
          };
        })
      : null;

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mainData);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Completion);
    const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ECGFindings);
    const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(NSVTType);
    const worksheet5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ConcomProcType);
    const worksheet6: XLSX.WorkSheet = XLSX.utils.json_to_sheet(CathLabVisitIndication);
    const worksheet7: XLSX.WorkSheet = XLSX.utils.json_to_sheet(CVInstabilityType);
    const worksheet8: XLSX.WorkSheet = XLSX.utils.json_to_sheet(OrganTransplantType);
    const worksheet9: XLSX.WorkSheet = XLSX.utils.json_to_sheet(NativeLesions);
    const worksheet10: XLSX.WorkSheet = XLSX.utils.json_to_sheet(GraftLesions);
    const worksheet11: XLSX.WorkSheet = XLSX.utils.json_to_sheet(CHIP);
    const worksheet12: XLSX.WorkSheet = XLSX.utils.json_to_sheet(PciLesions);
    const worksheet13: XLSX.WorkSheet = XLSX.utils.json_to_sheet(SegmentID);
    const worksheet14: XLSX.WorkSheet = XLSX.utils.json_to_sheet(GuidewireAcross);
    const worksheet15: XLSX.WorkSheet = XLSX.utils.json_to_sheet(IntraCoroMeasurementSite);
    const worksheet16: XLSX.WorkSheet = XLSX.utils.json_to_sheet(MB_MeasurementType);
    const worksheet17: XLSX.WorkSheet = XLSX.utils.json_to_sheet(SB_MeasurementType);
    const worksheet18: XLSX.WorkSheet = XLSX.utils.json_to_sheet(StentDeployedStrategy);
    const worksheet19: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ComplicationPCIDetail);
    const worksheet20: XLSX.WorkSheet = XLSX.utils.json_to_sheet(PciDevices);
    const worksheet21: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ICDevCounterAssn);
    const worksheet22: XLSX.WorkSheet = XLSX.utils.json_to_sheet(K_MIFollowCriteria);
    const worksheet23: XLSX.WorkSheet = XLSX.utils.json_to_sheet(HospInterventionType);
    const worksheet24: XLSX.WorkSheet = XLSX.utils.json_to_sheet(DC_MedReconciled);
    const worksheet25: XLSX.WorkSheet = XLSX.utils.json_to_sheet(FollowUps);
    const worksheet26: XLSX.WorkSheet = XLSX.utils.json_to_sheet(FU_Method);
    const worksheet27: XLSX.WorkSheet = XLSX.utils.json_to_sheet(intraCoronaryDevices);
    const worksheet28: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Auth.hospitals);
    const worksheet29: XLSX.WorkSheet = mappedStaffs
      ? XLSX.utils.json_to_sheet(mappedStaffs)
      : null;

    const workbook: XLSX.WorkBook = {
      Sheets: {
        data: worksheet,
        Completion: worksheet2,
        ECGFindings: worksheet3,
        NSVTType: worksheet4,
        ConcomProcType: worksheet5,
        CathLabVisitIndication: worksheet6,
        CVInstabilityType: worksheet7,
        OrganTransplantType: worksheet8,
        NativeLesions: worksheet9,
        GraftLesions: worksheet10,
        CHIP: worksheet11,
        PciLesions: worksheet12,
        SegmentID: worksheet13,
        GuidewireAcross: worksheet14,
        IntraCoroMeasurementSite: worksheet15,
        MB_MeasurementType: worksheet16,
        SB_MeasurementType: worksheet17,
        StentDeployedStrategy: worksheet18,
        ComplicationPCIDetail: worksheet19,
        PciDevices: worksheet20,
        ICDevCounterAssn: worksheet21,
        K_MIFollowCriteria: worksheet22,
        HospInterventionType: worksheet23,
        DC_MedReconciled: worksheet24,
        FollowUps: worksheet25,
        FU_Method: worksheet26,
        IntraCoronaryDevices: worksheet27,
        Hospital: worksheet28,
        Staff: worksheet29
      },
      SheetNames: [
        'data',
        'Completion',
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
        'FU_Method',
        'IntraCoronaryDevices',
        'Hospital',
        'Staff'
      ]
    };

    const userName = user.staff.title + ' ' + user.staff.firstName + ' ' + user.staff.lastName;

    workbook.Props = {};
    workbook.Props.Title = 'BDMS CathPCI Registry v1.0';
    workbook.Props.Subject = 'Data Collection Export';
    workbook.Props.Author = userName;
    workbook.Props.Company = 'BDMS';
    workbook.Props.Keywords = 'BDMS CAG PCI';
    workbook.Props.LastAuthor = userName;
    workbook.Props.CreatedDate = new Date();

    workbook.Custprops = {};
    workbook.Custprops[`MD5`] = user.staff.staffId;

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

  private CompletionToSheet(data: CathPci50Model[]) {
    const sheetData = [];
    data.map(record => {
      const section = 'ABCDEFGHIJKLM';
      [...section].forEach(c => {
        const fields = {
          registryId: record.sectionA[`registryId`],
          section: c,
          valid: record.completion['section' + c].valid,
          total: record.completion['section' + c].total,
          completion:
            record.completion['section' + c].total !== 0
              ? Math.floor(
                  (record.completion['section' + c].valid /
                    record.completion['section' + c].total) *
                    100
                )
              : 100
        };
        sheetData.push(fields);
      });
      sheetData.push({
        registryId: record.sectionA[`registryId`],
        section: 'summary',
        valid: record.completion.summary.valid,
        total: record.completion.summary.total,
        completion:
          record.completion.summary.total !== 0
            ? Math.floor((record.completion.summary.valid / record.completion.summary.total) * 100)
            : 100
      });
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
