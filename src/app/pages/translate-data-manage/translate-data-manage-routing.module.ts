import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateDataManageComponent } from './translate-data-manage.component';
import { MyanglishWordListComponent } from './list/myanglish-word/myanglish-word-list.component';
import { MyanmarWordListComponent } from './list/myanmar-word/myanmar-word-list.component';
import { TDMCreateFormComponent } from './form/create/create-form.component';
import { TDMDetailEditFormComponent } from './form/detail-edit/detail-edit-form.component';

const routes: Routes = [{
  path:'',
  component:TranslateDataManageComponent,
  children:[
    {
      path:'create/:target',
      component:TDMCreateFormComponent
    },
    {
      path:'detail/:compTarget/:id',
      component:TDMDetailEditFormComponent
    },
    {
      path:'edit/:compTarget/:id',
      component:TDMDetailEditFormComponent
    },
    {
      path:'myanglish-words',
      component: MyanglishWordListComponent
    },
    {
      path:'myanmar-words',
      component: MyanmarWordListComponent
    },
    {
      path:'',
      redirectTo:'myanglish-words',
      pathMatch:'full'
    },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class TranslateDataManageRoutingModule {
}
