import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';


declare var $:any;
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;

  valid:boolean = true;

  constructor( public _usuarioService: UsuarioService, 
    public router: Router) { }

  sonIguales( campo1:string, campo2: string){

    return ( group:FormGroup) =>{

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      };
    };

  }

  ngOnInit() {

    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required ),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required ),
      password2: new FormControl(null, Validators.required ),
      condiciones: new FormControl( false ),
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    })

}

registrarUsuario(){

  this.valid = this.forma.valid;

  if( !this.forma.value.condiciones ){
    
      Swal.fire(
        'Importante',
        'Debes aceptar las condiciones',
        'warning'
      )
      return;
  }
  
  let usuario = new Usuario(
    this.forma.value.nombre, 
    this.forma.value.correo,
    this.forma.value.password
  )

  this._usuarioService.crearUsuario( usuario)
  .subscribe( resp => {
    this.router.navigate(['/login']).then( (resp:any) =>{
                  
                                      Swal.fire(
                                        'Usuario Creado',
                                          this.forma.value.correo,
                                          'success')
                                                              }         
    )});
  

}

}