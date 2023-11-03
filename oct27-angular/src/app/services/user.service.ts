import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { LogRequest } from '../model/logRequest.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  confirmUserUpdate(user: User) {
    return this.http.post(`${this.baseUrl}/admin/update`, user);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/create`, user);
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/userList`);
  }

  getUpdateUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/updateList`);
  }

  login(logRequest: LogRequest): Observable<User> {
    const url = `${this.baseUrl}/user/login`;
    return this.http.post<User>(url, logRequest);
  }
  
  submitUpdate(updateUser: any): Observable<any>  {
    return this.http.post(`${this.baseUrl}/user/update`, updateUser);  
  }

  private baseUrl = 'http://localhost:8080';  //localhost

  constructor(private http: HttpClient) { }
}
