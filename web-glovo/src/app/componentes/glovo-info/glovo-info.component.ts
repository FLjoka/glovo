import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'glovo-info',
  templateUrl: './glovo-info.component.html',
  styleUrls: ['./glovo-info.component.sass']
})
export class GlovoInfoComponent implements OnInit {
  visible = false;
  constructor() { }
  izquierda: boolean = false;
  arriba: boolean = false;
  focoActive = false;
  data : any;
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    window.addEventListener("touchmove", () => { this.visible = false });
    window.addEventListener("wheel",( ) => {this.visible = false});
  }
  ngAfterViewChecked() {
    if (this.visible && this.focoActive) {
      this.direccion();
    }
    
  }
  direccion() {

    const pop = document.getElementById("glovoInfo");

    var ejex: {
      izquieda: number | undefined,
      derecha: number | undefined
    } = {
      izquieda: undefined,
      derecha: undefined
    }
    var ejey: {
      arriba: number | undefined,
      abajo: number | undefined
    } = {
      arriba: undefined,
      abajo: undefined
    }

    const coords = pop?.getBoundingClientRect();
    ejex.izquieda = coords?.left
    ejex.derecha = coords ? (window.innerWidth - coords.left) : undefined;
    ejey.arriba = coords?.top;
    ejey.abajo = coords ? window.innerHeight - coords?.bottom : undefined;
    if (ejex.izquieda !== undefined && ejex.derecha !== undefined) {
      if (ejex.izquieda > ejex.derecha) {
        this.izquierda = true
      }
      else {
        this.izquierda = false
      }
    }
    if (ejey.abajo !== undefined && ejey.arriba !== undefined) {
      if (ejey.arriba > ejey.abajo) {
        this.arriba = true
      }
      else {
        this.arriba = false
      }
    }
    if (this.izquierda)
      pop?.classList.add("izquierda")
    else pop?.classList.remove("izquierda")
    if (this.arriba)
      pop?.classList.add("arriba")
    else pop?.classList.remove("arriba")
    this.focoActive = false;
  }
  foco() {
    this.visible = true;
    this.focoActive = true;
    setTimeout(() => {
      const pop = document.getElementById("glovoInfo");
      if (pop) {
        pop.focus();
      }
    }, 0.0002)
  }
}
