import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// import { Registro } from 'src/app/interfaces/registro';      //importar la interfaz 
// import { RegistroService } from 'src/app/services/registro.service';   //importar el servicio

import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {
  
  // registro: Registro[] = [];
  paternPassword = '/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/';
  frmRegistrate:FormGroup;
  loading = false;
  enviar = null;
  hide = true;
  hide2 = true;

  errors = null;

  constructor(
            public fb: FormBuilder,
            private _snackBar: MatSnackBar, //notificacion
            private router: Router,
            // private crudService:CrudService
            // public registroService: RegistroService
            public authService: AuthService
  ) { 
      this.frmRegistrate = this.fb.group({
        nombre:['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),
                          Validators.minLength(3),
                          Validators.maxLength(20)
                      ] ],
        apellido:['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),
                           Validators.minLength(3),
                          Validators.maxLength(40)
                      ] ],
        email:['', [Validators.required, Validators.email
                      ] ],
        password:['', [Validators.required,
                    Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
                    Validators.minLength(8),
                    Validators.maxLength(30)
                      ]],
        confirmarPassword:['', [Validators.required,
                    Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
                      ]]
      },

                    // ^ - inicio de cadena (implícito en el patrón de expresión regular de cadena)
                    // (?=\D*\d) - debe haber 1 dígito
                    // (?=[^a-z]*[a-z]) - debe haber 1 letra minúscula ASCII letra
                    // (?=[^A-Z]*[A-Z]) - debe haber 1 letra mayúscula ASCII letra
                    // .{8,30} - cualquier 8 a 30 caracteres distintos de los caracteres de salto de línea
                    // $ - fin de la cadena (implícito en el patrón de expresión regular de la cadena).
                    {
                      validators: this.validarQueSeanIguales
                    });
                  }

  ngOnInit(): void {

  }

  checarSiSonIguales(): boolean {
    return this.frmRegistrate.hasError('noSonIguales') &&
      this.frmRegistrate.get('password').dirty &&
      this.frmRegistrate.get('confirmarPassword').dirty;
  }


  validarQueSeanIguales: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmarPassword = control.get('confirmarPassword');
  
    return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
  };



  Registrar(): any{

    // console.log(this.frmRegistrate.value.correo);

    this.authService.create(this.frmRegistrate.value).subscribe( 
      result => {
        // this.responseHandler(result);
      },
      error => {
              this.errors = error.error;
              console.log('datos incorrectos');
              this.notificacionError();
      },() => {
          Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Se ha registrado correctamente',
          showConfirmButton: false,
          timer: 1500
         })
         
        this.frmRegistrate.reset()
        console.log('usuario registrado')
        this.router.navigate(['login']);
      }
    );

  }


  notificacionError(){
    this._snackBar.open('Error', 'No se pudo registrar. Por favor, vuelve a intentarlo más tarde.', {
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
    // this.router.navigate(['user']);

  }, 1500);
}







  get nombre() {
    return this.frmRegistrate.get('nombre');
  }
  get password() {
    return this.frmRegistrate.get('password');
  }  
  get apellido() {
    return this.frmRegistrate.get('apellido');
  }    
  get email() {
    return this.frmRegistrate.get('email');
  }      



}





