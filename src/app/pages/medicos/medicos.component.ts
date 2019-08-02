import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import swal from 'SweetAlert';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor( public medicoService: MedicoService ) {
    this.cargarMedicos();
  }

  ngOnInit() {
    if ( this.medicoService.totalMedicos <= 5 ) {
      this.medicoService.cargarMedicos();
    } else {
      this.medicoService.desde = this.medicoService.totalMedicos - (this.medicoService.totalMedicos % 5 );
      console.log(this.medicoService.totalMedicos % 5);
      this.cambiarPagina(0);
    }
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos()
    .subscribe( medicos => this.medicos = medicos);
  }

  buscarMedicos(termino: string ) {
    if (termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedicos(termino)
                      .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {
    swal({
      title: 'Eliminar Médico',
      text: 'Está a punto de eliminar el médico ' + medico.nombre,
      icon: 'info',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true
    })
    .then((borrar: boolean) => {
      if (borrar) {
        this.medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
        if ( this.medicoService.desde === this.medicoService.totalMedicos - 1 ) {
          this.cambiarPagina(-5);
        } else {
          this.cargarMedicos();
        }
      }

    });
  }

  cambiarPagina(valor: number) {
    let pagina = this.medicoService.desde + valor;
    if ( pagina > this.medicoService.totalMedicos ) {
      return;
    }

    if ( pagina <= 0 ) {
      pagina = 0;
    }

    this.medicoService.desde = pagina;
    this.cargarMedicos();
  }
}
