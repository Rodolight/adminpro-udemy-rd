import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import swal from 'SweetAlert';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModaluploadService } from './modalupload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})

export class ModalUploadComponent implements OnInit {

  @ViewChild('fileName') myInput: ElementRef;

  imagenSubir: File;
  imagenTemp: string;

  oculto = '';
  constructor( public subirArchivoService: SubirArchivoService,
               public modaluploadService: ModaluploadService) { }

  ngOnInit() {
    console.log('Modal listo');
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.myInput.nativeElement.value = '';
    this.modaluploadService.ocultarModal();
  }


  subirImagen() {
  this.subirArchivoService.subirArchivo( this.imagenSubir, this.modaluploadService.tipo, this.modaluploadService.id )
        .then( resp => {
         this.modaluploadService.notificacion.emit(resp);
         this.cerrarModal();
        })
        .catch( err => {
          console.log('Error en la carga...');
        });
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

}
