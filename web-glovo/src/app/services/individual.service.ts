import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {
  buscandoPresentations = false;
  buscandoFinancialReports = false;
  buscandoDocuments = false;
  buscandoAnuncios = false;
  buscandoMasAnuncios = false;
  anuncios: {
    data : any[],
    next : string;
  } = {
    data: [],
    next : ""
  }
  unreads: any = null;
  presentations: any;
  financialReports: any;
  documents: any;
  documentCategory: any[] = [];
  requestsOptions : any;
  constructor(private general: GeneralService, private auth: AuthService, private http: HttpClient, private active: Router) {
    general.lenguage.subscribe(resp => {
      this.getAnnouncements();
      this.documents = this.active.url !== "/private/documents" ? undefined : this.documents;
      this.financialReports = this.active.url !== "/private/financial-reports" ? undefined : this.financialReports;
      this.presentations = this.active.url !== "/private/presentations" ? undefined : this.presentations;
    })
 
  }
  getUnread(){
    this.http.get( this.general.api + "auth/me/unreads" , this.auth.options ).subscribe ( ( resp : any ) => {
      this.unreads = resp.announcements;
    });
  }
  setReader(){
    this.http.put(this.general.api + "auth/me/access/announcements" , {}, this.auth.options ).subscribe( reps => {
      this.unreads = null; 
    } , error => {
     
      this.unreads = null; 
    })
  }
  getPresentations(params: string, complete?: boolean) {
    this.buscandoPresentations = true;
    var url = "";
    if (!complete)
      url = this.general.api + "presentations" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.presentations = resp;
      this.buscandoPresentations = false;
    }, error => {
     
      this.buscandoPresentations = false;
    })
  }

  getFinancialReports(params: string, complete?: boolean) {
    this.buscandoFinancialReports = true;
    var url = "";
    if (!complete)
      url = this.general.api + "financialReports" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.financialReports = resp;
      this.buscandoFinancialReports = false;
    }, error => {
     
      this.buscandoFinancialReports = false;
    })
  }

  getDocumentCategory() {
    this.buscandoDocuments = true;
    var url = this.general.api + "documents";
    this.http.get(url, this.auth.options).subscribe(resp => {
           this.documentCategory
      this.buscandoDocuments = false;
    }, error => {
     
      this.buscandoDocuments = false;
    })
  }

  getDocuments(params: string, complete?: boolean) {
    this.buscandoDocuments = true;
    var url = "";
    if (!complete)
      url = this.general.api + "documents" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe(resp => {
      this.documents = resp;
      this.buscandoDocuments = false;
    }, error => {
     
      this.buscandoDocuments = false;
    })
  }

  getListRequests(){
    this.http.get(this.general.api + "shareholderRequests/options",this.auth.options).subscribe( resp => {
      this.requestsOptions = resp;
    })
  }

  getAnnouncements(){
    this.buscandoAnuncios = true;
    this.http.get(this.general.api + "announcements",this.auth.options).subscribe( (resp : any)=> {
      this.anuncios.data =  resp.data;
      this.anuncios.next =  resp.links.next;
      this.buscandoAnuncios = false;
    }, error => {
      this.buscandoAnuncios = false;
    })
  }

  addAnnouncements(){
    this.buscandoMasAnuncios = true;
    if(this.anuncios.next)
    this.http.get(this.anuncios.next,this.auth.options).subscribe( (resp : any)=> {
      this.anuncios.data=this.anuncios.data.concat( resp.data);
      this.anuncios.next =  resp.links.next;
      this.buscandoMasAnuncios = false;
    }, error => {
     
      this.buscandoMasAnuncios = false;
    });
    else {
      this.buscandoMasAnuncios = false;
    }
  }
}
