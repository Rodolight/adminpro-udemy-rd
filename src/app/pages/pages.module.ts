 import { NgModule } from '@angular/core';

 // Modulos
 import { SharedModule } from '../shared/shared.module';
 import { FormsModule } from '@angular/forms';

 // ng2-charts
 import { ChartsModule } from 'ng2-charts';

 // Componentes
 import { PagesComponent } from './pages.component';
 import { DashboardComponent } from './dashboard/dashboard.component';
 import { ProgressComponent } from './progress/progress.component';
 import { Graphics1Component } from './graphics1/graphics1.component';

 import { PAGES_ROUTES } from './pages.routes';

 // temporal
 import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
 import { GraficodonaComponent } from '../components/graficodona/graficodona.component';
 import { AccountSettingsComponent } from './account-settings/account-settings.component';


 @NgModule( {
     declarations: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graphics1Component,
      IncrementadorComponent,
      GraficodonaComponent,
      AccountSettingsComponent
     ],
     exports: [
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
     ],
     imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
     ]
    } )

    export class PagesModule {}

