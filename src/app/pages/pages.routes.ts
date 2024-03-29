import { RouterModule, Routes } from "@angular/router";
import { RxjsComponent } from '../components/rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes:Routes = [
    {
        path:'',
        component:PagesComponent,
        canActivate: [LoginGuardGuard],
        children:[
            {path:'dashboard',component:DashboardComponent, data: {titulo: 'Dahsboard'} },
            {path:'progress',component:ProgressComponent, data: {titulo: 'Progress'}},
            {path:'graficas1',component:Graficas1Component, data: {titulo: 'Graficas'}},
            {path:'promesas',component:PromesasComponent, data: {titulo: 'Promesas'}},
            {path:'account-settings',component:AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
            {path:'perfil',component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
            {path:'rxjs',component:RxjsComponent, data: {titulo: 'RxJs'}},

            /* Mantenimientos */
            {path:'usuarios',component:UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},

            {path:'',redirectTo:'/dashboard', pathMatch:'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );