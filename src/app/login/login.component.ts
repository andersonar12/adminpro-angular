import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router:Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    } 

  }

  googleInit(){

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        clien_id: '293913817463-392dna6ngllph8g3f6l121f1b7hh3o98.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle') );


    })
  }

  attachSignin( element ){

    this.auth2.attachClickHandler(element, {}, ( googleUser ) => {

      /* let profile = googleUser.getBasicProfile(); */

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token ).subscribe( resp => window.location.href = '#/dashboard' );
      
    } );
  }

  ingresar( forma: NgForm){

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame ).subscribe( correcto => this.router.navigate(['/dashboard']))

    console.log(forma);
    /* this.router.navigate(['/dashboard']); */

  }
}
