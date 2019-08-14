import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

//import { TerminosComponent } from './login/terminos.component';

const APPROUTES: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: 'register' , component: RegisterComponent },
    { path: '' ,
      component: PagesComponent,
      canActivate: [ LoginGuardGuard ],
      loadChildren: './pages/pages.module#PagesModule'
    },
   // { path: 'terminos' , component: TerminosComponent },
    { path: '**' , component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( APPROUTES, {useHash: true } );
