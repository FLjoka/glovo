import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.sass'],
})
export class ResetpasswordComponent {
  tipo = 'password';
  passFocus = false;
  passFocus2 = false;
  reset!: UntypedFormGroup;
  token!: string;
  passType = 'password';
  objectReset = {
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(
    public general: GeneralService,
    private fb: UntypedFormBuilder,
    private rutaActiva: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.objectReset.token = this.rutaActiva.snapshot.params.token;
    this.rutaActiva.queryParams.subscribe((params) => {
      this.objectReset.email = params.email;
    });
    this.reset = this.fb.group({
      pass: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(8),
        ],
      ],
      confirm: [
        '',
        [
          Validators.required,
          this.passwordsMatch.bind(this),
          Validators.maxLength(30),
          Validators.minLength(8),
        ],
      ],
    });
  }
  public passwordsMatch(control: AbstractControl) {
    if (this.reset) {
      if (this.reset.get('pass')!.value !== control.value) {
        console.log('falla');

        return { passwordMismatch: true };
      } else {
        return null;
      }
    } else return null;
  }

  status(form: string, foco: boolean) {
    var control = this.reset.get(form);
    if (foco)
      if (!control?.touched) return ['pendiente'];
      else if (control.valid) return ['valido'];
      else return ['invalido'];
    else if (!control?.touched) return ['sinfoco'];
    else if (control.valid) return ['sinfoco'];
    else return ['invalido'];
  }
  pass() {
    if (
      (document.getElementById('password') as HTMLInputElement).type ==
      'password'
    ) {
      (this.passType = 'text'),
        ((document.getElementById('password') as HTMLInputElement).type =
          'text');
    } else {
      (this.passType = 'password'),
        ((document.getElementById('password') as HTMLInputElement).type =
          'password');
    }
  }
  confirm() {
    if (
      (document.getElementById('confirm') as HTMLInputElement).type ==
      'password'
    ) {
      (this.tipo = 'text'),
        ((document.getElementById('confirm') as HTMLInputElement).type =
          'text');
    } else {
      (this.tipo = 'password'),
        ((document.getElementById('confirm') as HTMLInputElement).type =
          'password');
    }
  }
  cambiar() {
    console.log(this.reset.value);
    this.objectReset.password = this.reset.get('pass')!.value;
    this.objectReset.password_confirmation = this.reset.get('confirm')!.value;
    this.general.loaderShow();
    this.http
      .post(this.general.api + 'auth/resetpassword', this.objectReset, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Language': this.general.idioma(),
          Authorization: '',
        },
      })
      .subscribe(
        (val) => {
          this.router.navigateByUrl('login');
          setTimeout(() => {
            this.general.loaderHidden();
          }, 200);
        },
        (error) => {
          if (this.general.dialog) {
            this.general.dialog.show(
              '',
              error.error.message,
              this.general.getText({ en: 'Accept', es: 'Aceptar' }),
              undefined,
              () => {
                this.router.navigateByUrl('login');
                setTimeout(() => {
                  this.general.loaderHidden();
                }, 200);
              },
              () => {
                this.router.navigateByUrl('login');
                setTimeout(() => {
                  this.general.loaderHidden();
                }, 200);
              }
            );
          }
        }
      );
  }
}
