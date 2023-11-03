import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false; // log in status

  constructor() { }

  // get status
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  // set
  login(): void {
    this._isLoggedIn = true;
  }

  // log off
  logout(): void {
    this._isLoggedIn = false;
  }
}
