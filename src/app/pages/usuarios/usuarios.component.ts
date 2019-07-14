import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModaluploadService } from '../../components/modal-upload/modalupload.service';


declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor( public usuarioService: UsuarioService,
               public modaluploadService: ModaluploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modaluploadService.notificacion
          .subscribe( () => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
   this.modaluploadService.mostrarModal('usuarios', id );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
          .subscribe( ( resp: any ) => {
           this.totalRegistros = resp.total;
           this.usuarios = resp.usuarios;
           this.cargando = false;
          });
  }

  cambiarPagina( valor: number ) {
    const pagina = this.desde + valor;
    console.log(pagina);

    if ( pagina >= this.totalRegistros ) {
      return;
    }

    if ( pagina < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino, this.desde)
    .subscribe( ( usuarios: Usuario[]) => {
      this.usuarios = usuarios;
     // this.totalRegistros = usuarios.length;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this.usuarioService.usuario._id ) {
     swal('Error al eliminar usuario', 'Por seguridad no se permite eliminar a si mismo.', 'error');
     return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar: boolean) => {
      if (borrar) {

        this.usuarioService.borrarUsuario( usuario._id )
                            .subscribe( borrado => {
                             console.log(borrado);
                             if ( this.desde === this.totalRegistros - 1)  {
                               this.cambiarPagina(-5);
                             } else {
                               this.cargarUsuarios();
                             }
                            });
      } else {

      }
    });


  }

  guardarUsuario( usuario: Usuario ) {
    this.usuarioService.actualizarUsuario( usuario).subscribe();
  }

}
