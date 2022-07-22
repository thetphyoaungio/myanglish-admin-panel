import { Injectable } from "@angular/core";

import { NbDialogService, NbDialogRef } from "@nebular/theme";
import { ConfirmDialogComponent } from "../../shared-components/dialogs/confirm/confirm.component";
import { ShowDataDialogComponent } from "../../shared-components/dialogs/show-data/show-data.component";
import { WarningDialogComponent } from "../../shared-components/dialogs/warning/warning.component";
import { MyanmarWordInputDialogComponent } from "../../shared-components/dialogs/myanmar-word-input/myanmar-word-input.component";
import { MyanglishWordInputDialogComponent } from "../../shared-components/dialogs/myanglish-word-input/myanglish-word-input.component";

@Injectable()
export class SPTDialogService {
    constructor(private nbDialogService: NbDialogService){}

    openConfirmDialog(title$:string, message$:string):NbDialogRef<any>{
        return this.nbDialogService.open(ConfirmDialogComponent, {
            context:{
                title:title$,
                message:message$
            }
        });
    }

    openShowDataDialog(title$:string, data$:string|object):NbDialogRef<any>{
        return this.nbDialogService.open(ShowDataDialogComponent, {
            context:{
                title:title$,
                data:data$
            }
        });
    }

    openWarningDialog(title$:string, data$:string|object):NbDialogRef<any>{
        return this.nbDialogService.open(WarningDialogComponent, {
            context:{
                title:title$,
                data:data$
            }, 
            closeOnBackdropClick:false,
        });
    }

    openMyanmarWordInputDialog():NbDialogRef<any>{
        return this.nbDialogService.open(MyanmarWordInputDialogComponent, {
            closeOnBackdropClick:false,
        });
    }

    openMyanglishWordInputDialog():NbDialogRef<any>{
        return this.nbDialogService.open(MyanglishWordInputDialogComponent, {
            closeOnBackdropClick:false,
        });
    }
}