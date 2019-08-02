import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModaluploadService } from 'src/app/components/modal-upload/modalupload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

 hospitales: Hospital [] = [];
 medico: Medico = new Medico('', '', '', '', '');
 hospital: Hospital = new Hospital('');

  constructor( public medicoService: MedicoService,
               public hospitalService: HospitalService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public modalUploadService: ModaluploadService
               ) {
                 activateRoute.params.subscribe( parametros => {

                  const id = parametros.id;
                  if ( id !== 'nuevo') {
                     this.cargarMedico(id);
                   }
                 });
                }

  ngOnInit() {
    this.hospitalService.cargarHopitales().subscribe(hospitales => this.hospitales = hospitales.hospital);
    this.modalUploadService.notificacion.subscribe( resp => this.medico.img = resp.medicoActualizado.img);
  }

  guardarMedico(f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this.medicoService.guardarMedico(this.medico)
                      .subscribe( medico => {
                       this.medico._id = medico._id;
                       this.router.navigate(['/medico', medico._id ]);
                      });
  }

  cambioHospital( id: string ) {
    this.hospitalService.obtenerHospital(id)
                         .subscribe( hospital => this.hospital = hospital);
  }

  cargarMedico(id: string ) {
    this.medicoService.cargarMedico(id)
         .subscribe( medico => {
           this.medico = medico;
           this.medico.hospital = medico.hospital._id;
           this.cambioHospital(this.medico.hospital);
          });
  }

  cambiarFoto() {
   this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
