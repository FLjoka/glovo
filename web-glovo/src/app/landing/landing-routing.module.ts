import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { FinancialReportsComponent } from './financial-reports/financial-reports.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing.component';
import { NewNoticiaComponent } from './news/new-noticia/new-noticia.component';
import { NewsComponent } from './news/news.component';
import { OrganizationChartsComponent } from './organization-charts/organization-charts.component';
import { PresentationsComponent } from './presentations/presentations.component';
import { ProfileComponent } from './profile/profile.component';
import { ShareholdersRequestsComponent } from './shareholders-requests/shareholders-requests.component';

const routes: Routes = [
  {
    path:"",
    component: LandingComponent,
    children: [
      {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:"shareholders-requests",
        component: ShareholdersRequestsComponent
      },
      {
        path:"presentations",
        component: PresentationsComponent
      },
      {
        path:"organization-charts",
        component: OrganizationChartsComponent
      },
      {
        path:"news",
        component: NewsComponent
      },
      {
        path:"news/:id",
        component: NewNoticiaComponent
      },
      {
        path:"documents",
        component: DocumentsComponent
      },
      {
        path:"financial-reports",
        component: FinancialReportsComponent
      },
      {
        path:"profile",
        component: ProfileComponent
      },
      {
        path:"home",
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
