import { Injectable } from "@angular/core";

import { NbToastrService } from "@nebular/theme";

@Injectable()
export class ToastrService {
    /*
    position - ['top-end','top-right','bottom-right','top-left','bottom-left','bottom-end','top-start','bottom-start'],
    status - ['basic','primary','success','info','warning','danger','control'],
    duration - [3000, ...],
    destroyByClick - true / false,
    preventDuplicates - false /true,
    hasIcon - 
    */

    constructor(private toastrService:NbToastrService){}

    showToast(title,message, status='success',duration=2000) {
        this.toastrService.show(
            message, 
            title, 
            {status, duration, destroyByClick:true}
        );
    }

}