import { AbstractControl, ValidatorFn, FormControl, NG_VALIDATORS, FormGroup } from '@angular/forms';
import { utc } from 'moment';
import { RegistryFormService } from 'src/app/shared/modules/registry-form/registry-form.service';
import { Injectable } from '@angular/core';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return utc(control.value).isBefore(utc('1850-01-01')) ? { forbidden: true } : null;
  };
}

interface DateControl {
  section: string;
  control: string;
}

let regSer: RegistryFormService;

export function setServiceForValidators(reg: RegistryFormService) {
  regSer = reg;
}

@Injectable()
export class CathPci50Validator {
  registryFormService: RegistryFormService;

  constructor() {}

  // static DobStart(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     if (regSer) {
  //       return utc(control.value).isBefore(utc('1850-01-01')) ? { forbidden: true } : null;
  //     }
  //     return null;
  //   };
  // }

  static DobStart(control: AbstractControl) {
    if (regSer) {
      let error: any;
      if (!control.value) {
        error = null;
      } else {
        error = !utc(control.value).isAfter(utc('1850-01-01')) ? { DobStart: true } : null;
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

  static HxMIDateAfterDOB(control: AbstractControl) {
    return CathPci50Validator.ADateCompareBDate(
      { section: 'C', control: 'HxMIDate' },
      { section: 'A', control: 'DOB' },
      '>',
      'HxMIDateAfterDOB'
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

  static ADateCompareBDate(aDate: DateControl, bDate: DateControl, operator: string, validation: string) {
    if (regSer) {
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
            error = !utc(aDateValue).isBefore(utc(bDateValue)) ? val : null;
            break;

          case '<=':
            error = !utc(aDateValue).isSameOrBefore(utc(bDateValue)) ? val : null;
            break;

          case '>':
            error = !utc(aDateValue).isAfter(utc(bDateValue)) ? val : null;
            break;

          case '>=':
            error = !utc(aDateValue).isSameOrAfter(utc(bDateValue)) ? val : null;
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
    return regSer.getFormGroup(dateControl.section).controls[dateControl.control];
  }

  static updateFormValueAndValidity(section: string) {
    regSer.getFormGroup(section).updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  setService(reg: RegistryFormService) {
    regSer = reg;
  }

  // /* static */ checkEmail(control: FormControl): any {
  //   // console.log(this.registryFormService);
  //   control.get('DOB').setErrors({ forbidden: true });

  //   return { forbidden: true };
  // }

  // checkEmail2(): ValidatorFn {
  //   return (control: FormGroup): { [key: string]: any } | null => {
  //     console.log(control.controls['DOB'].value);
  //     if (utc(control.controls['DOB'].value).isBefore(utc('1850-01-01'))) {
  //       control.controls['DOB'].setErrors({ forbidden: true });
  //     } else {
  //       control.controls['DOB'].setErrors(null);
  //     }
  //     return null;
  //   };
  // }
}
