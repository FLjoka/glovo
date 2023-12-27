import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'return-email',
  templateUrl: './return-email.component.html',
  styleUrls: ['./return-email.component.sass']
})
export class ReturnEmailComponent implements OnInit {
  correo : string = ""
  view = false;

  @Input() reset: Function = ( pass : any )=> {
    console.log(pass);
  }

  constructor(public general : GeneralService, ) { }

  cancel(){
    this.view = false;
  }

  public show( correo : string, reset : Function ){
    this.correo = correo;
    this.view = true;
    this.reset = reset;
  } 
  
  ir(){
    this.view = false;
    this.reset(this.correo)
  }

  ngOnInit(): void {

  }

}
