import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicAdminService } from 'src/app/services/public-admin.service';

@Component({
  selector: 'app-whistleblower-channel',
  templateUrl: './whistleblower-channel.component.html',
  styleUrls: ['./whistleblower-channel.component.sass'],
})
export class WhistleblowerChannelComponent implements OnInit {
  nuevoForm!: UntypedFormGroup;
  new = false;
  closeNew = () => {
    this.new = false;
    this.buscar();
  };
  edit = false;
  detail: any;
  params = '?per_page=6&';
  body = {
    es: { parrafos: [''] },
    en: { parrafos: [''] },
  };
  idiomaSet = 'es';
  status = [
    {
      text: this.general.getText({ es: 'Activos', en: 'Active' }),
      value: 'vacio',
    },
    { text: this.general.getText({ es: 'Todos', en: 'All' }), value: 'all' },
    {
      text: this.general.getText({ es: 'Eliminadas', en: 'Eliminated' }),
      value: 'deleted',
    },
  ];
  search = '';
  ver(text: any, index: number, lenguage: string) {
    if (lenguage == 'es') this.body.es.parrafos[index] = text.target.value;
    if (lenguage == 'en') this.body.en.parrafos[index] = text.target.value;
  }
  addEn() {
    if (this.body.en.parrafos[0].length > 4) this.body.en.parrafos.push('');
    else
      this.general.dialog!.show(
        '',
        this.general.getText({
          es: 'Agregue contenido en el primer párrafo',
          en: 'Add content in the first paragraph',
        }),
        this.general.getText({ es: 'Aceptar', en: 'Ok' }),
        undefined,
        () => {}
      );
  }
  addEs() {
    if (this.body.es.parrafos[0].length > 4) this.body.es.parrafos.push('');
    else
      this.general.dialog!.show(
        '',
        this.general.getText({
          es: 'Agregue contenido en el primer párrafo',
          en: 'Add content in the first paragraph',
        }),
        this.general.getText({ es: 'Aceptar', en: 'Ok' }),
        undefined,
        () => {}
      );
  }
  deleteParagrap(parrafos: string[], i: number) {
    if (parrafos.length > 1) parrafos.splice(i, 1);
    else {
      parrafos.splice(i, 1);
      parrafos.push('');
    }
  }

