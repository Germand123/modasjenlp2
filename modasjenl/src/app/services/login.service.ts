import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Global } from '../global'; 
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _apiUrl = Global.apiUrl+"api/auth/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }


  
  login(Login): Observable<Login> {
    return this.httpClient.post<Login>(this._apiUrl +'login', JSON.stringify(Login), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  profileUser(): Observable<any> {
    return this.httpClient.get(this._apiUrl +'user-profile')
    .pipe(
      catchError(this.errorHandler)
    )
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
