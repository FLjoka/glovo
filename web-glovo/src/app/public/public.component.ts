import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.sass'],
})
export class PublicComponent implements OnInit {
  window: any;
  constructor(
    public general: GeneralService,
    public router: Router,
    public data: PublicService,
    public auth: AuthService
  ) {
    this.window = window;
    this.data.getCorporate();
  }

  menuSelect(i: number) {
    if (!this.general.menu[i].subItems)
      for (let index = 0; index < this.general.menu.length; index++) {
        if (i == index) {
          this.general.menu[index].selected = true;
        } else {
          this.general.menu[index].selected = false;
          for (let i = 0; i < this.general.menu.length; i++) {
            const element = this.general.menu[i];
            if (this.general.menu[i].subItems !== undefined) {
              this.general.menu[i].subItems?.forEach((element, index) => {
                this.general.menu[i].subItems![index].selected = false;
              });
            }
          }
        }
      }
    var ruta = this.general.menu[i].route ? this.general.menu[i].route : '';
    if (ruta !== '') {
      this.router.navigateByUrl(ruta);
      window.scrollTo(0, 0);
    }
  }

  menuSelectList = (items: any, order: number, i: number) => {
    for (let i = 0; i < this.general.menu.length; i++) {
      this.general.menu[i];
      if (i == order) {
        this.general.menu[i].subItems = items;
        this.general.menu[i].selected = true;
      } else {
        this.general.menu[i].selected = false;
      }
    }

    var ruta = items[i].route;

    if (ruta !== '') {
      this.router.navigateByUrl(ruta);
      window.scrollTo(0, 0);
    }
  };

  menuSelectList2 = (order: number, select: number) => {
    if (this.general.menu[order].subItems !== undefined) {
      this.general.menu[order].subItems?.forEach((element, index) => {
        if (index == select)
          this.general.menu[order].subItems![index].selected = true;
        else this.general.menu[order].subItems![index].selected = false;
      });
    }

    for (let i = 0; i < this.general.menu.length; i++) {
      this.general.menu[i];
      if (i == order) {
        this.general.menu[i].selected = true;
      } else {
        this.general.menu[i].selected = false;
      }
    }
    var ruta = this.general.menu[order].subItems![select].route;

    if (ruta !== '') {
      this.router.navigateByUrl(ruta);
      window.scrollTo(0, 0);
    }
  };

