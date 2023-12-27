import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.sass']
})
export class TagEditComponent implements OnInit {
  nuevo: {
    tituloEs: string,
    tituloEn: string,
    preview: {
      es: any,
      en: any
    },
    file: {
      es: any,
      en: any
    }
  } = {
      tituloEs: "",
      tituloEn: "",
      preview: {
        es: "",
        en: ""
      },
      file: {
        es: undefined,
        en: undefined
      }
    }
  load = false;
  nuevoForm: UntypedFormGroup;
  loadEs = false;
  loadEsDoc = false;
  loadEnDoc = false;
  docEs = "";
  docEn = "";
  loadEn = false;
  prevEn: any;
  prevEs: any;
  downEs: any;
  downEn: any;
  constructor(private fb: UntypedFormBuilder, public general: GeneralService, private http: HttpClient, public admin: PublicAdminService, private auth: AuthService) {
    this.nuevoForm = this.fb.group({
      tituloEs: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      tituloEn: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],

    })
  }

  setEn(e: any) {
    var reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      this.loadEnDoc = true;
      var reader = new FileReader();
      this.nuevo.file.en = e.target.files[0];
      this.docEn = (e.target.files[0] as File).name;
      reader.onload = (event: any) => {
        this.loadEnDoc = false;
        this.downEn = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  setEs(e: any) {
    var reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      this.loadEsDoc = true;
      var reader = new FileReader();
      this.nuevo.file.es = e.target.files[0];

      this.docEs = (e.target.files[0] as File).name;
      reader.onload = (event: any) => {
        this.loadEsDoc = false;
        this.downEs = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', this.docEs);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  setImageEs(e: any) {

    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      this.loadEs = true;
      var reader = new FileReader();
      myFormData.append('image', e.target.files[0]);

      this.nuevo.preview.es = myFormData.get("image");
      reader.onload = (event: any) => {
        this.loadEs = false;
        this.prevEs = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  setImageEn(e: any) {
    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      this.loadEn = true;
      var reader = new FileReader();
      myFormData.append('image', e.target.files[0]);
      this.nuevo.preview.en = myFormData.get("image");
      reader.onload = (event: any) => {
        this.loadEn = false;
        this.prevEn = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  elegirEn() {
    (document.getElementById("newsImageEn") as HTMLInputElement).click();
  }
  elegir() {
    (document.getElementById("newsImageEs") as HTMLInputElement).click();
  }
  elegirEnDoc() {
    (document.getElementById("financialReportIngles") as HTMLInputElement).click();
  }
  elegirDoc() {
    (document.getElementById("financialReportEspañol") as HTMLInputElement).click();
  }
  ngOnInit(): void {
    this.nuevoForm.get("tituloEs")?.setValue(this.admin.complianceSelect.title.es);
    this.nuevoForm.get("tituloEn")?.setValue(this.admin.complianceSelect.title.en);
    this.prevEs = this.admin.complianceSelect.previewUrl.es;
    this.prevEn = this.admin.complianceSelect.previewUrl.en;
    var docEsname = this.admin.complianceSelect.docUrl.es.split("/");
    this.docEs = docEsname[docEsname.length - 1];

    var docEsname = this.admin.complianceSelect.docUrl.es.split("/");
    this.docEn = docEsname[docEsname.length - 1];

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
  onImageLoadEn() {
    var width = (document.getElementById("newsPrevEn") as HTMLImageElement).naturalWidth;
    if (width < 10241) {
      if (!(width >= 800)) {
        this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser menor a 800px", en: "The image cannot be smaller than 800px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.prevEn = undefined;
        this.nuevo.preview.en = null;
      }
    } else {
      this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser mayor a 10240px", en: "Image cannot be larger than 10240px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      this.prevEn = undefined;
      this.nuevo.preview.en = null;
    }

  }
  onImageLoad() {
    var width = (document.getElementById("newsPrevEs") as HTMLImageElement).naturalWidth;
    if (width < 10241) {
      if (!(width >= 800)) {
        this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser menor a 800px", en: "The image cannot be smaller than 800px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.prevEs = undefined;
        this.nuevo.preview.es = null;
      }
    } else {
      this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser mayor a 10240px", en: "Image cannot be larger than 10240px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      this.prevEs = undefined;
      this.nuevo.preview.es = null;
    }

  }
  guardar() {
    var formData = new FormData();

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

        formData.append("title[es]", this.nuevoForm.get("tituloEs")!.value);
        formData.append("title[en]", this.nuevoForm.get("tituloEn")!.value);
        if (this.nuevo.preview.en)
          formData.append("preview[en]", this.nuevo.preview.en);
        if (this.nuevo.preview.es)
          formData.append("preview[es]", this.nuevo.preview.es);
        if (this.nuevo.file.en)
          formData.append("doc[en]", this.nuevo.file.en);
        if (this.nuevo.file.es)
          formData.append("doc[es]", this.nuevo.file.es);
        this.general.loaderShow();
        this.http.post(this.general.api + "admin/compliances/tags/" + this.admin.complianceSelect.id, formData, this.auth.options).subscribe(resp => {
          this.general.loaderHidden();
          this.buscar();
          this.general.back();
        }, error => {
          this.general.loaderHidden();
          this.general.dialog?.show("", error.message, this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });

        })
        /*
        if (!(this.nuevo.file.es.size < 51200000 && this.nuevo.file.en.size < 51200000)) {
          this.general.loaderHidden();
          this.general.dialog!.show("", this.general.getText({ es: "Uno de los archivos es demasiado grande, tamaño máximo 50mb", en: "One of the files is too big, maximum size 50mb" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        } else {
          if (this.nuevo.preview.es && this.nuevo.preview.en) { } else {
            this.general.dialog!.show("", this.general.getText({ es: "Se requieren las dos imagenes", en: "Both images are required" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
            this.general.loaderHidden();
          }
        } */
      }
    }

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
}
