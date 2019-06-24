import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Pipe({ name: 'decrypt' })
export class DecryptPipe implements PipeTransform {
  transform(value: string): string {
    return CryptoJS.AES.decrypt(value, environment.appKey).toString(CryptoJS.enc.Utf8);
  }
}
