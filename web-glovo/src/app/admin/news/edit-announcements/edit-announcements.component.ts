import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'edit-announcements',
  templateUrl: './edit-announcements.component.html',
  styleUrls: ['./edit-announcements.component.sass']
})
export class EditAnnouncementsComponent implements OnInit {

  // estados de la busqueda de información 
  buscandoNoticiaEs = false;
  buscandoNoticiaEn = false;
  buscandoDocumentos = false;

  nuevo: {
    title: {
      es: string,
      en: string
    },
    image: { es: any, en: any },
    body: any,
    event_date: any;
  } = {
      title: { es: "", en: "" },
      body: { es: { parrafos: [""] }, en: { parrafos: [""] } },
      image: { es: undefined, en: undefined },
      event_date: ""
    }
  createData!: {
    created_at: string,
    deleted_at: null | string,
    updated_at: string,
    uploaded_by: {
      email: string
      id: number
      name: string
    }
    last_touched_by: any
  }
  loadEs = false;
  docEs = "";
  docEn = "";
  loadEn = false;
  @Input() back: Function = () => { }
  prevEn: any;
  prevEs: any;
  idiomaSet = "en";
  @Input() data: any;
  setEs = false;
  setEn = false;
  tab = 0;
  documents = [];
  event = {
    date: "",
    time: ""
  }

