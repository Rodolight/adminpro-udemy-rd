import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModaluploadService } from '../components/modal-upload/modalupload.service';

import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         HospitalService,
         MedicoService,
         LoginGuardGuard,
         AdminGuard,
         VerificaTokenGuard
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
              AdminGuard,
              VerificaTokenGuard,
              UsuarioService,
              HospitalService,
              MedicoService,
              ModaluploadService ]
})
export class ServiceModule { }
