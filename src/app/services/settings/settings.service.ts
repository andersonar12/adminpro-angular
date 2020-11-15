import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes ={
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  }


  constructor() { this.cargarAjustes();}

  guardarAjustes(){
    /* console.log('Guardado en el localstorage'); */
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  cargarAjustes() {

    if(localStorage.getItem('ajustes')){

      this.ajustes = JSON.parse(localStorage.getItem('ajustes')) ;

      /* console.log('cargando del localstorage'); */

      console.log(this.ajustes.tema);

      this.aplicarTema(this.ajustes.tema)

    } else{

      console.log('Usando valores por defecto');
    }
  }

  aplicarTema(color){

    let URL = 'assets/css/colors/' + color + '.css';
    
    document.getElementById('tema').attributes[1].value = URL;

    /* Guardamos nuestro color selecciondo en el local storage */

    this.ajustes.tema = color;
    this.ajustes.temaUrl = URL;

    this.guardarAjustes();

    /* Guardamos nuestro color selecciondo en el local storage */

  }
}

interface Ajustes {
  temaUrl:string;
  tema: string
}