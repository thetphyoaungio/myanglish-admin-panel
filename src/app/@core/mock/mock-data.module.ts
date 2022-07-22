import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { SmartTableService } from './smart-table.service';
import { SolarService } from './solar.service';
import { StatsBarService } from './stats-bar.service';
import { StatsProgressBarService } from './stats-progress-bar.service';

const SERVICES = [
  UserService,
  SmartTableService,
  SolarService,
  StatsBarService,
  StatsProgressBarService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
