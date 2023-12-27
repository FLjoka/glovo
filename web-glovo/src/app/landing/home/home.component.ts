import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public general: GeneralService, public router: Router, public individual : IndividualService) { }
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


    if (ruta !== "")
      this.router.navigateByUrl(ruta)
        ;
  }
  menuSelectList = (order: number, select: number) => {


    
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

    if (ruta !== "")
      this.router.navigateByUrl(ruta)
  }

  ngOnInit(): void {

    window.scrollTo(0, 0)

  }

}
