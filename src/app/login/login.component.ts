import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(): any;
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;

  auth2: any;


  constructor( public router: Router,
               private ngZone: NgZone,
               public usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }

  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '649062693692-9256s4e0vi52n8p5migm35kdkh1bnlqo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });

  }

  attachSignin( element: any ) {

    this.auth2.attachClickHandler( element, {}, (googleUser: any ) => {

      const token = googleUser.getAuthResponse().id_token;

      this.ngZone.run(() =>  this.usuarioService.loginGoogle( token )
             .subscribe( () => this.router.navigate(['/dashboard'])));
    });
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password );

    this.usuarioService.login( usuario, forma.value.recuerdame )
             .subscribe( () => this.router.navigate(['/dashboard']) );

  }
}
