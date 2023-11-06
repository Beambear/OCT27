import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../model/user.model';
import { LogRequest } from '../model/logRequest.model';
import { UpdateUser } from '../model/updateUser.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserInfoByEmail(email: string | undefined) {
    const url = `${this.baseUrl}/user/email/${email}`
    return this.http.get<User>(url);
  }

  getAvatar(avatarName: string) {
    return this.http.get(`${this.baseUrl}/avatarFile/avatarName`, {responseType:'blob'});
  }

  postAvatar(file:File, userId:number, type: number): Observable<any>{  //type 1 = saveUser, type = saveUpdateUser
    const formData = new FormData();
    formData.append('avatarFile', file, file.name);//append file
    formData.append('userId', userId.toString());  //set userId
    formData.append('type', type.toString());  //set save type

    return this.http.post(`${this.baseUrl}/avatarFile`,formData)
  }

  confirmUserUpdate(user: UpdateUser) {
    return this.http.put(`${this.baseUrl}/admin/update`, user);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/create`, user);
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/userList`);
  }

  getUpdateUsersList(): Observable<User[]> {
    return this.http.get<UpdateUser[]>(`${this.baseUrl}/admin/updateList`).pipe(
        map(updateUsers => updateUsers.map(updateUser => ({
            ...updateUser,
            // id: updateUser.userId
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
