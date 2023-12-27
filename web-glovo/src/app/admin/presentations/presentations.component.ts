import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { EditPresentationsComponent } from './edit/edit.component';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.sass']
})
export class PresentationsComponent implements OnInit {
  new = false;
  edit = false;
  editPresentations: any;
  params = "?per_page=6&";
  status = [
    { text: this.general.getText({ es: "Activas", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todas", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  search = "";
  
  closeNew = ( ) => {this.new = false ; this.buscar(); };
  $lenguaje!: Subscription;
  constructor(public general: GeneralService, public admin: AdminService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.admin.presentations)
      this.admin.getPresentations(this.params);
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.status = [
        { text: this.general.getText({ es: "Activas", en: "Active" }), value: "vacio" },
        { text: this.general.getText({ es: "Todas", en: "All" }), value: "all" },
        { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
      ]
      this.admin.presentationsFilters.statusSelected = { text: this.general.getText({ es: "Todas", en: "All" }), value: "all" };
      this.admin.getPresentations(this.params);
    });
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
  restaurar(id: string) {
    this.general.loaderShow()
    this.http.put(this.general.api + "admin/presentations/" + id + "/restore", {}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.presentations.data.length; index++) {
        if (this.admin.presentations.data[index].id == id) {
          this.admin.presentations.data[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/presentations/" + id, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.presentations.data.length; index++) {
        if (this.admin.presentations.data[index].id == id) {
          this.admin.presentations.data[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }
  buscar() {
    this.admin.getPresentations(this.genParams());
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
    if (this.admin.presentationsFilters.statusSelected.value)
      res = res + "&status=" + this.admin.presentationsFilters.statusSelected.value;
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
