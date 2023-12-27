import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { PublicService } from 'src/app/services/public.service';
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-whistleblower-channel',
  templateUrl: './whistleblower-channel.component.html',
  styleUrls: ['./whistleblower-channel.component.sass'],
})
export class WhistleblowerChannelComponent implements OnInit {
  cities: string[] = [];
  selectedCity!: City;
  form: UntypedFormGroup;
  options: any[] = [];
  lenguageSubscriber!: Subscription;
  loadDoc = false;
  doc: any;
  docName = '';
  controlsText = [
    { code: 'option', value: { es: 'Opción', en: 'Option' } },
    { code: 'text', value: { es: 'Texto', en: 'Text' } },
    { code: 'document', value: { es: 'Documento', en: 'Document' } },
    { code: 'name', value: { es: 'Nombre', en: 'Name' } },
    { code: 'email', value: { es: 'Correo', en: 'Email' } },
  ];
  constructor(
    public data: PublicService,
    private http: HttpClient,
    private auth: AuthService,
    public general: GeneralService,
    private route: Router,
    private fb: UntypedFormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      option: ['', [Validators.required]],
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(1000),
        ],
      ],
      document: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  set(e: any) {
    var reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      this.loadDoc = true;
      var reader = new FileReader();
      this.doc = e.target.files[0];
      this.docName = (e.target.files[0] as File).name;
      reader.onload = (event: any) => {
        this.loadDoc = false;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.options = [];
    this.data.requestsOptions.forEach((option: any) => {
      var resp = { id: option.id, text: this.general.getText(option.option) };
      this.options.push(resp);
    });

    this.lenguageSubscriber = this.general.lenguage.subscribe(() => {
      this.options = [];
      this.data.requestsOptions.forEach((option: any) => {
        var resp = { id: option.id, text: this.general.getText(option.option) };
        this.options.push(resp);
      });
    });
  }
  text(body: string) {
    try {
      var resp = JSON.parse(body);
      return resp;
    } catch {
      return body;
    }
  }
  ngOnDestroy() {
    if (this.lenguageSubscriber) this.lenguageSubscriber.unsubscribe();
  }
  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'formulario',
      detail: 'Formulario enviado',
    });
  }
  addSingleError() {
    this.messageService.add({
      severity: 'error',
      summary: 'formulario',
      detail: 'Error al Enviar el formulario',
    });
  }
  elegir() {
    (document.getElementById('document') as HTMLInputElement).click();
  }
  typeof(e: any) {
    return typeof e;
  }

  submit() {
    this.general.loaderShow();
    try {
      this.general.loaderShow();
      Object.keys(this.form.controls).forEach((key) => {
        if (this.form.get(key)?.invalid) {
          throw new Error(key);
        }
      });
      var formData = new FormData();
      // formData.append("footer[en]", this.nuevo.footer.en);

      formData.append('request_option_id', this.form.value.option.id);
      formData.append('description', this.form.value.text);
      formData.append('name', this.form.value.name);
      formData.append('email', this.form.value.email);
      if (this.doc) formData.append('file', this.doc);
      this.http
        .post(
          this.general.api + 'whistleblowerRequests',
          formData,
          this.auth.options
        )
        .subscribe(
          (resp) => {
            // this.addSingle();
            this.docName = '';
            this.form.reset();
            this.general.loaderHidden();
          },
          (error) => {
            //this.addSingleError();
            this.general.loaderHidden();
          }
        );
    } catch (e: any) {
      this.general.loaderHidden();
      var invalido = this.form.get(e.message)!;
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
              'Por favor complete el campo "' +
              this.getControlsText(e.message) +
              '"',
            en:
              'Please fill in the "' +
              this.getControlsText(e.message) +
              '" field',
          }),
          this.general.getText({ en: 'Accept', es: 'Aceptar' }),
          undefined,
          () => {},
          () => {}
        );
      if (invalido.errors?.email)
        this.general.dialog?.show(
          '',
          this.general.getText({
            es:
              'Por favor ingrese un correo valido en el campo "' +
              this.getControlsText(e.message) +
              '"',
            en:
              'Please enter a valid email in the "' +
              this.getControlsText(e.message) +
              '" field',
          }),
          this.general.getText({ en: 'Accept', es: 'Aceptar' }),
          undefined,
          () => {},
          () => {}
        );
    }
  }

  getControlsText(code: string) {
    var resp = '';
    this.controlsText.forEach((element) => {
      if (element.code == code) resp = this.general.getText(element.value);
    });
    return resp;
  }
}
