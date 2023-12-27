import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../admin/profile/profile.component';
import { AdminPublicComponent } from './admin-public.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { CorporateComponent } from './corporate/corporate.component';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './training/training.component';
import { WhistleblowerChannelComponent } from './whistleblower-channel/whistleblower-channel.component';

const routes: Routes = [
  {
    path: "",
    component: AdminPublicComponent,
    children : [
      {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:"home",
        component: HomeComponent
      },
      {
        path:"corporate",
        
        loadChildren: () => import('./corporate/corporate.module').then( m => m.CorporateModule),
      },
      {
        path:"training",
        component: TrainingComponent
      },
      {
        path:"compliance",
        loadChildren: () => import('./compliance/compliance.module').then( m => m.ComplianceModule),
      },
      {
        path:"whistleblower-channel",
        component: WhistleblowerChannelComponent
      },
      {
        path:"profile",
        component: ProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPublicRoutingModule { }
