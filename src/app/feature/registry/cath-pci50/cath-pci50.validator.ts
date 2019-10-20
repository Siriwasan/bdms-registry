import { AbstractControl, ValidatorFn, FormControl, NG_VALIDATORS, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { RegistryFormService } from 'src/app/shared/modules/registry-form/registry-form.service';
import { Injectable } from '@angular/core';

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

  // Utility
  static ADateCompareBDate(aDate: DateControl, bDate: DateControl, operator: string, validation: string) {
    if (CathPci50Validator.registryFormService) {
      const aDateControl = CathPci50Validator.getControl(aDate);
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
      CathPci50Validator.updateFormValueAndValidity(aDate.section);
      CathPci50Validator.updateFormValueAndValidity(bDate.section);
      return error;
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
    return CathPci50Validator.registryFormService.getFormGroup(dateControl.section).controls[dateControl.control];
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
