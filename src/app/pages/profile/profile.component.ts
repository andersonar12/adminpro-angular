import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService} from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _usuarioService:UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  guardar(usuario:Usuario){
    
    this.usuario.nombre = usuario.nombre;

    if (this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen( archivo:File ){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    
  /*   console.log(archivo); */

    if( archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen','error');
      this.imagenSubir = null;
      return;
    }
    
    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen(){

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
