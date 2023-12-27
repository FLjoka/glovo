import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateRoutingModule } from './corporate-routing.module';
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


@NgModule({
  declarations: [
    NewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CorporateRoutingModule,
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
export class CorporateModule { }
