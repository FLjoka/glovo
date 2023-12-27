import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { NewSectionComponent } from './new-section/new-section.component';
import { EditSectionComponent } from './edit-section/edit-section.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [    NewSectionComponent,
    EditSectionComponent,],
  imports: [
    CommonModule,
    SectionsRoutingModule,
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
export class SectionsModule { }
