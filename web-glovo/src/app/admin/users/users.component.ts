import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  roles!: any[];
  new = false;

  view = null;
  solicitudes : any [] = []; 
  suspendidas : any [] = [];
  constructor(public admin: AdminService, public general: GeneralService, private auth: AuthService, private http: HttpClient) {
      switch (this.general.idioma()) {
        case "es":
          this.suspendidas = [
            { text: "Suspendidas", code: 1 },
            { text: "Habilitadas", code: 0 },
            { text: "Todas", code: 2 },
          ]
          break;
  
        default:
          this.suspendidas = [
            { text: "Suspended", code: 1 },
            { text: "Enabled", code: 0 },
            { text: "All", code: 2 },
          ]
          break;
      }
      switch (this.general.idioma()) {
        case "es":
          this.solicitudes = [
            { text: "Pendientes", code: 0 },
            { text: "Aprobadas", code: 1 },
            { text: "Todas", code: 2 },
          ]
          break;
  
        default:
          this.solicitudes = [
            { text: "Awaiting requests", code: 0 },
            { text: "Approved", code: 1 },
            { text: "All", code: 2 },
          ]
          break;
      }
    this.general.lenguage.subscribe( resp => {
      switch (resp) {
        case "es":
          this.suspendidas = [
            { text: "Suspendidas", code: 1 },
            { text: "Habilitadas", code: 0 },
            { text: "Todas", code: 2 },
          ]
          break;
  
        default:
          this.suspendidas = [
            { text: "Suspended", code: 1 },
            { text: "Enabled", code: 0 },
            { text: "All", code: 2 },
          ]
          break;
      }
      switch (this.general.idioma()) {
        case "es":
          this.solicitudes = [
            { text: "Pendientes", code: 0 },
            { text: "Aprobadas", code: 1 },
            { text: "Todas", code: 2 },
          ]
          break;
  
        default:
          this.solicitudes = [
            { text: "Awaiting requests", code: 0 },
            { text: "Approved", code: 1 },
            { text: "All", code: 2 },
          ]
          break;
      }
    })
   }
  log(e: any) {

    this.admin.getUsers(this.genParams());
  }
  prueba(e: any) {

    this.admin.getUsers(this.genParams());

  }
  reset(){
    this.admin.usersFilters.search = undefined;
    this.admin.usersFilters.solicitud = undefined;
    this.admin.usersFilters.selectedRol = undefined;
    this.admin.usersFilters.habilitada= undefined;
  }


  aprobar(id: string, index: number) {
    this.http.put(this.general.api + "admin/users/" + id + "/approve", {}, this.auth.options).subscribe(resp => {
      this.admin.users.data[index].approved_account = true;
    }, error => {
      if (this.general.dialog)
        this.general.dialog.show(error.error.message, error.error.errors, this.general.getText({ es: "Aceptar", en: "Ok" }), undefined, () => { });
    });
  }
  genParams() {
    var params = "?per_page=6";
    params +=  this.admin.usersFilters.search ? ("&search=" +  this.admin.usersFilters.search) : "";
    if( this.admin.usersFilters.selectedRol !== "All")
    params +=  this.admin.usersFilters.selectedRol ? ("&role=" +  this.admin.usersFilters.selectedRol) : "";
    if ( this.admin.usersFilters.solicitud)
      params +=  this.admin.usersFilters.solicitud!.code < 2 ? ("&approved_account=" +  this.admin.usersFilters.solicitud.code) : "";
    if (this.admin.usersFilters.habilitada)
      params +=  this.admin.usersFilters.habilitada!.code < 2 ? ("&suspended=" +  this.admin.usersFilters.habilitada.code) : "";

    return params;
  }
  ngOnInit(): void {
    if(!this.admin.users)
      this.admin.getUsers(this.genParams());

  }

}