  ngOnInit(): void {
    this.general.menu = [
      {
        nombre: { es: 'Inicio', en: 'Home' },
        selected: true,
        subItems: undefined,
        icon: 'assets/icons/logo.svg',
        show: true,
        icon_only: false,
        background:
          'assets/public/home-header/home-header-480.jpg 480w,assets/public/home-header/home-header-800.jpg 800w , assets/public/home-header/home-header-1200.jpg 1200w ',
        route: '/public/home',
        pagebg: 'white',
        description: {
          es: 'sdasdasd',
          en: 'asdadaw',
        },
      },
      {
        nombre: { es: 'Corporativo', en: 'Corporate' },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background:
          'assets/pedido/pedido-480.jpg 480w,  assets/pedido/pedido-800.jpg 800w,   assets/pedido/pedido-1200.jpg 1200w',
        route: '/public/corporate',
        pagebg: '#ffff',
        description: {
          es: 'Habilitamos a un repositorio documental con información esencial y actualizada.',
          en: 'We enable a document repository with essential and updated information.',
        },
      },
      {
        nombre: { es: 'Capacitación', en: 'Training' },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background:
          'assets/public/training-public/training-public-480.jpg 480w,assets/public/training-public/training-public-800.jpg 800w , assets/public/training-public/training-public-1200.jpg 1200w ',
        route: '/public/training',
        pagebg: 'white',
        description: {
          es: '',
          en: '',
        },
      },
      {
        nombre: { es: 'Cumplimiento', en: 'Compliance' },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background:
          'assets/public/compliance-public/compliance-public-480.jpg 480w,assets/public/compliance-public/compliance-public-800.jpg 800w , assets/public/compliance-public/compliance-public-1200.jpg 1200w ',
        route: '/public/compliance',
        pagebg: '#f2f2f2',
        description: {
          es: '',
          en: '',
        },
      },
      {
        nombre: { es: 'Canal de denuncias', en: 'Whistleblower Channel' },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background:
          'assets/public/whistleblower-channel/whistleblower-channel-480.jpg 480w,assets/public/whistleblower-channel/whistleblower-channel-800.jpg 800w , assets/public/whistleblower-channel/whistleblower-channel-1200.jpg 1200w ',
        route: '/public/whistleblower-channel',
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
        route: 'login',
        pagebg: '#f2f2f2',
        description: {
          es: '',
          en: '',
        },
      },
    ];

    var menu = document.getElementById('menuBar') as HTMLElement;
    var items = document.getElementById('menuBarItems') as HTMLElement;
    window.onscroll = () => {
      if (window.scrollY > 105) {
        items.classList.remove('hidden');
        menu.classList.add('bg');
        menu.style.justifyContent = 'space-between';
      } else {
        menu.style.justifyContent = 'flex-end';
        items.classList.add('hidden');
        menu.classList.remove('bg');
      }
    };

    if (this.data.corporate.length !== 0) this.data.getCorporate();
    if (this.data.compliance.length == 0) this.data.getCompliance();
    this.general.loaderShow();
    var count = 5;
    this.data.getSettings('home', (resp: any) => {
      this.data.homeSettings = resp;
      this.general.menu![0].description = resp.header;
      this.general.loaderHidden();
    });
    this.data.getSettings('training', (resp: any) => {
      this.data.trainingSettings = resp;
      this.general.menu![2].description = resp.header;
      this.data.items[0].descripcion = resp.section1.body;
      this.data.items[0].subtitulo = resp.section1.title;
      this.data.items[1].descripcion = resp.section2.body;
      this.data.items[1].subtitulo = resp.section2.title;
      this.data.items[2].descripcion = resp.section3.body;
      this.data.items[2].subtitulo = resp.section3.title;
      if (count == 0) this.general.loaderHidden();
      else count--;
    });
    this.data.getSettings('corporate', (resp: any) => {
      this.data.corporateSettings = resp;
      this.general.menu![1].description = resp.header;
      if (count == 0) this.general.loaderHidden();
      else count--;
    });
    this.data.getSettings('compliance', (resp: any) => {
      this.data.complianceSettings = resp;
      this.general.menu![3].description = resp.header;
      if (count == 0) this.general.loaderHidden();
      else count--;
    });
    this.data.getSettings('whistleblower', (resp: any) => {
      this.data.whistleblowerSettings = resp;
      this.general.menu![4].description = resp.header;
      if (count == 0) this.general.loaderHidden();
      else count--;
    });
    this.data.getListRequests();

    this.general.lenguage.subscribe((resp) => {
      this.data.getCompliance();
    });
  }
  ngOnDestroy() {
    window.removeAllListeners;
  }
  toggle(pop: any) {}
  mostrar() {}

  getFondo() {
    var bg: string = '';
    this.general.menu.forEach((item) => {
      if (item.selected) {
        if (item.subItems) {
          item.subItems.forEach((subitem) => {
            if (subitem.selected)
              bg = subitem.background ? subitem.background : item.background;
          });
        } else {
          if (item.background) {
            bg = item.background;
          }
        }
      }
    });
    return bg;
  }

  getTitle() {
    var resp = '';
    this.general.menu.forEach((item) => {
      if (item.selected)
        if (item.subItems)
          item.subItems.forEach((subItem) => {
            if (subItem.selected) resp = this.getText(subItem.description);
          });
        else resp = this.getText(item.description);
    });
    return resp;
  }

  getText(text: any) {
    switch (this.general.idioma()) {
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

  pagebg() {
    var resp = 'white';
    this.general.menu.forEach((item) => {
      if (item.selected)
        if (item.subItems)
          item.subItems.forEach((subItem) => {
            if (subItem.selected) resp = subItem.pagebg;
          });
        else resp = item.pagebg;
    });

    return resp;
  }
}
