import { Component, Input, OnInit } from "@angular/core";

import { NbDialogRef } from "@nebular/theme";

@Component({
    templateUrl:'./show-data.component.html',
    styleUrls:['./show-data.component.scss']
})
export class ShowDataDialogComponent implements OnInit{
    @Input() title;
    @Input() data;

    keys:string[];

    constructor(protected ref: NbDialogRef<ShowDataDialogComponent>){}

    ngOnInit(): void {
        if(this.data.length>0){
            this.keys=[];

            for(let key in this.data[0]){
                this.keys.push(key);
            }
        }else{
            this.keys=[];

            for(let key in this.data){
                this.keys.push(key);
            }
        }
    }

    ok(){
        this.ref.close(true);
    }
}