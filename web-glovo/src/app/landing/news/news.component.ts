import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { IndividualService } from 'src/app/services/individual.service';
import { NewNoticiaComponent } from './new-noticia/new-noticia.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  @ViewChild("noticiaCompleta") noticia!: NewNoticiaComponent;
  view = false;
  noticiaSelect: any;
  data = [
    {
      id: 1,
      title: "At pariatur quia1.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/tarjeta/tarjeta-800.jpg",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },
    {
      id: 2,
      title: "At pariatur quia2.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/compu.png",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },
    {
      id: 3,
      title: "At pariatur quia3.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/muroc.png",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },
    {
      id: 4,
      title: "At pariatur quia4.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/tarjeta/tarjeta-800.jpg",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },
    {
      id: 5,
      title: "At pariatur quia4.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/tarjeta/tarjeta-800.jpg",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },

    {
      id: 6,
      title: "At pariatur quia4.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/tarjeta/tarjeta-800.jpg",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },

    {
      id: 7,
      title: "At pariatur quia4.",
      body: "Et modi sapiente numquam tempore nemo officia illum. Optio beatae molestias quo eum rerum. Perferendis et similique et nostrum et. Inventore ut rerum ex dolor.",
      image: "assets/tarjeta/tarjeta-800.jpg",
      mime_type: "image\/png",
      published: true,
      event_date: "2021-10-15T01:13:51.000000Z",
      created_at: "2021-09-22T03:29:30.000000Z",
      updated_at: "2021-09-22T03:29:30.000000Z",
      deleted_at: null,
      uploaded_by: {
        id: 1001,
        name: "Santina Dare MD",
        email: "glovoprivateadmin@gmail.com"
      }
    },


  ]
  mas = false;

  constructor(public general: GeneralService, public individual: IndividualService) { }

  ngOnInit(): void {
    this.individual.setReader();
  }
  shortText(body: string) {
    try {
      var resp = JSON.parse(body);

      return resp.parrafos[0].substr(0, 80) + "..."
    } catch {
      return body.substr(0, 80) + "..."
    }

  }
  buscarMas() {
    this.mas = true;
    this.individual.addAnnouncements();

  }

  descargar(url: any) {
    if (this.general.dialog)
      this.general.dialog.show(this.general.getText({ en: "Confirmation", es: "Confirmación" }),
        this.general.getText({ en: "You are trying to download a report, do you want to continue?", es: "Estás intentando descargar un informe, ¿quieres continuar?" }),
        this.general.getText({ en: "Accept", es: "Aceptar" }),
        this.general.getText({ en: "Cancel", es: "Cancelar" }),
        () => {
          console.log("archivo descargado");
          //this.downGen(url);
        })
  }
}
