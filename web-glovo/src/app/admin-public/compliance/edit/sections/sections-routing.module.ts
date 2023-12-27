import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSectionComponent } from './edit-section/edit-section.component';
import { NewSectionComponent } from './new-section/new-section.component';
import { SectionsComponent } from './sections.component';

const routes: Routes = [
  {
    path:"",
    component: SectionsComponent,
    children : [
      {
        path : "new",
        component : NewSectionComponent
      },
      {
        path : "edit",
        component : EditSectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
