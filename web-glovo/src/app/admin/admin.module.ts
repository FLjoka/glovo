import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index/index.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { ComponentesModule } from '../componentes/componentes.module';
import { PresentationsComponent } from './presentations/presentations.component';
import { OrganizationChartsComponent } from './organization-charts/organization-charts.component';
import { FinancialReportsComponent } from './financial-reports/financial-reports.component';
import { ShareholdersRequestsComponent } from './shareholders-requests/shareholders-requests.component';
import { DocumentsComponent } from './documents/documents.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EditComponent } from './index/edit/edit.component';
import { NewComponent } from './index/new/new.component';
import { ChartModule } from 'primeng/chart';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { MessageService } from 'primeng/api';
import { InformeComponent } from './reports/informe/informe.component';
import { NewChartComponent } from './organization-charts/new/newChart.component';
import { NewPresentationComponent } from './presentations/new-presentation/new-presentation.component';
import { EditPresentationsComponent } from './presentations/edit/edit.component';
import { EditFinancialReportsComponent } from './financial-reports/edit-financial-reports/edit-financial-reports.component';
import { NewFinancialReportsComponent } from './financial-reports/new-financial-reports/new-financial-reports.component';
import { NewDocumentComponent } from './documents/new-document/new-document.component';
import { EditDocumentComponent } from './documents/edit-document/edit-document.component';
import { NewAnnouncementsComponent } from './news/new-announcements/new-announcements.component';
import { EditAnnouncementsComponent } from './news/edit-announcements/edit-announcements.component';
import { EditDocumentsComponent } from './news/edit-documents/edit-documents.component';
import { NewDocumentAdComponent } from './news/edit-documents/new/new.component';
import { EditDocumentAdComponent } from './news/edit-documents/edit-document-ad/edit-document-ad.component';
import { UserReportComponent } from './reports/user-report/user-report.component';
import { DetailComponent } from './shareholders-requests/detail/detail.component';

@NgModule({
  declarations: [
    NewChartComponent,
    AdminComponent,
    IndexComponent,
    PresentationsComponent,
    OrganizationChartsComponent,
    FinancialReportsComponent,
    ShareholdersRequestsComponent,
    DocumentsComponent,
    NewsComponent,
    ProfileComponent,
    EditComponent,
    EditDocumentAdComponent,
    NewDocumentAdComponent,
    EditDocumentsComponent,
    EditAnnouncementsComponent,
    NewAnnouncementsComponent,
    ReportsComponent,
    EditDocumentComponent,
    NewDocumentComponent,
    UsersComponent,
    InformeComponent,
    NewComponent,
    NewPresentationComponent,
    EditPresentationsComponent,
    EditFinancialReportsComponent,
    NewFinancialReportsComponent,
    EditFinancialReportsComponent,
    NewDocumentComponent,
    EditDocumentComponent,
    NewAnnouncementsComponent,
    EditAnnouncementsComponent,
    EditDocumentsComponent,
    EditDocumentAdComponent,
    UserReportComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    AdminRoutingModule,
    ButtonModule,
    CascadeSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ProgressSpinnerModule,
    ChartModule,
  ],
  providers: [MessageService],
})
export class AdminModule {}
