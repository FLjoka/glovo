import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalPrivacyRoutingModule } from './legal-privacy-routing.module';
import { EsComponent } from './es/es.component';
import { EnComponent } from './en/en.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { LegalPrivacyComponent } from './legal-privacy.component';


@NgModule({
  declarations: [
    EsComponent,
    EnComponent,
    LegalPrivacyComponent
  ],
  imports: [
    CommonModule,
    LegalPrivacyRoutingModule,
    ComponentesModule
  ]
})
export class LegalPrivacyModule { }
