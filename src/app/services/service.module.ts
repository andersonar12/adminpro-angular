import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared/shared.service';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SharedService,
    SettingsService,
    SidebarService
  ]
})
export class ServiceModule { }
