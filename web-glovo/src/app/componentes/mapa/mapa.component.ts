import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.sass']
})
export class MapaComponent implements OnInit {
  mauseCoord: any;
  hover = false;
  px_ratio!: number;
  scale!: number;
  mapa!: SVGElement;
  contenedor!: HTMLElement;
  mausedown = false;
  touch1 = 0;
  touch2 = 0;
  initW!: number;
  initH!: number;
  distancia: number | null = null;
  zoom = 0;
  select = {
    x: 0,
    y: 0
  }
  selectdata: any;
  @Input() selected = (e: any, pais: any) => {

  }
  paises = [
    {
      code: "ES",
      name: { es: "España", en: "Spain" },
      ciudad: { es: "Barcelona", en: "Barcelona" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "PT",
      name: { es: "Portugal", en: "Portugal" },
      ciudad: { es: "Lisboa", en: "Lisbon" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "GE",
      name: { es: "Georgia", en: "Georgia" },
      ciudad: { es: "Tbilisi", en: "Tbilisi" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "IT",
      name: { es: "Italia", en: "Italy" },
      ciudad: { es: "Milán", en: "Milan" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "RO",
      name: { es: "Rumania", en: "Romania" },
      ciudad: { es: "Varsovia", en: "Warsaw" },
      content: { es: "aquí la dirección", en: "here is the address" },
    }, {
      code: "PL",
      name: { es: "Polonia", en: "Poland" },
      ciudad: { es: "Bucarest", en: "Bucharest" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "MA",
      name: { es: "Marruecos", en: "Morocco" },
      ciudad: { es: "Casablanca", en: "Casablanca" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "UA",
      name: { es: "Ucrania", en: "Ukraine" },
      ciudad: { es: "Kiev", en: "Kiev" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "HR",
      name: { es: "Croacia", en: "Croatia" },
      ciudad: { es: "Zagreb", en: "Zagreb" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
    {
      code: "RS",
      name: { es: "Serbia", en: "Serbia" },
      ciudad: { es: "Belgrado", en: "Belgrade" },
      content: { es: "aquí la dirección", en: "here is the address" },
    },
  ]
  constructor() { }
  ngOnDestroy(){
    window.removeAllListeners;
    this.mapa!.removeAllListeners!();
  }
  ngOnInit(): void {
    this.scale = 1;
    this.mauseCoord = { x: 0, y: 0 }


  
    var paises = document.getElementById("mapa")!.querySelectorAll('path')! as unknown  as NodeList;


    this.paises.forEach((select , i ) => {

      
      paises.forEach((pais : any , index)=> {
        if(pais.id == select.code){

          document.getElementById("mapa")!.insertBefore(pais , document.getElementById("mapa")!.lastChild);   
     
        } 
      });
    })
    this.px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
    this.mapa = document.getElementById("mapa")! as unknown as SVGElement;
    this.contenedor = document.getElementById("contenedor")!;
    this.initW = this.mapa.clientWidth;
    this.initH = this.mapa.clientHeight;
    // la posicion del mause dentro del svg del mapa
    document.getElementById("mapa")?.addEventListener("mouseenter", () => { this.hover = true; });
    document.getElementById("mapa")?.addEventListener("mouseout", () => { this.hover = false; });
    // el zoom del mapa
    //min size
    this.contenedor.style.height = this.contenedor.clientWidth / 1.516109280 + "px";

    if (this.contenedor.clientWidth < 2500) {
      if (this.contenedor.clientWidth < 1500) {
        if (this.contenedor.clientWidth < 800) {
          if (this.contenedor.clientWidth < 400) {
            document.getElementById("prueba")!.style.marginLeft = "-1300px"
            document.getElementById("prueba")!.style.marginTop = "-400px"
          } else {
            document.getElementById("prueba")!.style.marginLeft = "-1200px"
            document.getElementById("prueba")!.style.marginTop = "-200px"
          }
        } else {
          document.getElementById("prueba")!.style.marginLeft = "-900px"
          document.getElementById("prueba")!.style.marginTop = "-250px"
        }
      } else {
        document.getElementById("prueba")!.style.marginLeft = "-300px"
        document.getElementById("prueba")!.style.marginTop = "-300px"
      }
    }

    window.addEventListener("resize", () => {
      this.contenedor.style.height = this.contenedor.clientWidth / 1.516109280 + "px";
    })

    document.getElementById("mapa")?.addEventListener("wheel", (event: any) => {
      event.preventDefault();
      var pre = (event.deltaY / 7) * -0.01;
      this.scale += pre;
      // Restrict scale
      this.scale = Math.min(Math.max(1, this.scale), 6);
      // Apply scale transform
      var overfowY = (this.initH * this.scale + (document.getElementById("prueba")!.offsetTop) - this.contenedor.clientHeight);
      if (overfowY < 0) {
        document.getElementById("prueba")!.style.marginTop = (document.getElementById("prueba")!.offsetTop - overfowY) + "px";
      } else {
        if (this.scale < 6) {
          var coeficienteX = (Math.abs(document.getElementById("prueba")!.offsetTop) + this.contenedor.clientHeight / 2) / (this.initH * this.scale);
          var incrementoAbs = (this.initH * this.scale) - this.mapa.clientHeight;
          if (document.getElementById("prueba")!.offsetTop - (incrementoAbs * coeficienteX) < 0)
            document.getElementById("prueba")!.style.marginTop = document.getElementById("prueba")!.offsetTop - (incrementoAbs * coeficienteX) + "px";
          else
            document.getElementById("prueba")!.style.marginTop = 0 + "px";
        }

      }
      var overfowX = (this.initW * this.scale + (document.getElementById("prueba")!.offsetLeft - this.contenedor.clientWidth));

      if (overfowX < 0) {
        document.getElementById("prueba")!.style.marginLeft = (document.getElementById("prueba")!.offsetLeft - overfowX) + "px";
      } else {
        if (this.scale < 6) {
          var coeficienteX = (Math.abs(document.getElementById("prueba")!.offsetLeft) + this.contenedor.clientWidth / 2) / (this.initW * this.scale);
          var incrementoAbs = (this.initW * this.scale) - this.mapa.clientWidth;

          if (document.getElementById("prueba")!.offsetLeft - (incrementoAbs * coeficienteX) < 0)
            document.getElementById("prueba")!.style.marginLeft = document.getElementById("prueba")!.offsetLeft - (incrementoAbs * coeficienteX) + "px";
          else
            document.getElementById("prueba")!.style.marginLeft = 0 + "px";
        }
        this.mapa.style.width = this.initW * this.scale + "px";
        this.mapa.style.height = this.initH * this.scale + "px";
      }




    })

    //navegacion por el mapa
    this.contenedor.addEventListener("mousedown", () => {
      this.mausedown = true;
    });
    this.contenedor.addEventListener("touchstart", () => {
      this.mausedown = true;
    }, false);
    this.contenedor.addEventListener("mouseup", () => {
      this.mauseCoord.x = 0;
      this.mauseCoord.y = 0;
      this.mausedown = false;
    });
    this.contenedor.addEventListener("mouseleave", () => {
      this.mauseCoord.x = 0;
      this.mauseCoord.y = 0;
      this.mausedown = false;

    });
    addEventListener("touchend", () => {
      this.mauseCoord.x = 0;
      this.mauseCoord.y = 0;
      this.mausedown = false;
      this.distancia = null;
    }, false);
    document.getElementById("prueba")!.addEventListener("mouseleave", () => {
      this.mauseCoord.x = 0;
      this.mauseCoord.y = 0;
      this.mausedown = false;
    });
    this.contenedor.addEventListener("mousemove", (e) => {

      if (this.mausedown) {
        this.contenedor.style.cursor = "grabbing";
        if (this.mauseCoord.x == 0)
          this.mauseCoord.x = e.clientX;
        if (this.mauseCoord.y == 0)
          this.mauseCoord.y = e.clientY;
        if (this.mapa.clientWidth + (document.getElementById("prueba")!.offsetLeft + e.clientX - this.mauseCoord.x) > this.contenedor.clientWidth)
          if ((document.getElementById("prueba")!.offsetLeft + e.clientX - this.mauseCoord.x) < 1)
            document.getElementById("prueba")!.style.marginLeft = (document.getElementById("prueba")!.offsetLeft + e.clientX - this.mauseCoord.x) + "px";
          else
            document.getElementById("prueba")!.style.marginLeft = 0 + "px";
        if (this.mapa.clientHeight + (document.getElementById("prueba")!.offsetTop + e.clientY - this.mauseCoord.y) - this.contenedor.clientHeight > 0)
          if ((document.getElementById("prueba")!.offsetTop + e.clientY - this.mauseCoord.y) < 0)
            document.getElementById("prueba")!.style.marginTop = (document.getElementById("prueba")!.offsetTop + e.clientY - this.mauseCoord.y) + "px";
          else
            document.getElementById("prueba")!.style.marginTop = 0 + "px";
        this.mauseCoord.y = e.clientY;
        this.mauseCoord.x = e.clientX;
      } else
        this.contenedor.style.cursor = "grab";
    });
    this.contenedor.addEventListener("touchmove", (e) => {
      e.preventDefault();
      this.touch1 = e.touches[0]?.clientX;
      this.touch2 = e.touches[1]?.clientX;
      if (e.touches.length == 2) {
        var distancia
        if (this.touch1 >= this.touch2)
          distancia = this.touch1 - this.touch2;
        else
          distancia = this.touch2 - this.touch1;

        if (!this.distancia)
          this.distancia = distancia;
        else if (Math.abs(this.distancia - distancia) > 2) {
          var zoom = this.distancia - distancia;
          var pre = 0.1;
          if (this.zoom < zoom) {
            this.scale -= pre;
          } else {
            if (this.zoom > zoom) {
              this.scale += pre;
            }
          }


          // Restrict scale
          this.scale = Math.min(Math.max(1, this.scale), 6);
          // Apply scale transform
          var overfowY = (this.initH * this.scale + (document.getElementById("prueba")!.offsetTop) - this.contenedor.clientHeight);


          if (overfowY < 0) {
            document.getElementById("prueba")!.style.marginTop = (document.getElementById("prueba")!.offsetTop - overfowY) + "px";
          } else {
            if (this.scale < 6) {
              var coeficienteX = (Math.abs(document.getElementById("prueba")!.offsetTop) + this.contenedor.clientHeight / 2) / (this.initH * this.scale);
              var incrementoAbs = (this.initH * this.scale) - this.mapa.clientHeight;
              if (document.getElementById("prueba")!.offsetTop - (incrementoAbs * coeficienteX) < 0)
                document.getElementById("prueba")!.style.marginTop = document.getElementById("prueba")!.offsetTop - (incrementoAbs * coeficienteX) + "px";
              else
                document.getElementById("prueba")!.style.marginTop = 0 + "px";
            }
          }
          var overfowX = (this.initW * this.scale + (document.getElementById("prueba")!.offsetLeft - this.contenedor.clientWidth));

          if (overfowX < 0) {
            document.getElementById("prueba")!.style.marginLeft = (document.getElementById("prueba")!.offsetLeft - overfowX) + "px";
          } else {
            if (this.scale < 6) {
              var coeficienteX = (Math.abs(document.getElementById("prueba")!.offsetLeft) + this.contenedor.clientWidth / 2) / (this.initW * this.scale);
              var incrementoAbs = (this.initW * this.scale) - this.mapa.clientWidth;

              if (document.getElementById("prueba")!.offsetLeft - (incrementoAbs * coeficienteX) < 0)
                document.getElementById("prueba")!.style.marginLeft = document.getElementById("prueba")!.offsetLeft - (incrementoAbs * coeficienteX) + "px";
              else
                document.getElementById("prueba")!.style.marginLeft = 0 + "px";
            }
            //  
          }
          this.zoom = this.distancia - distancia;
          this.mapa.style.width = this.initW * this.scale + "px";
          this.mapa.style.height = this.initH * this.scale + "px";
        }

      }
      else
        if (this.mausedown) {
          if (this.mauseCoord.x == 0)
            this.mauseCoord.x = e.touches[0].clientX;
          if (this.mauseCoord.y == 0)
            this.mauseCoord.y = e.touches[0].clientY;
          if (this.mapa.clientWidth + (document.getElementById("prueba")!.offsetLeft + e.touches[0].clientX - this.mauseCoord.x) > this.contenedor.clientWidth)
            if ((document.getElementById("prueba")!.offsetLeft + e.touches[0].clientX - this.mauseCoord.x) < 0)
              document.getElementById("prueba")!.style.marginLeft = (document.getElementById("prueba")!.offsetLeft + e.touches[0].clientX - this.mauseCoord.x) + "px";
            else
              document.getElementById("prueba")!.style.marginLeft = 0 + "px";
          if (this.mapa.clientHeight + (document.getElementById("prueba")!.offsetTop + e.touches[0].clientY - this.mauseCoord.y) - this.contenedor.clientHeight > 0)
            if ((document.getElementById("prueba")!.offsetTop + e.touches[0].clientY - this.mauseCoord.y) < 0)
              document.getElementById("prueba")!.style.marginTop = (document.getElementById("prueba")!.offsetTop + e.touches[0].clientY - this.mauseCoord.y) + "px";
            else
              document.getElementById("prueba")!.style.marginTop = 0 + "px";
          this.mauseCoord.y = e.touches[0].clientY;
          this.mauseCoord.x = e.touches[0].clientX;
        }
    }, false);

    // marcadores para el mapa
    this.paises.forEach(pais => {
      document.getElementById(pais.code)?.classList.add("pais");
      document.getElementById(pais.code)?.addEventListener("click", ($event) => {
        this.select.x = $event.clientX;
        this.select.y = $event.clientY;
        this.selected(this.select, pais);
        this.selectdata = pais;
      });

    })



  }
  drag() {

  }

}
