import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { 
    NbCardModule, 
    NbIconModule, 
    NbInputModule, 
    NbTreeGridModule, 
    NbDatepickerModule, 
    NbButtonModule, 
    NbCheckboxModule, 
} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SmartTableComponent } from "./smart-table/smart-table.component";
import { SPTCustomDateFilterComponent } from "./custom-date-filter.component";
import { ButtonViewComponent } from './custom-button-view.component';
import { ContentViewComponent } from "./custom-content-view.component";
import { CheckBoxViewComponent } from "./custom-checkbox-view.component";
import { MyanglishContentViewComponent } from "./myanglish-content-view.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        NbCardModule, 
        NbIconModule, 
        NbInputModule, 
        NbTreeGridModule,
        Ng2SmartTableModule,
        NbDatepickerModule,
        NbButtonModule, 
        NbCheckboxModule, 
    ],
    exports:[
        SmartTableComponent,
        SPTCustomDateFilterComponent,
        ButtonViewComponent,
        ContentViewComponent,
        CheckBoxViewComponent,
        MyanglishContentViewComponent,
    ],
    declarations:[
        SmartTableComponent,
        SPTCustomDateFilterComponent,
        ButtonViewComponent,
        ContentViewComponent,
        CheckBoxViewComponent,
        MyanglishContentViewComponent,
    ],
})
export class MyanTransTablesModule{}