import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModaluploadService } from '../components/modal-upload/modalupload.service';


import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         LoginGuardGuard
        } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SidebarService,
              SettingsService,
              SharedService,
              LoginGuardGuard,
              UsuarioService,
            ModaluploadService ]
})
export class ServiceModule { }
