import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModaluploadService } from '../../components/modal-upload/modalupload.service';


declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospital: Hospital;
  imagenSubir: File;
  imagenTemp: string;

  // Parametros para búsquedas
  hospitales: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;


  constructor( public hospitalService: HospitalService,
               public modaluploadService: ModaluploadService) {

  }

  ngOnInit() {
    this.obtenerHospitales();
    this.modaluploadService.notificacion
          .subscribe( () => this.obtenerHospitales() );
  }

  obtenerHospitales() {
    this.hospitalService.cargarHopitales(this.desde )
           .subscribe( (resp: any ) => {
             this.totalRegistros = resp.total;
             this.hospitales = resp.hospital;
             this.cargando = false;
           });
  }

  cambiarPagina( valor: number ) {
    const pagina = this.desde + valor;
    if ( pagina >= this.totalRegistros ) {
      return;
    }

    if ( pagina < 0 ) {
      return;
    }
    this.desde += valor;
    this.obtenerHospitales();
  }

  agregarHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Nombre Del Hospital',
      content: 'input',
      buttons: ['Cancelar', 'Guardar'],
      icon: 'info'
    })
    .then((value: boolean) => {
      if (value) {
        this.hospital = new Hospital(
         `${value}`
        );

        this.hospitalService.crearHospital(this.hospital)
            .subscribe(() => {
              if ( this.totalRegistros <= 5 ) {
                this.obtenerHospitales();
              } else {
                this.desde = this.totalRegistros - (this.totalRegistros % 5 );
                this.cambiarPagina(0);
              }
            });
      }
    });
  }

  buscarHospital( parametro: string ) {

    if ( parametro.length <= 0 ) {
      this.obtenerHospitales();
      return;
    }

    this.cargando = true;
    this.hospitalService.buscarHospital( parametro, this.desde)
         .subscribe((hospitales: Hospital[]) => {
           this.hospitales = hospitales;
           this.totalRegistros = this.hospitales.length;
           this.cargando = false;
         });
  }

  actualizaHospital(hospital: Hospital ) {
    this.hospitalService.actualizaHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    swal({
       title: '¿Estás Seguro?',
       text: 'Está a punto de eliminar el hospital ' + hospital.nombre ,
       buttons: ['Cancelar', 'Eliminar'],
       dangerMode: true,
       icon: 'warning'
    })
     .then ((borrar: boolean) => {
      if (borrar) {
        this.hospitalService.borrarHospital(hospital._id)
            .subscribe( () => {
              if ( this.desde === this.totalRegistros - 1 ) {
                this.cambiarPagina(-5);
              } else {
                this.obtenerHospitales();
              }
            });

      } else {

      }
     });
  }

  cambiarImagen(id: string ) {
   console.log('imagen');
   this.modaluploadService.mostrarModal('hospitales', id);
  }
}
