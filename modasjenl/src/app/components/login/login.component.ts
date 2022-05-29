import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthStateService } from 'src/app/services/auth-state.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin:FormGroup;
  loading = false;
  hide = true;
  successdata: Response;
  // cookieService: any;
  errors = null;


  constructor(
            public fb: FormBuilder,
            private _snackBar: MatSnackBar, //notificacion
            private router: Router,
            // public loginService: LoginService
            public authService: AuthService,
            private token: TokenService,
            private authState: AuthStateService,
  ) { 
      this.frmLogin = this.fb.group({
        email:['', [Validators.required, Validators.email
        ] ],
        password:['', [Validators.required,
             Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
             Validators.minLength(8),
             Validators.maxLength(30)
        ]],
      })
  }

  ngOnInit(): void {
  }



  Ingresar(): any{
    // console.log(this.frmLogin.value);

    const email = this.frmLogin.value.email;
    const password = this.frmLogin.value.password;

    this.authService.login(this.frmLogin.value).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
              this.errors = error.error;
              console.log('datos incorrectos');
              this.notificacionError();
      },() => {
        this.authState.setAuthState(true);
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Accediendo..',
          showConfirmButton: false,
          timer: 1500
         })
        this.frmLogin.reset()
        this.router.navigate(['profile']);
      }
    );


};
                 

 // Handle response
  responseHandler(data){
    this.token.handleData(data.access_token);
  }

  notificacionError(){
    this._snackBar.open('Error', 'El correo o contraseña que ingreso son incorrectos', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  fakeLoading(){
    this.loading= true;
    setTimeout(() => {
      //Redireccionamos 
      // this.loading = false;
      this.router.navigate(['user']);

    }, 1500);
  }

}
