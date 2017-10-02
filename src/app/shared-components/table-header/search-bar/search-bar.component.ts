import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() onSearch = new EventEmitter<string>();

  searchTerm: string;

  constructor() { }

  ngOnInit() { }

  search() {
    this.onSearch.emit(this.searchTerm);
  }
}
