import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'glovo-menu',
  templateUrl: './glovo-menu.component.html',
  styleUrls: ['./glovo-menu.component.sass']
})
export class GlovoMenuComponent implements OnInit {
  desplegable!: HTMLElement;
  fondo!: HTMLElement;
  menu!: HTMLElement;
  block!: HTMLElement;
  constructor(public general: GeneralService , private router : Router , private auth : AuthService   ) {

  }
  public(){
    return this.router.url.startsWith("/public") ? false : true;
  }
  ngOnInit(): void {
    this.desplegable = document.getElementById("desplegable") as HTMLElement;
    this.fondo = document.getElementById("fondo") as HTMLElement;
    this.menu = document.getElementById("menu") as HTMLElement;
    this.block = document.getElementById("block") as HTMLElement;
  }
  toggle() {
    if (this.fondo.classList.contains("fondoColor"))
      this.cerrar();
    else
      this.abrir();
  }
  abrir() {

    this.menu.classList.remove("hidden");
    setTimeout(() => { 
      this.block.classList.remove("hidden");
      this.desplegable.classList.add("desplegar");
      this.fondo.classList.add("fondoColor");
     }, 200);
    
    setTimeout(() => { this.block.classList.add("hidden"); }, 600);
  }
  cerrar1(){
    setTimeout(() => { 
      this.block.classList.remove("hidden");
      this.desplegable.classList.remove("desplegar");
      this.fondo.classList.remove("fondoColor");
      setTimeout(() => { this.menu.classList.add("hidden"); }, 700);
     }, 100);
  }
  cerrar() {
    this.block.classList.remove("hidden");
    this.desplegable.classList.remove("desplegar");
    this.fondo.classList.remove("fondoColor");
    setTimeout(() => { this.menu.classList.add("hidden"); }, 700);
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


    var ruta = items[i].route

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



    var ruta =   this.general.menu[order].subItems![select].route


    if (ruta !== "") {
      this.router.navigateByUrl(ruta)
      window.scrollTo(0, 0)
    }
  }
  cerrarSesion(){
    this.auth.logOut();
    this.cerrar();
  }
}
