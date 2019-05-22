import { Routes , RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';





const PAGE_ROUTES: Routes = [
    { path: '' ,
    component: PagesComponent,
    children: [
        { path: 'dashboard' , component: DashboardComponent },
        { path: 'progress' , component: ProgressComponent },
        { path: 'graphic1' , component: Graphics1Component },
        { path: '' , redirectTo: '/dashboard', pathMatch: 'full' },

      ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGE_ROUTES )