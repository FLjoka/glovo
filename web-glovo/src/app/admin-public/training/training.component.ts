import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.sass']
})
export class TrainingComponent implements OnInit {
  nuevo = {
    header: { en: '', es: '' },
    name: "training",
    section1: { body: { en: '', es: '' }, title: { en: '', es: '' } },
    section2: { body: { en: '', es: '' }, title: { en: '', es: '' } },
    section3: { body: { en: '', es: '' }, title: { en: '', es: '' } },
    title: { en: '', es: '' },
    video1: "",
    video2: ""

  }
  load = false;
  loadCompliance = false;
  loadTrainingImage = false;
  videoselect = "https://www.youtube.com/embed/a6ptOkLG5Zo";
  videoselect2 = "https://www.youtube.com/embed/a6ptOkLG5Zo";
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
  tab = 0;
  tabVideo = 0;
  controlsText = [
    { code: "headerEs", value: { es: "Cabecera de Capacitación en español", en: "Training header in Spanish" } },
    { code: "headerEn", value: { es: "Cabecera de Capacitación en inglés", en: "Training header in English" } },
    { code: "titleEs", value: { es: "Titulo capacitación en español", en: "Spanish training title" } },
    { code: "titleEn", value: { es: "Titulo capacitación en inglés ", en: "English training title" } },
    { code: "title1Es", value: { es: "Primer subtitulo en español", en: "First subtitle in Spanish" } },
    { code: "title1En", value: { es: "Primer subtitulo en inglés", en: "First subtitle in English" } },
    { code: "body1Es", value: { es: "Primera descripción en español", en: "First description in Spanish" } },
    { code: "body1En", value: { es: "Primera descripción en inglés", en: "First description in Spanish" } },
    { code: "title2Es", value: { es: "Segundo subtitulo en español", en: "Second subtitle in Spanish" } },
    { code: "title2En", value: { es: "Segundo subtitulo en inlges", en: "Second subtitle in English" } },
    { code: "body2Es", value: { es: "Segunda descripción en español", en: "Second description in Spanish" } },
    { code: "body2En", value: { es: "Segunda descripción en inglés", en: "Second description in English" } },
    { code: "title3Es", value: { es: "Tercer subtitulo en español", en: "Third subtitle in Spanish" } },
    { code: "title3En", value: { es: "Tercer subtitulo en inlges", en: "Third subtitle in English" } },
    { code: "body3Es", value: { es: "Tercera descripción en español", en: "Third description in Spanish" } },
    { code: "body3En", value: { es: "Tercera descripción en inglés", en: "Third description in English" } },
    { code: "video1", value: { es: "Primer Video", en: "First video" } },
    { code: "video2", value: { es: "Último Vídeo", en: "Latest Video" } },

  ]
  constructor(private admin: PublicAdminService, private fb: UntypedFormBuilder, public general: GeneralService, public http: HttpClient, private auth: AuthService) {
    this.nuevoForm = this.fb.group({
      headerEs: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      headerEn: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      titleEs: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      titleEn: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      body1Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      body1En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      title1Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      title1En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      body2Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      body2En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      title2Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      title2En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      body3Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      body3En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      title3Es: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      title3En: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      video1: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      video2: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
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
  reload() {
    this.load = true;
    this.video();
    setTimeout(() => { this.load = false; }, 300);
  }
  video() {
    var split = (this.nuevoForm.get("video1")!.value as string).split("/");
    var url = split[split.length - 1];
    if (url != "") {
      this.videoselect = "https://www.youtube.com/embed/" + url;
    } else
      this.videoselect = "https://www.youtube.com/embed/YV8JU6GqTSE"
  }
  reload2() {
    this.load = true;
    this.video2();
    setTimeout(() => { this.load = false; }, 300);
  }
  video2() {
    var split = (this.nuevoForm.get("video2")!.value as string).split("/");
    var url = split[split.length - 1];
    if (url != "") {
      this.videoselect2 = "https://www.youtube.com/embed/" + url;
    } else
      this.videoselect2 = "https://www.youtube.com/embed/0VGYX9AYvls"
  }
  onImageLoad() {

  }
  setImageTraining(event: any) {

  }
  setImageCompliance(event: any) {

  }

  ngOnInit(): void {
    this.nuevoForm.get("headerEs")?.setValue(this.admin.trainingSettings.header.es);
    this.nuevoForm.get("headerEn")?.setValue(this.admin.trainingSettings.header.en);
    this.nuevoForm.get("titleEs")?.setValue(this.admin.trainingSettings.title.es);
    this.nuevoForm.get("titleEn")?.setValue(this.admin.trainingSettings.title.en);
    this.nuevoForm.get("body1Es")?.setValue(this.admin.trainingSettings.section1.body.es);
    this.nuevoForm.get("body1En")?.setValue(this.admin.trainingSettings.section1.body.en);
    this.nuevoForm.get("title1Es")?.setValue(this.admin.trainingSettings.section1.title.es);
    this.nuevoForm.get("title1En")?.setValue(this.admin.trainingSettings.section1.title.en);
    this.nuevoForm.get("body2Es")?.setValue(this.admin.trainingSettings.section2.body.es);
    this.nuevoForm.get("body2En")?.setValue(this.admin.trainingSettings.section2.body.en);
    this.nuevoForm.get("title2Es")?.setValue(this.admin.trainingSettings.section2.title.es);
    this.nuevoForm.get("title2En")?.setValue(this.admin.trainingSettings.section2.title.en);
    this.nuevoForm.get("body3Es")?.setValue(this.admin.trainingSettings.section3.body.es);
    this.nuevoForm.get("body3En")?.setValue(this.admin.trainingSettings.section3.body.en);
    this.nuevoForm.get("title3Es")?.setValue(this.admin.trainingSettings.section3.title.es);
    this.nuevoForm.get("title3En")?.setValue(this.admin.trainingSettings.section3.title.en);
    this.nuevoForm.get("video1")?.setValue(this.admin.trainingSettings.video1);
    this.nuevoForm.get("video2")?.setValue(this.admin.trainingSettings.video2);
    this.videoselect = this.admin.trainingSettings.video1;
    this.videoselect2 = this.admin.trainingSettings.video2;
  }
  errorFrame() {
    console.log("errro");

  }
  getControlsText(code: string) {
    var resp = "";
    this.controlsText.forEach(element => {
      if (element.code == code)
        resp = this.general.getText(element.value);
    })
    return resp
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
    var k = [""];
    Object.keys(this.nuevoForm.controls).forEach(key => {
      k.push(key)

    });
    console.log(k);

    try {
      this.general.loaderShow();
      Object.keys(this.nuevoForm.controls).forEach(key => {
        if (this.nuevoForm.get(key)?.invalid) {
          throw new Error(key);
        }
      });

      this.video();
      this.video2();
      this.general.loaderShow();
      this.nuevo.header.es = this.nuevoForm.get("headerEs")?.value;
      this.nuevo.header.en = this.nuevoForm.get("headerEn")?.value;
      this.nuevo.title.es = this.nuevoForm.get("titleEs")?.value;
      this.nuevo.title.en = this.nuevoForm.get("titleEn")?.value;
      this.nuevo.section1.body.es = this.nuevoForm.get("body1Es")?.value;
      this.nuevo.section1.body.en = this.nuevoForm.get("body1En")?.value;
      this.nuevo.section1.title.es = this.nuevoForm.get("title1Es")?.value;
      this.nuevo.section1.title.en = this.nuevoForm.get("title1En")?.value;
      this.nuevo.section2.body.es = this.nuevoForm.get("body2Es")?.value;
      this.nuevo.section2.body.en = this.nuevoForm.get("body2En")?.value;
      this.nuevo.section2.title.es = this.nuevoForm.get("title2Es")?.value;
      this.nuevo.section2.title.en = this.nuevoForm.get("title2En")?.value;
      this.nuevo.section3.body.es = this.nuevoForm.get("body3Es")?.value;
      this.nuevo.section3.body.en = this.nuevoForm.get("body3En")?.value;
      this.nuevo.section3.title.es = this.nuevoForm.get("title3Es")?.value;
      this.nuevo.section3.title.en = this.nuevoForm.get("title3En")?.value;
      this.nuevo.video1 = this.videoselect;
      this.nuevo.video2 = this.videoselect2;

      this.http.post(this.general.api + "publicPages/training", this.nuevo, this.auth.options).subscribe(resp => {
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
