import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'chart-new',
  templateUrl: './newChart.component.html',
  styleUrls: ['./newChart.component.sass']
})

export class NewChartComponent implements OnInit {
  @ViewChild("chartEspañol") chartEs!: HTMLInputElement
  @ViewChild("chartIngles") chartEn!: HTMLInputElement
  @Input() back : Function = () => { 
   }
  nuevo :{
    title : {
      es:string,
      en: string
    },
    image:{
      es: any ,
      en: any
    }
  } = {
    title : {
      es: "",
      en:""
    },
    image:{
      es: null ,
      en: null
    }
  }
  prevEs : any;
  loadEs = false;
  prevEn : any;
  loadEn = false;
  
  constructor(public general: GeneralService , private http : HttpClient, private auth : AuthService ) { }
  
  ngOnInit(): void {

  }
  onImageLoadEn(){
    var width = (document.getElementById("prevEn") as HTMLImageElement).naturalWidth ;
    if( width  <= 10240 ){
      if( ! (width >= 800 )){
        this.general.dialog!.show("",this.general.getText({ es : "La imagen no puede ser menor a 800px", en : "The image cannot be smaller than 800px"}),this.general.getText({es:"Aceptar",en:"Ok"}), undefined ,( ) => {}  )
        this.prevEn = undefined;
        this.nuevo.image.en = null;
      }
    } else {
      this.general.dialog!.show("",this.general.getText({ es : "La imagen no puede ser mayor a 10240px", en : "Image cannot be larger than 10240px"}),this.general.getText({es:"Aceptar",en:"Ok"}), undefined ,( ) => {}  )
      this.prevEn = undefined;
      this.nuevo.image.en = null;
    }
    
  }
  onImageLoad(){
    var width = (document.getElementById("prevEs") as HTMLImageElement).naturalWidth ;
    if( width  <= 10240 ){
      if( ! (width >= 800 )){
        this.general.dialog!.show("",this.general.getText({ es : "La imagen no puede ser menor a 800px", en : "The image cannot be smaller than 800px"}),this.general.getText({es:"Aceptar",en:"Ok"}), undefined ,( ) => {}  )
        this.prevEs = undefined;
        this.nuevo.image.es = null;
      }
    } else {
      this.general.dialog!.show("",this.general.getText({ es : "La imagen no puede ser mayor a 10240px", en : "Image cannot be larger than 10240px"}),this.general.getText({es:"Aceptar",en:"Ok"}), undefined ,( ) => {}  )
      this.prevEs = undefined;
      this.nuevo.image.es = null;
    }
    
  }
  setEn(e : any) {
    var reader = new FileReader();
    var myFormData = new FormData();
    this.loadEn = true;
    if (e.target.files && e.target.files[0]) {

      var reader = new FileReader();
      myFormData.append('image' , e.target.files[0] ) ;
      this.nuevo.image.en =myFormData.get("image");
      reader.onload = (event: any) => {
        setTimeout( () => {   this.loadEn = false;}, 300)
        this.prevEn = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }else {
      this.loadEn =false;
    }
  }
  setEs(e :any) {
    this.loadEs = true;
    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {

      var reader = new FileReader();
      myFormData.append('image' , e.target.files[0] ) ;

      this.nuevo.image.es =myFormData.get("image");
      reader.onload = (event: any) => {
     
        setTimeout( () => {   this.loadEs = false;}, 300)
        this.prevEs = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      this.loadEs =false;
    }
  }
  ngAfterViewInit() {

  }
  guardar(){
this.general.loaderShow();
    var formData = new FormData();
    if(this.nuevo.image.es !== null && this.nuevo.image.en !== null   ){
      formData.append("image[es]",this.nuevo.image.es);
      formData.append("image[en]",this.nuevo.image.en);
      if(!(this.nuevo.title.es.length < 4 || this.nuevo.title.es.length > 255) && !(this.nuevo.title.en.length < 4 || this.nuevo.title.en.length > 255)) {
        formData.append("title[es]", this.nuevo.title.es);
        formData.append("title[en]", this.nuevo.title.en );
        this.http.post(this.general.api + "organizationalcharts" ,  formData , this.auth.options ).subscribe(( resp : any )=> {
          this.general.dialog!.show("",this.general.getText({ es : "Grafica guardada exitosamente", en : "Graph saved successfully"}),this.general.getText({es:"Aceptar",en:"Ok"}), undefined ,( ) => {}  )
          this.general.loaderHidden();
          this.back({es:{ id : resp.id , image : this.prevEs },en:{ id : resp.id , image : this.prevEn }});
        }, error  => {
          this.general.loaderHidden();
        });
      } else {
        if (this.nuevo.title.es.length < 4 || this.nuevo.title.es.length > 255) {
          this.general.loaderHidden();
          this.general.dialog!.show("", this.nuevo.title.es.length < 4 ?
            this.general.getText({ es: "El título en español no puede tener menos de 4 caracteres", en: "The Title in Spanish cannot be less than 4 characters" }) : this.general.getText({ es: "El título en español no puede tener mas de 2000 caracteres", en: "The title in Spanish cannot have more than 2000 characters" })
            , this.general.getText({ es: "Aceptar", en: "Ok" })
            , undefined, () => { })
        } else if (this.nuevo.title.en.length < 4 || this.nuevo.title.en.length > 255) {
          this.general.loaderHidden();
          this.general.dialog!.show("", this.nuevo.title.en.length < 4 ?
            this.general.getText({ es: "El título en inglés no puede tener menos de 4 caracteres", en: "The Title in English cannot be less than 4 characters" }) : this.general.getText({ es: "El título en inglés no puede tener mas de 2000 caracteres", en: "The Title in English cannot have more than 2000 characters" })
            , this.general.getText({ es: "Aceptar", en: "Ok" })
            , undefined, () => { })
        } else {
          this.general.loaderHidden();
          this.general.dialog!.show("", this.general.getText({ es: "Los títulos son requeridos", en: "Titles are required" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        }
      }
    } else {
      this.general.loaderHidden();
        this.general.dialog!.show("",this.general.getText({ es : "Se requieren las dos imagenes", en : "Both images are required"}),this.general.getText({es:"Aceptar",en:"Ok"}), undefined ,( ) => {}  )
    }
  }
  elegirEn(){
    (document.getElementById("chartIngles") as HTMLInputElement).click();
  }
  elegir() {
    (document.getElementById("chartEspañol") as HTMLInputElement).click();
  }
}
