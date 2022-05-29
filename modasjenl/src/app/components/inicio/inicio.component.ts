import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductoService } from 'src/app/services/producto.service'; 
import { Producto } from 'src/app/interfaces/producto'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  @Input() dataEntrante:any;


  productos: Producto[] = [];

  filtro_valor =''
  handleSearch(value:string){
    this.filtro_valor = value;
    console.log(value);

  }

  constructor(public productoService: ProductoService,
    private _http: HttpClient) { }

  ngOnInit(): void {

    this.productoService.getAll().subscribe((data: Producto[])=>{
      this.productos = data;
      console.log(this.productos);
    })


    }
  
    event2()
    {
    
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }


















    
  }
