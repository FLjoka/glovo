import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'edit-documents',
  templateUrl: './edit-documents.component.html',
  styleUrls: ['./edit-documents.component.sass']
})
export class EditDocumentsComponent implements OnInit {
  new = false;
  closeNew = ( document : any ) => { this.new = false; this.data.push(document) };
  edit = false;
  editDocument: any;
  params = "?per_page=6&";
  status = [
    { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  search = "";
  statusSelected = { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" };
  back = () => { }
  $lenguaje!: Subscription;
  @Input() data: any[] = [];
  @Input() id: string = "";
  constructor(public general: GeneralService, public admin: AdminService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {

  }


  restaurar(id: string) {
    this.general.loaderShow()
    this.http.put(this.general.api + "admin/announcements/" + this.id + "/documents/"+ id+"/restore",{}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.data.length; index++) {
        if (this.data[index].id == id) {
          this.data[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/announcements/" + this.id + "/documents/"+ id, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.data.length; index++) {
        if (this.data[index].id == id) {
          this.data[index].deleted_at = resp.deleted_at;
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
    if (this.statusSelected.value)
      res = res + "&status=" + this.statusSelected.value;
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
