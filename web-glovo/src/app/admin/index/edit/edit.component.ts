import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  edit = false;
  cambio = true;
  password: any = null;
  suspend = false;
  @Input() user: any | null = {
    "id": 10,
    "name": "Kattie Schinner II",
    "email": "baumbach.gianni@hotmail.com",
    "address": "756 Bridgette Dale 31307",
    "phone": "+15596269434",
    "approved_account": true,
    "suspended_at": null,
    "updated_at": "2021-08-08T05:40:17.000000Z",
    "created_at": "2021-08-08T05:40:17.000000Z",
    "roles": [
      "Shareholder Individual"
    ],
    "shareholder": {
      "commercial_certificate": "9195823",
      "contact_email_1": "vglover@walter.com",
      "contact_email_2": "oconner.nichole@ryan.com",
      "high_risk_country": true,
      "public_responsability": false,
      "sanctioned": true,
      "ubo": "4363951"
    }
  }

  individualForm!: UntypedFormGroup;
  constructor(public general: GeneralService, private fb: UntypedFormBuilder, private auth: AuthService, private http: HttpClient) {

    this.individualForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30),]],
      phone: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      contactEmail1: ["", [Validators.required, Validators.email]],
      contactEmail2: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
      commercial_certificate: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      ubo: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      high_risk_country: [false, [Validators.required]],
      public_responsability: [false, [Validators.required]],
      sanctioned: [false, [Validators.required]],
    });
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
  ngOnInit(): void {
    this.setData();
  }
  setData() {

    this.individualForm.get("id")!.setValue(this.user.id);
    this.individualForm.get("name")!.setValue(this.user.name);
    this.individualForm.get("email")!.setValue(this.user.email);
    this.individualForm.get("phone")!.setValue(this.user.phone);
    this.individualForm.get("address")!.setValue(this.user.address);

    if (this.user.roles[0] == "Shareholder Individual") {
      this.individualForm.get("contactEmail1")!.setValue(this.user.shareholder.contact_email_1);
      this.individualForm.get("contactEmail2")!.setValue(this.user.shareholder.contact_email_2);
      this.individualForm.get("public_responsability")!.setValue(this.user.shareholder.public_responsability);
      this.individualForm.get("sanctioned")!.setValue(this.user.shareholder.sanctioned);
    }
    if (this.user.roles[0] == "Shareholder Legal Entity") {
      this.individualForm.get("contactEmail1")!.setValue(this.user.shareholder.contact_email_1);
      this.individualForm.get("contactEmail2")!.setValue(this.user.shareholder.contact_email_2);
      this.individualForm.get("commercial_certificate")!.setValue(this.user.shareholder.commercial_certificate);
      this.individualForm.get("ubo")!.setValue(this.user.shareholder.ubo);
      this.individualForm.get("high_risk_country")!.setValue(this.user.shareholder.high_risk_country);
      this.individualForm.get("public_responsability")!.setValue(this.user.shareholder.public_responsability);
      this.individualForm.get("sanctioned")!.setValue(this.user.shareholder.sanctioned);
    }
  }
  cancelar() {
    this.edit = false;
    this.setData();
  }
  fecha(e: any) {
    var fecha = new Date(e);
    var resp = fecha.getFullYear() + "/" + fecha.getMonth() + "/ " + fecha.getDate();
    return resp
  }
  ngAfterViewChecked(){
    if(this.cambio){
      var elements = document.querySelectorAll(".inputbox");
      Array.from(elements).forEach(function(element) {
        element.addEventListener('click', () => {
          element.getElementsByTagName('input')[0]?.focus();
        });
        element.removeEventListener("click", ()=> {});
      });
      this.cambio = false;
    }  
  }
  habilitar() {
    this.suspend = true;
    this.http.put(this.general.api + "admin/users/" + this.user.id + "/restore", {}, this.auth.options).subscribe(resp => {
      this.user.suspended_at = resp;
      this.suspend = false;
    }, error => {
      if (this.general.dialog)
        this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
      this.suspend = false;
    })
  }
  suspender() {
    this.suspend = true;
    this.http.put(this.general.api + "admin/users/" + this.user.id + "/suspend", {}, this.auth.options).subscribe((resp: any) => {

      this.user.suspended_at = resp.suspended_at;
      this.suspend = false;
    }, error => {
      if (this.general.dialog)
        this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
      this.suspend = false;
    })
  }
  guardar() {
    this.general.loaderShow();
    this.user.name = this.individualForm.get("name")!.value
    this.user.email = this.individualForm.get("email")!.value
    this.user.phone = this.individualForm.get("phone")!.value
    this.user.address = this.individualForm.get("address")!.value
    if (this.user.shareholder) {
      if (this.user.roles[0] == "Shareholder Individual") {
        this.user.shareholder.contact_email_1 = this.individualForm.get("contactEmail1")!.value
        this.user.shareholder.contact_email_2 = this.individualForm.get("contactEmail2")!.value
        this.user.shareholder.public_responsability = this.individualForm.get("public_responsability")!.value
        this.user.shareholder.sanctioned = this.individualForm.get("sanctioned")!.value
      }
      if (this.user.roles[0] == "Shareholder Legal Entity") {
        this.user.shareholder.contact_email_1 = this.individualForm.get("contactEmail1")!.value
        this.user.shareholder.contact_email_2 = this.individualForm.get("contactEmail2")!.value
        this.user.shareholder.commercial_certificate = this.individualForm.get("commercial_certificate")!.value
        this.user.shareholder.ubo = this.individualForm.get("ubo")!.value
        this.user.shareholder.high_risk_country = this.individualForm.get("high_risk_country")!.value
        this.user.shareholder.public_responsability = this.individualForm.get("public_responsability")!.value
        this.user.shareholder.sanctioned = this.individualForm.get("sanctioned")!.value
      }
    }

    var shareholder = null;
    if (this.user.shareholder) {
      if (this.user.roles[0] == "Shareholder Individual") {
        shareholder = {
          "contact_email_1": this.user.shareholder.contact_email_1,
          "contact_email_2": this.user.shareholder.contact_email_2,
          "public_responsability": this.user.shareholder.public_responsability,
          "sanctioned": this.user.shareholder.sanctioned,

        }
      }
      if (this.user.roles[0] == "Shareholder Legal Entity") {
        shareholder = {
          "contact_email_1": this.user.shareholder.contact_email_1,
          "contact_email_2": this.user.shareholder.contact_email_2,
          "public_responsability": this.user.shareholder.public_responsability,
          "sanctioned": this.user.shareholder.sanctioned,
          "commercial_certificate": this.user.shareholder.commercial_certificate,
          "ubo": this.user.shareholder.ubo,
          "high_risk_country": this.user.shareholder.high_risk_country
        }
      }
    }
    var data = {
      "name": this.user.name,
      "phone": this.user.phone,
      "address": this.user.address,
      "shareholder": shareholder,
      "email": this.user.email
    }
    if (this.individualForm.valid) {
      this.general.loaderShow();
      this.http.put(this.general.api + "admin/users/" + this.user.id, data, this.auth.options).subscribe(resp => {
        this.general.loaderHidden();
        this.edit = false;
      }, error => {
        this.general.loaderHidden();
        if (this.general.dialog)
          this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
        this.setData();
      })
    } else {
      if (this.individualForm.get("name")?.invalid) {
        this.general.loaderHidden();
        if (this.individualForm.get("name")?.errors?.maxlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre y apellido\" no puede ser mayor a " + this.individualForm.get("name")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Name and surname \" field cannot be longer than " + this.individualForm.get("name")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { })
        if (this.individualForm.get("name")?.errors?.minlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre y apellido\" no puede ser menor a " + this.individualForm.get("name")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Name and surname \" cannot be less than " + this.individualForm.get("name")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
        if (this.individualForm.get("name")?.hasError("required"))
          this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Nombre y apellido\"", en: "All fields are required please fill in the  \"Name and surname \" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
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

          if (this.individualForm.get("phone")?.invalid) {
            this.general.loaderHidden();
            if (this.individualForm.get("phone")?.errors?.maxlength)
              this.general.dialog?.show("", this.general.getText({ es: "El campo \"Teléfono\" no puede ser mayor a " + this.individualForm.get("phone")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Phone\" field cannot be longer than " + this.individualForm.get("phone")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { })
            if (this.individualForm.get("phone")?.errors?.minlength)
              this.general.dialog?.show("", this.general.getText({ es: "El campo \"Teléfono\" no puede ser menor a " + this.individualForm.get("phone")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Phone \" cannot be less than " + this.individualForm.get("phone")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
            if (this.individualForm.get("phone")?.hasError("required"))
              this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Teléfono\"", en: "All fields are required please fill in the  \"Phone\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });

          } else {

            if (this.user.roles[0] == 'Shareholder Individual') {
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
                  if (this.individualForm.get("address")?.errors?.maxlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Actividades profesionales y residencia fiscal\" no puede ser mayor a " + this.individualForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Professional activities and tax residence\" field cannot be longer than " + this.individualForm.get("address")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { })
                  if (this.individualForm.get("address")?.errors?.minlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Actividades profesionales y residencia fiscal\" no puede ser menor a " + this.individualForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Professional activities and tax residence \" cannot be less than " + this.individualForm.get("address")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                  if (this.individualForm.get("address")?.hasError("required"))
                    this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Actividades profesionales y residencia fiscal\"", en: "All fields are required please fill in the  \"Professional activities and tax residence\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                } else {
                  this.general.loaderShow();
                  this.http.put(this.general.api + "admin/users/" + this.user.id, data, this.auth.options).subscribe(resp => {
                    this.general.loaderHidden();
                    this.edit = false;
                  }, error => {
                    this.general.loaderHidden();
                    if (this.general.dialog)
                      this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                    this.setData();
                  })
                }
              }
            } else if (this.user.roles[0] == 'Shareholder Legal Entity') {
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
                  if (this.individualForm.get("address")?.errors?.maxlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Comprobante de domicilio de los directores\" no puede ser mayor a " + this.individualForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Directors Proof of Address\" field cannot be longer than " + this.individualForm.get("address")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { })
                  if (this.individualForm.get("address")?.errors?.minlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Comprobante de domicilio de los directores\" no puede ser menor a " + this.individualForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Directors Proof of Address \" cannot be less than " + this.individualForm.get("address")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                  if (this.individualForm.get("address")?.hasError("required"))
                    this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Comprobante de domicilio de los directores\"", en: "All fields are required please fill in the  \"Directors Proof of Address\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                } else {
                  if (this.individualForm.get("commercial_certificate")?.invalid) {
                    this.general.loaderHidden();
                    if (this.individualForm.get("commercial_certificate")?.errors?.maxlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cetificado de registro Mercantil\" no puede ser mayor a " + this.individualForm.get("commercial_certificate")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Directors Proof of Commercial registration certificate\" field cannot be longer than " + this.individualForm.get("commercial_certificate")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { })
                    if (this.individualForm.get("commercial_certificate")?.errors?.minlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cetificado de registro Mercantil\" no puede ser menor a " + this.individualForm.get("commercial_certificate")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Directors Proof of Commercial registration certificate \" cannot be less than " + this.individualForm.get("commercial_certificate")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                    if (this.individualForm.get("commercial_certificate")?.hasError("required"))
                      this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Cetificado de registro Mercantil\"", en: "All fields are required please fill in the  \"Directors Proof of Commercial registration certificate\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                  } else {
                    if (this.individualForm.get("ubo")?.invalid) {
                      this.general.loaderHidden();
                      if (this.individualForm.get("ubo")?.errors?.maxlength)
                        this.general.dialog?.show("", this.general.getText({ es: "El campo \"UBO\" no puede ser mayor a " + this.individualForm.get("ubo")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"UBO\" field cannot be longer than " + this.individualForm.get("ubo")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { })
                      if (this.individualForm.get("ubo")?.errors?.minlength)
                        this.general.dialog?.show("", this.general.getText({ es: "El campo \"UBO\" no puede ser menor a " + this.individualForm.get("ubo")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"UBO \" cannot be less than " + this.individualForm.get("ubo")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                      if (this.individualForm.get("ubo")?.hasError("required"))
                        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"UBO\"", en: "All fields are required please fill in the  \"UBO\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                    }
                  }
                }
              }


            } else {
              //admin 
              if (this.individualForm.get("address")?.invalid) {
                this.general.loaderHidden();
                if (this.individualForm.get("address")?.errors?.maxlength)
                  this.general.dialog?.show("", this.general.getText({ es: "El campo \"Dirección\" no puede ser mayor a " + this.individualForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Address\" field cannot be longer than " + this.individualForm.get("address")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { })
                if (this.individualForm.get("address")?.errors?.minlength)
                  this.general.dialog?.show("", this.general.getText({ es: "El campo \"Dirección\" no puede ser menor a " + this.individualForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Address \" cannot be less than " + this.individualForm.get("address")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
                if (this.individualForm.get("address")?.hasError("required"))
                  this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Dirección\"", en: "All fields are required please fill in the  \"Address\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              } else {
                this.general.loaderShow();
                this.http.put(this.general.api + "admin/users/" + this.user.id, data, this.auth.options).subscribe(resp => {
                  this.general.loaderHidden();
                  this.edit = false;
                }, error => {
                  this.general.loaderHidden();
                  if (this.general.dialog)
                    this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                  this.setData();
                })
              }
            }

          }
        }
      }
    }

  }
}
