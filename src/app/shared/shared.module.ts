import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule( {
   declarations: [
     NopagefoundComponent,
     HeaderComponent,
     BreadcrumbsComponent,
     SidebarComponent
   ],
   imports: [
     RouterModule,
     CommonModule,
     PipesModule
   ],
   exports: [
    NopagefoundComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
   ]

} )

export class SharedModule {}
