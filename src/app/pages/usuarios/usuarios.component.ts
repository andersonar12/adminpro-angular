import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuarioSevice: UsuarioService,
            public _modalUploadService: ModalUploadService  
  ) { }

  ngOnInit() {

    this.cargarUsuarios()

    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios())

  }

  mostrarModal( id:string ){

    this._modalUploadService.mostrarModal('usuarios', id)
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioSevice.cargarUsuarios( this.desde )
                  .subscribe( (resp:any) =>{
                   
                    this.totalRegistros = resp.total;
                    this.usuarios = resp.usuarios;
                    this.cargando = false;
                  })
  }

  cambiarDesde( valor:number){

    let desde = this.desde + valor;
     
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return
    }

    if( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino:string ){

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioSevice.buscarUsuarios( termino )
                        .subscribe( (usuarios:any) => {

                         /*  console.log( usuarios); */

                          this.usuarios = usuarios;
                          this.cargando = false;
                          
                        });
  }

  borrarUsuario( usuario:Usuario ){
    
    if (usuario._id === this._usuarioSevice.usuario._id ){
      Swal.fire('No puede borrar Usuario','No se puede borrar mismo usuario logueado', 'error');
      return;
    }

    Swal.fire({

      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {

        this._usuarioSevice.borrarUsuario(usuario._id )
                          .subscribe( resp => {
                            
                            /* console.log(resp); */
                            this.cargarUsuarios();

                            Swal.fire(
                              'Borrado',
                              'El usuario seleccionado ha sido borrado',
                              'success'
                            )
                            
                          })
                          
                        }
                      })
  }

  guardarUsuario( usuario:Usuario ){
    this._usuarioSevice.actualizarUsuario(usuario).subscribe();
  }
}
