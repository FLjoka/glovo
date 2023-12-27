import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  nuevo: {
    person_name: string,
    job: string,
    country: string,
    url: string
  } = {
      person_name: "",
      job: "",
      country: "",
      url: ""
    }
  load = false;
  videoselect = "https://www.youtube.com/embed/a6ptOkLG5Zo";
  nuevoForm: UntypedFormGroup;
  tab = 0;
  informacion: any = null;
  constructor(private admin: PublicAdminService, private fb: UntypedFormBuilder, public general: GeneralService, public http: HttpClient, private auth: AuthService) {
    this.nuevoForm = this.fb.group({
      person_name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      job: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      country: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      url: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
    })
  }
  video() {
    var split = (this.nuevoForm.get("url")!.value as string).split("/");
    var url = split[split.length - 1];
    if (url != "") {
      this.videoselect = "https://www.youtube.com/embed/" + url;
    } else
      this.videoselect = "https://www.youtube.com/embed/a6ptOkLG5Zo"
  }

  reload() {
    this.load = true;
    this.video();
    setTimeout(() => { this.load = false; }, 300);
  }
  ngOnInit(): void {
    this.informacion = this.admin.corporateSelect;
    this.nuevoForm.get("country")?.setValue(this.informacion.country);
    this.nuevoForm.get("person_name")!.setValue(this.informacion.person_name);
    this.nuevoForm.get("job")!.setValue(this.informacion.job);
    this.nuevoForm.get("url")!.setValue(this.informacion.url);
    this.videoselect = this.informacion.url; 
  }
  errorFrame() {


  }
  ngAfterViewInit() {
    var elements = document.querySelectorAll(".inputbox");
    Array.from(elements).forEach(function (element) {
      element.addEventListener('click', () => {
        if (element.getElementsByTagName('input')[0].id !== "url")
          element.getElementsByTagName('input')[0]?.focus();
      });
      element.removeEventListener("click", () => { });
    });
  }

  guardar() {
    if (this.nuevoForm.get("person_name")?.invalid) {
      this.general.loaderHidden();
      if (this.nuevoForm.get("person_name")?.errors?.maxlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre\" no puede ser mayor a " + this.nuevoForm.get("person_name")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Name\" field cannot be longer than " + this.nuevoForm.get("person_name")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
      if (this.nuevoForm.get("person_name")?.errors?.minlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre\" no puede ser menor a " + this.nuevoForm.get("person_name")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Name\" cannot be less than " + this.nuevoForm.get("person_name")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
      if (this.nuevoForm.get("person_name")?.hasError("required"))
        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Nombre\"", en: "All fields are required please fill in the  \"Name\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
    } else {
      if (this.nuevoForm.get("job")?.invalid) {
        this.general.loaderHidden();
        if (this.nuevoForm.get("job")?.errors?.maxlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Puesto\" no puede ser mayor a " + this.nuevoForm.get("job")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Position\" field cannot be longer than " + this.nuevoForm.get("job")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { })
        if (this.nuevoForm.get("job")?.errors?.minlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Puesto\" no puede ser menor a " + this.nuevoForm.get("job")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Position\" cannot be less than " + this.nuevoForm.get("job")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
        if (this.nuevoForm.get("job")?.hasError("required"))
          this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Puesto\"", en: "All fields are required please fill in the  \"Position\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
      } else {
        if (this.nuevoForm.get("country")?.invalid) {
          this.general.loaderHidden();
          if (this.nuevoForm.get("country")?.errors?.maxlength)
            this.general.dialog?.show("", this.general.getText({ es: "El campo \"Pais\" no puede ser mayor a " + this.nuevoForm.get("country")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Country\" field cannot be longer than " + this.nuevoForm.get("country")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
              undefined, () => { }, () => { })
          if (this.nuevoForm.get("country")?.errors?.minlength)
            this.general.dialog?.show("", this.general.getText({ es: "El campo \"Pais\" no puede ser menor a " + this.nuevoForm.get("country")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Country\" cannot be less than " + this.nuevoForm.get("country")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
              undefined, () => { }, () => { });
          if (this.nuevoForm.get("country")?.hasError("required"))
            this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Pais\"", en: "All fields are required please fill in the  \"Country\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
              undefined, () => { }, () => { });
        } else {
          if (this.nuevoForm.get("url")?.invalid) {
            this.general.loaderHidden();
            if (this.nuevoForm.get("url")?.errors?.maxlength)
              this.general.dialog?.show("", this.general.getText({ es: "El campo \"url\" no puede ser mayor a " + this.nuevoForm.get("url")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"url\" field cannot be longer than " + this.nuevoForm.get("url")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { })
            if (this.nuevoForm.get("url")?.errors?.minlength)
              this.general.dialog?.show("", this.general.getText({ es: "El campo \"url\" no puede ser menor a " + this.nuevoForm.get("url")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"url\" cannot be less than " + this.nuevoForm.get("url")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
            if (this.nuevoForm.get("url")?.hasError("required"))
              this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"url\"", en: "All fields are required please fill in the  \"url\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
          } else {
            this.general.loaderShow();
            this.nuevo.country = this.nuevoForm.get("country")!.value;
            this.nuevo.person_name = this.nuevoForm.get("person_name")!.value;
            this.nuevo.job = this.nuevoForm.get("job")!.value;
            this.nuevo.url = this.videoselect;
            this.http.put(this.general.api + "admin/corporates/" + this.informacion.id, this.nuevo, this.auth.options).subscribe(resp => {
              this.general.loaderHidden();
              this.buscar();
              this.general.back();
            }, error => {
              this.general.loaderHidden();
              this.general.dialog?.show("", error.message, this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });

            })
          }
        }
      }
    }
    // this.general.dialog!.show("", this.general.getText({ es: "Se requieren los archivos en los dos idiomas", en: "Files are required in both languages" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
  }
  buscar() {
    this.admin.getCorporate(this.genParams());
  }
  genParams() {

    var res = "?per_page=6";
    if (this.admin.corporateFilters.statusSelected.value)
      res = res + "&status=" + this.admin.corporateFilters.statusSelected.value;
    if (this.admin.corporateFilters.search !== "")
      res = res + "&search=" + this.admin.corporateFilters.search;
    return res
  }
}
