import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false; // log in status
  private _userId: number | null = null; // user ID

  constructor() { }

  // get status
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  // set
  login(userId: number): void {
    this._isLoggedIn = true;
    this._userId = userId; // set when log in
  }

  // log off
  logout(): void {
    this._isLoggedIn = false;
    this._userId = null;
  }
  // get user ID
  getUserId(): number | null {
    return this._userId;
  }

}
