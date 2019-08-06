import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../../services/service.index';
import { HospitalService } from '../../services/service.index';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital [] = [];
  medicos: Medico [] = [];

  constructor( public activatedRoute: ActivatedRoute,
               public http: HttpClient,
               public usuarioService: UsuarioService ,
               public hospitalService: HospitalService,
               public router: Router) {
    this.activatedRoute.params.subscribe( parametro => {
    const termino = parametro.termino;
    this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    termino = termino.trimLeft();
    if ( termino.length > 0 && termino !== ' '  ) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    });
  } else {
    this.usuarioService.nombreUsuario = '';
    this.hospitalService.nombreHospital = '';
    this.usuarios = [];
    this.hospitales = [];
    this.medicos = [];
  }

  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.nombreUsuario = usuario.nombre;
    this.router.navigate(['/usuarios']);
  }

  editarHospital( nombre: string ) {
    this.hospitalService.nombreHospital = nombre;
    this.router.navigate(['/hospitales']);
  }

}
