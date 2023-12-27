import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  posibles = [
    "Super Admin",
    "Private Admin",
  ]
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    if (this.auth.user)
      if (this.posibles.includes(this.auth.user!.roles[0])) {
        return true;
      }
      else
        this.router.navigateByUrl("/login");
    else
      this.router.navigateByUrl("/login");
    return false;
  }

}
