import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MyanglishTranslateManageService } from "../../../../@core/services/myanglish-translate-manage.service";

import { 
    SpinnerService, 
    ToastrService, 
    SPTDialogService, 
    CryptoJsService, 
} from "../../../../@core/utils";

import { ContentViewComponent } from "../../../../shared-components/tables/custom-content-view.component";
import { MyanglishContentViewComponent } from "../../../../shared-components/tables/myanglish-content-view.component";
import { ButtonViewComponent } from "../../../../shared-components/tables/custom-button-view.component";

@Component({
    templateUrl:'./myanmar-word-list.component.html',
    styleUrls:['../list.scss'],
})
export class MyanmarWordListComponent implements OnInit {
    page:any;
    limit:any=1000;
    sort:any;
    filters:any;
    isfilter:boolean|any;
    
    column_setting:any;
    
    myanmarWords:Array<any>|any;

    constructor(
        private spinnerService:SpinnerService,
        private toastrService:ToastrService,
        private sptDialogService:SPTDialogService,
        private mTMService:MyanglishTranslateManageService, 
        private router:Router,
        private cryptoService: CryptoJsService,
    ) {
        this.page=1;
        this.sort=null;
        this.filters=[];
        this.isfilter=false;

        this.column_setting = {
            columns: {
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
                myanglishContentView: {
                    title:'Myanglish',
                    type:'custom',
                    renderComponent:MyanglishContentViewComponent,
                    sort:false,
                    filterFunction(cell?:any, search?:string):boolean{
                        return cell.myanglishWords.filter((x:any)=>x.wordmyanglish.includes(search)).length > 0;
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
        /* const t = sessionStorage.getItem('nrlmlt');
        
        if(t){
            if(JSON.parse(t)){
                this.getList();
            }else{
                const d = sessionStorage.getItem('myanlist');
                if(d){
                    this.myanmarWords = [];
                    this.myanmarWords = [...(JSON.parse(this.cryptoService.decrypt(d)))];

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

        this.mTMService.getAllMyanmarWord('').subscribe({
            next: v => {
                this.spinnerService.loading.next(false);

                console.log('#GOT myanmar/getList()/v',v);

                this.myanmarWords = [];
                this.myanmarWords = v.data.data.map((x:any) => ({
                    ...x,
                    content: {
                        myanmarWords: [{wordunicode:x.wordunicode, wordzawgyi:x.wordzawgyi}],
                    },
                    myanglishContentView:{myanglishWords: x.myanglish},
                    action:'detail-edit-delete'
                }));

                (<any>this.column_setting.columns).action.onComponentInitFunction=this.onComponentInitFunction;
            },
            error: e => {
                this.spinnerService.loading.next(false);

                this.toastrService.showToast('ERROR!', e.error.message, 'danger', 3500);
            },
            complete:()=>{
                //sessionStorage.setItem('myanlist', this.cryptoService.encrypt(JSON.stringify(this.myanmarWords)));
                sessionStorage.removeItem('nrlmlt');
            }
        });
    }

    createNew() {
        this.router.navigate(['pages/translate-data-management/create', 'myanmar']);
    }

    onComponentInitFunction = instance => {
        instance.action1.subscribe((row) => {
            //console.log('detail/row',row);
            
            this.router.navigate(['pages/translate-data-management/detail', 'myanmar', row.idmyanmarword]);
        });

        instance.action2.subscribe(row => {
            //console.log('edit/row',row);
            
            this.router.navigate(['pages/translate-data-management/edit', 'myanmar', row.idmyanmarword]);
        });

        instance.action3.subscribe(row => {
            console.log('delete/row',row);
            
            this.sptDialogService.openConfirmDialog('CONFIRM!', 'Are you sure to delete this data?')
            .onClose.subscribe(r => {
                if(r){
                    const pl = new URLSearchParams();
                    pl.append('idmyanmarword', row.idmyanmarword);

                    this.spinnerService.loading.next(true);

                    this.mTMService.deleteMyanmarWord(pl).subscribe({
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
                            this.myanmarWords = [...(this.myanmarWords.filter((x:any)=>x.idmyanmarword!==row.idmyanmarword))]
                        }
                    });
                }
            });
        });
    }
}