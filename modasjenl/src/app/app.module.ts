import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { InicioComponent } from './components/inicio/inicio.component';
import { SharedModule } from './shared/shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './components/error404/error404.component';
import { Error400Component } from './components/error400/error400.component';
import { Error500Component } from './components/error500/error500.component';

import { LoginComponent } from './components/login/login.component';

import { RegistrateComponent } from './components/registrate/registrate.component';
import { AvisoPrivacidadComponent } from './components/aviso-privacidad/aviso-privacidad.component';



import { Ng7MatBreadcrumbModule } from "ng7-mat-breadcrumb";


import { ProductoModule } from './producto/producto.module';
import { ProductoComponent } from './components/producto/producto.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPipe } from './pipes/search.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';

import { CargarScriptsService } from './services/cargar-scripts.service';


import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserGuardGuard } from './user-guard.guard';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { CarrucelComponent } from './components/carrucel/carrucel.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ItemShopComponent } from './components/item-shop/item-shop.component';
@NgModule({
  declarations: [
    AppComponent,

    AppRoutingModule.components,

    InicioComponent,
    NavbarComponent,
    FooterComponent,
    Error400Component,
    Error404Component,
    Error500Component,
    LoginComponent,
    RegistrateComponent,
    // VistaDetalleComponent,
    AvisoPrivacidadComponent,
    ProductoComponent,
    SearchComponent,
    SearchPipe,
    ContactoComponent,
    ChatBotComponent,
    UserProfileComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
    SearchAutocompleteComponent,
    CarrucelComponent,
    WelcomeComponent,
    ItemShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule ,    //Importante contiene angular material y modulos
    // NgDynamicBreadcrumbModule 
    Ng7MatBreadcrumbModule,
    ProductoModule,
    HttpClientModule,
    // NgbModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS}
    CookieService,
    UserGuardGuard,
    CargarScriptsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
