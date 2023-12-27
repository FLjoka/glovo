import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.sass']
})
export class InformeComponent implements OnInit {
  @Input() informe : any
  sample  = [
    {
      id : 220 ,
      date : new Date(),
      version : "Lorem ipsum dolor ",
      downloads: 22
    },
    {
      id : 1345 ,
      date : new Date(),
      version : "Lorem ipsum dolor ",
      downloads: 22
    },
    {
      id : 210 ,
      date : new Date(),
      version : "Lorem ipsum dolor ",
      downloads: 22
    },
    {
      id : 430 ,
      date : new Date(),
      version : "Lorem ipsum dolor ",
      downloads: 22
    }
  ]
  data :any[] = [];
  buscando = true;
  constructor(public general: GeneralService, private auth : AuthService, private http : HttpClient) { }

  ngOnInit(): void {    
  this.http.get(this.informe.detailUrl,this.auth.options).subscribe( (resp : any ) => {
    this.buscando = false;
    this.data = resp;
  }, error => {
    this.buscando = false;
  })

  }
  ngAfterViewInit() {

  }
  
  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  descargar(url: string) {
    this.general.downCode.show(( pass : string ) => {
      this.downGen("assets/bici.png");
    });

    /*
    if (this.general.dialog)
      this.general.dialog.show(this.general.getText({ en: "Confirmation", es: "Confirmación" }),
        this.general.getText({ en: "You are trying to download a report, do you want to continue?", es: "Estás intentando descargar un informe, ¿quieres continuar?" }),
        this.general.getText({ en: "Accept", es: "Aceptar" }),
        this.general.getText({ en: "Cancel", es: "Cancelar" }),
        () => {
          console.log("archivo descargado");
          this.downGen("assets/bici.png");
        })
        */
  }
}
