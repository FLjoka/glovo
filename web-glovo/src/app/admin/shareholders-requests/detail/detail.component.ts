import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  @Input() data: any = null;
  load = false;
  enviando = false;
  allData: any;
  descargando = false;
  constructor(public general: GeneralService, public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.show();
  }
  enviar() {
    this.enviando = true;
    this.http.post(this.general.api + "shareholderRequests/" + this.data.id + "/resend", {}, this.auth.options).subscribe(resp => {
      this.enviando = false;
    }, error => {
      this.enviando = false;
      this.general.dialog?.show("", this.general.getText({ es: "No se pudo enviar la solicitud", en: "The request could not be sent" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
        undefined, () => { }, () => { });
    })
  }
  download() {
    var options = Object.assign({}, this.auth.options);
    this.general.downCode.show((pass: string) => {
      this.general.loaderShow();
      this.http.post(this.general.api + "shareholderRequests/" + this.data.id + "/download", { password: pass }, { headers: options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (this.allData.file.filename)
          downloadLink.setAttribute('download', this.allData.file.filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.general.loaderHidden()
      }, error => {
      this.general.loaderHidden()
        if (error.status == 422)
          this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      })
    })
  }
  show() {
    this.load = true;
    this.http.get(this.general.api + "shareholderRequests/" + this.data.id, this.auth.options).subscribe(resp => {
      this.allData = resp;
      this.load = false;
    }, error => {
      this.load = false;
    })
  }
}
