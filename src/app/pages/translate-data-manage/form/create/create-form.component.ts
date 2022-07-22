import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { 
    SpinnerService, 
    ToastrService,
    SPTDialogService,
    UniZawgyiConverterService, 
} from "../../../../@core/utils";

import { MyanglishTranslateManageService } from "../../../../@core/services/myanglish-translate-manage.service";

const mockExistingMyanmarWords = [
    {
        idmyamarword: 1,
        wordunicode: 'က',
        wordzawgyi: 'က',
        joinid: 396
    },
    {
        idmyamarword: 2,
        wordunicode: 'စာ',
        wordzawgyi: 'စာ',
        joinid: 939
    },
    {
        idmyamarword: 3,
        wordunicode: 'ဇလွန်ဈေး',
        wordzawgyi: 'ဇလြန္ေဈး',
        joinid: 254
    }
];

@Component({
    templateUrl:'./create-form.component.html',
    styleUrls:['../form.scss']
})
export class TDMCreateFormComponent implements OnInit {
    componentTarget:string|null;
    createForm: FormGroup<any>|null;
    private subject:Subject<any> = new Subject();
    submitted: boolean|null;

    isExistResultWords = false;
    existingResultWords:Array<any>|null;
    existWordId:number|null;

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private fb: FormBuilder,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private mtmServices:MyanglishTranslateManageService,
        private sptDialogService:SPTDialogService, 
        private uniZawgyiConverter:UniZawgyiConverterService, 
    ){
        this.route.params.subscribe(params => {
            console.log('#params', params);
            this.componentTarget = params.target;
            console.log('#GOT this.componentTarget', this.componentTarget);
        });

        this.submitted = false;
        this.existingResultWords = [];
    }

    ngOnInit(): void {
        if(this.componentTarget==='myanglish'){
            this.buildFormMyanglish();
        }else{
            this.buildFormMyanmar();
            this.addNewMyanglishWord();
        }

        this.addNewMyanmarWord();

        this.subject.pipe(
            debounceTime(1500)
        ).subscribe((r:any)=>{
            console.log('#debounce value', r.value);
            console.log('#debounce unizawgyiData', r.unizawgyiData);
            console.log('#this.componentTarget', this.componentTarget);
            
            if(r.value.trim().length !== 0){
                if(this.componentTarget==='myanglish' && !r.unizawgyiData){
                    this.getExistingResultWords(this.componentTarget, r.value);
                }else if(this.componentTarget==='myanmar'){
                    this.getExistingResultWords(this.componentTarget, r.value);
                }

                if(r.unizawgyiData){
                    this.setUniZawgyi(r.value, r.unizawgyiData.from, r.unizawgyiData.to);
                }

            }else{
                if(r.unizawgyiData){
                    this.removeUniZgConvertedValue(r.unizawgyiData.from, r.unizawgyiData.to);
                }
            }
        });
    }

    //Myanglish Create methods
    buildFormMyanglish(){
        this.createForm = this.fb.group({
            myanglish:[null, Validators.required],
            myanmar: this.fb.array([])
        });
    }

    get myanmar():FormArray{
        return this.createForm.get('myanmar') as FormArray;
    }

    newMyanmarWord():FormGroup{
        return this.fb.group({
            wordunicode: ['', Validators.required],
            wordzawgyi: ['', Validators.required]
        });
    }

    addNewMyanmarWord(){
        this.myanmar.push(this.newMyanmarWord());
    }
    removeMyanmarWord(i:number){
        this.myanmar.removeAt(i);
    }
    addNewMyanmarWordByDialog(){
        this.sptDialogService.openMyanmarWordInputDialog()
        .onClose.subscribe(v=>{
            console.log('#openMyanmarWordInputDialog, onClose.subscribe/v',v);

            if(v){
                this.addNewMyanmarWord();
                setTimeout(() => {
                    this.myanmar.controls[this.myanmar.length-1].get('wordunicode').setValue(v.wordunicode);
                    this.myanmar.controls[this.myanmar.length-1].get('wordzawgyi').setValue(v.wordzawgyi);
                }, 10);
            }
        });
    }

    //Myanmar Create methods
    buildFormMyanmar(){
        this.createForm = this.fb.group({
            myanmar:this.fb.array([], Validators.required),//[null, Validators.required],
            myanglish:this.fb.array([], Validators.required)
        });
    }
    get myanglish():FormArray{
        return this.createForm.get('myanglish') as FormArray;
    }

    newMyanglishWord():FormGroup{
        return this.fb.group({
            wordmyanglish: ['', Validators.required]
        });
    }

    addNewMyanglishWord(){
        this.myanglish.push(this.newMyanglishWord());
    }
    removeMyanglishWord(i:number){
        this.myanglish.removeAt(i);
    }
    addNewMyanglishWordByDialog(){
        this.sptDialogService.openMyanglishWordInputDialog()
        .onClose.subscribe(v=>{
            console.log('#openMyanglishWordInputDialog, onClose.subscribe/v',v);

            if(v){
                this.addNewMyanglishWord();
                setTimeout(() => {
                    this.myanglish.controls[this.myanglish.length-1].get('wordmyanglish').setValue(v.wordmyanglish);
                }, 10);
            }
        });
    }

    gotoList(){
        this.router.navigate([`pages/${this.componentTarget==='myanglish'?
        'translate-data-management':'translate-data-management/myanmar-words'}`]);
    }

    onKeyup(event, unizawgyiData=null){
        if(event.keyCode !== 32){
            this.subject.next({value:event.target.value, unizawgyiData: unizawgyiData});
        }
    }

    onCloseShowingResultWords(){
        this.resetExistingWordData();
    }

    handleKeyupEnter(event) {
        if(event.code=="Enter") event.preventDefault();
    }

    onSaveTranslateData(formValue:any){
        console.log('##PASSED onSaveTranslateData(...)/formValue',formValue);

        if(this.createForm.valid){
            this.submitted = true;

            let pl, service;

            if(this.existWordId){
                pl = new URLSearchParams();
                
                if(this.componentTarget==='myanglish'){
                    pl.append("idmyanglish", this.existWordId.toString());
                    pl.append("myanmar", JSON.stringify(formValue.myanmar));
                    service = this.mtmServices.addNewMyanglishWord(pl);

                }else if(this.componentTarget==='myanmar'){
                    pl.append("idmyanmarword", this.existWordId.toString());
                    pl.append("myanglish", JSON.stringify(formValue.myanglish));
                    service = this.mtmServices.addNewMyanmarWord(pl);
                }
            }else{
                pl = new URLSearchParams();

                if(this.componentTarget==='myanglish'){
                    pl.append("myanglish", formValue.myanglish);
                    pl.append("myanmar", JSON.stringify(formValue.myanmar));
    
                    service = this.mtmServices.createMyanglishWord(pl);

                }else if(this.componentTarget==='myanmar'){
                    pl.append("myanmar", JSON.stringify(formValue.myanmar[0]));
                    pl.append("myanglish", JSON.stringify(formValue.myanglish));
                    
                    service = this.mtmServices.createMyanmarWord(pl);
                }
            }

            this.spinnerService.loading.next(true);

            service.subscribe({
                next: (v) => {
                  this.spinnerService.loading.next(false);
  
                  if (v && v.status === "200") {
                    if(this.existWordId){
                        this.toastrService.showToast(
                            "SUCCESS!",
                            "Added New Myanglish-Myanmmar(s) Data Successfully!",
                            "success"
                        );
                    }else{
                        this.toastrService.showToast(
                            "SUCCESS!",
                            "Created Myanglish-Myanmmar(s) Data Successfully!",
                            "success"
                        );
                    }
                  } else {
                    this.toastrService.showToast(
                      "ERROR!",
                      `${v.status} : ${v.message}`,
                      "danger"
                    );
                  }
                },
                error: (e) => {
                  this.spinnerService.loading.next(false);
                  this.toastrService.showToast(
                    "ERROR!",
                    `${e.error.status} : ${e.error.message}`,
                    "danger"
                  );
                },
                complete:()=>{
                  this.resetExistingWordData();

                  sessionStorage.setItem((this.componentTarget==='myanglish'?'nrlmglt':'nrlmlt'),  JSON.stringify(true));

                  this.gotoList();
                }
            });

        }else{
            this.toastrService.showToast('WARNING!', 'Your input data is invalid!', 'warning');
        }
    }

    resetExistingWordData(){
        this.isExistResultWords = false;
        this.existingResultWords = [];
        this.existWordId=null;
    }

    setExistingWordData(data:any){
        this.isExistResultWords = true;
        //this.existingTranslatedWords = [...data];
        //this.existWordId= ---;
    }

    onCancel(){
        sessionStorage.setItem((this.componentTarget==='myanglish'?'nrlmglt':'nrlmlt'),  JSON.stringify(false));
        this.gotoList();
    }

    getExistingResultWords(_from:string, _stringToChange:string){
        const pl = new URLSearchParams();
        pl.append('from', _from);
        pl.append('stringtochange', _stringToChange);

        this.spinnerService.loading.next(true);
        
        this.mtmServices.getResultWords(pl).subscribe({
            next:(v)=>{
                this.spinnerService.loading.next(false);
                
                console.log('#GOT getExistingResultWords(...)/v',v);

                if(v && v.status==='200'){
                    if(this.componentTarget==='myanglish'){
                        this.existingResultWords = [...v.data.myanmar];
                    }else if(this.componentTarget==='myanmar'){
                        this.existingResultWords = [...v.data.myanglish];
                    }

                    this.isExistResultWords = this.existingResultWords.length>0;
                    
                }else{
                    if(v.status!=='404') this.toastrService.showToast('ERROR!',`${v.status} : ${v.message}`);
                }
                
            },
            error:(e)=>{
                this.spinnerService.loading.next(false);
                this.toastrService.showToast('ERROR!',`${e.error.status} : ${e.error.message}`);
            },
        });
    }

    setUniZawgyi(value:string, from:string, to:string){
        if(from==='unicode'){
            const zawgyi = this.uniZawgyiConverter.uni2zg(value);
            /* const el = <HTMLElement>document.querySelector(`#${to}`);
            console.log('#*GOT el',el);
            
            el.innerText = zawgyi; */

            this.myanmar.controls[to].get('wordzawgyi').setValue(zawgyi);
        }else if(from==='zawgyi'){
            const uni = this.uniZawgyiConverter.zg2uni(value);
            /* const el = <HTMLElement>document.querySelector(`#${to}`);
            console.log('#*GOT el',el);

            el.innerText = uni; */

            this.myanmar.controls[to].get('wordunicode').setValue(uni);
        }
    }

    removeUniZgConvertedValue(from:string, to:string){
        if(from==='unicode'){
            if(this.myanmar.controls[to].get('wordzawgyi').value){
                this.myanmar.controls[to].get('wordzawgyi').setValue(null);
            }
        }else if(from==='zawgyi'){
            if(this.myanmar.controls[to].get('wordunicode').value){
                this.myanmar.controls[to].get('wordunicode').setValue(null);
            }
        }
    }
}