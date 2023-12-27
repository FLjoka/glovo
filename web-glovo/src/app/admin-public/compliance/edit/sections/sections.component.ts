import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.sass']
})
export class SectionsComponent implements OnInit {
  new = false;
  closeNew = () => { this.new = false };
  edit = false;
  back = () => { }
  $lenguaje!: Subscription;

  backEdit = () => { this.edit = false };

  tab = 0 ;

  constructor(  public general: GeneralService, public admin: PublicAdminService, private auth: AuthService, private http: HttpClient, private rutaActiva: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {
    
    if (!this.admin.sections)
      this.buscar();
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.admin.sectionsFilters.status = [
        { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
        { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
        { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
      ]
      this.admin.sectionsFilters.statusSelected = { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" };
      this.buscar();
    });

  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
  restaurar(id: string) {
    this.general.loaderShow();
    this.http.put(this.general.api + "admin/compliances/tags/" + this.admin.complianceSelect.id + "/sections/" + id + "/restore", {}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.sections.length; index++) {
        if (this.admin.sections[index].id == id) {
          this.admin.sections[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/compliances/tags/" + this.admin.complianceSelect.id + "/sections/" + id, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.sections.length; index++) {
        if (this.admin.sections[index].id == id) {
          this.admin.sections[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  buscar() {
    this.admin.getSections(this.genParams());
  }

  genParams() {

    var res = "?per_page=6";
    if (this.admin.sectionsFilters.statusSelected.value)
      res = res + "&status=" + this.admin.sectionsFilters.statusSelected.value;
    if (this.admin.sectionsFilters.search !== "")
      res = res + "&search=" + this.admin.sectionsFilters.search;
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
  getImage(mime_type: string, image: string) {

    return "data:" + mime_type + ";base64," + image;
  }
}