import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'LeyendaComponent';
  @Input() porcentaje: number;

  @Output('actualizaValor') cambioValor: EventEmitter<Number> = new EventEmitter();
  
  constructor() { }

  ngOnInit() { }

  onChanges( newValue:number){
    
    let elemHTML:any = this.txtProgress.nativeElement.value;

    console.log(elemHTML);
    
      if (newValue >= 100) {
        this.porcentaje = 100;
      } else if (newValue <=0 ) {
        this.porcentaje = 0;
      } else {
        this.porcentaje = newValue;
      }

    elemHTML = this.porcentaje;

    this.cambioValor.emit( this.porcentaje );
    
    this.txtProgress.nativeElement.focus();
  }

  cambiarValor(valor: number){

    if (this.porcentaje >= 100 && valor > 0) {
        this.porcentaje = 100;
        return;
    }

    if (this.porcentaje <= 0 && valor < 0 ) {
        this.porcentaje = 0;
      return;
    }

    this.porcentaje += valor;

    this.cambioValor.emit( this.porcentaje );
  }

}
