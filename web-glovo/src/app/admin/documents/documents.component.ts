import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent implements OnInit {
  new = false;
  edit = false;
  editDocument: any;
  categorias = [
    {
      text: {
        es: "Aumentos de capital",
        en: "Capital increases"
      },
      id: 1,
      selected: true
    },
    {
      text: {
        es: "Pactos de socios",
        en: "Partner agreements"
      },
      id: 2,
      selected: false
    },
    {
      text: {
        es: "Auditores",
        en: "Auditors"
      },
      id: 3,
      selected: false
    },
    {
      text: {
        es: "Estatutos",
        en: "Statutes"
      },
      id: 4,
      selected: false
    },
    {
      text: {
        es: "Actos Juntas General",
        en: "General Meetings Acts "
      },
      id: 5,
      selected: false
    },
  ]
  categoria = {
    text: {
      es: "Aumentos de capital",
      en: "Capital increases"
    },
    id: 1,
    selected: true
  };
  params = "?per_page=6&";
  search = "";
  
  $lenguaje!: Subscription;
  closeNew = () => { this.new = false; this.buscar(); };
  status = [
    { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
    { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
  ]
  constructor(public general: GeneralService, private auth: AuthService, public admin: AdminService, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.admin.documents)
      this.admin.getDocuments(this.genParams());
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.status = [
        { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
        { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
        { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
      ]
      this.admin.documentsFilters.statusSelected = { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" };
      this.admin.getDocuments(this.genParams());
    });
  }
  restaurar(id: string) {
    this.general.loaderShow()
    this.http.put(this.general.api + "admin/documents/" + id + "/restore", {}, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.documents.data.length; index++) {
        if (this.admin.documents.data[index].id == id) {
          this.admin.documents.data[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }

  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/documents/" + id, this.auth.options).subscribe((resp: any) => {
      for (let index = 0; index < this.admin.documents.data.length; index++) {
        if (this.admin.documents.data[index].id == id) {
          this.admin.documents.data[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }
  log(e: any) {


  }
  buscar() {
    this.admin.getDocuments(this.genParams());
  }
  genParams() {
    this.params = "?per_page=6";
    var res = "?per_page=6";
    res = res + "&category_id=" + this.categoria.id;
    if (this.search !== "")
      res = res + "&search=" + this.search;
    if (this.admin.documentsFilters.statusSelected.value)
      res = res + "&status=" + this.admin.documentsFilters.statusSelected.value;

    return res
  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
  select(i: number) {
    this.categoria = this.categorias[i]
    this.categorias.forEach((categoria, index) => {
      categoria.selected = index == i ? true : false
    });
    this.admin.getDocuments(this.genParams());
  }
  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  descargar(id: string, title: string) {
    this.general.downCode.show((pass: string) => {
      this.http.get(this.general.api + "documents/" + id, { headers: this.auth.options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (title)
          downloadLink.setAttribute('download', title);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => { })
    })

  }
}
