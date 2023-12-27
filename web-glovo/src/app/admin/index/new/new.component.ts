import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {
  edit = false;
  selectedRol = 'Shareholder Individual';
  password: any = null;
  suspend = false;
  metodo = { text: { es: "Por invitación", en: "by invitation" }, code: 0 };
  metodos = [
    { text: { es: "Por invitación", en: "by invitation" }, code: 0 },
    { text: { es: "Completo", en: "Full" }, code: 1 }
  ]

  invitacion!: UntypedFormGroup;
  cambio = true;
  individualForm!: UntypedFormGroup;
  constructor(public general: GeneralService, public admin: AdminService, private fb: UntypedFormBuilder, private auth: AuthService, private http: HttpClient) {
    this.invitacion = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      email_confirmation: ["", [Validators.required, Validators.email, this.emailMatch.bind(this)]],
      role: ["", [Validators.required]]
    })
    this.individualForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(30),]],
      password_confirmation: ["", [Validators.required, this.passwordsMatch.bind(this)]],
      phone: ["", [Validators.required,Validators.minLength(8), Validators.maxLength(30)]],
      contactEmail1: ["", [Validators.required, Validators.email]],
      contactEmail2: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required,Validators.minLength(8), Validators.maxLength(200)]],
      commercial_certificate: ["", [Validators.required,Validators.minLength(6), Validators.maxLength(30)]],
      ubo: ["", [Validators.required,Validators.minLength(6), Validators.maxLength(30)]],
      high_risk_country: [false, [Validators.required]],
      public_responsability: [false, [Validators.required]],
      sanctioned: [false, [Validators.required]],
    });
  }
  invitar() {
    this.general.loaderShow();
    this.invitacion.get("role")?.setValue(this.selectedRol);
    if (this.invitacion.get("email")!.value == this.invitacion.get("email_confirmation")!.value) {
      if (this.invitacion.get("email")!.hasError("email")) {
        this.general.loaderHidden();
        if (this.general.dialog)
          this.general.dialog.show("", this.general.getText({ es: "deve ingresar un correo valido", en: "you must enter a valid email" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
            undefined, () => { }, () => { });
      } else {
        this.http.post(this.general.api + "admin/invitations", this.invitacion.value, this.auth.options).subscribe((resp: any) => {
          this.invitacion.reset();
          this.general.loaderHidden();
        }, error => {
          this.general.loaderHidden();
          if (this.general.dialog)
            this.general.dialog.show("", error.error.errors.email[0], this.general.getText({ en: "Accept", es: "Aceptar" }),
              undefined, () => { }, () => { });
        })
      }
    } else {


    }

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
    this.cambio = true;
  }

  ngOnChanges(){
    console.log("algo");
    
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

  ngOnInit(): void {

  }

  cancelar() {
    this.edit = false;
    this.individualForm.reset();
    this.metodo = { text: { es: "Por invitación", en: "by invitation" }, code: 0 };
  }
  fecha(e: any) {
    var fecha = new Date(e);
    var resp = fecha.getFullYear() + "/" + fecha.getMonth() + "/ " + fecha.getDate();
    return resp
  }
  changeMetodo(e: any) {
    if (e.value.code == 0) {
      this.selectedRol = 'Shareholder Individual';
    }
    this.cambio = true; 
  }
  newUser(){

  }
  genParams() {
    var params = "?per_page=6";
    params +=  this.admin.usersFilters.search ? ("&search=" +  this.admin.usersFilters.search) : "";
    if( this.admin.usersFilters.selectedRol !== "All")
    params +=  this.admin.usersFilters.selectedRol ? ("&role=" +  this.admin.usersFilters.selectedRol) : "";
    if ( this.admin.usersFilters.solicitud)
      params +=  this.admin.usersFilters.solicitud!.code < 2 ? ("&approved_account=" +  this.admin.usersFilters.solicitud.code) : "";
    if (this.admin.usersFilters.habilitada)
      params +=  this.admin.usersFilters.habilitada!.code < 2 ? ("&suspended=" +  this.admin.usersFilters.habilitada.code) : "";

    return params;
  }

  guardar() {
    
    var shareholder: Object = new Object();
  
    var data = {
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
      this.general.loaderShow();
      this.http.post(this.general.api + "admin/users", data, this.auth.options).subscribe(resp => {
        this.general.loaderHidden();
        this.individualForm.reset();
        this.admin.getUsers(this.genParams());
        this.edit = false;
      }, error => {
        this.general.loaderHidden();
        if (this.general.dialog)
          this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
  
      })
    } else {
      if (this.individualForm.get("name")?.invalid) {
        this.general.loaderHidden();
        if (this.individualForm.get("name")?.errors?.maxlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre y apellido\" no puede ser mayor a "+ this.individualForm.get("name")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Name and surname \" field cannot be longer than "+this.individualForm.get("name")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
          undefined, () => { }, () => { })
        if (this.individualForm.get("name")?.errors?.minlength)
        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Nombre y apellido\" no puede ser menor a "+ this.individualForm.get("name")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Name and surname \" cannot be less than " + this.individualForm.get("name")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
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
              this.log(error?.errors)
              this.log(error?.hasError("passwordMismatch"));
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
                if (this.individualForm.get("phone")?.errors?.maxlength)
                this.general.dialog?.show("", this.general.getText({ es: "El campo \"Teléfono\" no puede ser mayor a "+ this.individualForm.get("phone")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Phone\" field cannot be longer than "+this.individualForm.get("phone")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { })
                if (this.individualForm.get("phone")?.errors?.minlength)
                this.general.dialog?.show("", this.general.getText({ es: "El campo \"Teléfono\" no puede ser menor a "+ this.individualForm.get("phone")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Phone \" cannot be less than " + this.individualForm.get("phone")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                  undefined, () => { }, () => { });
                if (this.individualForm.get("phone")?.hasError("required"))
                  this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Teléfono\"", en: "All fields are required please fill in the  \"Phone\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                    undefined, () => { }, () => { });      
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
                      if (this.individualForm.get("address")?.errors?.maxlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"Actividades profesionales y residencia fiscal\" no puede ser mayor a "+ this.individualForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Professional activities and tax residence\" field cannot be longer than "+this.individualForm.get("address")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { })
                      if (this.individualForm.get("address")?.errors?.minlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"Actividades profesionales y residencia fiscal\" no puede ser menor a "+ this.individualForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Professional activities and tax residence \" cannot be less than " + this.individualForm.get("address")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                      if (this.individualForm.get("address")?.hasError("required"))
                        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Actividades profesionales y residencia fiscal\"", en: "All fields are required please fill in the  \"Professional activities and tax residence\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                      this.general.loaderShow();
                      this.http.post(this.general.api + "admin/users", data, this.auth.options).subscribe(resp => {
                        this.general.loaderHidden();
                        this.individualForm.reset();
                        this.admin.getUsers(this.genParams());
                        this.edit = false;
                      }, error => {
                        this.general.loaderHidden();
                        if (this.general.dialog)
                          this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                  
                      })
                    }
                  }
                } else if (this.selectedRol == 'Shareholder Legal Entity') {
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
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"Comprobante de domicilio de los directores\" no puede ser mayor a "+ this.individualForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Directors Proof of Address\" field cannot be longer than "+this.individualForm.get("address")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { })
                      if (this.individualForm.get("address")?.errors?.minlength)
                      this.general.dialog?.show("", this.general.getText({ es: "El campo \"Comprobante de domicilio de los directores\" no puede ser menor a "+ this.individualForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Directors Proof of Address \" cannot be less than " + this.individualForm.get("address")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                      if (this.individualForm.get("address")?.hasError("required"))
                        this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Comprobante de domicilio de los directores\"", en: "All fields are required please fill in the  \"Directors Proof of Address\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                    } else {
                      if (this.individualForm.get("commercial_certificate")?.invalid) {
                        this.general.loaderHidden();
                        if (this.individualForm.get("commercial_certificate")?.errors?.maxlength)
                        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cetificado de registro Mercantil\" no puede ser mayor a "+ this.individualForm.get("commercial_certificate")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Directors Proof of Commercial registration certificate\" field cannot be longer than "+this.individualForm.get("commercial_certificate")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { })
                        if (this.individualForm.get("commercial_certificate")?.errors?.minlength)
                        this.general.dialog?.show("", this.general.getText({ es: "El campo \"Cetificado de registro Mercantil\" no puede ser menor a "+ this.individualForm.get("commercial_certificate")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Directors Proof of Commercial registration certificate \" cannot be less than " + this.individualForm.get("commercial_certificate")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                          undefined, () => { }, () => { });
                        if (this.individualForm.get("commercial_certificate")?.hasError("required"))
                          this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Cetificado de registro Mercantil\"", en: "All fields are required please fill in the  \"Directors Proof of Commercial registration certificate\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                            undefined, () => { }, () => { });
                      } else {
                        if (this.individualForm.get("ubo")?.invalid) {
                          this.general.loaderHidden();
                          if (this.individualForm.get("ubo")?.errors?.maxlength)
                          this.general.dialog?.show("", this.general.getText({ es: "El campo \"UBO\" no puede ser mayor a "+ this.individualForm.get("ubo")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"UBO\" field cannot be longer than "+this.individualForm.get("ubo")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                            undefined, () => { }, () => { })
                          if (this.individualForm.get("ubo")?.errors?.minlength)
                          this.general.dialog?.show("", this.general.getText({ es: "El campo \"UBO\" no puede ser menor a "+ this.individualForm.get("ubo")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"UBO \" cannot be less than " + this.individualForm.get("ubo")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                            undefined, () => { }, () => { });
                          if (this.individualForm.get("ubo")?.hasError("required"))
                            this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"UBO\"", en: "All fields are required please fill in the  \"UBO\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                              undefined, () => { }, () => { });
                        } else {
                          this.general.loaderShow();
                          this.http.post(this.general.api + "admin/users", data, this.auth.options).subscribe(resp => {
                            this.general.loaderHidden();
                            this.individualForm.reset();
                            this.admin.getUsers(this.genParams());
                            this.edit = false;
                          }, error => {
                            this.general.loaderHidden();
                            if (this.general.dialog)
                              this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                      
                          })
                        }
                      }
                    }
                  }


                } else {
                  //admin 
                  if (this.individualForm.get("address")?.invalid) {
                    this.general.loaderHidden();
                    if (this.individualForm.get("address")?.errors?.maxlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Dirección\" no puede ser mayor a "+ this.individualForm.get("address")?.errors?.maxlength.requiredLength + " caracteres", en: "The \"Address\" field cannot be longer than "+this.individualForm.get("address")?.errors?.maxlength.requiredLength +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { })
                    if (this.individualForm.get("address")?.errors?.minlength)
                    this.general.dialog?.show("", this.general.getText({ es: "El campo \"Dirección\" no puede ser menor a "+ this.individualForm.get("address")?.errors?.minlength.requiredLength + " caracteres", en: "The field \"Address \" cannot be less than " + this.individualForm.get("address")?.errors?.minlength.requiredLength  +" characters" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                      undefined, () => { }, () => { });
                    if (this.individualForm.get("address")?.hasError("required"))
                      this.general.dialog?.show("", this.general.getText({ es: "Todos los campos son requeridos por favor complete el campo \"Dirección\"", en: "All fields are required please fill in the  \"Address\" field" }), this.general.getText({ en: "Accept", es: "Aceptar" }),
                        undefined, () => { }, () => { });
                  } else {
                    this.general.loaderShow();
                    this.http.post(this.general.api + "admin/users", data, this.auth.options).subscribe(resp => {
                      this.general.loaderHidden();
                      this.individualForm.reset();
                      this.admin.getUsers(this.genParams());
                      this.edit = false;
                    }, error => {
                      this.general.loaderHidden();
                      if (this.general.dialog)
                        this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
                
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
