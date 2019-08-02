import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'SweetAlert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor( public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario ) {

   this.usuario.nombre = usuario.nombre;
   if (!this.usuario.google) {
     this.usuario.email = usuario.email;
   }

   this.usuarioService.actualizarUsuario(this.usuario)
                      .subscribe();
  }

  selectImage( archivo: File ) {

    if (!archivo ) {
     this.imagenSubir = null;
     return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo Imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }
}
