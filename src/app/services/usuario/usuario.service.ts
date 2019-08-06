import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';


import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
//import { Observable } from 'rxjs/internal/observable';
import swal from 'SweetAlert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  nombreUsuario = '';

  constructor( public http: HttpClient,
               public router: Router,
               public subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

   logout() {
     this.usuario = null;
     this.token = '';

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');

     this.router.navigate(['/login']);
   }

  loginGoogle( token: string ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
        .pipe( map( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

          return true;
        }));

  }

   login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
           .pipe(map( (resp: any ) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
            return true;
           }))
           .pipe(catchError( err => {
            swal('Error en el login', err.error.mensaje, 'error');
            return `${console.log(err)}`;
           }));

   }

    crearUsuario( usuario: Usuario) {

     const url = URL_SERVICIOS + '/usuario';

     return this.http.post( url, usuario).pipe(map( (resp: any ) => {

            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          })
     )
     .pipe(catchError( err => {
      swal( err.error.mensaje, err.error.errors.message, 'error');
      return `${console.log(err)}`;
     }));

    }

   actualizarUsuario(usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario )
          .pipe( map( (resp: any) => {
            if ( usuario._id === this.usuario._id ) {
            const usuarioDB: Usuario = resp.usuario;
            this.guardarStorage(usuarioDB._id, this.token, usuarioDB,this.menu);
            }
            swal('Usuario Actualizado', usuario.nombre, 'success');
            return true;
          }))
          .pipe(catchError( err => {
            swal( err.error.mensaje, err.error.errors.message, 'error');
            return `${console.log(err)}`;
           }));
   }

   cambiarImagen( archivo: File, id: string ) {

    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
           .then( (resp: any) => {
             this.usuario.img = resp.usuarioActualizado.img;
             this.guardarStorage(id, this.token, this.usuario, this.menu );
             swal('Imagen Actualizada', this.usuario.nombre, 'success');

           })
           .catch( resp => {
             console.log(resp);
           });
   }

   cargarUsuarios( desde = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
   }

   buscarUsuario( termino: string, desde = 0 ) {
     const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino + '?desde=' + desde;
     return this.http.get(url).pipe( map ( (resp: any) => resp.usuarios));
   }

   borrarUsuario( id: string ) {
     let url = URL_SERVICIOS + '/usuario/' + id;
     url += '?token=' + this.token;

     return this.http.delete(url)
         .pipe( map ( resp => {
            swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
            return true;
         }));
   }
}
