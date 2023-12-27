import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { EnComponent } from './en/en.component';
import { TermsComponent } from './terms.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { EsComponent } from './es/es.component';


@NgModule({
  declarations: [
    EnComponent,
    TermsComponent,
    EsComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    ComponentesModule
  ],
  exports: [
    EnComponent
  ]
})
export class TermsModule { }
