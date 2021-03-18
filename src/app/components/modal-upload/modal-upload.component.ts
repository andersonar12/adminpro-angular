import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(public _subirArchivoService:SubirArchivoService,
                public _modalUploadService:ModalUploadService) { }

  ngOnInit(): void {
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

    this.imagenSubir = archivo;
    
    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo, this._modalUploadService.id).then(resp =>{

      this._modalUploadService.notificacion.emit( resp )

      this.cerrarModal()

    }).catch(error => console.log(error))
  }

  cerrarModal(){
    this.imagenTemp = null
    this.imagenSubir = null

    this._modalUploadService.ocultarModal()
  }

}
