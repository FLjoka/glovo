import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'glovo-confirm',
  templateUrl: './glovo-confirm.component.html',
  styleUrls: ['./glovo-confirm.component.sass']
})
export class GlovoConfirmComponent implements OnInit {
  title: string = "Confirmation";
  description: string | any = "Esta intentando descargar un reporte desea continuar";
  view = false;
  acceptText = "Accept";
  cancelText : string | undefined = "Cancel";
  private confirm: Function | undefined;
  private can : Function | undefined;
  constructor() { }

  ngOnInit(): void {

  }
  cancel() {
    this.view = false;
    if(this.can)
      this.can();
  }
  acept() {
    if (this.confirm)
      this.confirm();
    this.view = false;
  }

  show(title: string, description: string, accept : string , cancel : string | undefined , confirm: Function, can ? : Function ) {
    this.title = title;
    this.acceptText =  accept;
    this.cancelText = cancel;
    this.description = description;
    this.confirm = confirm;
    this.can = can;
    this.view = true;
    
  }

  isArray(){
   return Array.isArray(this.description);
  }
  toArray(){
    var arr : Array<string> = [];
    for (const property in this.description) {
      arr.push (  "* " + `${property}: ${this.description[property]}` );
    }
    this.description = arr as Array<string>;
  }
  typeof( val : any) {  
    return typeof ( val ); 
  }
}
