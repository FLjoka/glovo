import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'shareholder-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.sass']
})
export class IndividualComponent implements OnInit {
  edit = false;
  individual = {
    "id": 10,
    "password": "",
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
      "contact_email_1": "treutel.danial@crona.org",
      "contact_email_2": null,
      "public_responsability": true,
      "sanctioned": true
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
  individualForm!: UntypedFormGroup;
  cambio = true;
  constructor(public general: GeneralService, private fb: UntypedFormBuilder, private auth: AuthService, private http: HttpClient) {
    this.reset = this.fb.group({
      old_password: ["", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      pass: ["", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      confirm: ["", [Validators.required, this.passwordsMatch.bind(this), Validators.maxLength(30), Validators.minLength(8)]]
    });
    this.individualForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30),]],
      password_confirmation: ["", [Validators.required, this.passwordsMatch.bind(this)]],
      phone: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      contactEmail1: ["", [Validators.required, Validators.email]],
      contactEmail2: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
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
    this.individual = this.auth.user as any;
    this.individualForm.get("id")!.setValue(this.individual.id);
    this.individualForm.get("name")!.setValue(this.individual.name);
    this.individualForm.get("email")!.setValue(this.individual.email);
    this.individualForm.get("phone")!.setValue(this.individual.phone);
    this.individualForm.get("contactEmail1")!.setValue(this.individual.shareholder.contact_email_1);
    this.individualForm.get("contactEmail2")!.setValue(this.individual.shareholder.contact_email_2);
    this.individualForm.get("address")!.setValue(this.individual.address);
    this.individualForm.get("public_responsability")!.setValue(this.individual.shareholder.public_responsability);
    this.individualForm.get("sanctioned")!.setValue(this.individual.shareholder.sanctioned);
  }
  cancelar() {
    this.individualForm.get("id")!.setValue(this.individual.id);
    this.individualForm.get("name")!.setValue(this.individual.name);
    this.individualForm.get("email")!.setValue(this.individual.email);
    this.individualForm.get("phone")!.setValue(this.individual.phone);
    this.individualForm.get("contactEmail1")!.setValue(this.individual.shareholder.contact_email_1);
    this.individualForm.get("contactEmail2")!.setValue(this.individual.shareholder.contact_email_2);
    this.individualForm.get("address")!.setValue(this.individual.address);
    this.individualForm.get("public_responsability")!.setValue(this.individual.shareholder.public_responsability);
    this.individualForm.get("sanctioned")!.setValue(this.individual.shareholder.sanctioned);
    this.edit = false;
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
  guardar() {
    var individual : any  = {};
    individual.name = this.individualForm.get("name")!.value
    individual.email = this.individualForm.get("email")!.value
    individual.phone = this.individualForm.get("phone")!.value
    individual.shareholder = {};
    individual.shareholder.contact_email_1 = this.individualForm.get("contactEmail1")!.value
    individual.shareholder.contact_email_2 = this.individualForm.get("contactEmail2")!.value
    individual.address = this.individualForm.get("address")!.value
    individual.shareholder.public_responsability = this.individualForm.get("public_responsability")!.value
    individual.shareholder.sanctioned = this.individualForm.get("sanctioned")!.value

    if (this.individualForm.valid) {
      if (this.general.dialog)
      this.general.dialog.show("", this.general.getText({
        es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
          "By accepting you agree that you are providing truthful information"
      }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {

        Object.assign(individual, {
          terms: true
        });

        this.general.downCode.show((pass: string) => {
          individual.password = pass;
          this.general.loaderShow();
          this.http.put(this.general.api + "auth/me", individual, this.auth.options).subscribe(resp => {
            this.auth.user!.shareholder = individual.shareholder;
          this.auth.user!.name =  individual.name;
          this.auth.user!.email =  individual.email;
          this.auth.user!.phone =  individual.phone;
          this.auth.user!.address =individual.address;
          this.individual = this.auth.user as any;
          this.individualForm.get("id")!.setValue(this.individual.id);
          this.individualForm.get("name")!.setValue(this.individual.name);
          this.individualForm.get("email")!.setValue(this.individual.email);
          this.individualForm.get("phone")!.setValue(this.individual.phone);
          this.individualForm.get("contactEmail1")!.setValue(this.individual.shareholder.contact_email_1);
          this.individualForm.get("contactEmail2")!.setValue(this.individual.shareholder.contact_email_2);
          this.individualForm.get("address")!.setValue(this.individual.address);
          this.individualForm.get("public_responsability")!.setValue(this.individual.shareholder.public_responsability);
          this.individualForm.get("sanctioned")!.setValue(this.individual.shareholder.sanctioned);
            this.general.loaderHidden();
            this.edit = false;
          }, error => {
            console.log(error);
            this.general.loaderHidden();
            if (this.general.dialog)
              this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
          })
        }, true)
      });

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
                if (this.general.dialog)
                this.general.dialog.show("", this.general.getText({
                  es: "Al aceptar esta de acuerdo que la información brinda es verídica ", en:
                    "By accepting you agree that you are providing truthful information"
                }), this.general.getText({ es: "Aceptar", en: "Ok" }), this.general.getText({ es: "Cancelar", en: "Cancel" }), () => {
          
                  Object.assign(individual, {
                    terms: true
                  });
          
                  this.general.downCode.show((pass: string) => {
                    individual.password = pass;
                    this.general.loaderShow();
                    this.http.put(this.general.api + "auth/me", individual, this.auth.options).subscribe(resp => {
                    this.auth.user!.shareholder = individual.shareholder;
                    this.auth.user!.name =  individual.name;
                    this.auth.user!.email =  individual.email;
                    this.auth.user!.phone =  individual.phone;
                    this.auth.user!.address =individual.address;
                    this.individual = this.auth.user as any;
                    this.individualForm.get("id")!.setValue(this.individual.id);
                    this.individualForm.get("name")!.setValue(this.individual.name);
                    this.individualForm.get("email")!.setValue(this.individual.email);
                    this.individualForm.get("phone")!.setValue(this.individual.phone);
                    this.individualForm.get("contactEmail1")!.setValue(this.individual.shareholder.contact_email_1);
                    this.individualForm.get("contactEmail2")!.setValue(this.individual.shareholder.contact_email_2);
                    this.individualForm.get("address")!.setValue(this.individual.address);
                    this.individualForm.get("public_responsability")!.setValue(this.individual.shareholder.public_responsability);
                    this.individualForm.get("sanctioned")!.setValue(this.individual.shareholder.sanctioned);
                    this.edit = false;
                      this.general.loaderHidden();
                    }, error => {
                      console.log(error);
                      this.general.loaderHidden();
                      if (this.general.dialog)
                        this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                    })
                  }, true)
                });

              }
            }
          }
        }
      }
    }

    

  }
}
