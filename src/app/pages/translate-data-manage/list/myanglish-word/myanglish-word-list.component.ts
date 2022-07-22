import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MyanglishTranslateManageService } from "../../../../@core/services/myanglish-translate-manage.service";

import { 
    SpinnerService, 
    ToastrService,
    SPTDialogService, 
    CryptoJsService,
} from "../../../../@core/utils";

import { ButtonViewComponent } from "../../../../shared-components/tables/custom-button-view.component";
import { ContentViewComponent } from "../../../../shared-components/tables/custom-content-view.component";

@Component({
    templateUrl:'./myanglish-word-list.component.html',
    styleUrls:['../list.scss'],
})
export class MyanglishWordListComponent implements OnInit {
    page:any;
    limit:any=1000;
    sort:any;
    filters:any;
    isfilter:boolean|any;
    
    column_setting:any;

    myanglishWords:Array<any>|any;

    constructor(
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private router: Router, 
        private sptDialogService: SPTDialogService, 
        private mTMService:MyanglishTranslateManageService, 
        private cryptoService:CryptoJsService, 
    ) {
        this.page=1;
        this.sort=null;
        this.filters=[];
        this.isfilter=false;

        this.column_setting = {
            columns: {
                wordmyanglish: {
                    title: 'Myanglish',
                    type: 'text', 
                },
                content:{
                    title:'Myanmar Words',
                    type:'custom',
                    renderComponent:ContentViewComponent,
                    sort:false,
                    filterFunction(cell?:any, search?:string):boolean{
                        return (cell.myanmarWords.filter(
                            (x:any)=> x.wordunicode===search || x.wordzawgyi.includes(search))).length > 0;
                    },
                },
                action:{
                    title:'',
                    type:'custom',
                    renderComponent:ButtonViewComponent,
                    sort:false,
                    filter:false,
                }
            },
        };
    }

    ngOnInit(): void {
        /* const t = sessionStorage.getItem('nrlmglt');
        
        if(t){
            if(JSON.parse(t)){
                this.getList();
            }else{
                const d = sessionStorage.getItem('myanglist');
                if(d){
                    this.myanglishWords = [];
                    this.myanglishWords = [...(JSON.parse(this.cryptoService.decrypt(d)))];

                    (<any>this.column_setting.columns).action.onComponentInitFunction=this.onComponentInitFunction;
                }else{
                    this.getList();
                }
            }
        }else{
            this.getList();
        } */

        this.getList();
    }

    getList(){
        this.spinnerService.loading.next(true);

        this.mTMService.getAllMyanglishWord('').subscribe({
            next: v => {
                this.spinnerService.loading.next(false);

                console.log('#GOT myanglish/getList()/v',v);

                this.myanglishWords = [];
                this.myanglishWords = v.data.data.map((x:any) => ({
                    ...x,
                    content: {myanmarWords: x.myanmar},
                    action:'detail-edit-delete'
                }));

                (<any>this.column_setting.columns).action.onComponentInitFunction=this.onComponentInitFunction;
            },
            error: e => {
                this.spinnerService.loading.next(false);

                this.toastrService.showToast('ERROR!', e.error.message, 'danger', 3500);
            },
            complete:()=>{
                //sessionStorage.setItem('myanglist', this.cryptoService.encrypt(JSON.stringify(this.myanglishWords)));
                sessionStorage.removeItem('nrlmglt');
            }
        });
    }

    createNew() {
        this.router.navigate(['/pages/translate-data-management/create', 'myanglish'])
    }

    onComponentInitFunction = instance => {
        instance.action1.subscribe((row) => {
            this.router.navigate(['pages/translate-data-management/detail', 'myanglish', row.idmyanglish]);
        });

        instance.action2.subscribe(row => {
            this.router.navigate(['pages/translate-data-management/edit', 'myanglish', row.idmyanglish]);
        });

        instance.action3.subscribe(row => {
            this.sptDialogService.openConfirmDialog('CONFIRM!', 'Are you sure to delete this data?')
            .onClose.subscribe(r => {
                if(r){
                    const pl = new URLSearchParams();
                    pl.append('idmyanglish', row.idmyanglish);

                    this.spinnerService.loading.next(true);

                    this.mTMService.deleteMyanglishWord(pl).subscribe({
                        next:(v:any)=>{
                            this.spinnerService.loading.next(false);

                            if(v && v.status==='200'){
                                this.toastrService.showToast('SUCCESS!', `Delete data successfully!`);
                            }else{
                                this.toastrService.showToast('ERROR!', `${v.status} : ${v.message}`);
                            }
                        },
                        error:(e)=>{
                            this.spinnerService.loading.next(false);
                            this.toastrService.showToast('ERROR!', `${e.error.status} : ${e.error.message}`);
                        },
                        complete:()=>{
                            this.myanglishWords = [...(this.myanglishWords.filter((x:any)=>x.idmyanglish!==row.idmyanglish))]
                        }
                    });
                }
            });
        });
    }
}