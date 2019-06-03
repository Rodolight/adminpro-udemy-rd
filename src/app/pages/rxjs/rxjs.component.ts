import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

   subscription: Subscription;

  constructor() {

   this.subscription = this.regresaObservable()
     .subscribe(
        numero => console.log('Sub' + numero ),
        error => console.error('Error en el obs', error),
        () => console.log('El observador terminó')
     );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
   return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2) {
        //  // clearInterval( intervalo );
        //   observer.error('Auxilio!!');
        // }
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index ) => {
        // console.log('Filter', valor, index );
        // return true;
        if (( valor % 2 ) === 1) {
          // Impar
          return true;
        } else {
          // Par
           return false;
        }
      })
    );

  }

}
