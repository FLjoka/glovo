import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplianceComponent } from './compliance.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: "",
    component: ComplianceComponent,
    children: [
      {
        path: "new",
        component: NewComponent
      },
      {
        path: "edit",
        loadChildren: () => import('./edit/edit.module').then( m => m.EditModule),
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceRoutingModule { }
