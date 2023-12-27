import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplianceComponent } from './compliance/compliance.component';
import { CorporateComponent } from './corporate/corporate.component';
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './public.component';
import { TrainingComponent } from './training/training.component';
import { WhistleblowerChannelComponent } from './whistleblower-channel/whistleblower-channel.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'corporate',
        component: CorporateComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'training',
        component: TrainingComponent,
      },
      {
        path: 'compliance',
        component: ComplianceComponent,
      },
      {
        path: 'whistleblower-channel',
        component: WhistleblowerChannelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
