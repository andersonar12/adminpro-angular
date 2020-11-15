import { Component, OnInit } from '@angular/core';
import { FileDetector } from 'protractor';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { pathToFileURL } from 'url';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes:SettingsService) { }

  ngOnInit(){
    this.colocarCheck();
  }

  cambiarColor(colorSeleccionado){

    let color = colorSeleccionado.target.attributes[0].value

    console.log(color);

    /* Esta funcion viene desde el servicio "settings.service" */
    this._ajustes.aplicarTema(color);

    /* Aplicamos el Check del selector el class "working" */
    let selectores:any = document.getElementsByClassName('selector');

    for (let index = 0; index < selectores.length; index++) {
      const element = selectores[index];

      element.classList.remove('working');
    }
  
    colorSeleccionado.target.classList.add('working');
    /* Aplicamos el Check del selector el class "working" */

  }

  colocarCheck(){
    
    let tema = this._ajustes.ajustes.tema;

    let selectores:any = document.getElementsByClassName('selector');

    for (let index = 0; index < selectores.length; index++) {

      const element = selectores[index];

      element.classList.remove('working');

      if (tema == element.getAttribute('data-theme')) {
        element.classList.add('working');
      }
    }

  }

}
