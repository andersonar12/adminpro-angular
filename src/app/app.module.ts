import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { APP_ROUTES } from './app.routes';

import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { RxjsComponent } from './components/rxjs/rxjs.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RxjsComponent
  ],
  imports: [
    PagesModule,
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
