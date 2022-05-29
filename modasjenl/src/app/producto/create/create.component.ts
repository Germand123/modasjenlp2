import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


//Services
import { UploadService } from 'src/app/services/upload-img.service';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [UploadService],
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public productoService: ProductoService,
    private router: Router,

    private _uploadService: UploadService
  ) { }

// in app.component.ts
files: File[] = [];



onSelect(event) {
  // console.log(event);
  this.files.push(...event.addedFiles);

  if(this.files.length > 1){ // checking if files array has more than one content
    this.replaceFile(); // replace file
    }
}

//method for replacing file
replaceFile(){
  this.files.splice(0,1); // index =0 , remove_count = 1
  }

onRemove(event) {
  // console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

// Upload my image to cloudinary
onUpload(){
  // if( !this.files[0]){
  //       alert('Sube una imagen por favor');
  // }

  // const  file_data = this.files[0];
  // const data = new FormData();
  // data.append('file', file_data);
  // data.append('upload_preset', 'angular_modasjenl');
  // data.append('cloud_name', 'uthh');

  // this._uploadService.uploadImage(data).subscribe((response) => {
  //   if (response) {
  //     console.log(response);
  //     // console.log(response.secure_url);
  //     this.url_imagen = response.secure_url;
  //     // return this.url_imagen;
  //   }
  // });

  
}                





  ngOnInit(): void {

    this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      modelo: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      // imagen: new FormControl('',[Validators.required]),
      
      // email: new FormControl('', [ Validators.required, Validators.email ]),
      // precio: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      precio: new FormControl('',[Validators.required]),
      categoria: new FormControl('',[Validators.required]),

    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    // console.log(this.form.value);
     if( !this.files[0]){
        alert('Sube una imagen por favor');
  }
  let url_imagen="";
  const  file_data = this.files[0];
  const data = new FormData();
  data.append('file', file_data);
  data.append('upload_preset', 'angular_modasjenl');
  data.append('cloud_name', 'uthh');

  this._uploadService.uploadImage(data).subscribe((response) => {
    if (response) {
      console.log(response);
      console.log(response.secure_url);
      url_imagen = response.secure_url;
      // return this.url_imagen;

      var datosP = this.form.value;


      datosP.imagen = url_imagen;
      console.log(url_imagen);

      console.log(datosP);
      // console.log(JSON.stringify(this.form.value));

      this.productoService.create(datosP).subscribe(res => {
           console.log('Producto agregado correctamente!');
           this.router.navigateByUrl('productos/index');
      })
    


    }
  });




  }









}
