import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import swal from 'SweetAlert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  totalHospitales = 0;
  nombreHospital = '';

  constructor( public http: HttpClient,
               public usuarioService: UsuarioService) { }

  cargarHopitales(desde = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
       .pipe(map((resp: any) => {
       // this.totalHospitales = resp.total;
        return resp;
       }));
  }

  crearHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.usuarioService.token;
    hospital.id = this.usuarioService.usuario._id;
    return this.http.post( url, hospital)
          .pipe(map( (resp: any) => {
            swal('Agregado Correctamente!', hospital.nombre, 'success');
            return true;
          }));
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map( ( resp: any ) => resp.hospital));
  }

  buscarHospital(parametro: string, desde = 0) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + parametro + '?desde=' + desde;
    return this.http.get(url).pipe( map ( (resp: any) => resp.hospitales ));
  }

  actualizaHospital( hospital: Hospital ) {
   let url = URL_SERVICIOS + '/hospital/' + hospital._id;
   url += '?token=' + this.usuarioService.token;

   hospital.id = this.usuarioService.usuario._id;

   return this.http.put( url, hospital)
         .pipe(map( (resp: any) => {
          swal('Actualizado Correctamente!', hospital.nombre, 'success');
          return true;
         }));
  }

  borrarHospital( id: string ) {
   let url = URL_SERVICIOS + '/hospital/' + id;
   url += '?token=' + this.usuarioService.token;

   return this.http.delete(url)
   .pipe( map( resp => {
    swal('Hospital Borrado', 'El hospital ha sido eliminado correctamente', 'success');
    return true;
   }));
  }
}
