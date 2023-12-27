import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { ComponentesModule } from '../componentes/componentes.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { RouterModule } from '@angular/router';
import { ComplianceComponent } from './compliance/compliance.component';
import { CorporateComponent } from './corporate/corporate.component';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './training/training.component';
import { WhistleblowerChannelComponent } from './whistleblower-channel/whistleblower-channel.component';
import { MessageService } from 'primeng/api';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  declarations: [
    PublicComponent,
    ComplianceComponent,
    CorporateComponent,
    HomeComponent,
    TrainingComponent,
    WhistleblowerChannelComponent,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ComponentesModule,
    ButtonModule,
    CascadeSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    PublicRoutingModule,
    RouterModule,
    PipesModule,
  ],
  providers: [MessageService],
})
export class PublicModule {}
