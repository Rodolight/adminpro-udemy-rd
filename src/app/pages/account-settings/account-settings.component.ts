import { Component, OnInit, Inject, ElementRef } from '@angular/core';

import { SettingsService } from '../../services/service.index';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settings: SettingsService ) {
    this.settings.cargarAjustes();
  }

  ngOnInit() {
    this.colocarCheck();
  }

cambiarColor( tema: string, link: any ) {

 this.aplicarCheck(link);
 this.settings.aplicarTema( tema );

}


   aplicarCheck( link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores ) {

      ref.classList.remove('working');

    }

    link.classList.add('working');
   }

   colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.settings.ajustes.tema;

    for ( const ref of selectores ) {
     if ( ref.getAttribute('data-theme') === tema ) {
       ref.classList.add('working');
       break;
     }
    }

   }
}
