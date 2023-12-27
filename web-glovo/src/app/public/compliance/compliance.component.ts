import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.sass'],
})
export class ComplianceComponent {
  categorias = [
    {
      text: {
        es: 'Introducción',
        en: 'Capital increases',
      },
      id: 1,
      selected: true,
    },
    {
      text: {
        es: 'Regalos',
        en: 'Partner agreements',
      },
      id: 2,
      selected: false,
    },
    {
      text: {
        es: 'Invitaciones',
        en: 'Auditors',
      },
      id: 3,
      selected: false,
    },
    {
      text: {
        es: 'Patrocinios',
        en: 'Statutes',
      },
      id: 4,
      selected: false,
    },
  ];
  categoria = {
    text: {
      es: 'Aumentos de capital',
      en: 'Capital increases',
    },
    id: 1,
    selected: true,
  };
  parrafos: string[] = [];
  lenguageChange!: Subscription;
  constructor(
    public general: GeneralService,
    public data: PublicService,
    private http: HttpClient,
    private auth: AuthService
  ) {
    var text: string = this.general.getText({
      es: 'no hay datos ',
      en: 'there is no data',
    });
    this.parrafos.push(text);
  }
  getText(title: string, url: string) {
    var split = url.split('.');
    var extension = split[split.length - 1];
    return title + '.' + extension;
  }
  descargar(url: string, title: string) {
    this.http
      .get(url, {
        headers: this.auth.options.headers,
        responseType: 'blob' as 'json',
      })
      .subscribe(
        (resp: any) => {
          let dataType = resp.type;
          let binaryData = [];
          binaryData.push(resp);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          if (title) downloadLink.setAttribute('download', title);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        },
        (error: any) => {}
      );
  }
  getParrafo(body: any) {
    var resp = JSON.parse(body);

    return resp.parrafos;
  }
  resizeIframe() {
    var obj = document.getElementById('pdfFrame')! as HTMLIFrameElement;
    console.log(obj.scrollHeight);
    obj.contentWindow!.document.embeds[0].style.height = '300px';

    console.log(obj.contentWindow!.document.embeds[0].getBoundingClientRect());

    if (obj.contentWindow)
      obj.style.height =
        obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
  resize() {
    console.log(document.getElementById('pdfFrame')!.clientHeight);
  }

  ngOnDestroy() {
    if (this.lenguageChange) this.lenguageChange.unsubscribe();
  }
  select(i: number) {
    this.categoria = this.categorias[i];
    this.categorias.forEach((categoria, index) => {
      categoria.selected = index == i ? true : false;
    });
  }
}
