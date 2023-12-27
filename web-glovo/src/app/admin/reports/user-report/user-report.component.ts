import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.sass']
})
export class UserReportComponent implements OnInit {
  @Input() user: any;
  userReport: any;
  buscandoUserReport = false;
  constructor(public general: GeneralService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.buscandoUserReport = true;

    this.http.get(this.general.api + "admin/reports/users/" + this.user.id, this.auth.options).subscribe(resp => {
      this.userReport = resp;
      this.buscandoUserReport = false;
    }, error => {
      this.buscandoUserReport = false;

    })
  }
  ir(e: any) {

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

  getUsersReports(params: string, complete?: boolean) {
    this.buscandoUserReport = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/reports/users/" + this.user.id + params;
    else
      url = params;

    this.http.get(url, this.auth.options).subscribe(resp => {
      this.userReport = resp;
      this.buscandoUserReport = false;
    }, error => {
      this.buscandoUserReport = false;


    })
  }
}
