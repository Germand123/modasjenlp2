import { Component, OnInit , AfterViewInit} from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service'; 
import { Producto } from 'src/app/interfaces/producto'; 

import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-carrucel',
  templateUrl: './carrucel.component.html',
  styleUrls: ['./carrucel.component.css']
})
export class CarrucelComponent implements OnInit {

  productos: Producto[] = [];


  constructor( public productoService: ProductoService,
                    private _cargaScripsService : CargarScriptsService)
    {
                    
    }


  ngOnInit(): void {
    this.productoService.getAll().subscribe((data: Producto[])=>{
      this.productos = data;
    })

    this._cargaScripsService.Carga(["carrucel"])      


    }







   
}


