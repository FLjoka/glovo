import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComplianceRoutingModule } from './compliance-routing.module';

@NgModule({
  declarations: [
    NewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ComplianceRoutingModule,
    ComponentesModule,
    ProgressSpinnerModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    PipesModule
  ]
})
export class ComplianceModule { }
