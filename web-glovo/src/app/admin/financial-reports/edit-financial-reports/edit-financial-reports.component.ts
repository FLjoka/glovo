import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'edit-financial-reports',
  templateUrl: './edit-financial-reports.component.html',
  styleUrls: ['./edit-financial-reports.component.sass']
})
export class EditFinancialReportsComponent implements OnInit {
  load = false;
  loadEn = false;
  loadEs = false;
  @Input() data: any;
  presentation: {
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
    uploaded_by: {
      email: string,
      id: number,
      name: string
    }
  } = {
      title: { es: "", en: "" },
      description: { es: "", en: "" },
      file: { es: undefined, en: undefined },
      uploaded_by: {
        email: "glovoprivateadmin@gmail.com",
        id: 1001,
        name: "Elton Rutherford"
      }
    }
  tab = 0;
  informacion: any = {};
  constructor(public general: GeneralService, public auth: AuthService, private http: HttpClient) { }
  ngOnInit(): void {
    this.show()
  }

  show() {
    this.load = true;
    var options = Object.assign({}, this.auth.options);
    if (options.headers["Content-Language"] == "es") {
      this.presentation.title.es = this.data.title;
      this.presentation.description.es = this.data.description;
      this.presentation.file.es = this.data.url;
      this.presentation.uploaded_by = this.data.uploaded_by;
      options.headers["Content-Language"] = "en";
      this.http.get(this.general.api + "admin/financialReports/" + this.data.id, options).subscribe((data: any) => {
        this.informacion = {
          last_touched_by: data.last_touched_by,
          uploaded_by: data.uploaded_by,
          created_at : data.created_at
        }
        this.presentation.title.en = data.title;
        this.presentation.description.en = data.description;
        this.presentation.file.en = data.url;
        this.load = false;
      }, error => {
        this.load = false;
      })
    }
    else {
      this.presentation.title.en = this.data.title;
      this.presentation.description.en = this.data.description;
      this.presentation.file.en = this.data.url;
      this.presentation.uploaded_by = this.data.uploaded_by;
      options.headers["Content-Language"] = "es";
      this.http.get(this.general.api + "admin/financialReports/" + this.data.id, options).subscribe((data: any) => {
        this.informacion = {
          last_touched_by: data.last_touched_by,
          uploaded_by: data.uploaded_by,
          created_at : data.created_at
        }
        this.presentation.title.es = data.title;
        this.presentation.description.es = data.description;
        this.presentation.file.es = data.url;
        this.load = false;
      }, error => {
        console.log(error);
        this.load = false;
      })
    }

  }

  downEn() {
    var options = Object.assign({}, this.auth.options);
    options.headers["Content-Language"] = "en";
    this.general.downCode.show((pass: string) => {
      this.http.post(this.general.api + "admin/financialReports/" + this.data.id + "/download", { password: pass }, { headers: options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (this.presentation.title)
          downloadLink.setAttribute('download', this.presentation.title.en);
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
      this.http.post(this.general.api + "admin/financialReports/" + this.data.id + "/download", { password: pass }, { headers: options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (this.presentation.title.es)
          downloadLink.setAttribute('download', this.presentation.title.es);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        if (error.status == 422)
          this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      })
    })

  }
}
