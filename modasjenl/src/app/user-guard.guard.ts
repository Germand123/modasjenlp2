import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
 
 constructor(private _tokenService : TokenService,
                  private _router : Router     
        ){

 }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log('canActivate..')
      const isLogueado = this._tokenService.isLogueado();
      if(!isLogueado){
          void this._router.navigateByUrl('/login');
      }

      console.log('esta logueado...')
      console.log(isLogueado)
      return isLogueado
  }
  

 



}
