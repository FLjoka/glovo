import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalPrivacyComponent } from './legal-privacy.component';

const routes: Routes = [
  {
    path: "",
    component: LegalPrivacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalPrivacyRoutingModule { }
