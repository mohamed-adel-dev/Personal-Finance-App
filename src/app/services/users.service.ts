import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Users } from '../core/models/users';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  // private usersUrl = 'http://localhost:3001/users';
  private mockApiUrl = 'https://69dfb1f7d6de26e11929bcaa.mockapi.io/users';

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------------------------

  // get data
  // get(): Observable<Users> {
  //   return this.http.get<Users>(this.usersUrl);
  // }

  get(): Observable<Users[]> {
    return this.http.get<Users[]>(this.mockApiUrl);
  }


  //----------------------------------------------------------------------------------

  // add data
  // post(objForm: Users): Observable<Users> {
  //   return this.http.post<Users>(this.usersUrl, objForm);
  // }

  post(user: Users): Observable<Users> {
    return this.http.post<Users>(this.mockApiUrl, user);
  }

  //----------------------------------------------------------------------------------

  // get data by id
  // getById(id: any): Observable<Users> {
  //   return this.http.get<Users>(this.usersUrl + `/${id}`);
  // }

  getById(id: any): Observable<Users> {
    return this.http.get<Users>(`${this.mockApiUrl}/${id}`);
  }

  //----------------------------------------------------------------------------------

  // delete data by id
  // delete(id: any): Observable<Users> {
  //   return this.http.delete<Users>(this.usersUrl + `/${id}`);
  // }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.mockApiUrl}/${id}`);
  }
  //----------------------------------------------------------------------------------

  // update data by id
  // put(objForm: Users, id: any): Observable<Users> {
  //   return this.http.put<Users>(this.usersUrl + `/${id}`, objForm);
  // }

  put(user: Users, id: any): Observable<Users> {
    return this.http.put<Users>(`${this.mockApiUrl}/${id}`, user);
  }

  //----------------------------------------------------------------------------------

  auth() {
    if (!localStorage.getItem('admin')) {
      location.replace("http://localhost:4200/admins/login");
    }
  }


}
