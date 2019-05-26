import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso = 50;
  @Input() leyenda = 'Leyenda';
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Output('actualiza') changeProgress: EventEmitter<number> = new EventEmitter();

  limiteInferior = false;
  limiteSuperior = false;

  constructor() {

  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChange(newValue: number) {
    const elemHTML: any = document.getElementsByName('progreso')[0];

    if ( newValue >= 100) {
      this.progreso = 100;
    } else if ( newValue <= 0 ){
      this.progreso = 0;
    } else {
     this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.changeProgress.emit( this.progreso );
  }

  changeValue( value: number ) {

    this.progreso = this.progreso + value;

    if ( this.progreso < 5 ) {
     this.limiteInferior = true;
     this.limiteSuperior = false;
     this.progreso = 0;
     this.changeProgress.emit( this.progreso );
     return;
    }

    if ( this.progreso > 95) {
      this.limiteInferior = false;
      this.limiteSuperior = true;
      this.progreso = 100;
      this.changeProgress.emit( this.progreso );
      return;
    }

    this.limiteInferior = false;
    this.limiteSuperior = false;

    this.changeProgress.emit( this.progreso );
  }


 
}
