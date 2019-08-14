import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';




@NgModule( {
   declarations: [
     NopagefoundComponent,
     HeaderComponent,
     BreadcrumbsComponent,
     SidebarComponent,
     ModalUploadComponent
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
    SidebarComponent,
    ModalUploadComponent
   ]

} )

export class SharedModule {}
