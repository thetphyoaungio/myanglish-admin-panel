import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SpinnerService {
    public loading = new Subject();
    
    constructor(){
        this.loading.next(false);
    }
}