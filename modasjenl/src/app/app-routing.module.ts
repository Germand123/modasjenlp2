import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error400Component } from './components/error400/error400.component';
import { Error404Component } from './components/error404/error404.component';
import { Error500Component } from './components/error500/error500.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegistrateComponent } from './components/registrate/registrate.component';
import { AvisoPrivacidadComponent } from './components/aviso-privacidad/aviso-privacidad.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserGuardGuard } from './user-guard.guard';
import { ItemShopComponent } from './components/item-shop/item-shop.component';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';



const routes: Routes = [
// {path: '',pathMatch:'full', redirectTo:''},
  { path: '', component:InicioComponent},
  { path: 'login', component:LoginComponent},
  { path: 'registro', component:RegistrateComponent},
  { path: 'inicio', component:InicioComponent},

  { path: 'profile', component:UserProfileComponent, canActivate: [UserGuardGuard]},

  { path: 'contacto', component:ContactoComponent},
  { path: 'aviso-de-privacidad', component:AvisoPrivacidadComponent},
  { path: 'error400', component:Error400Component},
  { path: 'error404', component:Error404Component},
  { path: 'error500', component:Error500Component},
  { path: 'item',component: ItemShopComponent},

  { path: 'reset-password', component: ChangePasswordRequestComponent },
  { path: 'change-password', component: ChangePasswordComponent },


  // {
  //   path: 'inicio',
  //   component: InicioComponent,
  //   data: {
  //     title: 'inicio',
  //     breadcrumb: [
  //       {
  //         label: 'inicio',
  //         url: ''
  //       }
  //     ]
  //   },
  // },
 


  {
    path: 'producto/:ID',
    component: ProductoComponent,
    data: {
      title: 'vistadetalle',
      breadcrumb: [
        {
          label: 'inicio',
          url: '/inicio'
        },
        // {
        //   label: 'vistadetalle',
        //   url: '/inicio/:ID'
        // },

        {
          label: '{{customText}}',
          url: ''
        }

      ]
    },
  },


  // {
  //   path: '', pathMatch: 'full', redirectTo: '/inicio/1'
  // },

  { path: '**', component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    InicioComponent ,
    ProductoComponent,
    Error404Component
  ];
 }
