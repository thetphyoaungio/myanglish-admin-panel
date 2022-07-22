import { Injectable } from "@angular/core";

@Injectable()
export class FormInputErrorMsgService {
    showMessages={error:'', success:''};
    errors=[];
    messages=[];
}