import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { PresentationsComponent } from './presentations/presentations.component';
import { ShareholdersRequestsComponent } from './shareholders-requests/shareholders-requests.component';
import { LandingComponent } from './landing.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { OrganizationChartsComponent } from './organization-charts/organization-charts.component';
import { FinancialReportsComponent } from './financial-reports/financial-reports.component';
import { DocumentsComponent } from './documents/documents.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {ButtonModule} from 'primeng/button';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ShareholderComponent } from './profile/shareholder/shareholder.component';
import { LegalComponent } from './profile/legal/legal.component';
import { IndividualComponent } from './profile/individual/individual.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {InputTextModule} from 'primeng/inputtext';
import {SkeletonModule} from 'primeng/skeleton';
import { NewNoticiaComponent } from './news/new-noticia/new-noticia.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ LandingComponent,PresentationsComponent,ShareholdersRequestsComponent, OrganizationChartsComponent, FinancialReportsComponent, DocumentsComponent, NewsComponent, ProfileComponent, HomeComponent, ShareholderComponent, LegalComponent, IndividualComponent, NewNoticiaComponent,],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ComponentesModule,
    LandingRoutingModule,
    ButtonModule,
    CascadeSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    SkeletonModule,
    RouterModule
  ],
  providers :[
    MessageService
  ]
})
export class LandingModule { }