  constructor(private _sanitizer: DomSanitizer, public general: GeneralService, public http: HttpClient, private auth: AuthService) { }
  ngAfterViewInit() {
    var elements = document.querySelectorAll(".inputbox");
    Array.from(elements).forEach(function (element) {
      element.addEventListener('click', () => {
        element.getElementsByTagName('input')[0]?.focus();
      });
      element.removeEventListener("click", () => { });
    });
  }
  clear() {
    this.nuevo = {
      title: { es: "", en: "" },
      body: { es: { parrafos: [""] }, en: { parrafos: [""] } },
      image: { es: undefined, en: undefined },
      event_date: ""
    };
  }
  ngOnInit(): void {
    this.idiomaSet = this.general.idioma();
    var optionEs = {
      headers: {
        "Authorization": this.auth.options.headers.Authorization,
        "Content-Language": "es",
        "X-Requested-With": "XMLHttpRequest"
      }
    }
    var optionEn = {
      headers: {
        "Authorization": this.auth.options.headers.Authorization,
        "Content-Language": "en",
        "X-Requested-With": "XMLHttpRequest"
      }
    }
    let reader = new FileReader();
    this.buscandoDocumentos = true;
    this.buscandoNoticiaEn = true;
    this.buscandoNoticiaEs = true;
    this.http.get(this.general.api + "admin/announcements/" + this.data.id, optionEs).subscribe((resp: any) => {
      this.setEs = true;
      this.nuevo.title.es = resp.title;
      this.prevEs = "data:" + resp.mime_type + ";base64," + resp.image;
      const imageName = resp.title;
      const imageBlob = this.dataURItoBlob(resp.image);
      //this.nuevo.image.es = new File([imageBlob], imageName, { type: resp.mime_type });
      this.event.date = resp.event_date ? this.getStringDate(resp.event_date) : "";
      this.event.time = resp.event_date ? this.getStringTime(resp.event_date) : "";
      this.nuevo.event_date = new Date(Date.parse(resp.event_date))
      this.nuevo.body.es = this.text(resp.body);
      this.createData = {
        created_at: resp.created_at,
        updated_at: resp.updated_at,
        last_touched_by: resp.last_touched_by,
        uploaded_by: {
          id: resp.uploaded_by.id,
          name: resp.uploaded_by.name,
          email: resp.uploaded_by.email,
        },

        deleted_at: resp.deleted_at
      }
      this.buscandoNoticiaEs = false;
    });
    this.http.get(this.general.api + "admin/announcements/" + this.data.id, optionEn).subscribe((resp: any) => {

      this.setEn = true;
      this.nuevo.title.en = resp.title;
      this.prevEn = "data:" + resp.mime_type + ";base64," + resp.image;
      const imageName = resp.title;
      const imageBlob = this.dataURItoBlob(resp.image);
      //this.nuevo.image.en = new File([imageBlob], imageName, { type: resp.mime_type });
      this.nuevo.body.en = this.text(resp.body);
      this.buscandoNoticiaEn = false;
    });
    this.http.get(this.general.api + "admin/announcements/" + this.data.id + "/documents", this.auth.options).subscribe((resp: any) => {

      this.documents = resp;
      this.buscandoDocumentos = false;
    }, error => { })
  }
  getStringTime(date: Date) {
    var resp = "";
    var fecha: Date;
    if (typeof date === 'string')
      fecha = new Date(Date.parse(date));
    else
      fecha = date;
    if (fecha.getHours() < 10)
      resp += "0" + fecha.getHours() + ":";
    else
      resp += fecha.getHours() + ":";
    if (fecha.getMinutes() < 10)
      resp += "0" + fecha.getMinutes()
    else
      resp += fecha.getMinutes()
    return resp
  }
  getStringDate(date: Date) {
    var fecha: Date;
    if (typeof date === 'string')
      fecha = new Date(Date.parse(date));
    else
      fecha = date;
    var mont = ""
    if (fecha.getMonth() < 9)
      mont = "0" + (fecha.getMonth() + 1);
    else
      mont = "" + (fecha.getMonth() + 1)
    var day = ""
    if (fecha.getDate() < 10)
      day = "0" + fecha.getDate()
    else
      day = "" + fecha.getDate()
    return fecha.getFullYear() + "-" + mont + "-" + day
  }
  onImageLoadEn() {
    var width = (document.getElementById("newsPrevEn") as HTMLImageElement).naturalWidth;
    if (!this.setEn)
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
    else
      this.setEn = false
  }
  onImageLoad() {
    var width = (document.getElementById("newsPrevEs") as HTMLImageElement).naturalWidth;
    if (!this.setEs)
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
    else
      this.setEs = false
  }
  addEn() {
    if (this.nuevo.body.en.parrafos[0].length > 4)
      this.nuevo.body.en.parrafos.push('')
    else
      this.general.dialog!.show("", this.general.getText({ es: "Agrege contenido en el primer párrafo", en: "Add content in the first paragraph" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
  }
  addEs() {
    if (this.nuevo.body.es.parrafos[0].length > 4)
      this.nuevo.body.es.parrafos.push('')
    else
      this.general.dialog!.show("", this.general.getText({ es: "Agrege contenido en el primer párrafo", en: "Add content in the first paragraph" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
  }
  deleteParagrap(parrafos: string[], i: number) {
    if (parrafos.length > 1)
      parrafos.splice(i, 1);
    else {
      parrafos.splice(i, 1);
      parrafos.push("");
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

      if (!(this.nuevo.body.es.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.es).length > 40000) && !(this.nuevo.body.en.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.en).length > 40000)) {
        if (this.event.date != "" && this.event.time != "") {
          this.nuevo.event_date = new Date(this.event.date + "T" + this.event.time);
          var formData = new FormData();
          formData.append("title[es]", this.nuevo.title.es);
          formData.append("title[en]", this.nuevo.title.en);
          formData.append("body[es]", JSON.stringify(this.nuevo.body.es));
          formData.append("body[en]", JSON.stringify(this.nuevo.body.en));
          if (this.nuevo.image.es)
            formData.append("image[es]", this.nuevo.image.es);
          if (this.nuevo.image.en)
            formData.append("image[en]", this.nuevo.image.en);
          formData.append("event_date", this.nuevo.event_date!.toISOString())
          this.http.post(this.general.api + "admin/announcements/"+this.data.id, formData, this.auth.options).subscribe(resp => {
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
            if (this.nuevo.image.es)
            formData.append("image[es]", this.nuevo.image.es);
          if (this.nuevo.image.en)
            formData.append("image[en]", this.nuevo.image.en);
            this.http.post(this.general.api + "admin/announcements/"+this.data.id, formData, this.auth.options).subscribe(resp => {
              this.clear();
              this.back();
              this.general.loaderHidden();
            }, error => {

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
              this.general.getText({ es: "El cuerpo de la noticia en inglés no puede tener menos de 4 caracteres", en: "The body of the news in English cannot have less than 4 characters" }) : this.general.getText({ es: "El cuerpo de la noticia en inglés no puede tener mas de 2000 caracteres", en: "The body of the news in English cannot have more than 2000 characters" })
              , this.general.getText({ es: "Aceptar", en: "Ok" })
              , undefined, () => { })
          } else {
            this.general.dialog!.show("", this.general.getText({ es: "Se requieren contenido en el cuerpo del anuncio", en: "Content is required in the ad body" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
            this.general.loaderHidden();
          }
        }

      }

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

  }
  text(body: string) {
    try {
      var resp = JSON.parse(body);
      return resp
    } catch {
      return { parrafos: [body] }
    }
  }

  elegirEn() {
    (document.getElementById("newsImageEn") as HTMLInputElement).click();
  }
  elegir() {
    (document.getElementById("newsImageEs") as HTMLInputElement).click();
  }
  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }
}
