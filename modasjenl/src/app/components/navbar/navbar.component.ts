import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthStateService } from 'src/app/services/auth-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logueado: boolean;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.logueado = val;
    });
  }

  // Signout
  cerrarSesion() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.logueado = false;
    this.router.navigate(['login']);
  }

}
