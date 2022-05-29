import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Ng7MatBreadcrumbService } from "ng7-mat-breadcrumb";

import { ProductoService } from 'src/app/services/producto.service'; 
import { Producto } from 'src/app/interfaces/producto'; 

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from 'ng7-mat-breadcrumb/lib/breadcrumb.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnChanges {

  id: string;
  producto: Producto;
  isShow : boolean = true
  public subscriber: Subscription;
  
  constructor(public productoService: ProductoService,
     private ng7MatBreadcrumbService: Ng7MatBreadcrumbService,
     private route: ActivatedRoute,
     private router: Router) { 



      
     }

  ngOnInit() {

    // this.subscriber = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event) => {
    //    console.log('The URL changed to: ' + event['url'])
    // });
    this.route.paramMap.subscribe((params: ParamMap) =>{
      console.log( this.route.snapshot.params)

      this.id = this.route.snapshot.params['ID'];
      // this.id = params.get('ID');
     this.productoService.find(this.id).subscribe((data: Producto)=>{
      this.producto = data;
  
      this.cargaBreadcum(data['nombre']);
      // console.log(  this.producto['nombre']);
            // const breadcrumb = { customText: this.producto['nombre']};
            // this.ng7MatBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
      });
    })

   
    // console.log(this.id , 'fdgd');


    }


    ngOnDestroy():void{
    //   const sintext =""; 
    // this.cargaBreadcum(sintext);
  
  }

  ngOnChanges(){
        console.log('ffdfd');
  }
  
    cargaBreadcum( valor){
     this.isShow = true
     // console.log(valor)
     // this.ng7MatBreadcrumbService.breadcrumbLabels.value.length = 0

      const breadcrumb ={ customText: valor};
    //.next([breadcrumb])
       //   console.log(this.ng7MatBreadcrumbService.breadcrumbLabels);
          // this.ng7MatBreadcrumbService.updateBreadcrumb([objproducto]);
    
          setTimeout(() => {
         this.ng7MatBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
         console.log(this.ng7MatBreadcrumbService.breadcrumbLabels.getValue())
          }, 1000);
    }
  }