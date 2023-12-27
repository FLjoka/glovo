import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard  {
  constructor(private auth: AuthService, private route: Router, private zone: NgZone,private general : GeneralService) { }
  canActivate() {
    if (!this.auth.user && !this.general.dev) {
      this.zone.run(() => {
        this.route.navigateByUrl("/login");
      });
      return false;
    }
    return true;
  }

}
  

