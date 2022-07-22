import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  LayoutService,
  StateService,
  AuthInterceptor, 
  LocalStoresServices,
  SpinnerService,
  SPTDialogService,
  ToastrService, 
  FormInputErrorMsgService, 
  CryptoJsService, 
  UniZawgyiConverterService,
} from './utils';
import { UserData } from './data/users';
import { SmartTableData } from './data/smart-table';
import { SolarData } from './data/solar';
import { StatsBarData } from './data/stats-bar';
import { StatsProgressBarData } from './data/stats-progress-bar';
import { UserService } from './mock/users.service';
import { SmartTableService } from './mock/smart-table.service';
import { SolarService } from './mock/solar.service';
import { StatsBarService } from './mock/stats-bar.service';
import { StatsProgressBarService } from './mock/stats-progress-bar.service';
import { MockDataModule } from './mock/mock-data.module';

import { MyServicesModule } from './services/services.module';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: SmartTableData, useClass: SmartTableService },
  { provide: SolarData, useClass: SolarService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...MyServicesModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  LayoutService,
  StateService,
  AuthInterceptor, 
  LocalStoresServices,
  SpinnerService,
  SPTDialogService,
  ToastrService, 
  FormInputErrorMsgService, 
  CryptoJsService,
  UniZawgyiConverterService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
