import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FormInputErrorMsgService } from '../../@core/utils/form-input-err-msg.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls:['../my-auth.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm:FormGroup;

    submitted:false;

    constructor(private formBuilder:FormBuilder, public formInputErrMsgService: FormInputErrorMsgService){} 

    ngOnInit() {
        this.buildResetPasswordForm();
    }
    
    buildResetPasswordForm(){
        this.resetPasswordForm = this.formBuilder.group({
            'password':[null, Validators.required],
            'confirmPassword':[null, Validators.required],
            'email':[null],
        });
    }

    reset(form:FormGroup){
        ////console.log('# form -> ', form);
    }
}