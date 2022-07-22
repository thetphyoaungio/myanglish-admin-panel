import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAuthService } from './my-auth.service';
import { MyanglishTranslateManageService } from './myanglish-translate-manage.service';

const SERVICES = [
    MyAuthService, 
    MyanglishTranslateManageService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MyServicesModule {
  static forRoot(): ModuleWithProviders<MyServicesModule> {
    return {
      ngModule: MyServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
