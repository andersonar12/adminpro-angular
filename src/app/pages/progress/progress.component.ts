import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  /* porcentaje:number = 70; */
  progreso1:number = 50;
  progreso2:number = 40;

  constructor() { }

  ngOnInit(){
  }

/*   actualizar(event:number){
    console.log('Evento: ', event);
    
  }
 */
}
