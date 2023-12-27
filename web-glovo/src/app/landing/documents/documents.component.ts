import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlovoConfirmComponent } from 'src/app/componentes/glovo-confirm/glovo-confirm.component';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})

export class DocumentsComponent implements OnInit {
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
  categoria =    {
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
  constructor(public general: GeneralService , private auth : AuthService , public individual : IndividualService, private http : HttpClient ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    if (!this.individual.documents)
      this.individual.getDocuments(this.genParams());
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.individual.getDocuments(this.genParams());
    });
  }
  buscar() {
    this.individual.getDocuments(this.genParams());
  }
  genParams() {
    this.params = "?per_page=6";
    var res = "?per_page=6";
    res = res + "&category_id=" + this.categoria.id;
    if (this.search !== "")
      res = res + "&search=" + this.search;

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
    this.individual.getDocuments(this.genParams());
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
      this.http.post(this.general.api + "documents/" + id + "/download",{ password: pass },{ headers: this.auth.options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (title)
          downloadLink.setAttribute('download', title);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        if (error.status == 422)
        this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
       })
    })

  }
}
