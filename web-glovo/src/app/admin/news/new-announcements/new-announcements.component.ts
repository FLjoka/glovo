import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'new-announcements',
  templateUrl: './new-announcements.component.html',
  styleUrls: ['./new-announcements.component.sass']
})
export class NewAnnouncementsComponent implements OnInit {
  nuevo: {
    title: {
      es: string,
      en: string
    },
    image: { es: any, en: any },
    body: any,
    event_date: Date | null;
  } = {
      title: { es: "", en: "" },
      body: { es: { parrafos: [""] }, en: { parrafos: [""] } },
      image: { es: undefined, en: undefined },
      event_date: null
    }
  loadEs = false;
  docEs = "";
  docEn = "";
  loadEn = false;
  prevEn: any;
  prevEs: any;
  @Input() back: Function = () => { }

  idiomaSet = "en";
  event = {
    date: "",
    time: ""
  }
  constructor(public general: GeneralService, public http: HttpClient, private auth: AuthService) { }
  clear() {
    this.nuevo = {
      title: { es: "", en: "" },
      body: { es: { parrafos: [""] }, en: { parrafos: [""] } },
      image: { es: undefined, en: undefined },
      event_date: null
    };
    this.prevEn = null;
    this.prevEs = null;
  }
  ngAfterViewInit() {
    var elements = document.querySelectorAll(".inputbox");
    Array.from(elements).forEach(function(element) {
      element.addEventListener('click', () => {
        element.getElementsByTagName('input')[0]?.focus();
      });
      element.removeEventListener("click", ()=> {});
    });
  }
  addEn(){
    if( this.nuevo.body.en.parrafos[0].length > 4  )
    this.nuevo.body.en.parrafos.push('')
    else
    this.general.dialog!.show("", this.general.getText({ es: "Agrege contenido en el primer párrafo", en: "Add content in the first paragraph" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
  }
  addEs(){
    if( this.nuevo.body.es.parrafos[0].length > 4  )
    this.nuevo.body.es.parrafos.push('')
    else
    this.general.dialog!.show("", this.general.getText({ es: "Agrege contenido en el primer párrafo", en: "Add content in the first paragraph" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
  }
  deleteParagrap( parrafos : string[] , i : number ){
    if(parrafos.length > 1 )
    parrafos.splice(i,1);
     else {
      parrafos.splice(i,1);
      parrafos.push("");
     }
  }
  ngOnInit(): void {
    this.idiomaSet = this.general.idioma();
  }
  onImageLoadEn() {
    var width = (document.getElementById("newsPrevEn") as HTMLImageElement).naturalWidth;
    if (width < 10241) {
      if (!(width >= 800)) {
        this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser menor a 800px", en: "The image cannot be smaller than 800px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.prevEn = undefined;
        this.nuevo.image.en = null;
      }
    } else {
      this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser mayor a 10240px", en: "Image cannot be larger than 10240px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      this.prevEn = undefined;
      this.nuevo.image.en = null;
    }

  }
  onImageLoad() {
    var width = (document.getElementById("newsPrevEs") as HTMLImageElement).naturalWidth;
    if (width < 10241) {
      if (!(width >= 800)) {
        this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser menor a 800px", en: "The image cannot be smaller than 800px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.prevEs = undefined;
        this.nuevo.image.es = null;
      }
    } else {
      this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser mayor a 10240px", en: "Image cannot be larger than 10240px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      this.prevEs = undefined;
      this.nuevo.image.es = null;
    }

  }
  setImageEn(e: any) {
    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      this.loadEn = true;
      var reader = new FileReader();
      myFormData.append('image', e.target.files[0]);
      this.nuevo.image.en = myFormData.get("image");
      reader.onload = (event: any) => {
        this.loadEn = false;
        this.prevEn = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  ver(text: any, index: number, lenguage: string) {
    if (lenguage == "es")
      this.nuevo.body.es.parrafos[index] = text.target.value;
    if (lenguage == "en")
      this.nuevo.body.en.parrafos[index] = text.target.value;
  }
  setImageEs(e: any) {

    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      this.loadEs = true;
      var reader = new FileReader();
      myFormData.append('image', e.target.files[0]);

      this.nuevo.image.es = myFormData.get("image");
      reader.onload = (event: any) => {
        this.loadEs = false;
        this.prevEs = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  guardar() {
    this.general.loaderShow();
    if (!(this.nuevo.title.es.length < 4 || this.nuevo.title.es.length > 255) && !(this.nuevo.title.en.length < 4 || this.nuevo.title.en.length > 255)) {
      if (this.nuevo.image.es && this.nuevo.image.en) {
        if ( !(this.nuevo.body.es.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.es).length > 40000) && !(this.nuevo.body.en.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.en).length > 40000)) {
          if (this.event.date != "" && this.event.time != "") {
            this.nuevo.event_date = new Date(this.event.date + "T" + this.event.time);
            var formData = new FormData();
            formData.append("title[es]", this.nuevo.title.es);
            formData.append("title[en]", this.nuevo.title.en);
            formData.append("body[es]", JSON.stringify(this.nuevo.body.es));
            formData.append("body[en]", JSON.stringify(this.nuevo.body.en));
            formData.append("image[es]", this.nuevo.image.es);
            formData.append("image[en]", this.nuevo.image.en);
            formData.append("event_date", this.nuevo.event_date!.toISOString())
            this.http.post(this.general.api + "admin/announcements", formData, this.auth.options).subscribe(resp => {
              this.clear();
              this.back();
              this.general.loaderHidden();
            }, error => {
              console.log(error);
              this.general.loaderHidden();
            })
          } else {
            if (this.event.date == "" && this.event.time == "") {
              var formData = new FormData();
              formData.append("title[es]", this.nuevo.title.es);
              formData.append("title[en]", this.nuevo.title.en);
              formData.append("body[es]", JSON.stringify(this.nuevo.body.es));
              formData.append("body[en]", JSON.stringify(this.nuevo.body.en));
              formData.append("image[es]", this.nuevo.image.es);
              formData.append("image[en]", this.nuevo.image.en);
              this.http.post(this.general.api + "admin/announcements", formData, this.auth.options).subscribe(resp => {
                this.clear();
                this.back();
                this.general.loaderHidden();
              }, error => {
                console.log(error);
                this.general.loaderHidden();
              })
            } else {
              this.general.dialog!.show("", this.general.getText({ es: "Se requiere una fecha y una hora para crear el evento, complete ambos campos", en: "A date and time is required to create the event, fill in both fields" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
              this.general.loaderHidden();
            }
          }
        } else {
          if (this.nuevo.body.es.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.es).length > 40000) {
            this.general.loaderHidden();
            this.general.dialog!.show("", this.nuevo.body.es.parrafos[0].length < 4 ?
              this.general.getText({ es: "El cuerpo de la noticia en español no puede tener menos de 4 caracteres", en: "The body of the news in Spanish cannot have less than 4 characters" }) : this.general.getText({ es: "El cuerpo de la noticia en español no puede tener mas de 2000 caracteres", en: "The body of the news in Spanish cannot have more than 2000 characters" })
              , this.general.getText({ es: "Aceptar", en: "Ok" })
              , undefined, () => { })
          } else {
            if (this.nuevo.body.en.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.en).length > 40000) {
              this.general.loaderHidden();
              this.general.dialog!.show("", this.nuevo.body.en.parrafos[0].length < 4 ?
                this.general.getText({es: "El cuerpo de la noticia en inglés no puede tener menos de 4 caracteres", en: "The body of the news in English cannot have less than 4 characters" }) : this.general.getText({ es: "El cuerpo de la noticia en inglés no puede tener mas de 2000 caracteres", en: "The body of the news in English cannot have more than 2000 characters" })
                , this.general.getText({ es: "Aceptar", en: "Ok" })
                , undefined, () => { })
            } else {
              this.general.dialog!.show("", this.general.getText({ es: "Se requieren contenido en el cuerpo del anuncio", en: "Content is required in the ad body" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
              this.general.loaderHidden();
            }
          }

        }
      } else {
        this.general.dialog!.show("", this.general.getText({ es: "Se requieren las dos imagenes", en: "Both images are required" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.general.loaderHidden();
      }
    } else {
      if (this.nuevo.title.es.length < 4 || this.nuevo.title.es.length > 255) {
        this.general.loaderHidden();
        this.general.dialog!.show("", this.nuevo.title.es.length < 4 ?
          this.general.getText({ es: "El título en español no puede tener menos de 4 caracteres", en: "The Title in Spanish cannot be less than 4 characters" }) : this.general.getText({ es: "El título en español no puede tener mas de 2000 caracteres", en: "The title in Spanish cannot have more than 2000 characters" })
          , this.general.getText({ es: "Aceptar", en: "Ok" })
          , undefined, () => { })
      } else  if (this.nuevo.title.en.length < 4 || this.nuevo.title.en.length > 255) {
        this.general.loaderHidden();
        this.general.dialog!.show("", this.nuevo.title.en.length < 4 ?
          this.general.getText({ es: "El título en inglés no puede tener menos de 4 caracteres", en: "The Title in English cannot be less than 4 characters" }) : this.general.getText({ es: "El título en inglés no puede tener mas de 2000 caracteres", en: "The Title in English cannot have more than 2000 characters" })
          , this.general.getText({ es: "Aceptar", en: "Ok" })
          , undefined, () => { })
      }  else {
        this.general.loaderHidden();
        this.general.dialog!.show("", this.general.getText({ es: "Los títulos son requeridos", en: "Titles are required" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      }
    }

  }
  elegirEn() {
    (document.getElementById("newsImageEn") as HTMLInputElement).click();
  }
  elegir() {
    (document.getElementById("newsImageEs") as HTMLInputElement).click();
  }
}
