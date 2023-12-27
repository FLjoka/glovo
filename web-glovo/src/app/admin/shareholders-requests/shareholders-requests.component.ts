import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

interface City {
  name: string,
  code: string
};
interface form {
  option: string,
  text: string,
  document: any
}
@Component({
  selector: 'app-shareholders-requests',
  templateUrl: './shareholders-requests.component.html',
  styleUrls: ['./shareholders-requests.component.sass']
})

export class ShareholdersRequestsComponent implements OnInit {
  new = false;
  closeNew = () => { this.new = false; this.buscar(); };
  edit = false;
  detail: any;
  params = "?per_page=6&";
  status = [
    { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  search = "";

  back = () => {


  }
  $lenguaje!: Subscription;
  constructor(public general: GeneralService, public admin: AdminService, private auth: AuthService, private http: HttpClient) { }
  enviar(id : any ) {
    this.general.loaderShow()
    this.http.post(this.general.api + "shareholderRequests/" + id + "/resend", {}, this.auth.options).subscribe(resp => {
      this.general.loaderHidden();
    }, error => {
      this.general.loaderHidden();
      this.general.dialog?.show("", this.general.getText({ es: "No se pudo enviar la solicitud", en: "The request could not be sent" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
        undefined, () => { }, () => { });
    })
  }
  setFin(){
    var date = this.admin.shareholderRequestsFilters.created_at_start.split("-");
    var start = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 0, 0, 0);
    date = this.admin.shareholderRequestsFilters.created_at_end.split("-");
    var end = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 0, 0, 0);
    if( start.getTime() > end.getTime() ){
      this.admin.shareholderRequestsFilters.created_at_start = this.inputFormatDate(this.refactorDate(end, -7));
    }
  }
  setStart(){
    var date = this.admin.shareholderRequestsFilters.created_at_start.split("-");
    var start = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 0, 0, 0);
    date = this.admin.shareholderRequestsFilters.created_at_end.split("-");
    var end = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 0, 0, 0);
    if( start.getTime() > end.getTime() ){
      
      this.admin.shareholderRequestsFilters.created_at_end = this.inputFormatDate(start);
    }
  }

  ngOnInit(): void {
    this.admin.shareholderRequestsFilters.search = ""
    this.admin.shareholderRequestsFilters.created_at_start = this.inputFormatDate(this.refactorDate(new Date(), -7));
    this.admin.shareholderRequestsFilters.created_at_end = this.inputFormatDate(new Date())
    if (!this.admin.financialReports)
      this.admin.getShareholderRequest(this.params);
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.admin.getShareholderRequest(this.params);
    });
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
  inputFormatDate(date: any) {
    var dd: any = date.getDate();
    var mm: any = date.getMonth() + 1; //January is 0!
    var yyyy: any = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    date = yyyy + '-' + mm + '-' + dd;
    return date
  }
  refactorDate(fecha: Date, dias: number) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha
  }
  restaurar(id: string) {
    this.general.loaderShow()
    this.http.put(this.general.api + "admin/financialReports/" + id + "/restore", {}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.financialReports.data.length; index++) {
        if (this.admin.financialReports.data[index].id == id) {
          this.admin.financialReports.data[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/financialReports/" + id, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.financialReports.data.length; index++) {
        if (this.admin.financialReports.data[index].id == id) {
          this.admin.financialReports.data[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }
  buscar() {
    this.admin.getShareholderRequest(this.genParams());
  }
  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  genParams() {
    var date = this.admin.shareholderRequestsFilters.created_at_start.split("-");
    var start = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 0, 0, 0);
    date = this.admin.shareholderRequestsFilters.created_at_end.split("-");
    var end = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 24, 0, 0);
    this.params = "?per_page=6";
    var res = "?per_page=6";
    if (this.admin.shareholderRequestsFilters.created_at_start)
      res = res + "&created_at_start=" + start.toISOString();
    if (this.admin.shareholderRequestsFilters.created_at_end)
      res = res + "&created_at_end=" + end.toISOString();
    if (this.admin.shareholderRequestsFilters.search !== "")
      res = res + "&search=" + this.admin.shareholderRequestsFilters.search;
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

}
