import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_ENDPOINT } from "../helpers/api-helper";

@Injectable()
export class MyanglishTranslateManageService {
    constructor(private http:HttpClient){}

    getAllMyanmarWord(param:string):Observable<any>{
        return this.http.get<any>(`${API_ENDPOINT}/admin/myanmarlist${param}`);
    }

    getAllMyanglishWord(param:string):Observable<any>{
        return this.http.get<any>(`${API_ENDPOINT}/admin/myanglishlist${param?param:''}`);
    }

    createMyanglishWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/insertwordbymyanglish`, payload);
    }
    
    createMyanmarWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/insertwordbymyanmar`, payload);
    }

    getMyanglishDetail(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/myanglishdetails`, payload);
    }

    getMyanmarDetail(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/myanmardetails`, payload);
    }

    updateMyanmarWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/updatemyanmar`, payload);
    }

    updateMyanglishWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/updatemyanglish`, payload);
    }

    deleteMyanglishWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/deletemyanglish`, payload);
    }

    deleteMyanmarWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/deletemyanmar`, payload);
    }

    selectMyanglishByWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/selectmyanglishword`, payload);
    }

    selectMyanmarByWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/selectmyanmarword`, payload);
    }

    addNewMyanglishWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/addnewformyanglish`, payload);
    }

    addNewMyanmarWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/addnewformyanmar`, payload);
    }

    removeByJoinId(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/removebyjoinid`, payload);
    }

    joinWord(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/joinword`, payload);
    }

    getResultWords(payload:any):Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/getwords`, payload);
    }

}