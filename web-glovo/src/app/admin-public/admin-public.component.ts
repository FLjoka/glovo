import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlovoMenuComponent } from '../componentes/glovo-menu/glovo-menu.component';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';
import { PrivateService } from '../services/private.service';
import { PublicAdminService } from '../services/public-admin.service';

@Component({
  selector: 'app-admin-public',
  templateUrl: './admin-public.component.html',
  styleUrls: ['./admin-public.component.sass']
})
export class AdminPublicComponent implements OnInit {
  window: any;
  constructor(public general: GeneralService, public data: PublicAdminService, public router: Router, public auth: AuthService) {
    this.window = window;
  }

  cerrarSesion() {
    this.auth.logOut();
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
        nombre: { es: "Inicio", en: "Home" },
        selected: true,
        subItems: undefined,
        icon: "assets/icons/logo.svg",
        show: true,
        icon_only: false,
        background: null,
        route: "/admin-public/home",
        pagebg: "white",
        description: {
          es: "sdasdasd",
          en: "asdadaw"
        }
      },
      {
        nombre: { es: "Corporativo", en: "Corporate" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: null,
        route: "/admin-public/corporate",
        pagebg: "#f2f2f2",
        description: {
          es: "Habilitamos a un repositorio documental con información esencial y actualizada.",
          en: "We enable a document repository with essential and updated information."
        }
      },
      {
        nombre: { es: "Capacitación", en: "Training" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: null,
        route: "/admin-public/training",
        pagebg: "#f2f2f2",
        description: {
          es: "",
          en: ""
        }
      },
      {
        nombre: { es: "Cumplimiento", en: "Compliance" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: null,
        route: "/admin-public/compliance",
        pagebg: "#f2f2f2",
        description: {
          es: "",
          en: ""
        }
      },
      {
        nombre: { es: "Canal de denuncias", en: "Whistleblower Channel" },
        selected: false,
        subItems: undefined,
        icon: undefined,
        show: true,
        icon_only: false,
        background: null,
        route: "/admin-public/whistleblower-channel",
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
        route: "/admin-public/profile",
        pagebg: "#f2f2f2",
        description: {
          es: "",
          en: ""
        }
      }

    ]
    var count = 5;
    this.data.getSettings("home", (resp: any) => {
      this.data.homeSetting = resp;
      this.general.menu![0].description = resp.header;
      if (count == 0)
        this.general.loaderHidden();
      else
        count--;
    })
    this.data.getSettings("training", (resp: any) => {
      this.data.trainingSettings = resp;
      this.general.menu![2].description = resp.header;
      if (count == 0)
        this.general.loaderHidden();
      else
        count--;
    })
    this.data.getSettings("corporate", (resp: any) => {
      this.data.corporateSettings = resp;
      this.general.menu![1].description = resp.header;
      if (count == 0)
        this.general.loaderHidden();
      else
        count--;
    })

    this.data.getSettings("compliance", (resp: any) => {
      this.data.complianceSettings = resp;
      this.general.menu![3].description = resp.header;
      if (count == 0)
        this.general.loaderHidden();
      else
        count--;
    })
    this.data.getSettings("whistleblower", (resp: any) => {
      this.data.whistleblowerSettings = resp;
      this.general.menu![4].description = resp.header;
      if (count == 0)
        this.general.loaderHidden();
      else
        count--;
    })
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
  }

  ngOnDestroy() {
    window.removeAllListeners;
  }

  mostrar() {

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
              resp = this.getText(subItem.description);
          });
        else
          resp = this.getText(item.description);
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

}
