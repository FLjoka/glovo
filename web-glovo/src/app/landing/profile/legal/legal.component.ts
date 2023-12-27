import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'shareholder-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.sass']
})
export class LegalComponent implements OnInit {
  edit = false;
  legal = {
    id: 4,
    password: "",
    name: "Ellis Baumbach",
    email: "kihn.oliver@gmail.com",
    address: "49335 Friesen Plains Suite 065 00967-0648",
    phone: "+12699529854",
    approved_account: false,
    suspended_at: "2021-08-08T06:54:16.000000Z",
    created_at: "2021-08-08T05:40:17.000000Z",
    updated_at: "2021-08-08T06:54:16.000000Z",
    roles: ["Shareholder Legal Entity"],
    shareholder: {
      contact_email_1: "cale.abbott@veum.com",
      contact_email_2: "reed.hand@waters.net",
      ubo: "8262051",
      high_risk_country: true,
      public_responsability: false,
      sanctioned: false,
      commercial_certificate: "6514328"
    }
  }
  tab = 0;
  tipo = 'password';
  passFocus1 = false;
  passFocus = false;
  passFocus2 = false;
  reset !: UntypedFormGroup;
  passType = 'password';
  passType1 = 'password';
  objectReset = {
    "old_password": "",
    "new_password": "",
    "new_password_confirmation": ""
  }
  legalForm!: UntypedFormGroup;
  cambio = false;
  constructor(public general: GeneralService, private fb: UntypedFormBuilder, private auth: AuthService, private http: HttpClient) {
    this.reset = this.fb.group({
      old_password: ["", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      pass: ["", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      confirm: ["", [Validators.required, this.passwordsMatch.bind(this), Validators.maxLength(30), Validators.minLength(8)]]
    });
    this.legalForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30),]],
      password_confirmation: ["", [Validators.required, this.passwordsMatch.bind(this)]],
      phone: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      contactEmail1: ["", [Validators.required, Validators.email]],
      contactEmail2: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
      commercial_certificate: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      ubo: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      high_risk_country: [false, [Validators.required]],
      public_responsability: [false, [Validators.required]],
      sanctioned: [false, [Validators.required]],
    })
  }
  toggle(input: AbstractControl) {
    if (input.value)
      input.setValue(false)
    else
      input.setValue(true)
  }
  public passwordsMatch(control: AbstractControl) {
    if (this.reset) {
      if (this.reset.get("pass")!.value !== control.value) {
        console.log("falla");

        return { 'passwordMismatch': true }
      } else {
        return null;
      }
    } else
      return null;
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
  old_password() {
    if ((document.getElementById("old_password") as HTMLInputElement).type == "password") {
      this.passType1 = "text",
        (document.getElementById("old_password") as HTMLInputElement).type = "text"
    } else {
      this.passType1 = "password",
        (document.getElementById("old_password") as HTMLInputElement).type = "password"
    }
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
  cambiar() {
    this.objectReset.new_password = this.reset.get("pass")!.value;
    this.objectReset.new_password_confirmation = this.reset.get("confirm")!.value;
    this.objectReset.old_password = this.reset.get("old_password")!.value;
    this.general.loaderShow();
    if (this.objectReset.new_password !== "") {
      if (this.objectReset.new_password == this.objectReset.new_password_confirmation) {
        if (this.objectReset.old_password !== "") {
          this.http.put(this.general.api + "auth/me/changepassword", this.objectReset, this.auth.options).subscribe((val) => {
            setTimeout(() => { this.general.loaderHidden() }, 200);
            this.reset.reset();
            this.objectReset.new_password = "";
            this.objectReset.new_password_confirmation = "";
            this.objectReset.old_password = "";
          }, error => {
            console.log(error);
            this.general.loaderHidden();
            if (this.general.dialog) {
              this.general.dialog.show("", error.error.message, this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { setTimeout(() => { this.general.loaderHidden() }, 200); }, () => { setTimeout(() => { this.general.loaderHidden() }, 200); });
            }

          })
        } else {
          this.general.loaderHidden()
          if (this.general.dialog)
            this.general.dialog.show("", this.general.getText({
              es: "Se requiere la contraseña actual", en:
                "Current password is required"
            }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
        }
      } else {
        this.general.loaderHidden()
        if (this.general.dialog)
          this.general.dialog.show("", this.general.getText({
            es: "La contraseña nueva y la confirmación no son igules", en:
              "New password and confirmation are not the same"
          }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
      }
    } else {
      this.general.loaderHidden()
      if (this.general.dialog)
        this.general.dialog.show("", this.general.getText({
          es: "Se requiere una contraseña nueva", en:
            "A new password is required"
        }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
    }
  }
  text(status: boolean) {
    return status ? this.general.getText({ es: "Si", en: "Yes" }) : this.general.getText({ es: "No", en: "No" })
  }
  ngOnInit(): void {
    this.legalForm.get("id")!.setValue(this.legal.id);
    this.legalForm.get("name")!.setValue(this.legal.name);
    this.legalForm.get("email")!.setValue(this.legal.email);
    this.legalForm.get("phone")!.setValue(this.legal.phone);
    this.legalForm.get("contactEmail1")!.setValue(this.legal.shareholder.contact_email_1);
    this.legalForm.get("contactEmail2")!.setValue(this.legal.shareholder.contact_email_2);
    this.legalForm.get("address")!.setValue(this.legal.address);
    this.legalForm.get("commercial_certificate")!.setValue(this.legal.shareholder.commercial_certificate);
    this.legalForm.get("ubo")!.setValue(this.legal.shareholder.ubo);
    this.legalForm.get("high_risk_country")!.setValue(this.legal.shareholder.high_risk_country);
    this.legalForm.get("public_responsability")!.setValue(this.legal.shareholder.public_responsability);
    this.legalForm.get("sanctioned")!.setValue(this.legal.shareholder.sanctioned);
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
 
  cancelar() {

    this.legalForm.get("id")!.setValue(this.legal.id);
    this.legalForm.get("name")!.setValue(this.legal.name);
    this.legalForm.get("email")!.setValue(this.legal.email);
    this.legalForm.get("phone")!.setValue(this.legal.phone);
    this.legalForm.get("contactEmail1")!.setValue(this.legal.shareholder.contact_email_1);
    this.legalForm.get("contactEmail2")!.setValue(this.legal.shareholder.contact_email_2);
    this.legalForm.get("address")!.setValue(this.legal.address);
    this.legalForm.get("commercial_certificate")!.setValue(this.legal.shareholder.commercial_certificate);
    this.legalForm.get("ubo")!.setValue(this.legal.shareholder.ubo);
    this.legalForm.get("high_risk_country")!.setValue(this.legal.shareholder.high_risk_country);
    this.legalForm.get("public_responsability")!.setValue(this.legal.shareholder.public_responsability);
    this.legalForm.get("sanctioned")!.setValue(this.legal.shareholder.sanctioned);
    this.edit = false;
  }
  guardar() {
    var legal = this.auth.user as any;
    legal.name = this.legalForm.get("name")!.value
    legal.email = this.legalForm.get("email")!.value
    legal.phone = this.legalForm.get("phone")!.value
    legal.shareholder.contact_email_1 = this.legalForm.get("contactEmail1")!.value
    legal.shareholder.contact_email_2 = this.legalForm.get("contactEmail2")!.value
    legal.address = this.legalForm.get("address")!.value
    legal.shareholder.commercial_certificate = this.legalForm.get("commercial_certificate")!.value
    legal.shareholder.ubo = this.legalForm.get("ubo")!.value
    legal.shareholder.high_risk_country = this.legalForm.get("high_risk_country")!.value
    legal.shareholder.public_responsability = this.legalForm.get("public_responsability")!.value
    legal.shareholder.sanctioned = this.legalForm.get("sanctioned")!.value


    if (this.legalForm.valid) {
      if (this.general.dialog)
      this.general.dialog.show("", this.general.getText({
        es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
          "By accepting you agree that you are providing truthful information"
      }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {

        Object.assign(legal, {
          terms: true
        });
        this.general.downCode.show((pass: string) => {
          legal.password = pass;
          this.general.loaderShow();
          this.http.put(this.general.api + "auth/me", legal, this.auth.options).subscribe(resp => {
            this.general.loaderHidden();
            this.auth.user!.shareholder = legal.shareholder;
            this.auth.user!.name =  legal.name;
            this.auth.user!.email =  legal.email;
            this.auth.user!.phone =  legal.phone;
            this.auth.user!.address =legal.address;
            this.legal = this.auth.user as any;
            this.legalForm.get("id")!.setValue(this.legal.id);
            this.legalForm.get("name")!.setValue(this.legal.name);
            this.legalForm.get("email")!.setValue(this.legal.email);
            this.legalForm.get("phone")!.setValue(this.legal.phone);
            this.legalForm.get("contactEmail1")!.setValue(this.legal.shareholder.contact_email_1);
            this.legalForm.get("contactEmail2")!.setValue(this.legal.shareholder.contact_email_2);
            this.legalForm.get("address")!.setValue(this.legal.address);
            this.legalForm.get("public_responsability")!.setValue(this.legal.shareholder.public_responsability);
            this.legalForm.get("sanctioned")!.setValue(this.legal.shareholder.sanctioned);
            this.legalForm.get("commercial_certificate")!.setValue(this.legal.shareholder.commercial_certificate);
            this.legalForm.get("ubo")!.setValue(this.legal.shareholder.ubo);
            this.legalForm.get("high_risk_country")!.setValue(this.legal.shareholder.high_risk_country);
            this.edit = false;
          }, error => {
            console.log(error);
            this.general.loaderHidden();
            if (this.general.dialog)
              this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
          })
        }, true);
      })

    } else {
      if (this.legalForm.get("name")?.invalid) {
        this.general.loaderHidden();
        if (this.legalForm.get("name")?.errors?.maxlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre y apellido\" no puede ser mayor a " + this.legalForm.get("name")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Name and surname \" field cannot be longer than " + this.legalForm.get("name")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { })
        if (this.legalForm.get("name")?.errors?.minlength)
          this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre y apellido\" no puede ser menor a " + this.legalForm.get("name")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Name and surname \" cannot be less than " + this.legalForm.get("name")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
        if (this.legalForm.get("name")?.hasError("required"))
          this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Nombre y apellido\"", en: "All fields are required please fill in the  \"Name and surname \" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
      } else {
        if (!this.legalForm.get("email")?.valid) {
          this.general.loaderHidden();
          if (this.legalForm.get("email")?.hasError("email")) {
            if (this.general.dialog)
              this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de Registro \"", en: "The email entered is not valid \"Registration Email \"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
          } else {
            if (this.general.dialog)
              this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de Registro \"", en: "All fields are required, please complete the field \"Registration Email \"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
          }
        } else {
          if (this.legalForm.get("phone")?.invalid) {
            this.general.loaderHidden();
            if (this.legalForm.get("phone")?.errors?.maxlength)
              this.general.dialog?.show("", this.general.getText({ es: "El campo \"Teléfono\" no puede ser mayor a " + this.legalForm.get("phone")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Phone\" field cannot be longer than " + this.legalForm.get("phone")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { })
            if (this.legalForm.get("phone")?.errors?.minlength)
              this.general.dialog?.show("", this.general.getText({ es: "El campo \"Teléfono\" no puede ser menor a " + this.legalForm.get("phone")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Phone \" cannot be less than " + this.legalForm.get("phone")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });
            if (this.legalForm.get("phone")?.hasError("required"))
              this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Teléfono\"", en: "All fields are required please fill in the  \"Phone\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                undefined, () => { }, () => { });

          } else {
            if (!this.legalForm.get("contactEmail1")?.valid) {
              this.general.loaderHidden();
              if (this.legalForm.get("contactEmail1")?.hasError("email")) {
                if (this.general.dialog)
                  this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de contacto 1\"", en: "The email entered is not valid \"Contact email 1\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              } else {
                if (this.general.dialog)
                  this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de contacto 1 \"", en: "All fields are required, please complete the field \"Contact email 1\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              }
            } else if (!this.legalForm.get("contactEmail2")?.valid) {
              this.general.loaderHidden();
              if (this.legalForm.get("contactEmail2")?.hasError("email")) {
                if (this.general.dialog)
                  this.general.dialog.show("", this.general.getText({ es: "El correo ingresado no es valido \"Email de contacto 2\"", en: "The email entered is not valid \"Contact email 2\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              } else {
                if (this.general.dialog)
                  this.general.dialog.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo  \"Email de contacto 2\"", en: "All fields are required, please complete the field \"Contact email 2\"" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              }
            } else {
              if (this.legalForm.get("address")?.invalid) {
                this.general.loaderHidden();
                if (this.legalForm.get("address")?.errors?.maxlength)
                  this.general.dialog?.show("", this.general.getText({ es: "El campo \"Actividades profesionales y residencia fiscal\" no puede ser mayor a " + this.legalForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Professional activities and tax residence\" field cannot be longer than " + this.legalForm.get("address")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { })
                if (this.legalForm.get("address")?.errors?.minlength)
                  this.general.dialog?.show("", this.general.getText({ es: "El campo \"Actividades profesionales y residencia fiscal\" no puede ser menor a " + this.legalForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Professional activities and tax residence \" cannot be less than " + this.legalForm.get("address")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
                if (this.legalForm.get("address")?.hasError("required"))
                  this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Actividades profesionales y residencia fiscal\"", en: "All fields are required please fill in the  \"Professional activities and tax residence\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });
              } else {
                if (this.legalForm.get("commercial_certificate")?.invalid) {
                  this.general.loaderHidden();
                  if (this.legalForm.get("commercial_certificate")?.errors?.maxlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cetificado de registro Mercantil\" no puede ser mayor a " + this.legalForm.get("commercial_certificate")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Directors Proof of Commercial registration certificate\" field cannot be longer than " + this.legalForm.get("commercial_certificate")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { })
                  if (this.legalForm.get("commercial_certificate")?.errors?.minlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cetificado de registro Mercantil\" no puede ser menor a " + this.legalForm.get("commercial_certificate")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Directors Proof of Commercial registration certificate \" cannot be less than " + this.legalForm.get("commercial_certificate")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                  if (this.legalForm.get("commercial_certificate")?.hasError("required"))
                    this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Cetificado de registro Mercantil\"", en: "All fields are required please fill in the  \"Directors Proof of Commercial registration certificate\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                } else {
                  if (this.legalForm.get("ubo")?.invalid) {
                    this.general.loaderHidden();
                    if (this.legalForm.get("ubo")?.errors?.maxlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"UBO\" no puede ser mayor a " + this.legalForm.get("ubo")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"UBO\" field cannot be longer than " + this.legalForm.get("ubo")?.errors?.maxlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { })
                    if (this.legalForm.get("ubo")?.errors?.minlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"UBO\" no puede ser menor a " + this.legalForm.get("ubo")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"UBO \" cannot be less than " + this.legalForm.get("ubo")?.errors?.minlength.requiredLength + " characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                    if (this.legalForm.get("ubo")?.hasError("required"))
                      this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"UBO\"", en: "All fields are required please fill in the  \"UBO\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                  } else {
                    if (this.general.dialog)
                    this.general.dialog.show("", this.general.getText({
                      es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
                        "By accepting you agree that you are providing truthful information"
                    }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {
            
                      Object.assign(legal, {
                        terms: true
                      });
                      this.general.downCode.show((pass: string) => {
                        legal.password = pass;
                        this.general.loaderShow();
                        this.http.put(this.general.api + "auth/me", legal, this.auth.options).subscribe(resp => {
                          this.general.loaderHidden();
                          this.auth.user!.shareholder = legal.shareholder;
                          this.auth.user!.name =  legal.name;
                          this.auth.user!.email =  legal.email;
                          this.auth.user!.phone =  legal.phone;
                          this.auth.user!.address =legal.address;
                          this.legal = this.auth.user as any;
                          this.legalForm.get("id")!.setValue(this.legal.id);
                          this.legalForm.get("name")!.setValue(this.legal.name);
                          this.legalForm.get("email")!.setValue(this.legal.email);
                          this.legalForm.get("phone")!.setValue(this.legal.phone);
                          this.legalForm.get("contactEmail1")!.setValue(this.legal.shareholder.contact_email_1);
                          this.legalForm.get("contactEmail2")!.setValue(this.legal.shareholder.contact_email_2);
                          this.legalForm.get("address")!.setValue(this.legal.address);
                          this.legalForm.get("public_responsability")!.setValue(this.legal.shareholder.public_responsability);
                          this.legalForm.get("sanctioned")!.setValue(this.legal.shareholder.sanctioned);
                          this.legalForm.get("commercial_certificate")!.setValue(this.legal.shareholder.commercial_certificate);
                          this.legalForm.get("ubo")!.setValue(this.legal.shareholder.ubo);
                          this.legalForm.get("high_risk_country")!.setValue(this.legal.shareholder.high_risk_country);
                          this.edit = false;
                        }, error => {
                          console.log(error);
                          this.general.loaderHidden();
                          if (this.general.dialog)
                            this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                        })
                      }, true);
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  
    }
  }
