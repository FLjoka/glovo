import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PublicAdminService {
  corporate : any;
  corporateSelect: any;
  buscandoCorporate = false;
  corporateFilters :{
    statusSelected : any,
    search : any,
    per_page :  "?per_page=6"
  }= {
    statusSelected : { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    search : "",
    per_page :  "?per_page=6"
  }
  
  complianceFilters :{
    statusSelected : any,
    search : any,
    per_page :  "?per_page=6"
  }= {
    statusSelected : { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
    search : "",
    per_page :  "?per_page=6"
  }
  compliance: any;
  buscandoCompliance = false;
  complianceSelect: any ;
  trainingSettings : any;
  corporateSettings : any;
  complianceSettings : any;
  whistleblowerSettings : any;
  
  sectionsFilters ={
    params : "?per_page=6&",
    status : [
      { text: this.general.getText({ es: "Activos", en: "Active" }), value: "vacio" },
      { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" },
      { text: this.general.getText({ es: "Eliminadas", en: "Eliminated" }), value: "deleted" },
    ],
    search : "",
    statusSelected : { text: this.general.getText({ es: "Todos", en: "All" }), value: "all" }
  }

  buscandoSections = false;
  sections : any;
  sectionsSelect : any;
  homeSetting? : any;
  buscandoWhistleblowerChannel = false;
  whistleblowerChannel : any;
  whistleblowerChannelFilters = {
    search : "",
    per_page: 5,
    created_at_start : "",
    created_at_end : ""
  }
  constructor( private http : HttpClient,private general : GeneralService, private auth : AuthService  )  { 

  }

  getSettings(section : string, back : Function ){
    this.http.get(this.general.api +"publicPages/" + section,this.auth.options ).subscribe( (resp : any) => {
      back(resp);
    },(error) => {
      throw new Error(error.message);
    })
  }

  getCorporate(params: string, complete?: boolean) {
    this.buscandoCorporate = true;
    var url = "";
    if (!complete)
      url = this.general.api + "admin/corporates" + params;
    else
      url = params;

    this.http.get(url,this.auth.options).subscribe( resp => {
      this.corporate = resp;
      this.buscandoCorporate = false;
    }, error => {
      this.buscandoCorporate = false;
    })
  }

  getWhistleblowerChannel(params: string, complete?: boolean){
    this.buscandoWhistleblowerChannel = true;
    var url = "";
    if (!complete)
      url = this.general.api + "whistleblowerRequests" + params;
    else
      url = params;

    this.http.get(url ,this.auth.options).subscribe( (resp : any )=> {
      this.whistleblowerChannel= resp;
      this.buscandoWhistleblowerChannel = false;
    }, error => {
      this.buscandoWhistleblowerChannel = false;
    });
  }

  getSections(params : string , complete? : boolean){
    var url = "";
    this.buscandoSections = true;
    if(!complete)
      url = this.general.api + "admin/compliances/tags/"+this.complianceSelect.id+"/sections"+ params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe ( resp => {
      this.sections = resp;
      this.buscandoSections= false;
    }, error => {
      this.buscandoSections= false;
    })
  }

  getCompliance(params : string , complete? : boolean){
    var url = "";
    this.buscandoCompliance = true;
    if(!complete)
      url = this.general.api + "admin/compliances/tags" + params;
    else
      url = params;
    this.http.get(url, this.auth.options).subscribe ( resp => {
      this.compliance = resp;
      this.buscandoCompliance = false;
    }, error => {
      this.buscandoCompliance = false;
    })
  }

}
