import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared/shared.service';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
