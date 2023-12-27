import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GeneralService } from './general.service';
import { environment } from 'src/environments/environment';
declare module namespace {
  export interface Auth {
    token: string;
    type: string;
    expires_in: number;
    created: Date;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    approved_account: boolean;
    suspended_at?: any;
    created_at: Date;
    updated_at: Date;
    roles: string[];
    shareholder?: any;
  }

  export interface RootObject {
    auth: Auth;
    user: User;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  roles = [
    'Super Admin',
    'Private Admin',
    'Public Admin',
    'Shareholder Individual',
    'Shareholder Legal Entity',
  ];
  options: any;
  authChange = new Subject<any>();
  user: namespace.User | undefined;
  auth: namespace.Auth | undefined;
  apiKey: string = environment.apiKey;
  loginData: {
    user: any;
    auth: any;
  } = {
    user: undefined,
    auth: undefined,
  };
  constructor(
    private http: HttpClient,
    private general: GeneralService,
    private router: Router
  ) {
    this.options = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Language': this.general.idioma(),
        Authorization: '',
        'X-API-KEY': this.apiKey,
      },
    };
    this.general.lenguage.subscribe((resp) => {
      this.options.headers['Content-Language'] = this.general.idioma();
    });
    this.authChange.subscribe((auth) => {
      if (auth) {
        this.user = auth.user;
        this.auth = auth.auth;
        // this.options.headers.Authorization = this.auth!.type + " " + this.auth!.token;

        if (!this.user?.approved_account) {
          this.general.loaderHidden();
          if (this.general.dialog) {
            this.general.dialog.show(
              '',
              this.general.getText({
                es: 'Esta cuenta no ha sido aprovada.',
                en: 'This account has not been approved.',
              }),
              this.general.getText({ en: 'Accept', es: 'Aceptar' }),
              undefined,
              () => {}
            );
          }
        } else {
          if (this.user.suspended_at) {
            this.general.loaderHidden();
            if (this.general.dialog) {
              this.general.dialog.show(
                '',
                this.general.getText({
                  es: 'Esta cuenta ha sido suspendida.',
                  en: 'This Account Has Been Suspended.',
                }),
                this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                undefined,
                () => {}
              );
            }
          } else {
            this.restToken(this.auth!);
          }
        }
      } else {
        this.user = undefined;
        this.router.navigateByUrl('/login');
      }
    });
  }

  redirect() {
    switch (this.user?.roles[0]) {
      case this.roles[0]:
        this.router.navigateByUrl('admin');
        break;
      case this.roles[1]:
        this.router.navigateByUrl('admin');
        break;
      case this.roles[2]:
        this.router.navigateByUrl('admin-public');
        break;
      case this.roles[3]:
        this.router.navigateByUrl('private/home');
        break;
      case this.roles[4]:
        this.router.navigateByUrl('private/home');
        break;
      default:
        break;
    }

    setTimeout(() => {
      this.general.loaderHidden();
    }, 500);
  }

  authStatus() {
    try {
      this.auth = JSON.parse(localStorage.getItem('token') as string);
    } catch (error) {
      this.auth = undefined;
    } finally {
      if (this.auth) {
        this.options.headers.Authorization =
          this.auth!.type + ' ' + this.auth!.token;
        this.auth!.created = new Date(this.auth!.created);
        this.general.loaderShow();
        this.http.get(this.general.api + 'auth/me', this.options).subscribe(
          (val: any) => {
            this.authChange.next({ auth: this.auth, user: val });
          },
          (error) => {
            this.general.loaderHidden();
            if (this.general.dialog)
              if (error.status == 401)
                this.general.dialog.show(
                  '',
                  this.general.getText({
                    es: 'Su sesión ha expirado',
                    en: 'Your session has expired',
                  }),
                  this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                  undefined,
                  () => {
                    localStorage.removeItem('token');
                  },
                  () => {
                    localStorage.removeItem('token');
                  }
                );
              else
                this.general.dialog.show(
                  '',
                  error.error.message,
                  this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                  undefined,
                  () => {}
                );
          }
        );
      }
    }
  }

  logOut() {
    this.general.loaderShow();
    localStorage.removeItem('token');
    this.http
      .post(this.general.api + 'auth/logout', {}, this.options)
      .subscribe(
        (resp) => {
          localStorage.setItem('token', '');
          this.authChange.next(undefined);

          this.general.loaderHidden();
        },
        (error) => {}
      );
  }

  restToken(token: namespace.Auth) {
    try {
      this.options.headers.Authorization =
        this.auth!.type + ' ' + this.auth!.token;
      localStorage.setItem('token', JSON.stringify(this.auth));
      var dif = new Date().getTime() - token!.created.getTime();
      var min = dif / (1000 * 60);
      var expires_in = (token.expires_in - 5) * 1000 * 60 - dif;
      if (min > expires_in) {
        this.http
          .post(this.general.api + 'auth/refresh', {}, this.options)
          .subscribe(
            (e: any) => {
              var custom = {
                token: e.token,
                type: e.token_type,
                expires_in: e.expires_in,
                created: new Date(),
              };
              this.auth = custom;
              this.options.headers.Authorization =
                this.auth!.type + ' ' + this.auth!.token;
              localStorage.setItem('token', JSON.stringify(custom));
              if (this.router.url == '/login') this.redirect();
              this.general.loaderHidden();
              setTimeout(() => {
                this.restToken(custom);
              }, expires_in);
            },
            (error) => {
              this.general.loaderHidden();
              this.authChange.next(undefined);
            }
          );
      } else {
        setTimeout(() => {
          this.restToken(token);
        }, expires_in);
        if (this.router.url == '/login') this.redirect();
      }
    } catch {}
  }

  resetPass(email: string, back: Function) {
    this.http
      .post(
        this.general.api + 'auth/forgottenpassword',
        { email: email },
        this.options
      )
      .subscribe(
        (link) => {
          back(link);
        },
        (error) => {
          back(error);
        }
      );
  }

  login(email: string, password: string, back: Function) {
    this.options = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Language': this.general.idioma(),
        Authorization: '',
      },
    };
    this.http
      .post(
        this.general.api + 'auth/login',
        {
          email: email,
          password: password,
        },
        this.options
      )
      .subscribe(
        (e: any) => {
          if (!e.message) {
            this.loginData.auth = {
              token: e.token,
              type: e.token_type,
              expires_in: e.token_expires_in,
              two_factor_code_created_at: new Date(),
              two_factor_code_expires_in: e.two_factor_code_expires_in,
              created: new Date(),
            };

            // this.authChange.next(custom);
            back(this.loginData);
          } else {
            this.general.loaderHidden();
            if (this.general.dialog)
              this.general.dialog.show(
                '',
                e.message,
                this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                undefined,
                () => {}
              );
          }
        },
        (response) => {
          back(response);
        },
        () => {}
      );
  }
  auth2faReset(back: Function) {
    this.general.loaderShow();
    var options = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Language': this.general.idioma(),
        Authorization:
          this.loginData!.auth.type + ' ' + this.loginData!.auth.token,
      },
    };
    this.http.post(this.general.api + 'auth/2fa/resend', {}, options).subscribe(
      (resp) => {
        (this.loginData.auth.two_factor_code_expires_in = 10),
          (this.loginData.auth.two_factor_code_created_at = new Date());
        back(null);
      },
      (error) => {
        back(error);
      }
    );
  }
  auth2fa(code: string) {
    this.general.loaderShow();
    var options = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Language': this.general.idioma(),
        Authorization:
          this.loginData!.auth.type + ' ' + this.loginData!.auth.token,
      },
    };
    this.http
      .post(this.general.api + 'auth/2fa/verify', { code: code }, options)
      .subscribe(
        (resp) => {
          this.loginData.user = resp;
          this.authChange.next(this.loginData);
        },
        (error) => {
          this.general.loaderHidden();
          if (error.status == 403)
            this.general.dialog?.show(
              '',
              error.error.message,
              this.general.getText({ es: 'Aceptar', en: 'Ok' }),
              undefined,
              () => {}
            );
        }
      );
  }
}
