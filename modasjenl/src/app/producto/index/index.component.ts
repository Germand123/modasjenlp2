import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  productos: Producto[] = [];

  // constructor() { }
  constructor(public productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getAll().subscribe((data: Producto[])=>{
      this.productos = data;
      console.log(this.productos);
    })
  }

  deleteProducto(id){
    this.productoService.delete(id).subscribe(res => {
         this.productos = this.productos.filter(item => item.id !== id);
         console.log('Person deleted successfully!');
    })
  }

}
