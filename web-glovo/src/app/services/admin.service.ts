import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  roles: string[] = [];
  presentations: any;
  users: any;
  usersReports: any;
  mode!: any;
  documents: any;
  $mode: Subject<string> = new Subject()
  modeList = ["Private Admin", "Public Admin"];
  financialReports: any;
  reportsDaily: any;
  reportsGrafica: any;
  announcements: any;
  shareholderRequest : any;
  buscandoAnuncios: any;
  buscandoShareholderRequest = false;
  buscandoUsers = false;
  buscandoDocuments = false;
  buscandoPresentations = false;
  buscandoFinancialReports = false;
  buscandoMonthlyReport = false;
  buscandoDailyReport = false;
  buscandoUsersReports = false;
  financialFilters = {
    statusSelected : { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" }
  }
  documentsFilters = {
    statusSelected : { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" }
  }
  presentationsFilters = {
    statusSelected : { text: this.general.getText({ es: "Todas", en: "All" }), value: "all" }
  }
  newsFilters = {
    statusSelected : { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" }
  }
  shareholderRequestsFilters = {
    search : "",
    per_page: 5,
    created_at_start : "",
    created_at_end : ""
  }
  usersFilters : {
    selectedRol: any,
    search: any,
    solicitud:any,
    habilitada: any
  } = {
    selectedRol: undefined,
    search: undefined,
    solicitud: undefined,
    habilitada: undefined
  }
  shareholders: string[] = [];
  originRol: string[] = [];
  constructor(private http: HttpClient, private general: GeneralService, private router: Router, private auth: AuthService) {
    general.lenguage.subscribe(resp => {
      this.financialReports = this.router.url !== "/admin/financial-reports" ? undefined : this.financialReports;
      this.presentations = this.router.url !== "/admin/presentations" ? undefined : this.presentations;
    })
  }
  cambiarModo(modo: any) {
    this.$mode.next(modo.value)
  }
  init() {

    if (this.auth.user!.roles[0] == "Super Admin") {
      this.mode = "Private Admin";
    } else this.mode = this.auth.user!.roles[0];

    this.http.get(this.general.api + "roles", this.auth.options).subscribe((resp: string[] | any) => {
      this.originRol = [...resp];
      this.roles = resp;
      this.shareholders = [];
      this.originRol.forEach(element => {
        if (element.indexOf("shareholder") !== -1 || element.indexOf("Shareholder") !== -1) {
          this.shareholders.push(element);
        }
      })
      this.roles.push("All")
    }, error => {
      
    })

  }
  getPresentations(params: string, complete?: boolean) {
    this.buscandoPresentations = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/presentations" + params;
    else
      url = params;

    this.http.get(url, this.auth.options).subscribe(resp => {
      this.presentations = resp;
      this.buscandoPresentations = false;
    }, error => {
      this.buscandoPresentations = false;
    })
  }
  getShareholderRequest(params: string, complete?: boolean){
    this.buscandoShareholderRequest = true;
    var url = "";
    if (!complete)
      url = this.general.api + "shareholderRequests" + params;
    else
      url = params;

    this.http.get(url ,this.auth.options).subscribe( (resp : any )=> {
      this.shareholderRequest = resp;
      this.buscandoShareholderRequest = false;
    }, error => {
      this.buscandoShareholderRequest = false;
    });
  }
  getFinancialReports(params: string, complete?: boolean) {
    this.buscandoFinancialReports = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/financialReports" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.financialReports = resp;
      this.buscandoFinancialReports = false;
    }, error => {
      
      this.buscandoFinancialReports = false;
    })
  }
  getUsers(params: string, complete?: boolean) {
    var url;
    this.buscandoUsers = true;
    if (!complete)
      url = this.general.api + "admin/users" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe((resp: any) => {
      this.users = resp;
      this.buscandoUsers = false;
    }, error => {
      
      this.buscandoUsers = false;
    });
  }

  getDocuments(params: string, complete?: boolean) {
    this.buscandoDocuments = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/documents" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.documents = resp;
      this.buscandoDocuments = false;
    }, error => {
      
      this.buscandoDocuments = false;
    })
  }

  getReport(params: string, complete?: boolean) {
    this.getReportDaily(params, complete);
    this.getReportMonthly(params, complete);
  }

  getReportDaily(params: string, complete?: boolean) {
    this.buscandoDailyReport = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/reports/daily" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe((resp: any) => {
      this.reportsDaily = resp;
      this.buscandoDailyReport = false;
    }, error => {
      
      this.buscandoDailyReport = false;
    })
  }

  getReportMonthly(params: string, complete?: boolean) {
    var url = "";
    if (!complete)
      url = this.general.api + "admin/reports/monthly" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe((resp: any) => {
      var labels: any[] = [];
      var data: any[] = [];
      resp.reverse();
      resp.forEach((element: any) => {
        labels.push(element.m_date);
        data.push(element.total);
      });

      this.reportsGrafica = {
        labels: labels,
        datasets: [
          {
            label: null,
            data: data,
            fill: true,
            borderColor: '#FFA726',
            tension: .1,
            backgroundColor: 'rgba(255,167,38,0.2)'
          },
        ]
      }

    })
  }
  getUsersReports(params: string, complete?: boolean) {
    this.buscandoUsersReports = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/reports/users" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.usersReports = resp;
      this.buscandoUsersReports = false;
    }, error => {
      
      this.buscandoUsersReports = false;
    })
  }
  getAnnouncement(params: string, complete?: boolean) {
    this.buscandoAnuncios = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/announcements" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.announcements = resp;
      this.buscandoAnuncios = false;
    }, error => {
      
      this.buscandoAnuncios = false;
    })
  }
  logOut() {
    this.auth.logOut();
  }
}
