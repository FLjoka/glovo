import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';

const routes: Routes = [
  {
    path:"",
    component : EditComponent,
    children: [
      {
        path : "",
        redirectTo : "tag",
        pathMatch : "full"
      },
      {
        path: "tag",
        component : TagEditComponent
      },
      {
        path: "sections",
        loadChildren: () => import('./sections/sections.module').then( m => m.SectionsModule),
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
