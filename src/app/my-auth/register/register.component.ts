import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInputErrorMsgService } from '../../@core/utils/form-input-err-msg.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['../my-auth.component.scss'],
})
export class RegisterComponent implements OnInit {
    regitForm:FormGroup;

    submitted:false;

    constructor(
        private formBuilder: FormBuilder,
        public formInputErrMsgService:FormInputErrorMsgService
    ){}

    ngOnInit(){
        this.bulidRegitForm();
    }

    bulidRegitForm(){
        this.regitForm = this.formBuilder.group({
            'fullname':[null, Validators.required],
            'email':[null, Validators.required],
            'password':[null, Validators.required],
        });
    }

    register(form){}
}