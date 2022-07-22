import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'translate-data-management',
      loadChildren: () => import('./translate-data-manage/translate-data-manage.module')
        .then(m => m.TranslateDataManageModule),
    },
    {
      path: '',
      redirectTo: 'translate-data-management',
      pathMatch: 'full',
    },
    /* {
      path: '**',
      component: NotFoundComponent,
    }, */
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
