import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { 
    SpinnerService, 
    SPTDialogService,
    ToastrService,
} from "../../../../@core/utils";

import { MyanglishTranslateManageService } from "../../../../@core/services/myanglish-translate-manage.service";

@Component({
    templateUrl:'./detail-edit-form.component.html',
    styleUrls:['../form.scss']
})
export class TDMDetailEditFormComponent implements OnInit {
    mtmId:any;
    componentTarget:string|null;
    processTarget:string|null;
    title:string|null;

    detail:any;

    //edit-data
    editForm: FormGroup<any>|null;
    private subject:Subject<any> = new Subject();
    submitted: boolean|null;

    constructor(
        private spinnerService:SpinnerService,
        private toastrService:ToastrService,
        private sptDialogService:SPTDialogService,
        private mtmServices: MyanglishTranslateManageService,
        private router:Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ){
        this.submitted = false;
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.mtmId = params.id;
            this.componentTarget = params.compTarget;
            this.processTarget = window.location.pathname.split('/')[3];

            console.log('#GOT this.mtmId', this.mtmId);
            console.log('#GOT this.componentTarget', this.componentTarget);
            console.log('#GOT this.processTarget', this.processTarget);

            this.title = `${this.processTarget.toUpperCase()} INFO`;

            if(this.componentTarget==='myanglish'){
                this.buildFormMyanglish();
            }else{
                this.buildFormMyanmar();
            }

            setTimeout(() => {
                this.getDetail();
            }, 50);
        });

        this.subject.pipe(
            debounceTime(1500)
        ).subscribe((r:any)=>{
            console.log('#debounce value', r);

        });
    }

    getDetail(){
        const pl = new URLSearchParams();
        pl.append((this.componentTarget==='myanglish'?'idmyanglish':'idmyanmarword'), this.mtmId);

        const service = this.componentTarget==='myanglish'?
        this.mtmServices.getMyanglishDetail(pl):this.mtmServices.getMyanmarDetail(pl);

        this.spinnerService.loading.next(true);

        service.subscribe({
            next:(v:any)=>{
                this.spinnerService.loading.next(false);
                console.log(`#GOT ${this.componentTarget}/ getDetail()/v`,v);

                if(v && v.status==='200'){
                    this.detail = {...v.data[0]};
                }else{
                    this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                }
            },
            error:(e) => {
                this.spinnerService.loading.next(false);
                this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
            },
            complete:()=>{
                if(this.processTarget==='edit'){
                    if(this.componentTarget==='myanglish'){
                        this.editForm.patchValue({
                            myanglish: this.detail.wordmyanglish
                        });

                        this.myanmar.clear();
                        
                        this.detail.myanmar.forEach((el,i) => {
                            this.addNewMyanmarWord();

                            setTimeout(() => {
                                this.myanmar.controls[i].get('wordunicode').setValue(el.wordunicode);
                                this.myanmar.controls[i].get('wordzawgyi').setValue(el.wordzawgyi);
                                this.myanmar.controls[i].get('idmyanmarword').setValue(el.idmyanmarword);
                                this.myanmar.controls[i].get('joinid').setValue(el.joinid);
                                this.myanmar.controls[i].get('isDetailData').setValue(true);
                            }, 20);
                        });

                    }else if(this.componentTarget==='myanmar'){
                        this.myanglish.clear();
                        this.myanmar.clear();

                        this.addNewMyanmarWord();
                        this.myanmar.controls[0].get('wordunicode').setValue(this.detail.wordunicode);
                        this.myanmar.controls[0].get('wordzawgyi').setValue(this.detail.wordzawgyi);
                        
                        this.detail.myanglish.forEach((el,i) => {
                            this.addNewMyanglishWord();

                            setTimeout(() => {
                                this.myanglish.controls[i].get('wordmyanglish').setValue(el.wordmyanglish);
                                this.myanglish.controls[i].get('idmyanglish').setValue(el.idmyanglish);
                                this.myanglish.controls[i].get('joinid').setValue(el.joinid);
                                this.myanglish.controls[i].get('isDetailData').setValue(true);
                            }, 20);
                        });
                    }
                }
            }
        });
    }
    
    //** For Myanglish Word
    buildFormMyanglish(){
        this.editForm = this.fb.group({
            myanglish:[null, Validators.required],
            myanmar: this.fb.array([])
        });
    }
    get myanmar():FormArray{
        return this.editForm.get('myanmar') as FormArray;
    }
    newMyanmarWord():FormGroup{
        return this.fb.group({
            wordunicode: ['', Validators.required],
            wordzawgyi: ['', Validators.required],
            idmyanmarword:[],
            joinid:[],
            isDetailData:[false]
        });
    }
    addNewMyanmarWord(){
        this.myanmar.push(this.newMyanmarWord());
    }
    onUpdateMyanglishWordOnly(formValue:any){
        console.log('##PASSED onUpdateData(...)/formValue',formValue);

        if(this.editForm.valid){
            this.submitted = true;

            //call "Update Myanglish Word" api 10

            const pl = new URLSearchParams();
            pl.append('idmyanglish', this.mtmId);
            pl.append('wordmyanglish', formValue.myanglish);

            this.spinnerService.loading.next(true);

            this.mtmServices.updateMyanglishWord(pl).subscribe({
                next:(v:any)=>{
                    this.spinnerService.loading.next(false);

                    if(v && v.status==='200'){
                        this.toastrService.showToast("SUCCESS!", `Updated for Myanglish Word Successfully!`);
                    }else{
                        this.toastrService.showToast("ERROR!", `${v.status} : ${v.message}`);
                    }
                },
                error:(e)=>{
                    this.spinnerService.loading.next(false);
                    this.toastrService.showToast("ERROR!", `${e.error.status} : ${e.error.message}`);
                },
                complete:()=>{
                    this.getDetail();
                    this.submitted = false;
                }
            });
        }else{
            this.toastrService.showToast('WARNING!', 'Your input data is invalid!', 'warning');
        }
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
                    this.myanmar.controls[this.myanmar.length-1].get('isDetailData').setValue(false);
                }, 10);
            }
        });
    }
    deleteMyanmarWord(idx, data){
        /* console.log('#in deleteMyanmarWord(..)/PASSED idx', idx);
        console.log('#in deleteMyanmarWord(..)/PASSED data', data);
        console.log('#in deleteMyanmarWord(..)/data.controls["joinid"].value',data.controls["joinid"].value); */

        this.sptDialogService.openConfirmDialog('CONFIRM!','Are you sure to delete this Myanmar Word?')
        .onClose.subscribe(v => {
            if(v){
                //call 'Remove by join id' api 17
                const pl = new URLSearchParams();
                pl.append('id', data.controls['joinid'].value);

                this.spinnerService.loading.next(true);

                this.mtmServices.removeByJoinId(pl).subscribe({
                    next:(v:any) => {
                        this.spinnerService.loading.next(false);
                        if(v && v.status==='200'){
                            this.toastrService.showToast('SUCCESS!', `Deleted Myanmar Word Successfully!`);
                            
                        }else{
                            this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                        }
                    },
                    error: (e) => {
                        this.spinnerService.loading.next(false);
                        this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
                    },
                    complete:()=>{this.myanmar.removeAt(idx);}
                });
            }
        });
    }
    updateMyanmarWord(idx, data){
        //call 'Update Myanmar Word' api 9
        console.log('#in updateMyanmarWord(..)/PASSED data', data);

        const pl = new URLSearchParams();
        pl.append('idmyanmarword', data.controls['idmyanmarword'].value);
        pl.append('wordunicode', data.controls['wordunicode'].value);
        pl.append('wordzawgyi', data.controls['wordzawgyi'].value);

        this.spinnerService.loading.next(true);

        this.mtmServices.updateMyanmarWord(pl).subscribe({
            next:(v:any) => {
                this.spinnerService.loading.next(false);

                if(v && v.status==='200'){
                    this.toastrService.showToast('SUCCESS!', `Updated Myanmar Word Successfully!`);
                }else{
                    this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                }
            },
            error: (e) => {
                this.spinnerService.loading.next(false);
                this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
            },
            complete:()=>{
                this.getDetail();
            }
        });
    }
    removeMyanmarWord(i:number){
        //console.log('#PASSED i', i);
        this.myanmar.removeAt(i);
    }
    saveMyanmarWord(newMyanmarWord:any){
        if(newMyanmarWord.controls['wordunicode'].value && newMyanmarWord.controls['wordzawgyi'].value){
            //call 'Add new for myanglish' api 15
            const _myanmar = [{
                wordunicode:newMyanmarWord.controls['wordunicode'].value,
                wordzawgyi:newMyanmarWord.controls['wordzawgyi'].value
            }];

            const pl = new URLSearchParams();
            pl.append('idmyanglish', this.mtmId);
            pl.append('myanmar', JSON.stringify(_myanmar));

            this.spinnerService.loading.next(true);

            this.mtmServices.addNewMyanglishWord(pl).subscribe({
                next: (v)=>{
                    this.spinnerService.loading.next(false);
                    if(v && v.status==='200'){
                        this.toastrService.showToast('SUCCESS!', 
                        `Added New Myanmar Word of \"${this.detail.wordmyanglish}\" Successfully!`);
                    }else{
                        this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                    }
                },
                error:(e)=>{
                    this.spinnerService.loading.next(false);
                    this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
                },
                complete:()=>{
                    this.getDetail();
                }
            });
        }
    }
    

    //** For Myanmar Word
    buildFormMyanmar(){
        this.editForm = this.fb.group({
            myanmar:this.fb.array([], Validators.required),
            myanglish:this.fb.array([], Validators.required)
        });
    }
    get myanglish():FormArray{
        return this.editForm.get('myanglish') as FormArray;
    }
    newMyanglishWord():FormGroup{
        return this.fb.group({
            wordmyanglish: ['', Validators.required],
            idmyanglish:[],
            joinid:[],
            isDetailData:[false]
        });
    }
    addNewMyanglishWord(){
        this.myanglish.push(this.newMyanglishWord());
    }
    onUpdateMyanmarWordOnly(formValue:any){
        console.log('##PASSED onUpdateData(...)/formValue',formValue);

        if(this.editForm.valid){
            this.submitted = true;

            //call "Update Myanmar Word" api 9

            const pl = new URLSearchParams();
            pl.append('idmyanmarword', this.mtmId);
            pl.append('wordunicode', formValue.myanmar[0].wordunicode);
            pl.append('wordzawgyi', formValue.myanmar[0].wordzawgyi);

            this.spinnerService.loading.next(true);

            this.mtmServices.updateMyanmarWord(pl).subscribe({
                next:(v:any)=>{
                    this.spinnerService.loading.next(false);

                    if(v && v.status==='200'){
                        this.toastrService.showToast("SUCCESS!", `Updated for Myanmar Word Successfully!`);
                    }else{
                        this.toastrService.showToast("ERROR!", `${v.status} : ${v.message}`);
                    }
                },
                error:(e)=>{
                    this.spinnerService.loading.next(false);
                    this.toastrService.showToast("ERROR!", `${e.error.status} : ${e.error.message}`);
                },
                complete:()=>{
                    this.getDetail();
                    this.submitted = false;
                }
            });
        }else{
            this.toastrService.showToast('WARNING!', 'Your input data is invalid!', 'warning');
        }
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
    deleteMyanglishWord(idx:any, /* myanglish.controls[idx] */data:any){
        this.sptDialogService.openConfirmDialog('CONFIRM!','Are you sure to delete this Myanglish Word?')
        .onClose.subscribe(v => {
            if(v){
                //call 'Remove by join id' api 17
                const pl = new URLSearchParams();
                pl.append('id', data.controls['joinid'].value);

                this.spinnerService.loading.next(true);

                this.mtmServices.removeByJoinId(pl).subscribe({
                    next:(v:any) => {
                        this.spinnerService.loading.next(false);

                        if(v && v.status==='200'){
                            this.toastrService.showToast('SUCCESS!', `Deleted Myanglish Word Successfully!`);
                            
                        }else{
                            this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                        }
                    },
                    error: (e) => {
                        this.spinnerService.loading.next(false);
                        this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
                    },
                    complete:()=>{this.myanglish.removeAt(idx);}
                });
            }
        });
    }
    updateMyanglishWord(idx:any, /* myanglish.controls[idx] */data:any){
        //call 'Update Myanglish Word' api 10
        console.log('#in updateMyanglishWord(..)/PASSED data', data);

        const pl = new URLSearchParams();
        pl.append('idmyanglish', data.controls['idmyanglish'].value);
        pl.append('wordmyanglish', data.controls['wordmyanglish'].value);

        this.spinnerService.loading.next(true);

        this.mtmServices.updateMyanglishWord(pl).subscribe({
            next:(v:any) => {
                this.spinnerService.loading.next(false);

                if(v && v.status==='200'){
                    this.toastrService.showToast('SUCCESS!', `Updated Myanglish Word Successfully!`);
                }else{
                    this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                }
            },
            error: (e) => {
                this.spinnerService.loading.next(false);
                this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
            },
            complete:()=>{
                this.getDetail();
            }
        });
    }
    removeMyanglishWord(idx:any){
        this.myanglish.removeAt(idx);
    } 
    saveMyanglishWord(/* myanglish.controls[idx] */data:any){
        if(data.controls['wordmyanglish'].value){
            //call 'Add new for myanmar' api 16
            const _myanglish = [{
                wordmyanglish:data.controls['wordmyanglish'].value
            }];

            const pl = new URLSearchParams();
            pl.append('idmyanmarword', this.mtmId);
            pl.append('myanglish', JSON.stringify(_myanglish));

            this.spinnerService.loading.next(true);

            this.mtmServices.addNewMyanmarWord(pl).subscribe({
                next: (v)=>{
                    this.spinnerService.loading.next(false);
                    if(v && v.status==='200'){
                        this.toastrService.showToast('SUCCESS!', 
                        `Added New Myanglish Word Successfully!`);
                    }else{
                        this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                    }
                },
                error:(e)=>{
                    this.spinnerService.loading.next(false);
                    this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
                },
                complete:()=>{
                    this.getDetail();
                }
            });
        }
    }

    // common methods
    onKeyup(event){
        if(event.keyCode !== 32){
            this.subject.next(event.target.value);
        }
    }

    gotoListWithNoNeedReload(){
        sessionStorage.setItem((this.componentTarget==='myanglish'?'nrlmglt':'nrlmlt'),  JSON.stringify(false));
        this.router.navigate([(this.componentTarget==='myanglish'?
        'pages/translate-data-management':'pages/translate-data-management/myanmar-words')]);
    }

    handleKeyupEnter(event) {
        if(event.code=="Enter") event.preventDefault();
    }
}