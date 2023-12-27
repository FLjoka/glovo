import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { HomeGuard } from './guards/home.guard';
import { PublicGuard } from './guards/public.guard';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'private',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
    canActivate: [HomeGuard],
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'admin-public',
    loadChildren: () =>
      import('./admin-public/admin-public.module').then(
        (m) => m.AdminPublicModule
      ),
    // canActivate: [PublicGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetpassword/:token',
    component: ResetpasswordComponent,
  },
  {
    path: 'invitations/:token',
    component: InvitationComponent,
  },
  {
    path: 'pruebas',
    component: PruebasComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'legal-privacy',
    loadChildren: () =>
      import('./legal-privacy/legal-privacy.module').then(
        (m) => m.LegalPrivacyModule
      ),
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    //router.navigateByUrl("login")
  }
}
