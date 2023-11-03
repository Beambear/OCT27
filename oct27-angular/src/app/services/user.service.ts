import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';  //localhost

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/create`, user);
  }
}
