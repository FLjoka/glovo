import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.sass']
})
export class NewDocumentComponent implements OnInit {

  nuevo: {
    title: {
      es: string,
      en: string
    },
    description: {
      es: string,
      en: string
    },
    file: {
      es: any,
      en: any
    },
    id: number
  } = {
      title: { es: "", en: "" },
      description: { es: "", en: "" },
      file: { es: undefined, en: undefined },
      id: -1
    }

  loadEs = false;
  docEs = "";
  docEn = "";
  loadEn = false;
  
  @Input() back: Function = () => { }
  categorias = [
    {
      text: this.general.getText({
        es: "Aumentos de capital",
        en: "Capital increases"
      }),
      id: 1,
      selected: true
    },
    {
      text: this.general.getText({
        es: "Pactos de socios",
        en: "Partner agreements"
      }),
      id: 2,
      selected: false
    },
    {
      text: this.general.getText({
        es: "Auditores",
        en: "Auditors"
      }),
      id: 3,
      selected: false
    },
    {
      text: this.general.getText({
        es: "Estatutos",
        en: "Statutes"
      }),
      id: 4,
      selected: false
    },
    {
      text: this.general.getText({
        es: "Actos Juntas General",
        en: "General Meetings Acts "
      }),
      id: 5,
      selected: false
    },
  ]
  categoria = {
    text: this.general.getText({
      es: "Aumentos de capital",
      en: "Capital increases"
    }),
    id: 1,
    selected: true
  }
  constructor(public general: GeneralService, public http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
  } 

  setEn(e: any) {
    var reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      this.loadEn = true;
      var reader = new FileReader();
      this.nuevo.file.en = e.target.files[0];
      this.docEn = (e.target.files[0] as File).name;
      reader.onload = (event: any) => {
        this.loadEn = false;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  setEs(e: any) {
    var reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      this.loadEs = true;
      var reader = new FileReader();
      this.nuevo.file.es = e.target.files[0];
      this.docEs = (e.target.files[0] as File).name;
      reader.onload = (event: any) => {
        this.loadEs = false;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  guardar() {

    var formData = new FormData();
    this.general.loaderShow();
    if (this.nuevo.file.es && this.nuevo.file.en) {
      if (!(this.nuevo.title.es.length < 4 || this.nuevo.title.es.length > 255) && !(this.nuevo.title.en.length < 4 || this.nuevo.title.en.length > 255)) {

        formData.append("title[es]", this.nuevo.title.es);
        formData.append("title[en]", this.nuevo.title.en);
        if (this.nuevo.description.es.length < 4 || this.nuevo.description.es.length > 2000) {
          this.general.loaderHidden();
          this.general.dialog!.show("", this.nuevo.description.es.length < 4 ?
            this.general.getText({ es: "La descripción en español no puede tener menos de 4 caracteres", en: "The description in Spanish cannot be less than 4 characters" }) : this.general.getText({ es: "La descripción en español no puede tener mas de 2000 caracteres", en: "The description in Spanish cannot have more than 2000 characters" })
            , this.general.getText({ es: "Aceptar", en: "Ok" })
            , undefined, () => { })
        } else {
          if (this.nuevo.description.en.length < 4 || this.nuevo.description.en.length > 2000) {
            this.general.loaderHidden();
            this.general.dialog!.show("", this.nuevo.description.en.length < 4 ?
              this.general.getText({ es: "La descripción en inglés no puede tener menos de 4 caracteres", en: "The description in English cannot have more than 4 characters" }) : this.general.getText({ es: "La descripción en inglés no puede tener mas de 2000 caracteres", en: "The description in English cannot have more than 2000 characters" })
              , this.general.getText({ es: "Aceptar", en: "Ok" })
              , undefined, () => { })
          } else {
            if (this.nuevo.description.es !== "")
              formData.append("description[es]", this.nuevo.description.es);
            if (this.nuevo.description.en !== "")
              formData.append("description[en]", this.nuevo.description.en);

            if (!(this.nuevo.file.es.size > 0 && this.nuevo.file.en.size > 0)) {
              this.general.loaderHidden();
              this.general.dialog!.show("", this.general.getText({ es: "Los archivos no pueden estar vacíos", en: "Files cannot be empty" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
            }
            else {
              if (!(this.nuevo.file.es.size < 51200000 && this.nuevo.file.en.size < 51200000)) {
                this.general.loaderHidden();
                this.general.dialog!.show("", this.general.getText({ es: "Uno de los archivos es demasiado grande, tamaño máximo 50mb", en: "One of the files is too big, maximum size 50mb" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
              } else {
                formData.append("file[en]", this.nuevo.file.en);
                formData.append("file[es]", this.nuevo.file.es);
                formData.append("category_id", this.categoria.id.toString())

                this.http.post(this.general.api + "admin/documents", formData, this.auth.options).subscribe(resp => {
                  this.general.loaderHidden();
                  this.general.dialog!.show("", this.general.getText({ es: "Documento guardada exitosamente", en: "Document saved successfully" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
                  this.back();
                }, error => {
                  this.general.loaderHidden();
                });
              }

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
    } else {
      this.general.loaderHidden();
      this.general.dialog!.show("", this.general.getText({ es: "Se requieren los archivos en los dos idiomas", en: "Files are required in both languages" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
    }
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
  elegirEn() {
    (document.getElementById("financialReportIngles") as HTMLInputElement).click();
  }
  elegir() {
    (document.getElementById("financialReportEspañol") as HTMLInputElement).click();
  }
}
