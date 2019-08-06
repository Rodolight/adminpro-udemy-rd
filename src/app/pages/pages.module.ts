 import { NgModule } from '@angular/core';

 // Modulos
 import { CommonModule } from '@angular/common';
 import { SharedModule } from '../shared/shared.module';
 import { FormsModule } from '@angular/forms';

 // ng2-charts
 import { ChartsModule } from 'ng2-charts';

 // Componentes
 import { PagesComponent } from './pages.component';
 import { DashboardComponent } from './dashboard/dashboard.component';
 import { ProgressComponent } from './progress/progress.component';
 import { Graphics1Component } from './graphics1/graphics1.component';

 // Ruotes
 import { PAGES_ROUTES } from './pages.routes';

 // Pipes Module
 import { PipesModule } from '../pipes/pipes.module';


 // temporal
 import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
 import { GraficodonaComponent } from '../components/graficodona/graficodona.component';
 import { AccountSettingsComponent } from './account-settings/account-settings.component';
 import { PromesasComponent } from './promesas/promesas.component';
 import { RxjsComponent } from './rxjs/rxjs.component';
 import { ProfileComponent } from './profile/profile.component';
 import { UsuariosComponent } from './usuarios/usuarios.component';
 import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
 import { HospitalesComponent } from './hospitales/hospitales.component';
 import { MedicosComponent } from './medicos/medicos.component';
 import { MedicoComponent } from './medicos/medico.component';
 import { BusquedaComponent } from './busqueda/busqueda.component';


 @NgModule( {
     declarations: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graphics1Component,
      IncrementadorComponent,
      GraficodonaComponent,
      AccountSettingsComponent,
      PromesasComponent,
      RxjsComponent,
      ProfileComponent,
      UsuariosComponent,
      ModalUploadComponent,
      HospitalesComponent,
      MedicosComponent,
      MedicoComponent,
      BusquedaComponent
     ],
     exports: [
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
     ],
     imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
     ]
    } )

    export class PagesModule {}

