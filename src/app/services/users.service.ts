import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Users } from '../core/models/users';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  // private usersUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------------------------

  // get data
  // get(): Observable<Users> {
  //   return this.http.get<Users>(this.usersUrl);
  // }

  //----------------------------------------------------------------------------------

  // add data
  // post(objForm: Users): Observable<Users> {
  //   return this.http.post<Users>(this.usersUrl, objForm);
  // }

  //----------------------------------------------------------------------------------

  // get data by id
  // getById(id: any): Observable<Users> {
  //   return this.http.get<Users>(this.usersUrl + `/${id}`);
  // }

  //----------------------------------------------------------------------------------

  // delete data by id
  // delete(id: any): Observable<Users> {
  //   return this.http.delete<Users>(this.usersUrl + `/${id}`);
  // }

  //----------------------------------------------------------------------------------

  // update data by id
  // put(objForm: Users, id: any): Observable<Users> {
  //   return this.http.put<Users>(this.usersUrl + `/${id}`, objForm);
  // }

  //----------------------------------------------------------------------------------

  // auth() {
  //   if (!localStorage.getItem('admin')) {
  //     location.replace("http://localhost:4200/admins/login");
  //   }
  // }

  private binId = '69dfb71b36566621a8b863f0';
  private apiKey = '$2a$10$7V8dWyAEsWZL7MvywynC7OOOGBSVNX2JDV.YJvj9yFKn63sG/jtDG';
  private baseUrl = `https://api.jsonbin.io/v3/b/${this.binId}`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Master-Key': this.apiKey
  });

  // 🔹 GET users
  get(): Observable<Users[]> {
    return this.http.get<any>(this.baseUrl, { headers: this.headers }).pipe(
      map(res => res.record.users || [])
    );
  }

  // 🔹 ADD user
  post(user: Users): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.headers }).pipe(
      switchMap(res => {
        const data = res.record;

        if (!data.users) {
          data.users = [];
        }

        data.users.push(user);

        return this.http.put(this.baseUrl, data, { headers: this.headers });
      })
    );
  }

  // 🔹 DELETE user
  delete(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.headers }).pipe(
      switchMap(res => {
        const data = res.record;

        data.users = data.users.filter((u: Users) => u.id !== id);

        return this.http.put(this.baseUrl, data, { headers: this.headers });
      })
    );
  }

  // 🔹 UPDATE user
  put(updatedUser: Users, id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.headers }).pipe(
      switchMap(res => {
        const data = res.record;

        data.users = data.users.map((u: Users) =>
          u.id === id ? updatedUser : u
        );

        return this.http.put(this.baseUrl, data, { headers: this.headers });
      })
    );
  }

  // 🔹 LOGIN (مهم 🔥)
  login(email: string, password: string): Observable<Users | null> {
    return this.get().pipe(
      map(users =>
        users.find(u => u.email === email && u.passWord === password) || null
      )
    );
  }
}
