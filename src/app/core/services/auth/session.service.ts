import { Injectable } from '@angular/core';
import { UserData } from '../../models/session/user-data';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  private _userData: UserData | null = null;

  get isAuthenticated(): boolean {
    return this._userData !== null;
  }

  get userData(): UserData | null {
    return this._userData;
  }

  set userData(userData: UserData) {
    this._userData = userData;
  }

  logout() {
    this._userData = null;
  }
}
