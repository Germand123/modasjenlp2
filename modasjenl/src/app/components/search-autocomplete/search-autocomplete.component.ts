// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// import { ProductoService } from 'src/app/services/producto.service'; 

// import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';

// // const API_KEY = "e8067b53"

// @Component({
//   selector: 'app-search-autocomplete',
//   templateUrl: './search-autocomplete.component.html',
//   styleUrls: ['./search-autocomplete.component.css']
// })
// export class SearchAutocompleteComponent implements OnInit {
//   searchMoviesCtrl = new FormControl();
//   filteredMovies: any;
//   isLoading = false;
//   errorMsg!: string;
//   minLengthTerm = 3;
//   selectedMovie: any = "";

//   constructor(
//     private http: HttpClient,
//     public productoService: ProductoService,
//   ) { }

//   onSelected() {
//     console.log(this.selectedMovie);
//     this.selectedMovie = this.selectedMovie;
//   }

//   displayWith(value: any) {
//     return value?.Title;
//   }

//   clearSelection() {
//     this.selectedMovie = "";
//     this.filteredMovies = [];
//   }




//   ngOnInit() {
//     this.searchMoviesCtrl.valueChanges
//       .pipe(
//         filter(res => {
//           return res !== null && res.length >= this.minLengthTerm
//         }),
//         distinctUntilChanged(),
//         debounceTime(1000),
//         tap(() => {
//           this.errorMsg = "";
//           this.filteredMovies = [];
//           this.isLoading = true;
//         }),
//         switchMap(value => this.productoService.getAll()
//           .pipe(
//             finalize(() => {
//               this.isLoading = false
//             }),
//           )
//         )
//       )
//       .subscribe((data: any) => {
//         console.log(data);
//         if (data['Search'] == undefined) {
//           this.errorMsg = data['Error'];
//           this.filteredMovies = [];
//         } else {
//           this.errorMsg = "";
//           this.filteredMovies = data['Search'];
//         }
//         console.log(this.filteredMovies);
//       });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import {ServService} from '../app/serv.service';
import { ProductoService } from 'src/app/services/producto.service'; 
@Component({
    selector: 'app-search-autocomplete',
    templateUrl: './search-autocomplete.component.html',
    styleUrls: ['./search-autocomplete.component.css']
  })
  export class SearchAutocompleteComponent implements OnInit {
  title = 'autocomplete';

  options = [];

  filteredOptions;


  formGroup : FormGroup;
  constructor(  public productoService: ProductoService, private fb : FormBuilder){}

  ngOnInit(){
    this.initForm();
    this.getNames();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'employee' : ['']
    })
    this.formGroup.get('employee').valueChanges.subscribe(response => {
      console.log('data is ', response);
      this.filterData(response);
    })
  }

  filterData(enteredData){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  getNames(){
    this.productoService.getAllSearch().subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }

  
}