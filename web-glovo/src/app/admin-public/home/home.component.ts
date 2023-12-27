import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  nuevo: any = {
    created_at: "2021-12-06T09:27:56.000000Z",
    footer: { en: 'Compliment channel phrase', es: 'Frase de canal de denuncias' },
    header: { en: '', es: '' },
    name: "home",
    section1: {
      body: { en: '', es: '' },
      // image: "https://glovo-api.csuarezdev.com.ar/storage/pages",
      image: "https://compliance.glovoapp.com/storage/pages",
      title: { en: '', es: '' }
    },
    section2: {
      body: { en: '', es: '' },
      // image: "https://glovo-api.csuarezdev.com.ar/storage/pages",
      image: "https://compliance.glovoapp.com/storage/pages",
      title: { en: '', es: '' }
    },
    updated_at: "2021-12-06T09:27:56.000000Z",
    video: ""
  }

  load = false;
  loadCompliance = false;
  loadTrainingImage = false;
  videoselect = "https://www.youtube.com/embed/0kLUNzcqOO8";
  nuevoForm: UntypedFormGroup;
  compliancePrev = null;
  trainingPrev = null;
  headers = [
    { text: this.general.getText({ es: "Inicio", en: "Home" }), value: "home" },
    { text: this.general.getText({ es: "Corporativo", en: "Corporate" }), value: "corporate" },
    { text: this.general.getText({ es: "Capacitación", en: "Training" }), value: "training" },
    { text: this.general.getText({ es: "Cumplimiento", en: "Compliance" }), value: "cumplimiento" },
    { text: this.general.getText({ es: "Canal de denuncias", en: "Whistleblower channel" }), value: "whistleblowerChannel" },
  ];
  header = { text: this.general.getText({ es: "Inicio", en: "Home" }), value: "home" };
  controlsText = [
    { code: "headerEs", value: { es: "Texto de cabecera en español", en: "Header text in Spanish" } },
    { code: "headerEn", value: { es: "Título cabecera en inglés", en: "Header text in English" } },
    { code: "body1Es", value: { es: "Descripción de capacitación en español", en: "Spanish training description" } },
    { code: "body1En", value: { es: "Descripción de capacitación en inglés", en: "English training description" } },
    { code: "footerEs", value: { es: "Texto del pie de pagina en español", en: "Footer text in Spanish" } },
    { code: "footerEn", value: { es: "Texto del pie de pagina en inglés", en: "Footer text in English" } },
    { code: "image1", value: { es: "Imagen para capacitación", en: "Image for training" } },
    { code: "title1Es", value: { es: "Título capacitación en español", en: "Spanish training title" } },
    { code: "title1En", value: { es: "Título capacitación en inglés ", en: "English training title" } },
    { code: "body2Es", value: { es: "Descripción de cumplimiento en español", en: "Spanish training description" } },
    { code: "body2En", value: { es: "Descripción de cumplimiento en inglés", en: "English training description" } },
    { code: "image2", value: { es: "Imagen para cumplimiento ", en: "Image for compliance" } },
    { code: "title2Es", value: { es: "Título cumplimiento en español", en: "Spanish training title" } },
    { code: "title2En", value: { es: "Título cumplimiento en inglés ", en: "English training title" } },
    { code: "video", value: { es: "Vídeo id", en: "Video id" } },

  ]
  constructor(private admin: PublicAdminService, private fb: UntypedFormBuilder, public general: GeneralService, public http: HttpClient, private auth: AuthService) {
    this.nuevoForm = this.fb.group({
      headerEs: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      headerEn: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      body1Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      body1En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],

      title1Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      title1En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      body2Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      body2En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],

      title2Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      title2En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      video: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      footerEs: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      footerEn: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    })
    this.general.lenguage.subscribe(resp => {
      this.headers = [
        { text: this.general.getText({ es: "Inicio", en: "Home" }), value: "home" },
        { text: this.general.getText({ es: "Corporativo", en: "Corporate" }), value: "corporate" },
        { text: this.general.getText({ es: "Capacitación", en: "Training" }), value: "training" },
        { text: this.general.getText({ es: "Cumplimiento", en: "Compliance" }), value: "cumplimiento" },
        { text: this.general.getText({ es: "Canal de denuncias", en: "Whistleblower channel" }), value: "whistleblowerChannel" },
      ];
    })
  }
  getControlsText(code: string) {
    var resp = "";
    this.controlsText.forEach(element => {
      if (element.code == code)
        resp = this.general.getText(element.value);
    })
    return resp
  }
  video() {
    var split = (this.nuevoForm.get("video")!.value as string).split("/");
    var url = split[split.length - 1];
    if (url != "") {
      this.videoselect = "https://www.youtube.com/embed/" + url;
    } else
      this.videoselect = "https://www.youtube.com/embed/0kLUNzcqOO8"
  }
  onImageLoadCompliance() {
    var width = (document.getElementById("complianceImagePrev") as HTMLImageElement)?.naturalWidth;
    if (width) {
      if (width < 10241) {
        if (!(width >= 800)) {
          this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser menor a 800px", en: "The image cannot be smaller than 800px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
          this.compliancePrev = null;
        }
      } else {
        this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser mayor a 10240px", en: "Image cannot be larger than 10240px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.nuevo.section1.image = undefined;
        this.compliancePrev = null;
      }
    }
  }

  setImageCompliance(e: any) {
    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      this.loadTrainingImage = true;
      var reader = new FileReader();
      myFormData.append('image', e.target.files[0]);
      this.nuevo.section2.image = myFormData.get("image");
      reader.onload = (event: any) => {
        this.loadTrainingImage = false;
        this.compliancePrev = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  onImageLoad() {
    var width = (document.getElementById("newsPrevEs") as HTMLImageElement)?.naturalWidth;
    if (width) {
      if (width < 10241) {
        if (!(width >= 800)) {
          this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser menor a 800px", en: "The image cannot be smaller than 800px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
          this.trainingPrev = null;
        }
      } else {
        this.general.dialog!.show("", this.general.getText({ es: "La imagen no puede ser mayor a 10240px", en: "Image cannot be larger than 10240px" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
        this.nuevo.section1.image = undefined;
        this.trainingPrev = null;
      }
    }
  }
  setImageTraining(e: any) {
    var reader = new FileReader();
    var myFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      this.loadTrainingImage = true;
      var reader = new FileReader();
      myFormData.append('image', e.target.files[0]);
      this.nuevo.section1.image = myFormData.get("image");
      reader.onload = (event: any) => {
        this.loadTrainingImage = false;
        this.trainingPrev = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  elegir() {
    (document.getElementById("trainingImage") as HTMLInputElement).click();
  }
  elegir2() {
    (document.getElementById("complianceImage") as HTMLInputElement).click();
  }
  reload() {
    this.load = true;
    this.video();
    setTimeout(() => { this.load = false; }, 300);
  }
  ngOnInit(): void {
    this.admin.getSettings("home", (resp: any) => {
      this.admin.homeSetting = resp;
      this.nuevo = Object.assign({}, this.admin.homeSetting);
      this.nuevoForm.get("headerEs")?.setValue(this.admin.homeSetting!.header.es);
      this.nuevoForm.get("headerEn")?.setValue(this.admin.homeSetting!.header.en);
      this.nuevoForm.get("footerEs")?.setValue(this.admin.homeSetting!.footer.es);
      this.nuevoForm.get("footerEn")?.setValue(this.admin.homeSetting!.footer.en);
      this.nuevoForm.get("body1Es")?.setValue(this.admin.homeSetting!.section1.body.es);
      this.nuevoForm.get("body1En")?.setValue(this.admin.homeSetting!.section1.body.es);
      this.nuevoForm.get("title1Es")?.setValue(this.admin.homeSetting!.section1.title.es);
      this.nuevoForm.get("title1En")?.setValue(this.admin.homeSetting!.section1.title.en);
      this.nuevoForm.get("body2Es")?.setValue(this.admin.homeSetting!.section2.body.es);
      this.nuevoForm.get("body2En")?.setValue(this.admin.homeSetting!.section2.body.en);
      this.nuevoForm.get("title2Es")?.setValue(this.admin.homeSetting!.section2.title.es);
      this.nuevoForm.get("title2En")?.setValue(this.admin.homeSetting!.section2.title.en);
      this.nuevoForm.get("video")?.setValue(this.admin.homeSetting!.video);
      this.video();
      this.trainingPrev = this.admin.homeSetting.section1.image;
      this.compliancePrev = this.admin.homeSetting.section2.image;
    })
  }
  errorFrame() {
    console.log("errro");

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
    try {
      this.general.loaderShow();
      Object.keys(this.nuevoForm.controls).forEach(key => {
        if (this.nuevoForm.get(key)?.invalid) {
          throw new Error(key);
        }
      
      });
      var formData = new FormData();
      this.video();
      this.nuevo.header.es = this.nuevoForm.get("headerEs")?.value;
      this.nuevo.header.en = this.nuevoForm.get("headerEn")?.value;
      this.nuevo.footer.es = this.nuevoForm.get("footerEs")?.value;
      this.nuevo.footer.en = this.nuevoForm.get("footerEn")?.value;
      this.nuevo.section1.body.es = this.nuevoForm.get("body1Es")?.value;
      this.nuevo.section1.body.en = this.nuevoForm.get("body1En")?.value;
      this.nuevo.section1.title.es = this.nuevoForm.get("title1Es")?.value;
      this.nuevo.section1.title.en = this.nuevoForm.get("title1En")?.value;
      this.nuevo.section2.body.es = this.nuevoForm.get("body2Es")?.value;
      this.nuevo.section2.body.en = this.nuevoForm.get("body2En")?.value;
      this.nuevo.section2.title.es = this.nuevoForm.get("title2Es")?.value;
      this.nuevo.section2.title.en = this.nuevoForm.get("title2En")?.value;
      this.nuevo.video = this.videoselect;
      formData.append("header[es]", this.nuevo.header.es);
      formData.append("header[en]", this.nuevo.header.en);
      formData.append("section1[body][es]", this.nuevo.section1.body.es);
      formData.append("section1[body][en]", this.nuevo.section1.body.en);
      formData.append("section1[title][es]", this.nuevo.section1.title.es);
      formData.append("section1[title][en]", this.nuevo.section1.title.en);
      console.log(typeof (this.nuevo.section1.image));
      if (typeof (this.nuevo.section1.image) == "object") {
        formData.append("section1[image]", this.nuevo.section1.image);
        console.log("algo");
      }
      formData.append("section2[body][es]", this.nuevo.section2.body.es);
      formData.append("section2[body][en]", this.nuevo.section2.body.en);
      formData.append("section2[title][es]", this.nuevo.section2.title.es);
      formData.append("section2[title][en]", this.nuevo.section2.title.en);
      if (typeof (this.nuevo.section2.image) == "object")
        formData.append("section2[image]", this.nuevo.section2.image);
      formData.append("video", this.nuevo.video);
      formData.append("footer[es]", this.nuevo.footer.es);
      formData.append("footer[en]", this.nuevo.footer.en);

      this.http.post(this.general.api + "publicPages/home", formData, this.auth.options).subscribe(resp => {
        this.general.loaderHidden();
        this.general.dialog?.show("", this.general.getText({ es: "Cambios guardados exitosamente" , en: "Changes saved successfully " }), this.general.getText({ en: "Accept", es: "Aceptar" }),
        undefined, () => { }, () => { })

      }, error => {
        this.general.loaderHidden();
        this.general.dialog?.show("", error.message, this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });

      })
    } catch (e: any) {
      this.general.loaderHidden();
      this.general.dialog?.show("", this.general.getText({ es: "Cambios guardados exitosamente" , en: "Changes saved successfully " }), this.general.getText({ en: "Accept", es: "Aceptar" }),
        undefined, () => { }, () => { })
      var invalido = this.nuevoForm.get(e.message)!;
      if (invalido.errors?.maxlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"" + this.getControlsText(e.message) + "\" no puede ser mayor a " + invalido.errors?.maxlength.requiredLength + " caracteres", en: "The \"" + this.getControlsText(e.message) + "\" field cannot be longer than " + invalido.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
      if (invalido.errors?.minlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"" + this.getControlsText(e.message) + "\" no puede ser menor a " + invalido.errors?.minlength.requiredLength + " caracteres", en: "The field \"" + this.getControlsText(e.message) + "\" cannot be less than " + invalido.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
      if (invalido.hasError("required"))
        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"" + this.getControlsText(e.message) + "\"", en: "All fields are required please fill in the  \"" + this.getControlsText(e.message) + "\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { });
    }
  }
  buscar() {
    console.log(this.header);

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
