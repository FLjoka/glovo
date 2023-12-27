import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.sass']
})
export class InvitationComponent implements OnInit {
  tipo = 'password';
  passFocus = false;
  passFocus2 = false;
  reset !: UntypedFormGroup;
  token!: string;
  passType = 'password';

  edit = false;
  selectedRol = 'Shareholder Individual';
  password: any = null;
  suspend = false;

  invitacion!: UntypedFormGroup;
  individualForm!: UntypedFormGroup;

  constructor(public general: GeneralService, private rutaActiva: ActivatedRoute, private fb: UntypedFormBuilder, private router: Router, private auth: AuthService, private http: HttpClient) {
    this.token = this.rutaActiva.snapshot.params.token;
  
    this.individualForm = this.fb.group({
      name: ["", [Validators.required,]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30),]],
      password_confirmation: ["", [Validators.required, this.passwordsMatch.bind(this)]],
      phone: ["", [Validators.required,Validators.minLength(8), Validators.maxLength(30),]],
      contactEmail1: ["", [Validators.required, Validators.email]],
      contactEmail2: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required]],
      commercial_certificate: ["", [Validators.required]],
      ubo: ["", [Validators.required]],
      high_risk_country: [false, [Validators.required]],
      public_responsability: [false, [Validators.required]],
      sanctioned: [false, [Validators.required]],
    });
    this.rutaActiva.queryParams.subscribe(params => {
      this.selectedRol = params.type;
      this.individualForm.get("email")?.setValue(params.email)
    });
  }

  public emailMatch(control: AbstractControl) {
    if (this.invitacion) {
      if (this.invitacion.get("email")!.value !== control.value) {
        return { 'passwordMismatch': true }
      } else {
        return null;
      }
    } else
      return null;
  }
  public passwordsMatch(control: AbstractControl) {
    if (this.individualForm) {
      if (this.individualForm.get("password")!.value !== control.value) {
        return { 'passwordMismatch': true }
      } else {
        return null;
      }
    } else
      return null;
  }
  toggle(input: AbstractControl) {
    if (input.value)
      input.setValue(false)
    else
      input.setValue(true)
  }

  text(status: boolean) {
    return status ? this.general.getText({ es: "Si", en: "Yes" }) : this.general.getText({ es: "No", en: "No" })
  }
  log(e: any) {
  }


  ngOnInit(): void {

  }
  ngAfterViewInit() {
  
  
}
  cancelar() {
    this.edit = false;

  }
  fecha(e: any) {
    var fecha = new Date(e);
    var resp = fecha.getFullYear() + "/" + fecha.getMonth() + "/ " + fecha.getDate();
    return resp
  }

  newUser() {

  }
  guardar() {
    var shareholder: Object = new Object();
    this.general.loaderShow();
    var data = {
      "token": this.token,
      "terms": false,
      "role": this.selectedRol,
      "password": this.individualForm.get("password")!.value,
      "password_confirmation": this.individualForm.get("password_confirmation")!.value,
      "name": this.individualForm.get("name")!.value,
      "phone": this.individualForm.get("phone")!.value,
      "address": this.individualForm.get("address")!.value,
      "shareholder": shareholder,
      "email": this.individualForm.get("email")!.value
    }
    if (this.selectedRol == "Shareholder Individual") {
      shareholder = {
        contact_email_1: this.individualForm.get("contactEmail1")!.value,
        contact_email_2: this.individualForm.get("contactEmail2")!.value,
        public_responsability: this.individualForm.get("public_responsability")!.value,
        sanctioned: this.individualForm.get("sanctioned")!.value
      }
    }
    if (this.selectedRol == "Shareholder Legal Entity") {
      shareholder = {
        contact_email_1: this.individualForm.get("contactEmail1")!.value,
        contact_email_2: this.individualForm.get("contactEmail2")!.value,
        public_responsability: this.individualForm.get("public_responsability")!.value,
        sanctioned: this.individualForm.get("sanctioned")!.value,
        commercial_certificate: this.individualForm.get("commercial_certificate")!.value,
        ubo: this.individualForm.get("ubo")!.value,
        high_risk_country: this.individualForm.get("high_risk_country")!.value
      }
    }
    data.shareholder = shareholder;

    if (this.individualForm.valid) {
      if (this.general.dialog)
        this.general.dialog.show("", this.general.getText({
          es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
            "By accepting you agree that you are providing truthful information"
        }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {
          this.http.post(this.general.api + "admin/invitations/register ", data, this.auth.options).subscribe(resp => {
            this.general.loaderHidden();
            this.edit = false;
          }, error => {
            this.general.loaderHidden();
            if (this.general.dialog)
              this.general.dialog.show("", error.error.errors ? error.error.errors : error.error.message, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });

          })
        });
    } else {
      if (this.individualForm.get("name")?.hasError("required")) {
        this.general.loaderHidden();
        if (this.general.dialog)
          this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Nombre y apellido\"", en: "All fields are required please fill in the  \"Name and surname \" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
      } else {
        if (!this.individualForm.get("email")?.valid) {
          this.general.loaderHidden();
          if (this.individualForm.get("email")?.hasError("email")) {
            if (this.general.dialog)
              this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de Registro \"", en: "The email entered is not valid \"Registration Email \"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
          } else {
            if (this.general.dialog)
              this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de Registro \"", en: "All fields are required, please complete the field \"Registration Email \"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
          }
        } else {
          //Validators.required, Validators.email, Validators.minLength(8),Validators.maxLength(30),this.passwordsMatch.bind(this) 
          if (this.individualForm.get("password")?.invalid) {
            this.general.loaderHidden();
            var error = this.individualForm.get("password");
            if (error?.hasError("required")) {

              if (this.general.dialog)
                this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Contraseña\"", en: "All fields are required, please complete the field \"Password\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { });
            } else if (error?.hasError("minlength")) {
              if (this.general.dialog)
                this.general.dialog.show("", this.general.getText({ es: "La contraseña no puede ser menor a 8 caracteres", en: "The password cannot be less than 8 characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { });
            } else if (error?.hasError("maxlength")) {
              if (this.general.dialog)
                this.general.dialog.show("", this.general.getText({ es: "La contraseña no puede ser mayor a 30 caracteres", en: "The password cannot be longer than 30 characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { });
            }
          } else {
            if (this.individualForm.get("password_confirmation")?.invalid) {
              this.general.loaderHidden();
              var error = this.individualForm.get("password_confirmation");
              if (error?.hasError("required")) {
                if (this.general.dialog)
                  this.general.dialog.show("", this.general.getText({ es: "La confirmación de la contraseña debe ser igual a la contraseña", en: "Password confirmation must be equal to password" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              } else {
                if (error?.hasError("passwordMismatch")) {
                  if (this.general.dialog)
                    this.general.dialog.show("", this.general.getText({ es: "La confirmación de la contraseña debe ser igual a la contraseña", en: "Password confirmation must be equal to password" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                }
              }
            } else {
              if (this.individualForm.get("phone")?.invalid) {
                this.general.loaderHidden();
                var error = this.individualForm.get("phone");
                if (error?.hasError("required")) {
                  if (this.general.dialog)
                    this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Teléfono\"", en: "All fields are required, please complete the field \"Phone\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                }
              } else {

                if (this.selectedRol == 'Shareholder Individual') {
                  if (!this.individualForm.get("contactEmail1")?.valid) {
                    this.general.loaderHidden();
                    if (this.individualForm.get("contactEmail1")?.hasError("email")) {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de contacto 1\"", en: "The email entered is not valid \"Contact email 1\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de contacto 1 \"", en: "All fields are required, please complete the field \"Contact email 1\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    }
                  } else if (!this.individualForm.get("contactEmail2")?.valid) {
                    this.general.loaderHidden();
                    if (this.individualForm.get("contactEmail2")?.hasError("email")) {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de contacto 2\"", en: "The email entered is not valid \"Contact email 2\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de contacto 2\"", en: "All fields are required, please complete the field \"Contact email 2\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    }
                  } else {
                    if (this.individualForm.get("address")?.invalid) {
                      this.general.loaderHidden();
                      if (this.individualForm.get("address")?.hasError("required")) {
                        if (this.general.dialog)
                          this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Actividades profesionales y residencia fiscal\"", en: "All fields are required, please complete the field \"Professional activities and tax residence\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                            undefined, () => { }, () => { });
                      }
                    } else {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({
                          es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
                            "By accepting you agree that you are providing truthful information"
                        }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {
                          data.terms = true;
                          this.http.post(this.general.api + "admin/invitations/register ", data, this.auth.options).subscribe(resp => {
                            this.router.navigateByUrl("/login");
                            this.general.loaderHidden();
                            if (this.general.dialog)
                              this.general.dialog.show("", this.general.getText({
                                es: "Usuario creado exitosamente", en:
                                  "User created successfully"
                              }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => { })
                            this.edit = false;
                          }, error => {
                            this.general.loaderHidden();
                            if (this.general.dialog)
                              this.general.dialog.show("", error.error.errors ? error.error.errors : error.error.message, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });

                          })
                        });
                    }
                  }
                } else {
                  // legal
                  if (!this.individualForm.get("contactEmail1")?.valid) {
                    this.general.loaderHidden();
                    if (this.individualForm.get("contactEmail1")?.hasError("email")) {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de contacto 1\"", en: "The email entered is not valid \"Contact email 1\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de contacto 1 \"", en: "All fields are required, please complete the field \"Contact email 1\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    }
                  } else if (!this.individualForm.get("contactEmail2")?.valid) {
                    this.general.loaderHidden();
                    if (this.individualForm.get("contactEmail2")?.hasError("email")) {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de contacto 2\"", en: "The email entered is not valid \"Contact email 2\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                      if (this.general.dialog)
                        this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de contacto 2\"", en: "All fields are required, please complete the field \"Contact email 2\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    }
                  } else {
                    if (this.individualForm.get("address")?.invalid) {
                      this.general.loaderHidden();
                      if (this.individualForm.get("address")?.hasError("required")) {
                        if (this.general.dialog)
                          this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Dirección\"", en: "All fields are required, please complete the field \"Address\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                            undefined, () => { }, () => { });
                      }
                    } else {
                      if (this.individualForm.get("commercial_certificate")?.invalid) {
                        this.general.loaderHidden();
                        if (this.individualForm.get("commercial_certificate")?.hasError("required")) {
                          if (this.general.dialog)
                            this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Cetificado de registro Mercantil\"", en: "All fields are required, please complete the field \"Commercial registration certificate\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                              undefined, () => { }, () => { });
                        }
                      } else {
                        if (this.individualForm.get("ubo")?.invalid) {
                          this.general.loaderHidden();
                          if (this.individualForm.get("ubo")?.hasError("required")) {
                            if (this.general.dialog)
                              this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"UBO (excepto para empresas cotizadas)\"", en: "All fields are required, please complete the field \"UBO(exept for quoted companies)\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                                undefined, () => { }, () => { });
                          }
                        } else {
                          if (this.general.dialog)
                            this.general.dialog.show("", this.general.getText({
                              es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
                                "By accepting you agree that you are providing truthful information"
                            }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {
                              data.terms = true;
                              this.http.post(this.general.api + "admin/invitations/register ", data, this.auth.options).subscribe(resp => {
                                this.general.loaderHidden();
                                if (this.general.dialog)
                                  this.general.dialog.show("", this.general.getText({
                                    es: "Usuario creado exitosamente", en:
                                      "User created successfully"
                                  }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => { })
                                this.edit = false;
                              }, error => {
                                this.general.loaderHidden();
                                if (this.general.dialog)
                                  this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });

                              })
                            });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.general.loaderHidden();
      }
    }



  }
  status(form: string, foco: boolean) {
    var control = this.reset.get(form);
    if (foco)
      if (!control?.touched)
        return ["pendiente"]
      else
        if (control.valid)
          return ["valido"]
        else
          return ["invalido"]
    else
      if (!control?.touched)
        return ["sinfoco"]
      else
        if (control.valid)
          return ["sinfoco"]
        else
          return ["invalido"]

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
  confirm() {
    if ((document.getElementById("confirm") as HTMLInputElement).type == "password") {
      this.tipo = "text",
        (document.getElementById("confirm") as HTMLInputElement).type = "text"
    } else {
      this.tipo = "password",
        (document.getElementById("confirm") as HTMLInputElement).type = "password"
    }
  }

}