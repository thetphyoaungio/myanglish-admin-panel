import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FormInputErrorMsgService } from '../../@core/utils/form-input-err-msg.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls:['../my-auth.component.scss'],
})
export class RequestPasswordComponent implements OnInit {
    requestPasswordForm:FormGroup;

    submitted:false;

    constructor(private formBuilder:FormBuilder, public formInputErrMsgService: FormInputErrorMsgService){}

    ngOnInit() {
        this.buildRequestPasswordForm();
    }
    
    buildRequestPasswordForm(){
        this.requestPasswordForm = this.formBuilder.group({
            'email':[null, Validators.required],
        });
    }

    requestPassword(form:FormGroup){
        ////console.log('# form -> ', form);
    }
}