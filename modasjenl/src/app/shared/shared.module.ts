import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';   //para que el formulario sea reactivo tipp ajax
import { HttpClientModule} from '@angular/common/http';


// Angular material
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';   //formulario
import {MatInputModule} from '@angular/material/input';     //imput
import {MatButtonModule} from '@angular/material/button';  //button
import {MatSnackBarModule} from '@angular/material/snack-bar';  //notificacion
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; //cargando..
import {MatToolbarModule} from '@angular/material/toolbar'; //navbar
import {MatIconModule} from '@angular/material/icon';    //iconos
import {MatTableModule} from '@angular/material/table';   //tabla  
import {MatTooltipModule} from '@angular/material/tooltip';  //mensaje cuando se pasa el cursor en un enlace, etc
import {MatPaginatorModule} from '@angular/material/paginator';     //paginado para tabla
import {MatSortModule} from '@angular/material/sort';     //ordenamiento
import {MatCardModule} from '@angular/material/card';     //cards
import {MatGridListModule} from '@angular/material/grid-list';     // Grid list
import {MatSelectModule} from '@angular/material/select';   //select btn
import {MatListModule} from '@angular/material/list';  //lista
import {MatDividerModule} from '@angular/material/divider'; //divider
import {MatAutocompleteModule} from '@angular/material/autocomplete';  //autoacompletado 

// import { NgxDropzoneModule } from 'ngx-dropzone'; //upload image
 
// import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatAutocompleteModule,

    // SwiperModule
    // NgxDropzoneModule,
  ],
  exports:[     //importante exportar para que los modulos y material sean Publicos
    CommonModule,
  
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatAutocompleteModule,
    // NgxDropzoneModule,

    // SwiperModule

  ]


})
export class SharedModule { }
