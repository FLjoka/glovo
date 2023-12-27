import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-financial-reports',
  templateUrl: './financial-reports.component.html',
  styleUrls: ['./financial-reports.component.sass']
})


export class FinancialReportsComponent implements OnInit {
  new = false;
  closeNew = () => { this.new = false;  this.buscar(); };
  edit = false;
  editFinancialReports: any;
  params = "?per_page=6&";
  status = [
    { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  search = "";
log(e : any ){
}
  back = () => {


   }
  $lenguaje!: Subscription;
  constructor(public general: GeneralService, public admin: AdminService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.admin.financialReports)
      this.admin.getFinancialReports(this.params);
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.status = [
        { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
        { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
        { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
      ]
      this.admin.financialFilters.statusSelected = { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" };
      this.admin.getFinancialReports(this.params);
    });
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
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
    this.admin.getFinancialReports(this.genParams());
  }
  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  genParams() {
    this.params = "?per_page=6";
    var res = "?per_page=6";
    if (this.admin.financialFilters.statusSelected.value)
      res = res + "&status=" + this.admin.financialFilters.statusSelected.value;
    if (this.search !== "")
      res = res + "&search=" + this.search;
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
