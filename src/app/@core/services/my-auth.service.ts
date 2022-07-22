import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_ENDPOINT } from "../helpers/api-helper";

@Injectable()
export class MyAuthService {
    constructor(private http:HttpClient){}

    login(payload:any): Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/login`, payload);
    }
    
    logout(): Observable<any>{
        return this.http.post<any>(`${API_ENDPOINT}/admin/logout`, null);
    }
}