import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  $lenguaje!: Subscription;
  constructor(public general: GeneralService, public admin: AdminService, private auth: AuthService, private http: HttpClient) { }

  data: any;
  options: any;
  selectedUser: any = undefined;
  selectReport: any = undefined;
  tipo: any = { text: this.general.getText({ es: "Reportes financieros", en: "Financial reports" }), code: "financialreport" };
  params = "?limit=6&per_page=6";
  userparams = "?per_page=6";
  userSearch= "";
  selectOptions = [
    { text: this.general.getText({ es: "Reportes financieros", en: "Financial reports" }), code: "financialreport" },
    { text: this.general.getText({ en: "Announcement", es: "Anuncios" }), code: "announcement" },
    { text: this.general.getText({ en: "Announcement documents", es: "Documentos de anuncios" }), code: "announcement-document" },
    { text: this.general.getText({ es: "Presentaciones", en: "Presentations" }), code: "presentation" },
    { text: this.general.getText({ es: "Documentos", en: "Documents" }), code: "document" },
    { text: this.general.getText({ es: "Usuarios", en: "Users" }), code: "users" },
  ];
  log(e: any) {

  }
  ir(e: any) {
    this.selectReport = e;
  }
  userSet(user : any ){
    this.selectedUser = user;
    
  }
  setFilter() {
    if (this.tipo.code == "users")
      this.admin.getUsersReports(this.genUserParams());
    else
      this.admin.getReport(this.genParams());
  }
  genUserParams(){
    return this.userparams + "&search=" + this.userSearch;
  }
  genParams() {
    return this.params + "&reportable_type=" + this.tipo.code;
  }
  descargar(url: string, title: string) {
    this.general.downCode.show((pass: string) => {
      this.http.post(url, { password: pass }, { headers: this.auth.options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', title);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        if (error.status == 422)
          this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      })
    })
  }

  height() {
    if (document.body.clientWidth < 1200) {
      var e = Math.trunc(250 * (document.body.clientWidth / window.screen.width))
      if (e > 170)
        return e + "px"
      else return "170px"
    } else return 250 + "px"



  }
  ngOnInit() {
    this.options = {
      responsive: false,
      maintainAspectRatio: false,

      legend: {
        position: 'bottom',
        display: false
      }
    };
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.selectOptions = [
        { text: this.general.getText({ es: "Reportes financieros", en: "Financial reports" }), code: "financialreport" },
        { text: this.general.getText({ en: "Announcement", es: "Anuncios" }), code: "announcement" },
        { text: this.general.getText({ en: "Announcement documents", es: "Documentos de anuncios" }), code: "announcement-document" },
        { text: this.general.getText({ es: "Presentaciones", en: "Presentations" }), code: "presentation" },
        { text: this.general.getText({ es: "Documentos", en: "Documents" }), code: "document" },
        { text: this.general.getText({ es: "Usuarios", en: "Users" }), code: "users" },
      ];
      this.tipo = { text: this.general.getText({ es: "Reportes financieros", en: "Financial reports" }), code: "financialreport" };
      if (this.tipo.code == "users")
        this.admin.getUsersReports(this.userparams);
      else
        this.admin.getReport(this.genParams());
    });
    if (this.tipo.code == "users") {
      if (!this.admin.usersReports)
        this.admin.getUsersReports(this.userparams);
    }
    else {
      if (!this.admin.reportsDaily && !this.admin.reportsGrafica)
        this.admin.getReport(this.genParams());
    }


  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
}