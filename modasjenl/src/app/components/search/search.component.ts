import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.search.valueChanges
    .pipe(
      debounceTime(300)    //que se espere el buscador 300 ms para buscar
    )
    .subscribe( value=> this.searchEmitter.emit(value))

  }


  search = new FormControl()

  @Output('search') searchEmitter = new EventEmitter<string>();






}
