import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.sass']
})
export class PresentationsComponent implements OnInit {

  params = "?per_page=6&";
  search = "";
  $lenguaje!: Subscription;
  constructor(public general: GeneralService, private auth: AuthService, public individual : IndividualService, private http: HttpClient) { }
  ngOnInit(): void {
    window.scrollTo(0, 0)
    if (!this.individual.presentations)
      this.individual.getPresentations(this.params);
    this.$lenguaje =  this.general.lenguage.subscribe( resp => {
      this.individual.getPresentations(this.params);
    });
  }
  ngAfterViewInit() {

  }
  ngOnDestroy(){
    this.$lenguaje.unsubscribe();
  }
  restaurar(id: string) {
    this.general.loaderShow()
    this.http.put(this.general.api + "admin/presentations/" + id +"/restore",{}, this.auth.options).subscribe((resp : any )=> {
      for (let index = 0; index < this.individual.presentations.data.length; index++) {
        if(this.individual.presentations.data[index].id == id ){
          this.individual.presentations.data[index].deleted_at = null;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }
  
  eliminar(id: string) {
    this.general.loaderShow()
    this.http.delete(this.general.api + "admin/presentations/" + id, this.auth.options).subscribe((resp : any )=> {
      for (let index = 0; index < this.individual.presentations.data.length; index++) {
        if(this.individual.presentations.data[index].id == id ){
          this.individual.presentations.data[index].deleted_at = resp.deleted_at;
        }
      }
      this.general.loaderHidden()
    }, error => {
      this.general.loaderHidden()
    })
  }
  buscar(){
    this.individual.getPresentations(this.genParams());
  }
  downGen(url: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', "reporte");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  genParams() {
    this.params = "?per_page=6";
    var res = "?per_page=6";
    if(this.search !== "" )
      res = res + "&search=" + this.search;
    return res
  }
  descargar(id : string, title : string) {
    this.general.downCode.show(( pass : string ) => {
      this.http.post(this.general.api + "presentations/" +id+ "/download",{ password: pass },{ headers: this.auth.options.headers , responseType: 'blob' as 'json' } ).subscribe( (resp : any )=> {
        let dataType = resp.type;
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (title)
            downloadLink.setAttribute('download', title);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        if (error.status == 422)
        this.general.dialog!.show("", this.general.getText({ es: "La contraseña ingresada es incorrecta", en: "The password entered is incorrect" }), this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { })
      })
    })
  
  }
}
