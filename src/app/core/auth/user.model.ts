import { Staff } from 'src/app/feature/staff/staff.model';

export class User {
  constructor(public staff: Staff, private _token: string, private _tokenExpirationDate: Date) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