  back = () => {};
  load = false;
  $lenguaje!: Subscription;
  videoselect = 'https://www.youtube.com/embed/0kLUNzcqOO8';
  controlsText = [
    {
      code: 'headerEs',
      value: {
        es: 'Texto de cabecera en español',
        en: 'Header text in Spanish',
      },
    },
    {
      code: 'headerEn',
      value: {
        es: 'Texto de cabecera en inglés',
        en: 'Header text in English',
      },
    },
    {
      code: 'titleEs',
      value: { es: 'Titulo en Español', en: 'Title text in Spanish' },
    },
    {
      code: 'titleEn',
      value: { es: 'Titulo en inglés', en: 'Title text in English' },
    },
    {
      code: 'video',
      value: {
        es: 'Video del canal externo (no visible en la web)',
        en: 'External channel video (hidden)',
      },
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public general: GeneralService,
    public admin: PublicAdminService,
    private auth: AuthService,
    private http: HttpClient,
    private rutaActiva: ActivatedRoute,
    public router: Router
  ) {
    this.nuevoForm = fb.group({
      headerEs: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(120),
        ],
      ],
      headerEn: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(120),
        ],
      ],
      titleEs: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(120),
        ],
      ],
      titleEn: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(120),
        ],
      ],
      video: ['', [Validators.required]],
    });
  }
  video() {
    var split = (this.nuevoForm.get('video')!.value as string).split('/');
    var url = split[split.length - 1];
    if (url != '') {
      this.videoselect = 'https://www.youtube.com/embed/' + url;
    } else this.videoselect = 'https://www.youtube.com/embed/0kLUNzcqOO8';
  }
  reload() {
    this.load = true;
    this.video();
    setTimeout(() => {
      this.load = false;
    }, 300);
  }
  errorFrame() {}
  enviar(id: any) {
    this.general.loaderShow();
    this.http
      .post(
        this.general.api + 'shareholderRequests/' + id + '/resend',
        {},
        this.auth.options
      )
      .subscribe(
        (resp) => {
          this.general.loaderHidden();
        },
        (error) => {
          this.general.loaderHidden();
          this.general.dialog?.show(
            '',
            this.general.getText({
              es: 'No se pudo enviar la solicitud',
              en: 'The request could not be sent',
            }),
            this.general.getText({ en: 'Accept', es: 'Aceptar' }),
            undefined,
            () => {},
            () => {}
          );
        }
      );
  }
  setFin() {
    var date =
      this.admin.whistleblowerChannelFilters.created_at_start.split('-');
    var start = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      0,
      0,
      0
    );
    date = this.admin.whistleblowerChannelFilters.created_at_end.split('-');
    var end = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      0,
      0,
      0
    );
    if (start.getTime() > end.getTime()) {
      this.admin.whistleblowerChannelFilters.created_at_start =
        this.inputFormatDate(this.refactorDate(end, -7));
    }
  }
  setStart() {
    var date =
      this.admin.whistleblowerChannelFilters.created_at_start.split('-');
    var start = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      0,
      0,
      0
    );
    date = this.admin.whistleblowerChannelFilters.created_at_end.split('-');
    var end = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      0,
      0,
      0
    );
    if (start.getTime() > end.getTime()) {
      this.admin.whistleblowerChannelFilters.created_at_end =
        this.inputFormatDate(start);
    }
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.$lenguaje) this.$lenguaje.unsubscribe();
  }
  inputFormatDate(date: any) {
    var dd: any = date.getDate();
    var mm: any = date.getMonth() + 1; //January is 0!
    var yyyy: any = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    date = yyyy + '-' + mm + '-' + dd;
    return date;
  }
  refactorDate(fecha: Date, dias: number) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  buscar() {
    this.admin.getWhistleblowerChannel(this.genParams());
  }
  getControlsText(code: string) {
    var resp = '';
    this.controlsText.forEach((element) => {
      if (element.code == code) resp = this.general.getText(element.value);
    });
    return resp;
  }
  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'reporte');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  genParams() {
    var date =
      this.admin.whistleblowerChannelFilters.created_at_start.split('-');
    var start = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      0,
      0,
      0
    );
    date = this.admin.whistleblowerChannelFilters.created_at_end.split('-');
    var end = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      24,
      0,
      0
    );
    this.params = '?per_page=6';
    var res = '?per_page=6';
    if (this.admin.whistleblowerChannelFilters.created_at_start)
      res = res + '&created_at_start=' + start.toISOString();
    if (this.admin.whistleblowerChannelFilters.created_at_end)
      res = res + '&created_at_end=' + end.toISOString();
    if (this.admin.whistleblowerChannelFilters.search !== '')
      res = res + '&search=' + this.admin.whistleblowerChannelFilters.search;
    return res;
  }

  descargar(url: string) {
    if (this.general.dialog)
      this.general.dialog.show(
        this.general.getText({ en: 'Confirmation', es: 'Confirmación' }),
        this.general.getText({
          en: 'You are trying to download a report, do you want to continue?',
          es: 'Estás intentando descargar un informe, ¿quieres continuar?',
        }),
        this.general.getText({ en: 'Accept', es: 'Aceptar' }),
        this.general.getText({ en: 'Cancel', es: 'Cancelar' }),
        () => {
          this.downGen(url);
        }
      );
  }

  ngOnInit(): void {
    this.nuevoForm
      .get('headerEs')
      ?.setValue(this.admin.whistleblowerSettings.header.es);
    this.nuevoForm
      .get('headerEn')
      ?.setValue(this.admin.whistleblowerSettings.header.en);
    this.nuevoForm
      .get('titleEs')
      ?.setValue(this.admin.whistleblowerSettings.title.es);
    this.nuevoForm
      .get('titleEn')
      ?.setValue(this.admin.whistleblowerSettings.title.en);
    if (this.admin.whistleblowerSettings.video) {
      this.nuevoForm
        .get('video')
        ?.setValue(this.admin.whistleblowerSettings.video);
      this.video();
    }
    this.body.es = JSON.parse(this.admin.whistleblowerSettings.body.es);
    this.body.en = JSON.parse(this.admin.whistleblowerSettings.body.en);
    this.admin.whistleblowerChannelFilters.search = '';
    this.admin.whistleblowerChannelFilters.created_at_start =
      this.inputFormatDate(this.refactorDate(new Date(), -7));
    this.admin.whistleblowerChannelFilters.created_at_end =
      this.inputFormatDate(new Date());
    if (!this.admin.whistleblowerChannel)
      this.admin.getWhistleblowerChannel(this.params);
    this.$lenguaje = this.general.lenguage.subscribe((resp) => {
      this.admin.getWhistleblowerChannel(this.params);
    });
  }
  guardar() {
    this.general.loaderShow();
    if (
      !(
        this.body.es.parrafos[0].length < 4 ||
        JSON.stringify(this.body.es).length > 600
      ) &&
      !(
        this.body.en.parrafos[0].length < 4 ||
        JSON.stringify(this.body.en).length > 600
      )
    ) {
      try {
        this.general.loaderShow();
        Object.keys(this.nuevoForm.controls).forEach((key) => {
          if (this.nuevoForm.get(key)?.invalid) {
            throw new Error(key);
          }
        });
        this.video();
        var save = {
          body: {
            es: JSON.stringify(this.body.es),
            en: JSON.stringify(this.body.en),
          },
          title: {
            es: this.nuevoForm.get('titleEs')?.value,
            en: this.nuevoForm.get('titleEn')!.value,
          },
          header: {
            es: this.nuevoForm.get('headerEs')!.value,
            en: this.nuevoForm.get('headerEn')!.value,
          },
          video: this.videoselect,
        };

        console.log(save);

        this.http
          .post(
            this.general.api + 'publicPages/whistleblower',
            save,
            this.auth.options
          )
          .subscribe(
            (resp) => {
              this.general.loaderHidden();
              this.general.dialog?.show(
                '',
                this.general.getText({
                  es: 'Cambios guardados exitosamente',
                  en: 'Changes saved successfully ',
                }),
                this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                undefined,
                () => {},
                () => {}
              );
            },
            (error) => {
              this.general.loaderHidden();
              this.general.dialog?.show(
                '',
                error.message,
                this.general.getText({ en: 'Accept', es: 'Aceptar' }),
                undefined,
                () => {},
                () => {}
              );
            }
          );
      } catch (e: any) {
        this.general.loaderHidden();
        var invalido = this.nuevoForm.get(e.message)!;
        if (invalido.errors?.maxlength)
          this.general.dialog?.show(
            '',
            this.general.getText({
              es:
                'El campo "' +
                this.getControlsText(e.message) +
                '" no puede ser mayor a ' +
                invalido.errors?.maxlength.requiredLength +
                ' caracteres',
              en:
                'The "' +
                this.getControlsText(e.message) +
                '" field cannot be longer than ' +
                invalido.errors?.maxlength.requiredLength +
                ' characters',
            }),
            this.general.getText({ en: 'Accept', es: 'Aceptar' }),
            undefined,
            () => {},
            () => {}
          );
        if (invalido.errors?.minlength)
          this.general.dialog?.show(
            '',
            this.general.getText({
              es:
                'El campo "' +
                this.getControlsText(e.message) +
                '" no puede ser menor a ' +
                invalido.errors?.minlength.requiredLength +
                ' caracteres',
              en:
                'The field "' +
                this.getControlsText(e.message) +
                '" cannot be less than ' +
                invalido.errors?.minlength.requiredLength +
                ' characters',
            }),
            this.general.getText({ en: 'Accept', es: 'Aceptar' }),
            undefined,
            () => {},
            () => {}
          );
        if (invalido.hasError('required'))
          this.general.dialog?.show(
            '',
            this.general.getText({
              es:
                'Todos los campos son requeridos por favor complete el campo "' +
                this.getControlsText(e.message) +
                '"',
              en:
                'All fields are required please fill in the  "' +
                this.getControlsText(e.message) +
                '" field',
            }),
            this.general.getText({ en: 'Accept', es: 'Aceptar' }),
            undefined,
            () => {},
            () => {}
          );
      }
    } else {
      if (
        this.body.es.parrafos[0].length < 4 ||
        JSON.stringify(this.body.es).length > 600
      ) {
        this.general.loaderHidden();
        this.general.dialog!.show(
          '',
          this.body.es.parrafos[0].length < 4
            ? this.general.getText({
                es: 'El cuerpo de la descripción en español no puede tener menos de 4 caracteres',
                en: 'The body of the description in Spanish cannot have less than 4 characters',
              })
            : this.general.getText({
                es: 'El cuerpo de la descripción en español no puede tener mas de 600 caracteres',
                en: 'The body of the description in Spanish cannot have more than 600 characters',
              }),
          this.general.getText({ es: 'Aceptar', en: 'Ok' }),
          undefined,
          () => {}
        );
      } else {
        if (
          this.body.en.parrafos[0].length < 4 ||
          JSON.stringify(this.body.en).length > 600
        ) {
          this.general.loaderHidden();
          this.general.dialog!.show(
            '',
            this.body.en.parrafos[0].length < 4
              ? this.general.getText({
                  es: 'El cuerpo de la descripción en Ingles no puede tener menos de 4 caracteres',
                  en: 'The body of the description in English cannot have less than 4 characters',
                })
              : this.general.getText({
                  es: 'El cuerpo de la descripción en Ingles no puede tener mas de 600 caracteres',
                  en: 'The body of the description in English cannot have more than 600 characters',
                }),
            this.general.getText({ es: 'Aceptar', en: 'Ok' }),
            undefined,
            () => {}
          );
        } else {
          this.general.dialog!.show(
            '',
            this.general.getText({
              es: 'Se requieren contenido en el cuerpo del anuncio',
              en: 'Content is required in the ad body',
            }),
            this.general.getText({ es: 'Aceptar', en: 'Ok' }),
            undefined,
            () => {}
          );
          this.general.loaderHidden();
        }
      }
    }
  }
}
