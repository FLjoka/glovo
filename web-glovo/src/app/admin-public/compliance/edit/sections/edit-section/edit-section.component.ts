import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';


@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.sass']
})
export class EditSectionComponent implements OnInit {
  nuevo = {
    body: {
      es: { parrafos: [""] },
      en: { parrafos: [""] },
    }
  }
  load = false;
  sectionPrev = null;
  loadSectionImage = false;
  idiomaSet = "es";
  nuevoForm: UntypedFormGroup;
  constructor(private admin: PublicAdminService, private fb: UntypedFormBuilder, public general: GeneralService, public http: HttpClient, private auth: AuthService) {
    this.nuevoForm = this.fb.group({
      tituloEs: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      tituloEn: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],

    })
  }

  ver(text: any, index: number, lenguage: string) {
    if (lenguage == "es")
      this.nuevo.body.es.parrafos[index] = text.target.value;
    if (lenguage == "en")
      this.nuevo.body.en.parrafos[index] = text.target.value;
  }

  deleteParagrap(parrafos: string[], i: number) {
    if (parrafos.length > 1)
      parrafos.splice(i, 1);
    else {
      parrafos.splice(i, 1);
      parrafos.push("");
    }
  }

  ngOnInit(): void {
    console.log(this.admin.sectionsSelect);
    
    this.nuevo.body.es = JSON.parse(this.admin.sectionsSelect.body.es);
    this.nuevo.body.en = JSON.parse(this.admin.sectionsSelect.body.en);
    this.nuevoForm.get("tituloEs")?.setValue(this.admin.sectionsSelect.title.es);
    this.nuevoForm.get("tituloEn")?.setValue(this.admin.sectionsSelect.title.en);
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
  ngAfterViewInit() {
    var elements = document.querySelectorAll(".inputbox");
    Array.from(elements).forEach(function (element) {
      element.addEventListener('click', () => {
        element.getElementsByTagName('input')[0]?.focus();
      });
      element.removeEventListener("click", () => { });
    });
  }

  guardar() {
    if (this.nuevoForm.get("tiluloEs")?.invalid) {
      this.general.loaderHidden();
      if (this.nuevoForm.get("tiluloEs")?.errors?.maxlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Titulo en español\" no puede ser mayor a " + this.nuevoForm.get("tiluloEs")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Title in Spanish\" field cannot be longer than " + this.nuevoForm.get("tiluloEs")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
      if (this.nuevoForm.get("tiluloEs")?.errors?.minlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Titulo en español\" no puede ser menor a " + this.nuevoForm.get("tiluloEs")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Title in Spanish\" cannot be less than " + this.nuevoForm.get("tiluloEs")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
      if (this.nuevoForm.get("tiluloEs")?.hasError("required"))
        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Titulo en español\"", en: "All fields are required please fill in the  \"Title in Spanish\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
    } else {
      if (this.nuevoForm.get("tiluloEn")?.invalid) {
        this.general.loaderHidden();
        if (this.nuevoForm.get("tiluloEn")?.errors?.maxlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Titulo en Inglés\" no puede ser mayor a " + this.nuevoForm.get("tiluloEn")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"tiluloEn\" field cannot be longer than " + this.nuevoForm.get("tiluloEn")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { })
        if (this.nuevoForm.get("tiluloEn")?.errors?.minlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Titulo en Inglés\" no puede ser menor a " + this.nuevoForm.get("tiluloEn")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"tiluloEn\" cannot be less than " + this.nuevoForm.get("tiluloEn")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
        if (this.nuevoForm.get("tiluloEn")?.hasError("required"))
          this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Titulo en Inglés\"", en: "All fields are required please fill in the  \"tiluloEn\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
      } else {

        if (!(this.nuevo.body.es.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.es).length > 40000) && !(this.nuevo.body.en.parrafos[0].length < 4 || JSON.stringify(this.nuevo.body.en).length > 40000)) {
          this.general.loaderShow();
          var resp = {
            title: {
              es: this.nuevoForm.get("tituloEs")?.value,
              en: this.nuevoForm.get("tituloEn")?.value
            },
            body: {
              es: JSON.stringify(this.nuevo.body.es),
              en: JSON.stringify(this.nuevo.body.en),
            }
          }
          this.http.put(this.general.api + "admin/compliances/tags/" + this.admin.complianceSelect.id + "/sections/" + this.admin.sectionsSelect.id, resp, this.auth.options).subscribe(resp => {
            this.general.loaderHidden();
            this.buscar();
            this.general.back();
          }, error => {
            this.general.loaderHidden();
            this.general.dialog?.show("", error.message, this.general.getText({ en: "Accept", es: "Aceptar" }),
              undefined, () => { }, () => { });

          })
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
      }
    }

    // this.general.dialog!.show("", this.general.getText({ es: "Se requieren los archivos en los dos idiomas", en: "Files are required in both languages" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
  }
  buscar() {
    this.admin.getSections(this.genParams());
  }
  genParams() {
    var res = "?per_page=6";
    if (this.admin.sectionsFilters.statusSelected.value)
      res = res + "&status=" + this.admin.sectionsFilters.statusSelected.value;
    if (this.admin.sectionsFilters.search !== "")
      res = res + "&search=" + this.admin.sectionsFilters.search;
    return res
  }
}