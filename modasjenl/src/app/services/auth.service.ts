
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Global } from '../global'; 
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl = Global.apiUrl+"api/auth/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }
  
   create(registro): Observable<Usuario> {
     return this.httpClient.post<Usuario>(this._apiUrl+"newRegistro", JSON.stringify(registro), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     )
   }
  
  
  login(Login): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this._apiUrl+"login", JSON.stringify(Login), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  profileUser(): Observable<any> {
    return this.httpClient.post<any>(this._apiUrl+'user-profile',this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  sendResetPasswordLink(data) {
    return this.httpClient.post(this._apiUrl+'reset-password-request', data)
  }

  resetPassword(data) {
    return this.httpClient.post(this._apiUrl+'change-password', data)
  }










  
 errorHandler(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}