import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlovoInfoComponent } from 'src/app/componentes/glovo-info/glovo-info.component';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-organization-charts',
  templateUrl: './organization-charts.component.html',
  styleUrls: ['./organization-charts.component.sass']
})
export class OrganizationChartsComponent implements OnInit {
  paises = 21;
  ciudades = 876;
  page = ( e : any,data : any )=> {
    document.getElementById("cd")!.style.top = e.y  +"px";
    document.getElementById("cd")!.style.left = e.x +"px";
    this.general.info.foco();
    var traducido= {
      code : data.code,
      content : this.general.getText( data.content),
      name : this.general.getText(data.name),
      ciudad : this.general.getText(data.ciudad)
    }
    this.general.info.data = traducido;
  }
buscando : boolean = false;
imagenes : any[] = [];
@ViewChild ( "map" ) mapa! : MapaComponent;
  graficos: string[] = ["assets/glovo/Recurso 28Kanban.png", "assets/glovo/Recurso 29Kanban.png", "assets/glovo/Recurso 30Kanban.png"];
  constructor(public general : GeneralService , private route : Router, private auth : AuthService, private http : HttpClient,private sanitizer:DomSanitizer) {
    this.charts();
    this.general.lenguage.subscribe( resp => {
      this.charts()
    })
   }
  contador  = () => {
    const pop = document.getElementById("mapacontent");
    if(pop){
      const coords = pop!.getBoundingClientRect();
      if ((window.innerHeight - 20) > coords.top)
        this.setContador();
    }
  };
  ngOnInit(): void {

    window.scrollTo(0, 0)
  }

  charts(){
    this.buscando = true;
    this.http.get(this.general.api + "organizationalcharts",this.auth.options).subscribe( (arr : any[]| any )=> {
      this.imagenes = [];
      this.general.charts = { idioma : this.general.idioma(), imagenes: [] }
      arr.forEach((element: any) => {
      var blob = "data:"+element.mime_type +";base64," + element.image;
        this.general.charts.imagenes.push(blob);
      });
      this.buscando = false 
    }, error => {
      this.buscando = false;
      console.log(error);
      
    })
  }
ngOnDestroy(){



}
  setContador() {

  }
}
