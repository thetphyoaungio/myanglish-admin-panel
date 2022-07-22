import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  NbAccordionModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';

import { TDMCreateFormComponent } from './create/create-form.component';
import { TDMDetailEditFormComponent } from "./detail-edit/detail-edit-form.component";

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule, 
        ThemeModule, 
        NbCardModule,
        NbButtonModule,
        NbAutocompleteModule, 
        NbAccordionModule,
        NbInputModule,
    ], 
    declarations:[
        TDMCreateFormComponent, 
        TDMDetailEditFormComponent, 
    ],
})
export class TDMFormModule {}