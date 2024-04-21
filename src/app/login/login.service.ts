import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseBody } from '../_models/response-body';
import { Observable, map } from 'rxjs';
import { Users } from '../_models/users';
import { ProfileModel } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private apiUrl = 'http://localhost:5000/api/account'; // Replace with your API URL

  Username: string;
  Password: string;
  public loggedUser: ProfileModel;
  public currentLoggedUser: Users;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/authenticate`, { username, password })
      .pipe(
        map((response) => {
          console.log('Login Response:', response); // Log the response to verify
          if (response && response.Code === 1 && response.Data) {
            this.loggedUser = response.Data;
            console.log(this.loggedUser);
            sessionStorage.setItem(
              'currentUser',
              JSON.stringify(response.Data)
            );
          }
          return response;
        })
      );
  }

  // login(username: string, password: string) {
  //   console.log(username);
  //   return this.http
  //     .post<any>(`${this.apiUrl}/authenticate`, {
  //       username: username,
  //       password: password,
  //     })
  //     .pipe(
  //       map((response) => {
  //         let result = response as ResponseBody;
  //         console.log(result.Code + ' ola');
  //         console.log(result.Data + ' ola');
  //         if (result.Code == 1) {
  //           this.loggedUser = result.Data as ProfileModel;
  //           console.log(this.loggedUser);
  //           this.currentLoggedUser = result.Data as Users;
  //           sessionStorage.setItem('currentUser', JSON.stringify(result.Data));
  //           //this.UpdateNavigation(this.loggedUser);
  //           //this.Empresa = this.loggedUser.CodigoDeEmpresa;
  //         }
  //         return result;
  //       })
  //     );
  // }
}
