import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Global } from '../global'; 
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _apiUrl = Global.apiUrl+"api/producto/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Producto[]> {
    // this.httpOptions.headers.append('','Bearer ' + localStorage.getItem('jwtAccessToken'))
    
   return this.httpClient.get<Producto[]>(this._apiUrl)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(producto): Observable<Producto> {
   return this.httpClient.post<Producto>(this._apiUrl, JSON.stringify(producto), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id): Observable<Producto> {
   return this.httpClient.get<Producto>(this._apiUrl+ id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id, producto): Observable<Producto> {
   return this.httpClient.put<Producto>(this._apiUrl+ id, JSON.stringify(producto), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id){
   return this.httpClient.delete<Producto>(this._apiUrl + id, this.httpOptions)
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


 getAllSearch(): Observable<Producto[]> {
  // this.httpOptions.headers.append('','Bearer ' + localStorage.getItem('jwtAccessToken'))
  
 return this.httpClient.get<Producto[]>(this._apiUrl)
 .pipe(
  map((response:[]) => response.map(item => item['name'])),
   catchError(this.errorHandler)
 )
}


}