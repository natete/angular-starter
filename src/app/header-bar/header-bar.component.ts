import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  @Output() onSearchTermChange = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit() { }

  handleNewSearchTerm(searchTerm: string) {
    this.onSearchTermChange.emit(searchTerm);
  }
}
