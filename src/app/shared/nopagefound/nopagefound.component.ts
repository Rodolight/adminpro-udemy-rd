import { Component, OnInit } from '@angular/core';

declare function init_plugins(): any;

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {
 anio = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
