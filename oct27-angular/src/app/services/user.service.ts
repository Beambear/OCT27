import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../model/user.model';
import { LogRequest } from '../model/logRequest.model';
import { UpdateUser } from '../model/updateUser.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  confirmUserUpdate(user: User) {
    return this.http.put(`${this.baseUrl}/admin/update`, user);
  }

  //send userRequest & file for avatar picture
  addUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/create`, formData);
  }


  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/userList`);
  }

  getUpdateUsersList(): Observable<User[]> {
    return this.http.get<UpdateUser[]>(`${this.baseUrl}/admin/updateList`).pipe(
        map(updateUsers => updateUsers.map(updateUser => ({
            ...updateUser,
            id: updateUser.userId
        })))
    );
}

  getUserInfoById(id: number) : Observable<any> {
    const url = `${this.baseUrl}/user/${id}`
    return this.http.get<User>(url);
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
