import { Component, Input } from "@angular/core";
import { NbDialogRef } from '@nebular/theme';

@Component({
    templateUrl:'./warning.component.html',
    styleUrls:['./warning.component.scss']
})
export class WarningDialogComponent{
    @Input() title;
    @Input() data;

    keys:string[];

    constructor(protected ref: NbDialogRef<WarningDialogComponent>){}

    ok(){
        this.ref.close(true);
    }
}