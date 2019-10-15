import { AbstractControl, ValidatorFn } from '@angular/forms';
import { utc } from 'moment';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return utc(control.value).isBefore(utc('1/1/1850')) ? { forbidden: true } : null;
  };
}
