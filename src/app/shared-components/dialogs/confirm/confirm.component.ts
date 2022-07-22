import { Component, Input } from "@angular/core";
import { NbDialogRef } from '@nebular/theme';

@Component({
    templateUrl:'./confirm.component.html',
    styleUrls:['./confirm.component.scss']
})
export class ConfirmDialogComponent{
    @Input() title:any;
    @Input() message:any;

    constructor(protected ref: NbDialogRef<ConfirmDialogComponent>){}

    cancel(){
        this.ref.close(false);
    }

    ok(){
        this.ref.close(true);
    }
}