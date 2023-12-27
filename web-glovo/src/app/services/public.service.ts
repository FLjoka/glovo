import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  corporate: any = [];
  compliance: any = [];
  sections: any = [];
  selectedTag: any;
  selectedSection: any;
  homeSettings: any = null;
  trainingSettings: any = null;
  whistleblowerSettings: any = null;
  complianceSettings: any = null;
  corporateSettings: any = null;
  items = [
    {
      subtitulo: this.general.getText({ es: 'Subtitulos', en: 'Subtitulos' }),
      descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      img: 'assets/public/training-pina1.png',
    },
    {
      subtitulo: this.general.getText({ es: 'Subtitulos', en: 'Subtitulos' }),
      descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      img: 'assets/public/training-pina2.png',
    },
    {
      subtitulo: this.general.getText({ es: 'Subtitulos', en: 'Subtitulos' }),
      descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      img: 'assets/public/training-pina3.png',
    },
  ];
  requestsOptions: any;
  constructor(
    private general: GeneralService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    router.navigateByUrl('/public/home');
  }
  getCorporate() {
    this.http.get(this.general.api + 'corporates', this.auth.options).subscribe(
      (resp) => {
        this.corporate = resp;
      },
      (error) => {
        this.general.loaderHidden();
      }
    );
  }
  getListRequests() {
    this.http
      .get(
        this.general.api + 'whistleblowerRequests/options',
        this.auth.options
      )
      .subscribe((resp) => {
        this.requestsOptions = resp;
      });
  }

  getSections(id: any) {
    this.http
      .get(
        this.general.api + 'compliances/tags/' + id + '/sections',
        this.auth.options
      )
      .subscribe((resp: any) => {
        this.selectedSection = resp[0];
        this.sections = resp;
      });
  }
  getCompliance() {
    this.http
      .get(this.general.api + 'compliances/tags', this.auth.options)
      .subscribe(
        (resp: any) => {
          this.compliance = resp;
          this.selectedTag = resp[0];
          this.getSections(resp[0].id);
        },
        (error) => {
          this.general.loaderHidden();
        }
      );
  }

  getSettings(section: string, back: Function) {
    this.http
      .get(this.general.api + 'publicPages/' + section, this.auth.options)
      .subscribe(
        (resp: any) => {
          back(resp);
        },
        (error) => {
          throw new Error(error.message);
        }
      );
  }
}
