import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { 
    NbCardModule, 
    NbButtonModule, 
    NbInputModule,
} from "@nebular/theme";

import { ConfirmDialogComponent } from "./confirm/confirm.component";
import { ShowDataDialogComponent } from "./show-data/show-data.component";
import { WarningDialogComponent } from "./warning/warning.component";
import { MyanmarWordInputDialogComponent } from "./myanmar-word-input/myanmar-word-input.component";
import { MyanglishWordInputDialogComponent } from "./myanglish-word-input/myanglish-word-input.component";

@NgModule({
    imports:[
        CommonModule, 
        FormsModule,ReactiveFormsModule,
        NbCardModule, 
        NbButtonModule,
        NbInputModule,
    ],
    declarations:[
        ConfirmDialogComponent, 
        ShowDataDialogComponent,
        WarningDialogComponent,
        MyanmarWordInputDialogComponent,
        MyanglishWordInputDialogComponent,
    ],
    exports:[
        ConfirmDialogComponent, 
        ShowDataDialogComponent,
        WarningDialogComponent,
        MyanmarWordInputDialogComponent,
        MyanglishWordInputDialogComponent,
    ],
})
export class SPTDialogsModule{}