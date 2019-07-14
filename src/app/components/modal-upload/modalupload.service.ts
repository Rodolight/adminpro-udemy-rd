import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModaluploadService {

  public tipo: string;
  public id: string;

  public oculto = 'hide';
  public notificacion = new EventEmitter<any>();

  constructor() {
   }

   ocultarModal() {
    this.oculto = 'hide';
    this.tipo = null;
    this.id = null;
   }

   mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
   }
}
