import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlovoMenuComponent } from '../componentes/glovo-menu/glovo-menu.component';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';
import { IndividualService } from '../services/individual.service';
import { PrivateService } from '../services/private.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  window : any;
  constructor(public general: GeneralService, public individual : IndividualService, public router: Router, public privado : PrivateService, public auth : AuthService) {
    this.window = window;
  }
  log(){

    
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
    var ruta = this.general.menu[i].route ? this.general.menu[i].route : "";
    if (ruta !== "") {
      this.router.navigateByUrl(ruta)
      window.scrollTo(0, 0)
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

    if (ruta !== "") {
      this.router.navigateByUrl(ruta)
      window.scrollTo(0, 0)
    }
  }

  menuSelectList2 = (order: number, select: number) => {

    if (this.general.menu[order].subItems !== undefined) {
      this.general.menu[order].subItems?.forEach((element, index) => {
        if (index == select)
          this.general.menu[order].subItems![index].selected = true;
        else
          this.general.menu[order].subItems![index].selected = false;
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
    var ruta = this.general.menu[order].subItems![select].route

    if (ruta !== "") {
      this.router.navigateByUrl(ruta)
      window.scrollTo(0, 0)
    }
  }

  ngOnInit(): void {
    this.general.menu = [
      {
        nombre: { es: "Para que todos tengan fácil acceso a cualquier cosa en su ciudad.", en: "To give everyone easy access to anything in their city." },
        selected: true,
        subItems: undefined,
        icon: "assets/icons/logo.svg",
        show: false,
        icon_only: true,
        background: "  assets/bici/bici-480.jpg 480w,assets/bici/bici.jpg 800w ",
        route: "/private/home",
        pagebg: "white",
        description: {
          es: "",
          en: ""
        }
      },
      {
        nombre: { es: "Presentación", en: "Presentation" },
        selected: false,
        subItems: [
          {
            nombre: { es: "Presentaciones", en: "Presentations" },
            selected: false,
            route: "/private/presentations",
            pagebg: " #f2f2f2",
            background: "assets/pedido/pedido-480.jpg 480w, assets/pedido/pedido-800.jpg 800w",
            description: {
              es: "Tenemos el objetivo de transmitir el compromiso de velar por el respeto a las leyes y a las normas vigentes en cada momento, así como en la promoción y defensa de sus valores corporativos y principios de actuación establecidos en su Código Ético.",
              en: "We have the objective of transmitting the commitment to ensure respect for the laws and regulations in force at all times, as well as the promotion and defense of its corporate values ​​and principles of action established in its Code of Ethics."
            }
          },
          {
            nombre: { es: "Graficas Organizacionales", en: "Organization Charts" },
            selected: false,
            route: "/private/organization-charts",
            background: "assets/muro/muro-480.jpg 480w, assets/muro/muro-800.jpg 800w",
            pagebg: " #f2f2f2",
            description: {
              es: "La estructura corporativa implantada en Glovo es el reflejo de una gestión y control responsable y transparente dirigido a lograr un éxito sostenible en el largo plazo con el fin de promover la confianza en la gestión y supervisión de nuestra empresa por parte de inversores, clientes, empleados y comunidad tanto en el ámbito nacional e internacional.",
              en: "The corporate structure implemented in Glovo is the reflection of a responsible and transparent management and control aimed at achieving sustainable success in the long term in order to promote trust in the management and supervision of our company by investors, clients, and employees. and community both nationally and internationally."
            }
          }
        ],
        icon: undefined,
        show: true,
        icon_only: false,
        background: "assets/globers/globers-480.jpg 480w, assets/globers/globers-800.jpg 800w",
        route: "",
        pagebg: "#f2f2f2"
      },
      {
        nombre: { es: "Reportes Financieros", en: "Financial Reports" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: "assets/tarjeta/tarjeta-480.jpg 480w, assets/tarjeta/tarjeta-800.jpg 800w",
        route: "/private/financial-reports",
        pagebg: "#f2f2f2",
        description: {
          es: "Para Glovo es fundamental que sus inversores conozcan los aspectos contables y relativos a la información financiera que sean relevantes para la sociedad y el tratamiento que reciben por parte de la Alta Dirección.",
          en: "For Glovo, it is essential that its investors know the accounting and financial information aspects that are relevant to the company and the treatment they receive from Senior Management."
        }
      },
      {
        nombre: { es: "Solicitudes De Accionistas", en: "Shareholders Requests" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: null,
        route: "/private/shareholders-requests",
        pagebg: "#f2f2f2",
        description: {
          es: "Este canal es una vía de comunicación interna con el fin de dar cumplimiento a las normas recogidas en las políticas internas de Glovo. Cualquier duda o gestión puede canalizarse a través de este formulario.",
          en: "This channel is an internal communication channel in order to comply with the standards set out in Glovo's internal policies. Any questions or management can be channeled through this form."
        }
      },
      {
        nombre: { es: "Documentos", en: "Documents" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background:  "assets/reunion/reunion-480.jpg 480w, assets/reunion/reunion-800.jpg 800w",
        route: "/private/documents",
        pagebg: "#f2f2f2",
        description: {
          es: "Habilitamos a un repositorio documental con información esencial y actualizada.",
          en: "We enable a document repository with essential and updated information."
        }
      },
      {
        nombre: { es: "Noticias", en: "News" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: null,
        route: "/private/news",
        pagebg: "white",
        description: {
          es: "",
          en: ""
        }
      },
      {
        nombre: { es: "Mi Perfil", en: "My Profile" },
        selected: false,
        icon: "assets/icons/user.svg",
        show: true,
        icon_only: true,
        subItems: undefined,
        background: null,
        route: "/private/profile",
        pagebg: "#f2f2f2",
        description: {
          es: "",
          en: ""
        }
      }
  
    ]
    
    var menu = document.getElementById("menuBar") as HTMLElement;
    var items = document.getElementById("menuBarItems") as HTMLElement;
    window.onscroll = () => {
      if (window.scrollY > 105) {
        items.classList.remove("hidden");
        menu.classList.add("bg");
        menu.style.justifyContent = "space-between";
      }
      else {
        menu.style.justifyContent = "flex-end";
        items.classList.add("hidden")
        menu.classList.remove("bg")
      }
    }
    this.privado.init(this.auth.user);
    this.individual.getAnnouncements();
    this.individual.getUnread();
    this.individual.getListRequests();
  }
  ngOnDestroy(){
    window.removeAllListeners;
  }
  toggle(pop: any) {

  }
  mostrar() {

  }
  pr() {


  }

  getFondo() {
    var bg: string = ""
    this.general.menu.forEach(item => {
      if (item.selected) {
        if (item.subItems) {
          item.subItems.forEach(subitem => {
            if (subitem.selected)
              bg = subitem.background ? subitem.background : item.background;
          });
        }
        else {
          if (item.background) {
            bg = item.background
          }
        }
      }
    });
    return bg;
  }
  getTitle() {
    var resp = "";
    this.general.menu.forEach(item => {
      if (item.selected)
        if (item.subItems)
          item.subItems.forEach(subItem => {
            if (subItem.selected)
              resp = this.getText(subItem.nombre);
          });
        else
          resp = this.getText(item.nombre);
    });
    return resp;
  }
  getText(text: any) {
    switch (this.general.idioma()) {
      case "es":
        return text.es ? text.es : text.en;
        break;
      case "en":
        return text.en;
        break;
      default:
        return text.en;
        break;
    }
  }
  pagebg() {
    var resp = "";
    this.general.menu.forEach(item => {
      if (item.selected)
        if (item.subItems)
          item.subItems.forEach(subItem => {
            if (subItem.selected)
              resp = subItem.pagebg;
          });
        else
          resp = item.pagebg;
    });

    return resp;
  }
  cerrarSesion(){
    this.auth.logOut();
  }
}
