import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  new = false;
  closeNew = () => { this.new = false; this.buscar(); };
  edit = false;
  editAnnouncement: any;
  params = "?per_page=6&";
  status = [
    { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  search = "";

  back = () => { }
  $lenguaje!: Subscription;
  backEdit = () => { this.edit = false;this.buscar(); }
  constructor(public general: GeneralService, public admin: AdminService, private auth: AuthService, private http: HttpClient, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.id){
      this.editAnnouncement = { id : this.rutaActiva.snapshot.params.id  };
      this.edit = true;
    }
    if (!this.admin.announcements)
      this.admin.getAnnouncement(this.params + "&status=all");
      this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.status = [
        { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
        { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
        { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
      ]
      this.admin.newsFilters.statusSelected = { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" };
      this.buscar();
    });
  
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
  restaurar(id: string) {
    this.general.loaderShow()
    this.http.put(this.general.api + "admin/announcements/" + id + "/restore", {}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.announcements.data.length; index++) {
        if (this.admin.announcements.data[index].id == id) {
          this.admin.announcements.data[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/announcements/" + id, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.announcements.data.length; index++) {
        if (this.admin.announcements.data[index].id == id) {
          this.admin.announcements.data[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }
  buscar() {
    this.admin.getAnnouncement(this.genParams());
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
    if ( this.admin.newsFilters.statusSelected.value)
      res = res + "&status=" + this.admin.newsFilters.statusSelected.value;
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
  getImage(mime_type: string, image: string) {
    return "data:" + mime_type + ";base64," + image;
  }
}
