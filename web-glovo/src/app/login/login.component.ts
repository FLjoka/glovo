import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { PrimeNGConfig } from 'primeng/api';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  tipo = 'password';
  signIn!: UntypedFormGroup;
  step!: UntypedFormGroup;
  emailFocus = false;
  passFocus = false;
  codeFocus = false;
  tab = 0;
  buscandoUsuario = false;
  preAuth: any = null;
  codigoEnviado = false;
  ocultar = false;
  emailText = '';
  constructor(
    private primengConfig: PrimeNGConfig,
    public route: Router,
    public general: GeneralService,
    private fb: UntypedFormBuilder,
    public auth: AuthService
  ) {
    this.signIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });
    this.step = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
    });
    //this.signIn.get("email")?.setValue("glovosuperadmin@gmail.com");
    //this.signIn.get("pass")?.setValue("glovo2021");

    this.ocultar = JSON.parse(localStorage.getItem('ocultar') as string);
  }
  close() {
    this.tab = 0;
    this.signIn.reset();
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.signIn.get('email')?.dirty;
    this.auth.authStatus();
  }

  status(form: string, foco: boolean, formGroup?: UntypedFormGroup) {
    var control;
    if (formGroup) control = formGroup;
    else control = this['signIn'].get(form);
    if (foco)
      if (!control?.touched) return ['pendiente'];
      else if (control.valid) return ['valido'];
      else return ['invalido'];
    else if (!control?.touched) return ['sinfoco'];
    else if (control.valid) return ['sinfoco'];
    else return ['invalido'];
  }
  type() {
    if (
      (document.getElementById('password') as HTMLInputElement).type ==
      'password'
    ) {
      (this.tipo = 'text'),
        ((document.getElementById('password') as HTMLInputElement).type =
          'text');
    } else {
      (this.tipo = 'password'),
        ((document.getElementById('password') as HTMLInputElement).type =
          'password');
    }
  }

  restPass() {
    this.general.resetCorreo.show(this.signIn.get('email')!.value, () => {
      this.general.loaderShow();
      this.auth.resetPass(this.signIn.get('email')!.value, (link: any) => {
        if (link) {
          if (link.error) {
            if (link.status !== 422) {
              if (this.general.dialog)
                this.general.dialog.show(
                  '',
                  link.error.message,
                  this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                  undefined,
                  () => {},
                  () => {}
                );
            } else {
              if (this.general.dialog)
                this.general.dialog.show(
                  '',
                  link.error.errors.email[0],
                  this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                  undefined,
                  () => {},
                  () => {}
                );
            }
          }
        } else {
          this.general.loaderHidden();
          this.general.dialog!.show(
            '',
            this.general.getText({
              es: 'Hemos enviado un correo para que puedas cambiar tu contraseña',
              en: 'We have sent an email so you can change your password',
            }),
            this.general.getText({ es: 'Aceptar', en: 'Ok' }),
            undefined,
            () => {}
          );
        }
        this.general.loaderHidden();
      });
    });
  }
  login() {
    this.buscandoUsuario = true;
    setTimeout(() => {
      this.buscandoUsuario = false;
      this.tab = 1;
      setTimeout(() => {
        this.general.loaderHidden();
        if (!this.ocultar) {
          this.general.dialog?.show(
            '',
            this.general.getText({
              es:
                'Hemos enviado un correo con el código de validación a ' +
                this.signIn.get('email')?.value,
              en:
                'We have sent an email with the validation code to ' +
                this.signIn.get('email')?.value,
            }),

            this.general.getText({ es: 'Aceptar', en: 'Ok' }),
            undefined,
            () => {
              this.codigoEnviado = true;
              setTimeout(() => {
                this.codigoEnviado = false;
              }, 30000);
            },
            () => {
              localStorage.setItem('ocultar', 'true');
              this.codigoEnviado = true;
              setTimeout(() => {
                this.codigoEnviado = false;
              }, 30000);
            }
          );
        } else {
          this.codigoEnviado = true;
          setTimeout(() => {
            this.codigoEnviado = false;
          }, 30000);
        }
      }, 300);
    }, 300);
  }

  sendCode() {
    if (this.codigoEnviado) {
      this.general.dialog?.show(
        '',
        this.general.getText({
          es: 'El correo de validación ya fue enviado por favor espere 30 segundos',
          en: 'The validation email has already been sent please wait 30 seconds',
        }),
        this.general.getText({ es: 'Aceptar', en: 'Ok' }),
        undefined,
        () => {}
      );
    } else {
      this.auth.auth2faReset(() => {
        this.general.loaderHidden();
        this.general.dialog?.show(
          '',
          this.general.getText({
            es:
              'Hemos enviado un correo con el código de validación a ' +
              this.emailText,
            en:
              'We have sent an email with the validation code to ' +
              this.emailText,
          }),
          this.general.getText({ es: 'Aceptar', en: 'Ok' }),
          undefined,
          () => {
            this.codigoEnviado = true;
            setTimeout(() => {
              this.codigoEnviado = false;
            }, 30000);
          }
        );
      });
    }
  }
  faVerify() {
    if (this.step.get('code')?.valid) {
      this.auth.auth2fa(this.step.get('code')!.value);
    } else
      this.general.dialog?.show(
        '',
        this.general.getText({
          es: 'El código deve ingresado es un numero de 7 digitos',
          en: 'The code entered is a 7 digit number',
        }),
        this.general.getText({ es: 'Aceptar', en: 'Ok' }),
        undefined,
        () => {}
      );
  }
  logIn() {
    this.buscandoUsuario = true;
    if (this.signIn.get('email')?.invalid) {
      this.general.dialog?.show(
        '',
        this.general.getText({
          es: 'Ingrese un correo válido',
          en: 'Enter a valid email',
        }),
        this.general.getText({ es: 'Aceptar', en: 'Ok' }),
        undefined,
        () => {}
      );
    } else if (this.signIn.get('pass')?.invalid) {
      this.general.dialog?.show(
        '',
        this.general.getText({
          es: 'La contraseña debe tener entre 8 y 30 caracteres',
          en: 'The password must be between 8 and 30 characters',
        }),
        this.general.getText({ es: 'Aceptar', en: 'Ok' }),
        undefined,
        () => {}
      );
    } else
      this.auth.login(
        this.signIn.get('email')?.value,
        this.signIn.get('pass')?.value,
        (resp: any) => {
          if (resp.status !== undefined) {
            this.buscandoUsuario = false;
            if (this.general.dialog)
              this.general.dialog.show(
                '',
                resp.error.message ? resp.error.message : resp.message,
                this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                undefined,
                () => {
                  switch (resp.error.code) {
                    case 1:
                      this.signIn.get('email')?.reset();
                      this.signIn.get('pass')?.reset();
                      document.getElementById('email')?.focus();
                      break;
                    case 2:
                      this.signIn.get('pass')?.reset();
                      document.getElementById('pass')?.focus();
                      break;
                    default:
                      this.signIn.get('email')?.reset();
                      this.signIn.get('pass')?.reset();
                      document.getElementById('email')?.focus();
                      break;
                  }
                }
              );
          } else {
            this.emailText = this.signIn.get('email')!.value;
            this.tab = 1;
            this.buscandoUsuario = false;

            if (!this.ocultar) {
              this.general.dialog?.show(
                '',
                this.general.getText({
                  es:
                    'Hemos enviado un correo con el código de validación a ' +
                    this.signIn.get('email')?.value,
                  en:
                    'We have sent an email with the validation code to ' +
                    this.signIn.get('email')?.value,
                }),
                this.general.getText({ es: 'Aceptar', en: 'Ok' }),
                undefined,
                () => {
                  this.codigoEnviado = true;
                  setTimeout(() => {
                    this.codigoEnviado = false;
                  }, 30000);
                },
                () => {
                  localStorage.setItem('ocultar', 'true');
                  this.codigoEnviado = true;
                  setTimeout(() => {
                    this.codigoEnviado = false;
                  }, 30000);
                }
              );
            } else {
              this.codigoEnviado = true;
              setTimeout(() => {
                this.codigoEnviado = false;
              }, 30000);
            }
            this.signIn.reset();
          }
        }
      );
  }
}
