import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from '@nebular/theme';

@Component({
    templateUrl:'./myanglish-word-input.component.html',
    styleUrls:['./myanglish-word-input.component.scss']
})
export class MyanglishWordInputDialogComponent implements OnInit{
    inputForm:FormGroup<any>;
    submitted:boolean|null;

    constructor(
        protected ref: NbDialogRef<MyanglishWordInputDialogComponent>,
        private fb:FormBuilder,
    ){
        this.submitted=false;
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(){
        this.inputForm = this.fb.group({
            wordmyanglish:[null, Validators.required]
        });
    }

    cancel(){
        this.submitted=false;
        this.ref.close(null);
    }

    add(formValue:any){
        //console.log('#PASSED add(...)/formValue',formValue);
        if(this.inputForm.valid){
            this.submitted=true;
            this.ref.close(formValue);
        }
    }
}