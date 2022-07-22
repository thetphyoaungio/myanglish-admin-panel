import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';

import {
  NbButtonModule,
  NbCardModule,
  NbListModule,
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';

import { MyanTransTablesModule } from '../../../shared-components/tables/tables.module';

import { MyanglishWordListComponent } from "./myanglish-word/myanglish-word-list.component";
import { MyanmarWordListComponent } from "./myanmar-word/myanmar-word-list.component";

@NgModule({
    imports:[
        CommonModule, 
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbListModule,
        MyanTransTablesModule, 
    ],
    declarations:[
        MyanglishWordListComponent, 
        MyanmarWordListComponent,
    ],
})
export class TDMListModule {}