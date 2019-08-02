import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'SweetAlert';
import { Medico } from '../../models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;
  desde = 0;

  constructor( public http: HttpClient,
               public usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico?desde=' + this.desde;

    return this.http.get( url )
    .pipe(map( (resp: any ) => {
     this.totalMedicos = resp.total;
     return resp.medicos;
    }));
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
        .pipe( map( (resp: any) => {
          this.totalMedicos = resp.medicos.length;
          return resp.medicos;
        }));
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url)
    .pipe(map((resp: any) => {
     swal('Médico Eliminado', 'El medico fue eliminado correctamente', 'success');
    }));
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    url += '/' + medico._id;
    url += '?token=' + this.usuarioService.token;

    if ( medico._id) {
      // Actualizando

      return this.http.put(url, medico)
      .pipe(map( (resp: any) => {
        swal('Médico Actualizado', medico.nombre , 'success');
        return resp.medico;
      }));
    } else {
     // Creando
     return this.http.post(url, medico)
     .pipe(map( (resp: any) => {
       swal('Médico Creado', medico.nombre , 'success');
       return resp.medico;
     }));
    }
    }


  cargarMedico( id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
            .pipe(map((resp: any) => resp.medico ));
  }
}
