import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPublicRoutingModule } from './admin-public-routing.module';
import { ComplianceComponent } from './compliance/compliance.component';
import { HomeComponent } from './home/home.component';
import { CorporateComponent } from './corporate/corporate.component';
import { TrainingComponent } from './training/training.component';
import { WhistleblowerChannelComponent } from './whistleblower-channel/whistleblower-channel.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PipesModule } from '../pipes/pipes.module';
import { DetailComponent } from './whistleblower-channel/detail/detail.component';

@NgModule({
  declarations: [
    ComplianceComponent,
    CorporateComponent,
    HomeComponent,
    TrainingComponent,
    WhistleblowerChannelComponent,
    DetailComponent,

  ],
  imports: [
    CommonModule,
    AdminPublicRoutingModule,
    ProgressSpinnerModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    PipesModule
  ], 
})
export class AdminPublicModule { }
