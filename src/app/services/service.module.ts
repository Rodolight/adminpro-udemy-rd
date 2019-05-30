import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[SidebarService, SettingsService, SharedService]
})
export class ServiceModule { }
