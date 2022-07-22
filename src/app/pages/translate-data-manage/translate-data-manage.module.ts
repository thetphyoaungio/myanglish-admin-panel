import { NgModule } from '@angular/core';

import { TranslateDataManageComponent } from './translate-data-manage.component';
import { TranslateDataManageRoutingModule } from './translate-data-manage-routing.module';

import { TDMFormModule } from './form/form.module';
import { TDMListModule } from './list/list.module';

@NgModule({
  imports: [
    TranslateDataManageRoutingModule, 
    TDMFormModule,
    TDMListModule,
  ],
  declarations: [TranslateDataManageComponent],
})
export class TranslateDataManageModule { }