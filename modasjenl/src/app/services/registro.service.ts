
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
​
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Global } from '../global'; 
import { Registro } from '../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private _apiUrl = Global.apiUrl+"api/auth/newRegistro";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     })
  }




  // header('Access-Control-Allow-Origin: *');
  // header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  // header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  // header("Allow: GET, POST, OPTIONS, PUT, DELETE");
  // $method = $_SERVER['REQUEST_METHOD'];
  // if($method == "OPTIONS") {
  //     die();
  // }









  constructor(private httpClient: HttpClient) { }

//   getAll(): Observable<Registro[]> {
//    return this.httpClient.get<Registro[]>(this.apiURL)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

 create(registro): Observable<Registro> {
   return this.httpClient.post<Registro>(this._apiUrl, JSON.stringify(registro), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }
// Agregar(datosRegistro:Registro):Observable<any>{
//   return this.httpClient.post(this.apiURL+"?insertar=1",datosRegistro)
// }


 
//  find(id): Observable<Registro> {
//    return this.httpClient.get<Registro>(this.apiURL + id)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

//  update(id, person): Observable<Registro> {
//    return this.httpClient.put<Registro>(this.apiURL + id, JSON.stringify(person), this.httpOptions)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

//  delete(id){
//    return this.httpClient.delete<Registro>(this.apiURL + id, this.httpOptions)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

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
