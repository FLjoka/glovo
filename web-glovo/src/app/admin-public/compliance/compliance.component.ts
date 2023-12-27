import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.sass']
})

export class ComplianceComponent implements OnInit {


  new = false;
  closeNew = () => { this.new = false };
  edit = false;
  editAnnouncement: any;
  params = "?per_page=6&";
  status = [
    { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  search = "";

  back = () => { }
  $lenguaje!: Subscription;
  backEdit = () => { this.edit = false };
  nuevoForm!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder, public general: GeneralService, public admin: PublicAdminService, private auth: AuthService, private http: HttpClient, private rutaActiva: ActivatedRoute, public router: Router) {
    this.nuevoForm = fb.group({
      headerEs: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      headerEn: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    });
  }

  ngOnInit(): void {
    this.nuevoForm.get("headerEs")?.setValue(this.admin.complianceSettings.header.es);
    this.nuevoForm.get("headerEn")?.setValue(this.admin.complianceSettings.header.en);
    if (!this.admin.compliance)
      this.buscar();
      /*
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.status = [
        { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
        { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
        { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
      ]
      this.admin.complianceFilters.statusSelected = { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" };
      this.buscar();
    });
*/
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    //this.$lenguaje.unsubscribe();
  }
  restaurar(id: string) {
    this.general.loaderShow();
    this.http.put(this.general.api + "admin/compliances/tags/" + id + "/restore", {}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.compliance.length; index++) {
        if (this.admin.compliance[index].id == id) {
          this.admin.compliance[index].deleted_at = null;
        }
      }
      this.general.loaderHidden();
      this.general.dialog?.show("", this.general.getText({ es: "Cambios guardados exitosamente" , en: "Changes saved successfully " }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/compliances/tags/" + id, this.auth.options).subscribe((resp: any) => {   
      for (let index = 0; index < this.admin.compliance.length; index++) {
        if (this.admin.compliance[index].id == id) {
          this.admin.compliance[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden();
      this.general.dialog?.show("", this.general.getText({ es: "Cambios guardados exitosamente" , en: "Changes saved successfully " }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
    }, error => {
      this.general.loaderHidden()
    })
  }

  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  buscar() {
    this.admin.getCompliance(this.genParams());
  }
  genParams() {

    var res = "?per_page=6";
    if (this.admin.complianceFilters.statusSelected.value)
      res = res + "&status=" + this.admin.complianceFilters.statusSelected.value;
    if (this.admin.complianceFilters.search !== "")
      res = res + "&search=" + this.admin.complianceFilters.search;
    return res
  }

  descargar(url: string) {
    if (this.general.dialog)
      this.general.dialog.show(this.general.getText({ en: "Confirmation", es: "Confirmación" }),
        this.general.getText({ en: "You are trying to download a report, do you want to continue?", es: "Estás intentando descargar un informe, ¿quieres continuar?" }),
        this.general.getText({ en: "Accept", es: "Aceptar" }),
        this.general.getText({ en: "Cancel", es: "Cancelar" }),
        () => {
          this.downGen(url);
        })
  }
  getImage(mime_type: string, image: string) {
    console.log("data:" + mime_type + ";base64," + image);

    return "data:" + mime_type + ";base64," + image;
  }
  guardar() {
    this.general.loaderShow();
    var nuevo = {
      header: {
        es: this.nuevoForm.get("headerEs")?.value,
        en: this.nuevoForm.get("headerEn")?.value
      }
    }
    if (this.nuevoForm.get("headerEs")?.invalid) {
      this.general.loaderHidden();
      if (this.nuevoForm.get("headerEs")?.errors?.maxlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cabecera en español\" no puede ser mayor a " + this.nuevoForm.get("headerEs")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Header in Spanish\" field cannot be longer than " + this.nuevoForm.get("headerEs")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
      if (this.nuevoForm.get("headerEs")?.errors?.minlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cabecera en español\" no puede ser menor a " + this.nuevoForm.get("headerEs")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Header in Spanish\" cannot be less than " + this.nuevoForm.get("headerEs")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
      if (this.nuevoForm.get("headerEs")?.hasError("required"))
        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"* Texto de cabecera en español\"", en: "All fields are required please fill in the  \"* Header text in Spanish \" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
    } else {
      if (this.nuevoForm.get("headerEn")?.invalid) {
        this.general.loaderHidden();
        if (this.nuevoForm.get("headerEn")?.errors?.maxlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cabecera en inglés\" no puede ser mayor a " + this.nuevoForm.get("headerEn")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Header in English\" field cannot be longer than " + this.nuevoForm.get("headerEn")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { })
        if (this.nuevoForm.get("headerEn")?.errors?.minlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cabecera en inglés\" no puede ser menor a " + this.nuevoForm.get("headerEn")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Header in English\" cannot be less than " + this.nuevoForm.get("headerEn")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
        if (this.nuevoForm.get("headerEn")?.hasError("required"))
          this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"* Texto de cabecera en inglés\"", en: "All fields are required please fill in the  \"* Header text in English \" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
      } else {
        this.http.post(this.general.api + "publicPages/compliance", nuevo, this.auth.options).subscribe(val => {
          this.admin.corporateSettings = nuevo.header;
          this.general.loaderHidden();
          this.general.dialog?.show("", this.general.getText({ es: "Cambios guardados exitosamente" , en: "Changes saved successfully " }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
        }, error => {
          this.general.loaderHidden();
        })
      }
    }

  }
}
