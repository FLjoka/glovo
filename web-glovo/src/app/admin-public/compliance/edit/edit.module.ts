import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditSectionComponent } from './sections/edit-section/edit-section.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { SectionsComponent } from './sections/sections.component';


@NgModule({
  declarations: [
    TagEditComponent,
    SectionsComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
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
export class EditModule { }
