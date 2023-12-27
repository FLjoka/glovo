import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'globo-select',
  templateUrl: './globo-select.component.html',
  styleUrls: ['./globo-select.component.sass']
})
export class GloboSelectComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() order: number = -1;
  @Input() items: { nombre: { es: string, en: string }, selected: boolean }[] = [];
  @Input() idioma: string = "en";
  @Input() active: string = "";
  @Input() clicked: Function = (i: any) => {  };
  btn: HTMLElement | null | undefined;
  position = "derecha-abajo"
  izquierda: boolean = false;
  arriba: boolean = false;
  x: string | undefined = undefined;
  y: string | undefined = undefined;
  constructor() { }

  ngOnInit(): void {
    this.btn = document.getElementById(this.active);
    if (this.btn) {
      this.btn.addEventListener("click", () => {
        this.visible = this.visible ? false : true;
        this.foco();
      });
    }
  }
  ngAfterContentChecked() {

  }
  ngAfterViewChecked() {
    if (this.visible) {
      this.foco();
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
      const pop = document.getElementById("popover");
      const coords = pop?.getBoundingClientRect();
      ejex.izquieda = coords?.left
      ejex.derecha = coords ? (window.innerWidth - coords?.right) : undefined;
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

    }
  }
  selected(index: number) {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i];
      if (i == index) this.items[i].selected = true;
      else this.items[i].selected = false;
    }
  }
  foco() {
    const pop = document.getElementById("popover");
    if (pop) {
      pop.focus();
    }
  }

  toggle() {
    this.visible = this.visible ? false : true
  }

}
