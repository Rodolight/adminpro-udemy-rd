import { Routes , RouterModule } from '@angular/router';

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

// Guard
import { LoginGuardGuard } from '../services/guards/login-guard.guard';





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
        // Mantenimientos
        { path: 'usuarios' , component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }   },
        { path: '' , redirectTo: '/dashboard', pathMatch: 'full' },

      ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGE_ROUTES );
