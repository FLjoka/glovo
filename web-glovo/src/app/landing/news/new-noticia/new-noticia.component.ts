import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'new-noticia',
  templateUrl: './new-noticia.component.html',
  styleUrls: ['./new-noticia.component.sass']
})
export class NewNoticiaComponent implements OnInit {
  @Input() data!: any;
  noticia: any;
  buscando = false;
  $lenguaje : any;
  constructor(public general: GeneralService, private http: HttpClient, private rutaActiva: ActivatedRoute, public auth: AuthService, public individual: IndividualService) {
    // this.getParameterByName("")
    // fechas con horas/ https://calendar.google.com/calendar/render?action=TEMPLATE&text=Event%20Name&dates=20210101T220000Z/20210101T230000Z&details=Describe%20your%20event.&location=Event%20Location&trp=true
    // all day / https://calendar.google.com/calendar/render?action=TEMPLATE&text=Event%20Name&dates=20210101/20210101&details=Describe%20your%20event.&location=Event%20Location&trp=true

  }
  getParameterByName(name: string, url: string) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.buscando = true;
    
    this.http.get(this.general.api + "announcements/" + this.rutaActiva.snapshot.params.id, this.auth.options).subscribe(resp => {
      this.noticia = resp;
      this.buscando = false;
    }, error => {
      this.buscando = false;
    })
    this.$lenguaje = this.general.lenguage.subscribe(resp => {
      this.buscando = true;
      this.http.get(this.general.api + "announcements/" + this.rutaActiva.snapshot.params.id, this.auth.options).subscribe(resp => {
        this.noticia = resp;
        this.buscando = false;
      }, error => {
        this.buscando = false;
      })
    });
  }
  ngOnDestroy() {
    this.$lenguaje.unsubscribe();
  }
  text(body: string) {
    try {
      var resp = JSON.parse(body);
      return resp
    } catch {
      return body
    }
  }
  typeof(e: any) {
    return typeof e
  }
  addCalendar() {
    var fecha: Date;
    if (typeof this.noticia.event_date === 'string')
      fecha = new Date(Date.parse(this.noticia.event_date));
    else
      fecha = this.noticia.event_date;
    var resp = "" + fecha.getFullYear();
    if (fecha.getMonth() + 1 < 10)
      resp += "0" + (fecha.getMonth() + 1)
    else
      resp += "" + (fecha.getMonth() + 1)
    if (fecha.getDate() < 10)
      resp += "0" + (fecha.getDate())
    else
      resp += "" + (fecha.getDate())
    if (fecha.getHours() < 10)
      resp += "T0" + (fecha.getDate())
    else
      resp += "T" + (fecha.getDate())
    if (fecha.getMinutes() < 10)
      resp += "0" + (fecha.getMinutes())
    else
      resp += "" + (fecha.getMinutes())
    resp  += "00";

    
    // Consequatur illo eligendi asperiores incidunt maiores illo sunt voluptatem
    window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text="+ this.noticia.title.replace(/\+| /g, "%20")+ "&dates=" + resp + "/" + resp + "&trp=true", 'name');
  }
  descargar(url: string, title: string) {
    this.general.downCode.show((pass: string) => {
      this.http.post(url, { password: pass }, { headers: this.auth.options.headers, responseType: 'blob' as 'json' }).subscribe((resp: any) => {
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

  descargasdr(url: any) {
    if (this.general.dialog)
      this.general.dialog.show(this.general.getText({ en: "Confirmation", es: "Confirmación" }),
        this.general.getText({ en: "You are trying to download a report, do you want to continue?", es: "Estás intentando descargar un informe, ¿quieres continuar?" }),
        this.general.getText({ en: "Accept", es: "Aceptar" }),
        this.general.getText({ en: "Cancel", es: "Cancelar" }),
        () => {

          //this.downGen(url);
        })
  }
}
