import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  NG_VALIDATORS,
  FormGroup,
  FormArray
} from '@angular/forms';
import * as moment from 'moment';
import { RegistryFormService } from 'src/app/shared/modules/registry-form/registry-form.service';
import { Injectable } from '@angular/core';
import { CathPci50ListComponent } from '../cath-pci50-list/cath-pci50-list.component';

interface DateControl {
  section: string;
  control: string;
}

export class CathPci50Validator {
  static registryFormService: RegistryFormService;

  constructor() {}

  // static DobStart(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     if (regSer) {
  //       return moment(control.value).isBefore(moment('1850-01-01')) ? { forbidden: true } : null;
  //     }
  //     return null;
  //   };
  // }

  static DobStart(control: AbstractControl) {
    if (CathPci50Validator.registryFormService) {
      let error: any;
      if (!control.value) {
        error = null;
      } else {
        error = !moment(control.value).isAfter(moment('1850-01-01')) ? { DobStart: true } : null;
      }
      if (error === null) {
        CathPci50Validator.removeError(control, 'DobStart');
      } else {
        CathPci50Validator.setError(control, 'DobStart');
      }
      CathPci50Validator.updateFormValueAndValidity('A');
      return error;
    }
  }

  static DobBeforeArrivalDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'A', control: 'DOB' },
      { section: 'B', control: 'ArrivalDateTime' },
      '<',
      'DobBeforeArrivalDT'
    );
  }

  static ArrivalDTBeforeDischargeDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'B', control: 'ArrivalDateTime' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'ArrivalDTBeforeDischargeDT'
    );
  }

  static ArrivalDTBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'B', control: 'ArrivalDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<',
      'ArrivalDTBeforeProcedureStartDT'
    );
  }

  static HxMIDateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxMIDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'HxMIDateAfterDob'
    );
  }

  static HxMIDateBeforeArrivalDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxMIDate' },
      { section: 'B', control: 'ArrivalDateTime' },
      '<=',
      'HxMIDateBeforeArrivalDT'
    );
  }

  static HxPCIDateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxPCIDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'HxPCIDateAfterDob'
    );
  }

  static HxPCIDateBeforeArrivalDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxPCIDate' },
      { section: 'B', control: 'ArrivalDateTime' },
      '<=',
      'HxPCIDateBeforeArrivalDT'
    );
  }

  static HxCABGDateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxCABGDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'HxCABGDateAfterDob'
    );
  }

  static HxCABGDateBeforeArrivalDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxCABGDate' },
      { section: 'B', control: 'ArrivalDateTime' },
      '<=',
      'HxCABGDateBeforeArrivalDT'
    );
  }

  static StressTestDateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'StressTestDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'StressTestDateAfterDob'
    );
  }

  static StressTestDateBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'StressTestDate' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=',
      'StressTestDateBeforeProcedureStartDT'
    );
  }

  static CardiacCTADateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'CardiacCTADate' },
      { section: 'A', control: 'DOB' },
      '>',
      'CardiacCTADateAfterDob'
    );
  }

  static CardiacCTADateBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'CardiacCTADate' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=',
      'CardiacCTADateBeforeProcedureStartDT'
    );
  }

  static CalciumScoreDateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'CalciumScoreDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'CalciumScoreDateAfterDob'
    );
  }

  static CalciumScoreDateBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'CalciumScoreDate' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=',
      'CalciumScoreDateBeforeProcedureStartDT'
    );
  }

  static PriorDxAngioDateAfterDob(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'PriorDxAngioDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'PriorDxAngioDateAfterDob'
    );
  }

  static PriorDxAngioDateBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'D', control: 'PriorDxAngioDate' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=',
      'PriorDxAngioDateBeforeProcedureStartDT'
    );
  }

  static ProcedureStartDTBeforeProcedureEndDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'E', control: 'ProcedureStartDateTime' },
      { section: 'E', control: 'ProcedureEndDateTime' },
      '<',
      'ProcedureStartDTBeforeProcedureEndDT'
    );
  }

  static ProcedureStartDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'E', control: 'ProcedureStartDateTime' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'ProcedureStartDTBeforeDCDateTime'
    );
  }

  static ProcedureEndDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'E', control: 'ProcedureEndDateTime' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'ProcedureEndDTBeforeDCDateTime'
    );
  }

  static SymptomDTBefore7ProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'SymptomDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=7',
      'SymptomDTBefore7ProcedureStartDT'
    );
  }

  static SymptomDTBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'SymptomDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<',
      'SymptomDTBeforeProcedureStartDT'
    );
  }

  static ThromDTBefore7ProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'ThromDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=7',
      'ThromDTBefore7ProcedureStartDT'
    );
  }

  static SubECGDTBefore1ProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'SubECGDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=1',
      'SubECGDTBefore1ProcedureStartDT'
    );
  }

  static EDPresentDTBeforeArrivalDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'EDPresentDateTime' },
      { section: 'B', control: 'ArrivalDateTime' },
      '<',
      'EDPresentDTBeforeArrivalDT'
    );
  }

  static EDPresentDTBeforeProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'EDPresentDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<',
      'EDPresentDTBeforeProcedureStartDT'
    );
  }

  static EDPresentDTBeforeSubECGDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'EDPresentDateTime' },
      { section: 'I', control: 'SubECGDateTime' },
      '<',
      'EDPresentDTBeforeSubECGDT'
    );
  }

  static FirstDevActiDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'I', control: 'FirstDevActiDateTime' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'FirstDevActiDTAfterProcedureStartDT'
    );
  }

  static PrevTreatedLesionDateAfterDob(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'A', control: 'DOB' },
      '>',
      'PrevTreatedLesionDateAfterDob'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'J',
      'PciLesions',
      'PrevTreatedLesionDate',
      'A',
      'DOB',
      'PrevTreatedLesionDateAfterDob'
    );

    return result;
  }

  static DobBeforePrevTreatedLesionDate(control: AbstractControl) {
    if (CathPci50Validator.registryFormService) {
      let allResult = null;
      const formArray = CathPci50Validator.registryFormService
        .getFormGroup('J')
        .get('PciLesions') as FormArray;
      formArray.controls.forEach((formGroup: FormGroup) => {
        const result = CathPci50Validator.ADateCompareBDate(
          // tslint:disable-next-line: no-string-literal
          formGroup.controls['PrevTreatedLesionDate'],
          { section: 'A', control: 'DOB' },
          '>',
          'PrevTreatedLesionDateAfterDob'
        );
        allResult = { ...allResult, ...result };
        formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      });
      return allResult;
    }
  }

  static PrevTreatedLesionDateBeforeProcedureStartDT(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'E', control: 'ProcedureStartDateTime' },
      '<=',
      'PrevTreatedLesionDateBeforeProcedureStartDT'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'J',
      'PciLesions',
      'PrevTreatedLesionDate',
      'E',
      'ProcedureStartDateTime',
      'PrevTreatedLesionDateBeforeProcedureStartDT'
    );

    return result;
  }

  static ProcedureStartDTBeforePrevTreatedLesionDate(control: AbstractControl) {
    if (CathPci50Validator.registryFormService) {
      let allResult = null;
      const formArray = CathPci50Validator.registryFormService
        .getFormGroup('J')
        .get('PciLesions') as FormArray;
      formArray.controls.forEach((formGroup: FormGroup) => {
        const result = CathPci50Validator.ADateCompareBDate(
          // tslint:disable-next-line: no-string-literal
          formGroup.controls['PrevTreatedLesionDate'],
          { section: 'E', control: 'ProcedureStartDateTime' },
          '<=',
          'PrevTreatedLesionDateBeforeProcedureStartDT'
        );
        allResult = { ...allResult, ...result };
        formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      });
      return allResult;
    }
  }

  //#region Intra/Post-Procedure Event Date and Time(9003) is greater than Procedure Start Date and Time
  static K_BleedingAccessSiteDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingAccessSiteDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_BleedingAccessSiteDTAfterProcedureStartDT'
    );
  }

  static K_BleedingGIDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingGIDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_BleedingGIDTAfterProcedureStartDT'
    );
  }

  static K_BleedingGUDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingGUDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_BleedingGUDTAfterProcedureStartDT'
    );
  }

  static K_BleedingHematomaDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingHematomaDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_BleedingHematomaDTAfterProcedureStartDT'
    );
  }

  static K_BleedingOtherDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingOtherDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_BleedingOtherDTAfterProcedureStartDT'
    );
  }

  static K_BleedingRetroDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingRetroDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_BleedingRetroDTAfterProcedureStartDT'
    );
  }

  static K_CardiacArrestDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_CardiacArrestDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_CardiacArrestDTAfterProcedureStartDT'
    );
  }

  static K_CardiacTamponadeDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_CardiacTamponadeDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_CardiacTamponadeDTAfterProcedureStartDT'
    );
  }

  static K_CardiogenicShockDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_CardiogenicShockDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_CardiogenicShockDTAfterProcedureStartDT'
    );
  }

  static K_HeartFailureDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_HeartFailureDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_HeartFailureDTAfterProcedureStartDT'
    );
  }

  static K_MyocardialInfarctionDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_MyocardialInfarctionDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_MyocardialInfarctionDTAfterProcedureStartDT'
    );
  }

  static K_NewDialysisDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_NewDialysisDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_NewDialysisDTAfterProcedureStartDT'
    );
  }

  static K_OtherVascularDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_OtherVascularDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_OtherVascularDTAfterProcedureStartDT'
    );
  }

  static K_StrokeHemorrhageDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_StrokeHemorrhageDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_StrokeHemorrhageDTAfterProcedureStartDT'
    );
  }

  static K_StrokeIschemicDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_StrokeIschemicDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_StrokeIschemicDTAfterProcedureStartDT'
    );
  }

  static K_StrokeUndeterminedDTAfterProcedureStartDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_StrokeUndeterminedDT' },
      { section: 'E', control: 'ProcedureStartDateTime' },
      '>',
      'K_StrokeUndeterminedDTAfterProcedureStartDT'
    );
  }
  //#endregion

  //#region Intra/Post-Procedure Event Date and Time(9003) is less than Discharge Date and Time
  static K_BleedingAccessSiteDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingAccessSiteDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_BleedingAccessSiteDTBeforeDCDateTime'
    );
  }

  static K_BleedingGIDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingGIDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_BleedingGIDTBeforeDCDateTime'
    );
  }

  static K_BleedingGUDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingGUDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_BleedingGUDTBeforeDCDateTime'
    );
  }

  static K_BleedingHematomaDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingHematomaDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_BleedingHematomaDTBeforeDCDateTime'
    );
  }

  static K_BleedingOtherDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingOtherDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_BleedingOtherDTBeforeDCDateTime'
    );
  }

  static K_BleedingRetroDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_BleedingRetroDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_BleedingRetroDTBeforeDCDateTime'
    );
  }

  static K_CardiacArrestDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_CardiacArrestDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_CardiacArrestDTBeforeDCDateTime'
    );
  }

  static K_CardiacTamponadeDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_CardiacTamponadeDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_CardiacTamponadeDTBeforeDCDateTime'
    );
  }

  static K_CardiogenicShockDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_CardiogenicShockDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_CardiogenicShockDTBeforeDCDateTime'
    );
  }

  static K_HeartFailureDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_HeartFailureDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_HeartFailureDTBeforeDCDateTime'
    );
  }

  static K_MyocardialInfarctionDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_MyocardialInfarctionDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_MyocardialInfarctionDTBeforeDCDateTime'
    );
  }

  static K_NewDialysisDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_NewDialysisDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_NewDialysisDTBeforeDCDateTime'
    );
  }

  static K_OtherVascularDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_OtherVascularDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_OtherVascularDTBeforeDCDateTime'
    );
  }

  static K_StrokeHemorrhageDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_StrokeHemorrhageDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_StrokeHemorrhageDTBeforeDCDateTime'
    );
  }

  static K_StrokeIschemicDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_StrokeIschemicDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_StrokeIschemicDTBeforeDCDateTime'
    );
  }

  static K_StrokeUndeterminedDTBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'K', control: 'K_StrokeUndeterminedDT' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'K_StrokeUndeterminedDTAfterDCDateTime'
    );
  }
  //#endregion

  static CABGDateTimeAfterArrivalDT(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'L', control: 'CABGDateTime' },
      { section: 'B', control: 'ArrivalDateTime' },
      '>',
      'CABGDateTimeAfterArrivalDT'
    );
  }

  static CABGDateTimeBeforeDCDateTime(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'L', control: 'CABGDateTime' },
      { section: 'L', control: 'DCDateTime' },
      '<',
      'CABGDateTimeBeforeDCDateTime'
    );
  }

  static FU_AssessmentDateAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'FU_AssessmentDateAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'FU_AssessmentDate',
      'L',
      'DCDateTime',
      'FU_AssessmentDateAfterDCDateTime'
    );

    return result;
  }

  static FU_DeathDateAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'FU_DeathDateAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'FU_DeathDate',
      'L',
      'DCDateTime',
      'FU_DeathDateAfterDCDateTime'
    );

    return result;
  }

  //#region Intra/Post-Procedure Event Date and Time(9003) is less than Discharge Date and Time
  static M_BleedingEventDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_BleedingEventDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_BleedingEventDT',
      'L',
      'DCDateTime',
      'M_BleedingEventDTAfterDCDateTime'
    );

    return result;
  }

  static M_CABGStentDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_CABGStentDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_CABGStentDT',
      'L',
      'DCDateTime',
      'M_CABGStentDTAfterDCDateTime'
    );

    return result;
  }

  static M_CABGNonStentDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_CABGNonStentDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_CABGNonStentDT',
      'L',
      'DCDateTime',
      'M_CABGNonStentDTAfterDCDateTime'
    );

    return result;
  }

  static M_NSTEMIDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_NSTEMIDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_NSTEMIDT',
      'L',
      'DCDateTime',
      'M_NSTEMIDTAfterDCDateTime'
    );

    return result;
  }

  static M_QwaveDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_QwaveDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_QwaveDT',
      'L',
      'DCDateTime',
      'M_QwaveDTAfterDCDateTime'
    );

    return result;
  }

  static M_STEMIDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_STEMIDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_STEMIDT',
      'L',
      'DCDateTime',
      'M_STEMIDTAfterDCDateTime'
    );

    return result;
  }

  static M_MIUnknownDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_MIUnknownDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_MIUnknownDT',
      'L',
      'DCDateTime',
      'M_MIUnknownDTAfterDCDateTime'
    );

    return result;
  }

  static M_PCINonStentDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_PCINonStentDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_PCINonStentDT',
      'L',
      'DCDateTime',
      'M_PCINonStentDTAfterDCDateTime'
    );

    return result;
  }

  static M_PCIStentDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_PCIStentDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_PCIStentDT',
      'L',
      'DCDateTime',
      'M_PCIStentDTAfterDCDateTime'
    );

    return result;
  }

  static M_ReadmissionDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_ReadmissionDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_ReadmissionDT',
      'L',
      'DCDateTime',
      'M_ReadmissionDTAfterDCDateTime'
    );

    return result;
  }

  static M_StrokeHemorrhageDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_StrokeHemorrhageDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_StrokeHemorrhageDT',
      'L',
      'DCDateTime',
      'M_StrokeHemorrhageDTAfterDCDateTime'
    );

    return result;
  }

  static M_StrokeIschemicDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_StrokeIschemicDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_StrokeIschemicDT',
      'L',
      'DCDateTime',
      'M_StrokeIschemicDTAfterDCDateTime'
    );

    return result;
  }

  static M_StrokeUndeterminedDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_StrokeUndeterminedDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_StrokeUndeterminedDT',
      'L',
      'DCDateTime',
      'M_StrokeUndeterminedDTAfterDCDateTime'
    );

    return result;
  }

  static M_ThrombosisStentDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_ThrombosisStentDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_ThrombosisStentDT',
      'L',
      'DCDateTime',
      'M_ThrombosisStentDTAfterDCDateTime'
    );

    return result;
  }

  static M_ThrombosisNonStentDTAfterDCDateTime(control: AbstractControl) {
    const result = CathPci50Validator.ADateCompareBDate(
      control,
      { section: 'L', control: 'DCDateTime' },
      '>=',
      'M_ThrombosisNonStentDTAfterDCDateTime'
    );

    CathPci50Validator.checkMainDateTimeValidity(
      'M',
      'FollowUps',
      'M_ThrombosisNonStentDT',
      'L',
      'DCDateTime',
      'M_ThrombosisNonStentDTAfterDCDateTime'
    );

    return result;
  }
  //#endregion

  static DCDateTimeBeforeIntraPostProcedureEventDT(control: AbstractControl) {
    const fuControls = [
      { control: 'FU_AssessmentDate', validation: 'FU_AssessmentDateAfterDCDateTime' },
      { control: 'FU_DeathDate', validation: 'FU_DeathDateAfterDCDateTime' },
      { control: 'M_BleedingEventDT', validation: 'M_BleedingEventDTAfterDCDateTime' },
      { control: 'M_CABGStentDT', validation: 'M_CABGStentDTAfterDCDateTime' },
      { control: 'M_CABGNonStentDT', validation: 'M_CABGNonStentDTAfterDCDateTime' },
      { control: 'M_NSTEMIDT', validation: 'M_NSTEMIDTAfterDCDateTime' },
      { control: 'M_QwaveDT', validation: 'M_QwaveDTAfterDCDateTime' },
      { control: 'M_STEMIDT', validation: 'M_STEMIDTAfterDCDateTime' },
      { control: 'M_MIUnknownDT', validation: 'M_MIUnknownDTAfterDCDateTime' },
      { control: 'M_PCINonStentDT', validation: 'M_PCINonStentDTAfterDCDateTime' },
      { control: 'M_PCIStentDT', validation: 'M_PCIStentDTAfterDCDateTime' },
      { control: 'M_ReadmissionDT', validation: 'M_ReadmissionDTAfterDCDateTime' },
      { control: 'M_StrokeHemorrhageDT', validation: 'M_StrokeHemorrhageDTAfterDCDateTime' },
      { control: 'M_StrokeIschemicDT', validation: 'M_StrokeIschemicDTAfterDCDateTime' },
      { control: 'M_StrokeUndeterminedDT', validation: 'M_StrokeUndeterminedDTAfterDCDateTime' },
      { control: 'M_ThrombosisStentDT', validation: 'M_ThrombosisStentDTAfterDCDateTime' },
      { control: 'M_ThrombosisNonStentDT', validation: 'M_ThrombosisNonStentDTAfterDCDateTime' }
    ];

    if (CathPci50Validator.registryFormService) {
      let allResult = null;
      const formArray = CathPci50Validator.registryFormService
        .getFormGroup('M')
        .get('FollowUps') as FormArray;
      formArray.controls.forEach((formGroup: FormGroup) => {
        fuControls.forEach(c => {
          const result = CathPci50Validator.ADateCompareBDate(
            formGroup.controls[c.control],
            { section: 'L', control: 'DCDateTime' },
            '>=',
            c.validation
          );
          allResult = { ...allResult, ...result };
        });
        formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      });
      return allResult;
    }
  }

  // Utility
  static ADateCompareBDate(
    aDate: DateControl | AbstractControl, // only use in subform, can't use bi-directional validation
    bDate: DateControl,
    operator: string,
    validation: string
  ) {
    if (CathPci50Validator.registryFormService) {
      const aDateControl =
        aDate instanceof AbstractControl ? aDate : CathPci50Validator.getControl(aDate);
      const bDateControl = CathPci50Validator.getControl(bDate);
      const aDateValue = aDateControl.value;
      const bDateValue = bDateControl.value;

      let error: any;
      if (!aDateValue || !bDateValue) {
        error = null;
      } else {
        const val = {};
        val[validation] = true;

        switch (operator) {
          case '<':
            error = !moment(aDateValue).isBefore(moment(bDateValue)) ? val : null;
            break;

          case '<=':
            error = !moment(aDateValue).isSameOrBefore(moment(bDateValue)) ? val : null;
            break;

          case '>':
            error = !moment(aDateValue).isAfter(moment(bDateValue)) ? val : null;
            break;

          case '>=':
            error = !moment(aDateValue).isSameOrAfter(moment(bDateValue)) ? val : null;
            break;

          case '<=1':
            error = !(moment(bDateValue).diff(moment(aDateValue), 'days') <= 1) ? val : null;
            break;

          case '<=7':
            error = !(moment(bDateValue).diff(moment(aDateValue), 'days') <= 7) ? val : null;
            break;

          default:
            console.log('wrong operator');
            error = null;
            break;
        }
      }
      if (error === null) {
        CathPci50Validator.removeError(aDateControl, validation);
        CathPci50Validator.removeError(bDateControl, validation);
      } else {
        CathPci50Validator.setError(aDateControl, validation);
        CathPci50Validator.setError(bDateControl, validation);
      }
      if (!(aDate instanceof AbstractControl)) {
        CathPci50Validator.updateFormValueAndValidity(aDate.section);
      }
      CathPci50Validator.updateFormValueAndValidity(bDate.section);
      return error;
    }
  }

  static checkMainDateTimeValidity(
    fg: string,
    subForm: string,
    subControl: string,
    mainControlFG: string,
    mainControl: string,
    validation: string
  ) {
    if (CathPci50Validator.registryFormService) {
      const formArray = CathPci50Validator.registryFormService
        .getFormGroup(fg)
        .get(subForm) as FormArray;
      let invalid = false;
      formArray.controls.forEach((formGroup: FormGroup) => {
        const errors = formGroup.controls[subControl].errors;
        invalid = invalid || (errors && errors[validation]);
      });

      const ProcedureStartDateTime = CathPci50Validator.registryFormService
        .getFormGroup(mainControlFG)
        .get(mainControl);
      if (invalid) {
        CathPci50Validator.setError(ProcedureStartDateTime, validation);
      } else {
        CathPci50Validator.removeError(ProcedureStartDateTime, validation);
      }
      CathPci50Validator.registryFormService
        .getFormGroup(mainControlFG)
        .updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }
  }

  static setError(control: AbstractControl, validation: string) {
    const errors = control.errors;
    if (errors) {
      errors[validation] = true;
      control.setErrors(errors);
    } else {
      const val = {};
      val[validation] = true;
      control.setErrors(val);
    }
  }

  static removeError(control: AbstractControl, validation: string) {
    const errors = control.errors;
    if (errors) {
      delete errors[validation];
      if (Object.keys(errors).length === 0) {
        control.setErrors(null);
      } else {
        control.setErrors(errors);
      }
    }
  }

  static getControl(dateControl: DateControl): AbstractControl {
    return CathPci50Validator.registryFormService
      .getFormGroup(dateControl.section)
      .get(dateControl.control);
  }

  static updateFormValueAndValidity(section: string) {
    CathPci50Validator.registryFormService
      .getFormGroup(section)
      .updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  static setServiceForValidators(reg: RegistryFormService) {
    CathPci50Validator.registryFormService = reg;
  }
}
