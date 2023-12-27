import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'edit-document-ad',
  templateUrl: './edit-document-ad.component.html',
  styleUrls: ['./edit-document-ad.component.sass']
})
export class EditDocumentAdComponent implements OnInit {
  loadDataEn = false;
  load = false;
  loadDataEs = false;
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
    }
  } = {
      title: { es: "", en: "" },
      description: { es: "", en: "" },
      file: { es: undefined, en: undefined }
    }
  loadEs = false;
  docEs = "";
  docEn = "";
  loadEn = false;
  @Input() back: Function = () => { }
  @Input() doc: any;
  viewDocEs = "";
  informacion : any = {};
  tab = 0;
  constructor(public general: GeneralService, public http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.loadDataEn = true;
    this.load = true;
    this.loadDataEs = true;
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

    this.http.get(this.general.api + "admin/announcements/" + this.doc.anuncio_id + "/documents/" + this.doc.id, optionEs).subscribe((resp: any) => {
      this.nuevo.title.es = resp.title;
      this.docEs = resp.title;
      this.nuevo.file.es = resp.url;
      this.nuevo.description.es = resp.description;
      this.loadDataEs = false;
      if (!this.loadDataEn)
        this.load = false;
    }, error => {
      console.log(error);
      this.loadDataEs = false;
      if (!this.loadDataEn)
        this.load = false;
    })
    this.http.get(this.general.api + "admin/announcements/" + this.doc.anuncio_id + "/documents/" + this.doc.id, optionEn).subscribe((resp: any) => {
      this.nuevo.title.en = resp.title;
      this.docEn = resp.title;
      this.nuevo.file.en = resp.url;
      this.nuevo.description.en = resp.description;
      this.informacion = {
        last_touched_by: resp.last_touched_by,
        uploaded_by: resp.uploaded_by,
        created_at :resp.created_at
      }
      this.loadDataEn = false;
      if (!this.loadDataEs)
        this.load = false;
    }, error => {
      console.log(error);
      this.loadDataEn = false;
      if (!this.loadDataEs)
        this.load = false;
    })
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
      if (this.nuevo.title.es !== "" && this.nuevo.title.en !== "") {
        formData.append("title[es]", this.nuevo.title.es);
        formData.append("title[en]", this.nuevo.title.en);
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
            this.http.post(this.general.api + "admin/announcements/" + this.doc + "/documents", formData, this.auth.options).subscribe(resp => {
              this.general.loaderHidden();
              this.general.dialog!.show("", this.general.getText({ es: "Documento guardada exitosamente", en: "Document saved successfully" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
              this.back(resp);
            }, error => {
              console.log(error);
              this.general.loaderHidden();
            });
          }

        }
      } else {
        this.general.loaderHidden();
        this.general.dialog!.show("", this.general.getText({ es: "Los títulos son requeridos", en: "Titles are required" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      }
    } else {
      this.general.loaderHidden();
      this.general.dialog!.show("", this.general.getText({ es: "Se requieren los archivos en los dos idiomas", en: "Files are required in both languages" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
    }
  }
  elegirEn() {
    (document.getElementById("financialReportIngles") as HTMLInputElement).click();
  }
  elegir() {
    (document.getElementById("financialReportEspañol") as HTMLInputElement).click();
  }
  downEn() {
    var options = Object.assign({}, this.auth.options);
    options.headers["Content-Language"] = "en";
    this.general.downCode.show((pass: string) => {
      this.http.post(this.nuevo.file.es, { password: pass }, { headers: options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (this.nuevo.title)
          downloadLink.setAttribute('download', this.nuevo.title.en);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        if (error.status == 422)
          this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      })
    })

  }
  downEs() {
    var options = Object.assign({}, this.auth.options);
    options.headers["Content-Language"] = "es";
    this.general.downCode.show((pass: string) => {
      this.http.post(this.nuevo.file.es, { password: pass }, { headers: options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (this.nuevo.title.es)
          downloadLink.setAttribute('download', this.nuevo.title.es);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        if (error.status == 422)
          this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      })
    })

  }
}
