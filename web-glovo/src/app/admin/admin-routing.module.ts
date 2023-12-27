import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../admin/profile/profile.component';
import { AdminComponent } from './admin.component';
import { DocumentsComponent } from './documents/documents.component';
import { FinancialReportsComponent } from './financial-reports/financial-reports.component';
import { IndexComponent } from './index/index.component';
import { NewsComponent } from './news/news.component';
import { OrganizationChartsComponent } from './organization-charts/organization-charts.component';
import { PresentationsComponent } from './presentations/presentations.component';
import { ReportsComponent } from './reports/reports.component';
import { ShareholdersRequestsComponent } from './shareholders-requests/shareholders-requests.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children: [
      {
        path:'',
        pathMatch:"full",
        redirectTo:"reports"
      },
      {
        path:'index',
        component:IndexComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'shareholders-requests',
        component:ShareholdersRequestsComponent,
      },
      {
        path:'presentations',
        component:PresentationsComponent,
      },
      {
        path:'organization-charts',
        component: OrganizationChartsComponent
      },
      {
        path:'news',
        component: NewsComponent
      },
      {
        path:"news/:id",
        component: NewsComponent
      },
      {
        path:'financial-reports',
        component:FinancialReportsComponent
      },
      {
        path:'reports',
        component:ReportsComponent
      },
      {
        path:'users',
        component: UsersComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
