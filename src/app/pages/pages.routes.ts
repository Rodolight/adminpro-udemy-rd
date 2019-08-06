import { Routes, RouterModule, CanActivate } from '@angular/router';

// Personal Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Mantenimientos Components
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';

// Guard
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';





const PAGE_ROUTES: Routes = [
    { path: '' ,
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
        { path: 'dashboard' , component: DashboardComponent, data: { titulo: 'Dashboard' } },
        { path: 'progress' , component: ProgressComponent, data: { titulo: 'Progress' }  },
        { path: 'graphic1' , component: Graphics1Component, data: { titulo: 'Graphics' }  },
        { path: 'promesas' , component: PromesasComponent , data: { titulo: 'Promises' } },
        { path: 'rxjs' , component: RxjsComponent, data: { titulo: 'Rxjs' }  },
        { path: 'account-settings' , component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }   },
        { path: 'profile' , component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }   },
        { path: 'busqueda/:termino' , component: BusquedaComponent, data: { titulo: 'Buscador' }   },
        // Mantenimientos
        {
          path: 'usuarios' ,
          component: UsuariosComponent,
          canActivate: [ AdminGuard ],
          data: { titulo: 'Mantenimiento de Usuarios' }
        },
        { path: 'hospitales' , component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' }   },
        { path: 'medicos' , component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
        { path: 'medico/:id' , component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
        { path: '' , redirectTo: '/dashboard', pathMatch: 'full' },

      ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGE_ROUTES );
