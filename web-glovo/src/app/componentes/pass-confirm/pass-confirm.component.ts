import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'pass-confirm',
  templateUrl: './pass-confirm.component.html',
  styleUrls: ['./pass-confirm.component.sass']
})
export class PassConfirmComponent implements OnInit {
  passCode : any = "";
  view = false;
  passType = 'password';
  descargar: Function = ( pass : any )=> {

  }
  confirm = false;
  constructor(public general : GeneralService, private auth : AuthService ) { }
  cancel(){
    this.view = false;
  }

  show( descargar : Function , confirm ? : boolean ){
    this.descargar = descargar;
    this.view = true;
    this.confirm = confirm ? confirm : false;
  } 
  restPass() {
    this.view = false;
    this.general.resetCorreo.show(this.auth.user!.email, () => {
      this.general.loaderShow();
      this.auth.resetPass(this.auth.user!.email, (link: any) => {
        if (link) {
          if (link.error) {
            console.log(link.error);
            console.log(link.status);
            if (link.status !== 422) {
              if (this.general.dialog)
                this.general.dialog.show("", link.error.message, this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { });
            } else {
              if (this.general.dialog)
                this.general.dialog.show("", link.error.errors.email[0], this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { });
            }
          }
        } else {
          this.general.loaderHidden();
          this.general.dialog!.show("", this.general.getText({ es: "Hemos enviado un correo para que puedas cambiar tu contraseña", en: "We have sent an email so you can change your password" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined,
            () => {
              this.auth.logOut();
            });
        }
        this.general.loaderHidden();
      })

    })

  }
  ir(){
    this.view = false;
    this.descargar(this.passCode);
    this.passCode = undefined;
  }
  pass() {
    if ((document.getElementById("password") as HTMLInputElement).type == "password") {
      this.passType = "text",
        (document.getElementById("password") as HTMLInputElement).type = "text"
    } else {
      this.passType = "password",
        (document.getElementById("password") as HTMLInputElement).type = "password"
    }
  }
  ngOnInit(): void {
    this.passCode = "";
  }

}
