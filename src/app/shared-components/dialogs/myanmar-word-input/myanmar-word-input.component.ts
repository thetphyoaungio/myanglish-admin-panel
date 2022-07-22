import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from '@nebular/theme';
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { UniZawgyiConverterService } from "../../../@core/utils";

@Component({
    templateUrl:'./myanmar-word-input.component.html',
    styleUrls:['./myanmar-word-input.component.scss']
})
export class MyanmarWordInputDialogComponent implements OnInit{
    inputForm:FormGroup<any>;
    submitted:boolean|null;

    private subject:Subject<any> = new Subject();

    constructor(
        protected ref: NbDialogRef<MyanmarWordInputDialogComponent>,
        private fb:FormBuilder,
        private unizgConverter:UniZawgyiConverterService,
    ){
        this.submitted=false;
    }

    ngOnInit(): void {
        this.buildForm();

        this.subject.pipe(
            debounceTime(1500)
        ).subscribe(r => {
            if(r.value.trim()!==0){
                if(r.from==='uni'){
                    const zgi = this.unizgConverter.uni2zg(r.value);
                    this.inputForm.get('wordzawgyi').setValue(zgi);
                }else if(r.from==='zgi'){
                    const uni = this.unizgConverter.zg2uni(r.value);
                    this.inputForm.get('wordunicode').setValue(uni);
                }
            }
        });
    }

    buildForm(){
        this.inputForm = this.fb.group({
            wordunicode:[null, Validators.required],
            wordzawgyi:[null, Validators.required],
        });
    }

    onKeyup(event, from=null){
        if(event.keyCode !== 32){
            this.subject.next({value:event.target.value, from: from});
        }
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