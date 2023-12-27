import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { GlovoConfirmComponent } from '../componentes/glovo-confirm/glovo-confirm.component';
import { GlovoInfoComponent } from '../componentes/glovo-info/glovo-info.component';
import { GlovoMenuComponent } from '../componentes/glovo-menu/glovo-menu.component';
import { PassConfirmComponent } from '../componentes/pass-confirm/pass-confirm.component';
import { ReturnEmailComponent } from '../componentes/return-email/return-email.component';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  dev = false;
  api: string;
  //pdf,xls,xlw,xlsx,docx,dotx,doc,dot
  tiposDeArchivo = [
    { tipo: '.doc ', expresion: 'application/msword' },
    { tipo: '.dot ', expresion: 'application/msword' },
    {
      tipo: '.docx  ',
      expresion:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    {
      tipo: '.dotx ',
      expresion:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    },
    { tipo: '.xls', expresion: 'application/vnd.ms-excel' },
    {
      tipo: '.xlsx',
      expresion:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    { tipo: '.xlw', expresion: 'application/excel' },
  ];
  charts: any = undefined;
  idiomas = [
    {
      code: 'es',
      nombre: { es: 'Español', en: 'Spanish' },
      selected: false,
    },
    {
      code: 'en',
      nombre: { es: 'Ingles', en: 'English' },
      selected: true,
    },
  ];
  private comparar: any;

  idioma() {
    var code = '';
    this.idiomas.forEach((idioma) => {
      if (idioma.selected) code = idioma.code;
    });
    return code;
  }
  lenguage = new Subject<string>();
  dialog: GlovoConfirmComponent | undefined;
  menuresponsive!: GlovoMenuComponent;
  info!: GlovoInfoComponent;
  downCode!: PassConfirmComponent;
  resetCorreo!: ReturnEmailComponent;
  menu = [
    {
      nombre: {
        es: 'Para que todos tengan fácil acceso a cualquier cosa en su ciudad.',
        en: 'To give everyone easy access to anything in their city.',
      },
      selected: true,
      subItems: undefined,
      icon: 'assets/icons/logo.svg',
      show: false,
      icon_only: true,
      background: '  assets/bici/bici-480.jpg 480w,assets/bici/bici.jpg 800w ',
      route: '/private/home',
      pagebg: 'white',
      description: {
        es: '',
        en: '',
      },
    },
    {
      nombre: { es: 'Presentación', en: 'Presentation' },
      selected: false,
      subItems: [
        {
          nombre: { es: 'Presentaciones', en: 'Presentations' },
          selected: false,
          route: '/private/presentations',
          pagebg: ' #f2f2f2',
          background:
            'assets/pedido/pedido-480.jpg 480w, assets/pedido/pedido-800.jpg 800w',
          description: {
            es: 'Tenemos el objetivo de transmitir el compromiso de velar por el respeto a las leyes y a las normas vigentes en cada momento, así como en la promoción y defensa de sus valores corporativos y principios de actuación establecidos en su Código Ético.',
            en: 'We have the objective of transmitting the commitment to ensure respect for the laws and regulations in force at all times, as well as the promotion and defense of its corporate values ​​and principles of action established in its Code of Ethics.',
          },
        },
        {
          nombre: {
            es: 'Graficas Organizacionales',
            en: 'Organization Charts',
          },
          selected: false,
          route: '/private/organization-charts',
          background:
            'assets/muro/muro-480.jpg 480w, assets/muro/muro-800.jpg 800w',
          pagebg: ' #f2f2f2',
          description: {
            es: 'La estructura corporativa implantada en Glovo es el reflejo de una gestión y control responsable y transparente dirigido a lograr un éxito sostenible en el largo plazo con el fin de promover la confianza en la gestión y supervisión de nuestra empresa por parte de inversores, clientes, empleados y comunidad tanto en el ámbito nacional e internacional.',
            en: 'The corporate structure implemented in Glovo is the reflection of a responsible and transparent management and control aimed at achieving sustainable success in the long term in order to promote trust in the management and supervision of our company by investors, clients, and employees. and community both nationally and internationally.',
          },
        },
      ],
      icon: undefined,
      show: true,
      icon_only: false,
      background:
        'assets/globers/globers-480.jpg 480w, assets/globers/globers-800.jpg 800w',
      route: '',
      pagebg: '#f2f2f2',
    },
    {
      nombre: { es: 'Reportes Financieros', en: 'Financial Reports' },
      selected: false,
      subItems: undefined,
      icon: undefined,
      show: true,
      icon_only: false,
      background:
        'assets/tarjeta/tarjeta-480.jpg 480w, assets/tarjeta/tarjeta-800.jpg 800w',
      route: '/private/financial-reports',
      pagebg: '#f2f2f2',
      description: {
        es: 'Para Glovo es fundamental que sus inversores conozcan los aspectos contables y relativos a la información financiera que sean relevantes para la sociedad y el tratamiento que reciben por parte de la Alta Dirección.',
        en: 'For Glovo, it is essential that its investors know the accounting and financial information aspects that are relevant to the company and the treatment they receive from Senior Management.',
      },
    },
    {
      nombre: { es: 'Solicitudes De Accionistas', en: 'Shareholders Requests' },
      selected: false,
      subItems: undefined,
      icon: undefined,
      show: true,
      icon_only: false,
      background: null,
      route: '/private/shareholders-requests',
      pagebg: '#f2f2f2',
      description: {
        es: 'Este canal es una vía de comunicación interna con el fin de dar cumplimiento a las normas recogidas en las políticas internas de Glovo. Cualquier duda o gestión puede canalizarse a través de este formulario.',
        en: "This channel is an internal communication channel in order to comply with the standards set out in Glovo's internal policies. Any questions or management can be channeled through this form.",
      },
    },
    {
      nombre: { es: 'Documentos', en: 'Documents' },
      selected: false,
      subItems: undefined,
      icon: undefined,
      show: true,
      icon_only: false,
      background: null,
      route: '/private/documents',
      pagebg: '#f2f2f2',
      description: {
        es: 'Habilitamos a un repositorio documental con información esencial y actualizada.',
        en: 'We enable a document repository with essential and updated information.',
      },
    },
    {
      nombre: { es: 'Noticias', en: 'News' },
      selected: false,
      subItems: undefined,
      icon: undefined,
      show: true,
      icon_only: false,
      background: null,
      route: '/private/news',
      pagebg: '#f2f2f2',
      description: {
        es: '',
        en: '',
      },
    },
    {
      nombre: { es: 'Mi Perfil', en: 'My Profile' },
      selected: false,
      icon: 'assets/icons/user.svg',
      show: true,
      icon_only: true,
      subItems: undefined,
      background: null,
      route: '/private/profile',
      pagebg: '#f2f2f2',
      description: {
        es: '',
        en: '',
      },
    },
  ];

  getText(text: any) {
    switch (this.idioma()) {
      case 'es':
        return text.es ? text.es : text.en;
        break;
      case 'en':
        return text.en;
        break;
      default:
        return text.en;
        break;
    }
  }
  private history: string[] = [];
  constructor(private route: Router, private location: Location) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
    if (environment.production) this.api = '/api/';
    else this.api = environment.apiUrl;

    var ln = window.navigator.language;
    ln = ln.split('-')[0];
    if (ln === 'en') {
      this.idiomas[1].selected = true;
      this.idiomas[0].selected = false;
    }
    if (ln === 'es') {
      this.idiomas[0].selected = true;
      this.idiomas[1].selected = false;
    }
    this.comparar = this.idioma();
    setInterval(() => {
      if (this.comparar !== this.idioma()) {
        this.comparar = this.idioma();
        this.lenguage.next(this.idioma());
      }
    }, 200);
    route.events.subscribe((val) => {
      this.menu.forEach((element) => {
        if (this.route.url.startsWith(element.route) && element.route !== '') {
          element.selected = true;
        } else element.selected = false;
        if (element.subItems)
          element.subItems.forEach((ele) => {
            if (this.route.url.startsWith(ele.route)) {
              ele.selected = true;
              element.selected = true;
            } else ele.selected = false;
          });
      });
    });
  }
  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.route.navigateByUrl('/');
    }
  }
  getFecha(date: any) {
    var resp;
    var fecha: Date;
    if (typeof date === 'string') fecha = new Date(Date.parse(date));
    else fecha = date;

    switch (this.idioma()) {
      case 'es':
        resp = fecha.toLocaleDateString('es-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return resp;
      case 'en':
        resp = fecha.toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return resp;
      default:
        return resp;
    }
  }
  getYear(date: Date) {
    var fecha: Date;
    if (typeof date === 'string') fecha = new Date(date);
    else fecha = date;
    return fecha.toLocaleDateString('en-EN', { year: 'numeric' });
  }
  getMonth(date: Date) {
    var resp;
    var fecha: Date;
    if (typeof date === 'string') fecha = new Date(date);
    else fecha = date;
    switch (this.idioma()) {
      case 'es':
        resp = fecha.toLocaleDateString('es-ES', {
          month: 'long',
          day: 'numeric',
        });
        return resp;
      case 'en':
        resp = fecha.toLocaleDateString('en-EN', {
          month: 'long',
          day: 'numeric',
        });
        return resp;
      default:
        return resp;
    }
  }
  getImage(mime_type: string, image: string) {
    return 'data:' + mime_type + ';base64,' + image;
  }
  loaderShow() {
    document.getElementById('loader')!.style.display = 'flex';
  }
  loaderHidden() {
    document.getElementById('loader')!.style.display = 'none';
  }
}
