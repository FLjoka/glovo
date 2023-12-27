import { Component, ViewChild } from '@angular/core';
import { GlovoConfirmComponent } from './componentes/glovo-confirm/glovo-confirm.component';
import { GlovoInfoComponent } from './componentes/glovo-info/glovo-info.component';
import { GlovoMenuComponent } from './componentes/glovo-menu/glovo-menu.component';
import { PassConfirmComponent } from './componentes/pass-confirm/pass-confirm.component';
import { ReturnEmailComponent } from './componentes/return-email/return-email.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'globo-web';
  @ViewChild("glovoconfirm")
  confirm: GlovoConfirmComponent | undefined;
  @ViewChild("glovomenu")
  menu!: GlovoMenuComponent;
  @ViewChild("cd")
  info!: GlovoInfoComponent;
  @ViewChild("passconfirm")
  confirmcode!: PassConfirmComponent;
  @ViewChild("rEmail")
  correoValid!: ReturnEmailComponent;
  constructor(private general: GeneralService) {
      document.body.classList.add("dark-theme");
  }
  ngAfterViewInit() {
    this.general.resetCorreo = this.correoValid;
    this.general.dialog = this.confirm;
    this.general.menuresponsive = this.menu;
    this.general.info = this.info;
    this.general.downCode = this.confirmcode;
    var elements = document.querySelectorAll(".inputbox");
    Array.from(elements).forEach(function(element) {
      element.addEventListener('click', () => {
        element.getElementsByTagName('input')[0].focus();
      });
      element.removeEventListener("click", ()=> {});
    });
    
  }


}
