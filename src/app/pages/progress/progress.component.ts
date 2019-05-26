import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1 = 20;
  progreso2 = 30;
  limiteInferior = false;
  limiteSuperior = false;

  constructor() { }

  ngOnInit() {
  }

  updateValue( event: number ) {
    console.log('Evento: ', event );
  }

}
